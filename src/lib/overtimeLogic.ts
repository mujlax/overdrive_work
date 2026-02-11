import type { PeriodHours, RuleParams, StatusResult, OvertimeMetrics } from '../types/overtime'
import {
  PERIOD_LABELS,
  DEFAULT_RULE_PARAMS,
  MEDIAN_BAND_PERCENT,
  type ProfileKind,
  type StatusKind,
} from '../types/overtime'
import type { SpecialistWithMetrics } from '../types/overtime'

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

function median(sorted: number[]): number {
  if (sorted.length === 0) return 0
  const m = Math.floor(sorted.length / 2)
  if (sorted.length % 2 === 1) return sorted[m]
  return (sorted[m - 1] + sorted[m]) / 2
}

function getRelativeStatus(total: number, medianValue: number, bandPercent: number): StatusResult {
  if (medianValue === 0) {
    if (total === 0) return { kind: 'normal', label: 'В норме' }
    return { kind: 'overload_rest', label: 'Выше нормы' }
  }
  const low = medianValue * (1 - bandPercent)
  const high = medianValue * (1 + bandPercent)
  if (total > high) return { kind: 'overload_rest', label: 'Выше нормы' }
  if (total < low) return { kind: 'underload_work', label: 'Ниже нормы' }
  return { kind: 'normal', label: 'В норме' }
}

/**
 * Обновляет у каждого специалиста metrics.status и metrics.priorityScore
 * по медиане часов по когорте (отфильтрованному списку).
 */
export function applyCohortStatus(
  specialists: SpecialistWithMetrics[],
  bandPercent: number = MEDIAN_BAND_PERCENT
): void {
  if (specialists.length === 0) return
  const totals = specialists.map((s) => s.metrics.total).slice().sort((a, b) => a - b)
  const medianValue = median(totals)
  for (const s of specialists) {
    s.metrics.status = getRelativeStatus(s.metrics.total, medianValue, bandPercent)
    s.metrics.priorityScore = s.metrics.total - medianValue
  }
}

/**
 * Метрики по вектору периодов P (без учёта когорты).
 * status и priorityScore — заглушки; их задаёт applyCohortStatus по отфильтрованному списку.
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
    status: { kind: 'normal' as StatusKind, label: 'Нормальная нагрузка' },
    priorityScore: 0,
  }
}

export { DEFAULT_RULE_PARAMS }
