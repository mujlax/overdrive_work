import type { SpecialistRaw, SpecialistWithMetrics } from '../types/overtime'
import { getMetrics } from '../lib/overtimeLogic'

/** Часы по 12 неделям (2026-W01..W12). Недели 1–4 ≈ дек, 5–8 ≈ янв, 9–12 ≈ фев. */
const rawSpecialists: SpecialistRaw[] = [
  {
    id: '1',
    name: 'Даша',
    department: 'Команда Олеся',
    skill: 'Универсально',
    periods: [4, 4, 4, 4, 6, 7, 6, 7, 8, 8, 7, 7], // Total 72, хроническая
  },
  {
    id: '2',
    name: 'Женя',
    department: 'Анимация',
    skill: 'Видео',
    periods: [0, 0, 0, 0, 2, 2, 4, 4, 4, 4, 4, 4], // Total 28, можно работать
  },
  {
    id: '3',
    name: 'Денис',
    department: 'Frontend',
    skill: 'HTML-баннеры',
    periods: [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3], // Total 9
  },
  {
    id: '4',
    name: 'Артём',
    department: 'Моушн (CGI)',
    skill: 'Видео',
    periods: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Кейс A: 0 часов
  },
  {
    id: '5',
    name: 'Мария',
    department: 'Дизайн',
    skill: 'Иллюстрация',
    periods: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 60], // Кейс C: свежий всплеск 120ч
  },
  {
    id: '6',
    name: 'Игорь',
    department: 'Backend',
    skill: 'API',
    periods: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], // Кейс D: хроническая 120ч
  },
]

export function getMockSpecialistsWithMetrics(): SpecialistWithMetrics[] {
  return rawSpecialists.map((s) => ({
    ...s,
    metrics: getMetrics(s.periods),
  }))
}

export const mockSpecialistsWithMetrics = getMockSpecialistsWithMetrics()
