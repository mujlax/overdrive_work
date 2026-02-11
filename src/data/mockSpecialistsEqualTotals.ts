import type { SpecialistRaw, SpecialistWithMetrics } from '../types/overtime'
import { getMetrics } from '../lib/overtimeLogic'

/**
 * 5 специалистов с примерно равными итоговыми переработками (~40–48 ч),
 * но разное распределение по месяцам — максимум кейсов для профилей и «последний раз».
 * Недели 1–4 = дек, 5–8 = янв, 9–12 = фев.
 */
const rawSpecialistsEqualTotals: SpecialistRaw[] = [
  {
    id: 'eq1',
    name: 'Анна',
    department: 'Дизайн',
    skill: 'Веб',
    periods: [20, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0],
  }, // 40 ч, только декабрь → uniform, последний W04
  {
    id: 'eq2',
    name: 'Борис',
    department: 'Backend',
    skill: 'API',
    periods: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30],
  }, // 40 ч, только январь → uniform, последний W08
  {
    id: 'eq3',
    name: 'Галина',
    department: 'Frontend',
    skill: 'React',
    periods: [0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10],
  }, // 40 ч, только февраль → fresh_overload, последний W12
  {
    id: 'eq4',
    name: 'Дмитрий',
    department: 'Анимация',
    skill: 'Моушн',
    periods: [5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0],
  }, // 40 ч, декабрь + январь → uniform, последний W08
  {
    id: 'eq5',
    name: 'Елена',
    department: 'Команда Олеся',
    skill: 'Универсально',
    periods: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  }, // 48 ч, все три месяца → chronic, последний W12
]

export function getMockSpecialistsEqualTotals(): SpecialistWithMetrics[] {
  return rawSpecialistsEqualTotals.map((s) => ({
    ...s,
    metrics: getMetrics(s.periods),
  }))
}

export const mockSpecialistsEqualTotalsWithMetrics = getMockSpecialistsEqualTotals()
