import type { PeriodHours, RuleParams, StatusResult, OvertimeMetrics } from '../types/overtime'
import {
  PERIOD_LABELS,
  DEFAULT_RULE_PARAMS,
  type ProfileKind,
} from '../types/overtime'

function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0)
}

/** Агрегации по 12 неделям: нед. 0–3 = дек, 4–7 = янв, 8–11 = фев */
function getAggregations(P: PeriodHours) {
  const total = sum(P)
  const decTotal = P[0] + P[1] + P[2] + P[3]
  const janTotal = P[4] + P[5] + P[6] + P[7]
  const febTotal = P[8] + P[9] + P[10] + P[11]
  const activeHalfCount = P.filter((p) => p > 0).length
  const monthTotals = [decTotal, janTotal, febTotal]
  const activeMonthCount = monthTotals.filter((m) => m > 0).length
  return {
    total,
    decTotal,
    janTotal,
    febTotal,
    activeHalfCount,
    activeMonthCount,
  }
}

/** Последняя неделя с p > 0 (индекс 0..11, для формулы LastIndex 1..12) */
function getLastWorked(P: PeriodHours): { index: number; label: string } | null {
  let lastIndex = -1
  for (let i = P.length - 1; i >= 0; i--) {
    if (P[i] > 0) {
      lastIndex = i
      break
    }
  }
  if (lastIndex === -1) return null
  return { index: lastIndex, label: PERIOD_LABELS[lastIndex] as string }
}

/** Пик нагрузки: значение и первый индекс с этим значением */
function getPeak(P: PeriodHours): { value: number; index: number; label: string } {
  const value = Math.max(...P)
  const index = P.findIndex((p) => p === value)
  const i = index >= 0 ? index : 0
  return { value, index: i, label: PERIOD_LABELS[i] as string }
}

/** Профиль нагрузки */
function getProfile(
  total: number,
  febTotal: number,
  activeHalfCount: number,
  activeMonthCount: number,
  freshShare: number
): { kind: ProfileKind; label: string } {
  if (total === 0) return { kind: 'none', label: 'нет данных' }
  if (activeHalfCount === 1) return { kind: 'single_peak', label: 'разовый пик' }
  if (activeMonthCount === 3) return { kind: 'chronic', label: 'хроническая (все 3 мес)' }
  if (total > 0 && febTotal >= freshShare * total) return { kind: 'fresh_overload', label: 'свежая перегрузка' }
  return { kind: 'uniform', label: 'равномерно' }
}

/** Статус по приоритету правил 0–5 */
function getStatus(
  total: number,
  febTotal: number,
  activeHalfCount: number,
  activeMonthCount: number,
  params: RuleParams
): StatusResult {
  const { LOW_WORK, MID_WORK, FRESH_SHARE, CHRONIC_HALVES } = params

  if (total === 0) return { kind: 'can_work', label: 'Можно работать' }
  if (total < LOW_WORK) return { kind: 'can_work', label: 'Можно работать' }
  if (LOW_WORK <= total && total < MID_WORK) return { kind: 'normal', label: 'Нормальная нагрузка' }

  const isChronic = activeMonthCount === 3 && activeHalfCount >= CHRONIC_HALVES
  if (isChronic) return { kind: 'urgent_rest', label: 'Срочно отдыхать' }
  if (total > 0 && febTotal >= FRESH_SHARE * total) return { kind: 'better_rest', label: 'Лучше отдыхать' }

  return { kind: 'normal', label: 'Нормальная нагрузка' }
}

/** PriorityScore: 1000000*Chronic + 10000*LastIndex + 10*FebTotal + 1*Total. LastIndex 1..12 или 0 если не работал. */
function getPriorityScore(
  total: number,
  febTotal: number,
  lastWorkedIndex: number | null,
  activeHalfCount: number,
  activeMonthCount: number,
  chronicHalves: number
): number {
  const chronicFlag = activeMonthCount === 3 && activeHalfCount >= chronicHalves ? 1 : 0
  const lastIndex = lastWorkedIndex !== null ? lastWorkedIndex + 1 : 0
  return 1000000 * chronicFlag + 10000 * lastIndex + 10 * febTotal + 1 * total
}

/**
 * Полный расчёт метрик по вектору периодов P.
 */
export function getMetrics(P: PeriodHours, params: RuleParams = DEFAULT_RULE_PARAMS): OvertimeMetrics {
  const agg = getAggregations(P)
  const last = getLastWorked(P)
  const peak = getPeak(P)
  const profile = getProfile(
    agg.total,
    agg.febTotal,
    agg.activeHalfCount,
    agg.activeMonthCount,
    params.FRESH_SHARE
  )
  const status = getStatus(
    agg.total,
    agg.febTotal,
    agg.activeHalfCount,
    agg.activeMonthCount,
    params
  )
  const priorityScore = getPriorityScore(
    agg.total,
    agg.febTotal,
    last?.index ?? null,
    agg.activeHalfCount,
    agg.activeMonthCount,
    params.CHRONIC_HALVES
  )

  return {
    total: agg.total,
    decTotal: agg.decTotal,
    janTotal: agg.janTotal,
    febTotal: agg.febTotal,
    activeHalfCount: agg.activeHalfCount,
    activeMonthCount: agg.activeMonthCount,
    lastWorkedIndex: last?.index ?? null,
    lastWorkedLabel: last?.label ?? null,
    peakValue: peak.value,
    peakIndex: peak.index,
    peakLabel: peak.label,
    profile: profile.kind,
    profileLabel: profile.label,
    status,
    priorityScore,
  }
}

export { DEFAULT_RULE_PARAMS }
