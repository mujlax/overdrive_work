import type { PeriodMode } from '../types/overtime'
import {
  PERIOD_LABELS,
  MONTH_WEEKS,
  DAY_LABELS,
  TOTAL_DAYS,
  type SpecialistWithMetrics,
} from '../types/overtime'

/** Конфиг для отображения: подписи колонок и функция получения значений по специалисту */
export interface PeriodConfig {
  labels: readonly string[]
  groups?: { month: string; count: number }[]
  getValues: (s: SpecialistWithMetrics) => number[]
  getMonthBg: (colIndex: number) => string
}

/** Дни из periods: неделя i → 7 дней по periods[i]/7 */
function daysFromPeriods(periods: readonly number[]): number[] {
  const result: number[] = []
  for (let i = 0; i < 12; i++) {
    const v = periods[i] / 7
    for (let j = 0; j < 7; j++) result.push(v)
  }
  return result
}

export function getPeriodConfig(mode: PeriodMode): PeriodConfig {
  switch (mode) {
    case 'months':
      return {
        labels: ['Декабрь', 'Январь', 'Февраль'],
        getValues: (s) => [s.metrics.decTotal, s.metrics.janTotal, s.metrics.febTotal],
        getMonthBg: (i) => `var(--scroll-month-${i + 1})`,
      }
    case 'weeks':
      return {
        labels: [...PERIOD_LABELS],
        groups: MONTH_WEEKS.map((m) => ({ month: m.month, count: 4 })),
        getValues: (s) => [...s.periods],
        getMonthBg: (colIndex) => {
          const monthIndex = Math.floor(colIndex / 4) % 3
          return `var(--scroll-month-${monthIndex + 1})`
        },
      }
    case 'days':
      return {
        labels: [...DAY_LABELS],
        groups: [
          { month: 'Декабрь', count: 31 },
          { month: 'Январь', count: 31 },
          { month: 'Февраль', count: 28 },
        ],
        getValues: (s) => {
          if (s.days && s.days.length === TOTAL_DAYS) return s.days
          return daysFromPeriods(s.periods)
        },
        getMonthBg: (colIndex) => {
          if (colIndex < 31) return 'var(--scroll-month-1)'
          if (colIndex < 62) return 'var(--scroll-month-2)'
          return 'var(--scroll-month-3)'
        },
      }
  }
}
