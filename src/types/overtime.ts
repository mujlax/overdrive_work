/** 12 недель: нед. 1–4 ≈ дек, 5–8 ≈ янв, 9–12 ≈ фев */
export const WEEKS_COUNT = 12
export type PeriodHours = [
  number, number, number, number, number, number,
  number, number, number, number, number, number
]

export const PERIOD_LABELS: readonly string[] = [
  '2026-W01', '2026-W02', '2026-W03', '2026-W04',
  '2026-W05', '2026-W06', '2026-W07', '2026-W08',
  '2026-W09', '2026-W10', '2026-W11', '2026-W12',
]

/** Месяцы и под ними по 4 недели для заголовка таблицы */
export const MONTH_WEEKS: readonly { month: string; weeks: readonly string[] }[] = [
  { month: 'Декабрь', weeks: ['2026-W01', '2026-W02', '2026-W03', '2026-W04'] },
  { month: 'Январь', weeks: ['2026-W05', '2026-W06', '2026-W07', '2026-W08'] },
  { month: 'Февраль', weeks: ['2026-W09', '2026-W10', '2026-W11', '2026-W12'] },
]

/** Пороговые параметры правил (настраиваемые) */
export interface RuleParams {
  LOW_WORK: number
  MID_WORK: number
  FRESH_SHARE: number
  CHRONIC_HALVES: number
}

/** CHRONIC_HALVES: при 12 неделях — минимум активных недель для «хроники» */
export const DEFAULT_RULE_PARAMS: RuleParams = {
  LOW_WORK: 60,
  MID_WORK: 80,
  FRESH_SHARE: 0.6,
  CHRONIC_HALVES: 6,
}

/** Три зоны относительно медианы по когорте */
export type StatusKind =
  | 'overload_rest'   // срочно отдыхать (перегруз)
  | 'normal'          // нормальная нагрузка
  | 'underload_work'  // срочно работать (недогруз)

/** Зона «норма»: total в [median * (1 - BAND), median * (1 + BAND)] */
export const MEDIAN_BAND_PERCENT = 0.2

export type ProfileKind =
  | 'single_peak'    // разовый пик
  | 'chronic'        // хроническая (все 3 мес)
  | 'fresh_overload' // свежая перегрузка
  | 'uniform'        // равномерно
  | 'none'           // нет данных

export interface StatusResult {
  kind: StatusKind
  label: string
}

export interface OvertimeMetrics {
  total: number
  decTotal: number
  janTotal: number
  febTotal: number
  activeHalfCount: number
  activeMonthCount: number
  lastWorkedIndex: number | null
  lastWorkedLabel: string | null
  peakValue: number
  peakIndex: number
  peakLabel: string
  profile: ProfileKind
  profileLabel: string
  status: StatusResult
  priorityScore: number
}

/** Дни по месяцам: 31 дек + 31 янв + 28 фев = 90 */
export const DAYS_PER_MONTH = [31, 31, 28] as const
export const TOTAL_DAYS = 90

export type PeriodMode = 'days' | 'weeks' | 'months'

export interface SpecialistRaw {
  id: string
  name: string
  department: string
  skill: string
  periods: PeriodHours
  /** Опционально: часы по календарным дням (90 чисел). Если нет — выводятся из periods. */
  days?: number[]
}

export interface SpecialistWithMetrics extends SpecialistRaw {
  metrics: OvertimeMetrics
}

/** Подпись для дня по индексу 0..89: «Дек 1», «Янв 15», «Фев 28» */
export function getDayLabel(index: number): string {
  const [decDays, janDays] = DAYS_PER_MONTH
  if (index < decDays) return `Дек ${index + 1}`
  if (index < decDays + janDays) return `Янв ${index - decDays + 1}`
  return `Фев ${index - decDays - janDays + 1}`
}

/** Массив подписей для всех 90 дней */
export const DAY_LABELS: readonly string[] = Array.from({ length: TOTAL_DAYS }, (_, i) => getDayLabel(i))
