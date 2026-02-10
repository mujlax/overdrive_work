import type { SpecialistRaw, SpecialistWithMetrics } from '../types/overtime'
import { getMetrics } from '../lib/overtimeLogic'

/** Часы по 12 неделям (2026-W01..W12). Недели 1–4 = дек, 5–8 = янв, 9–12 = фев. */
const rawSpecialists: SpecialistRaw[] = [
  // --- Можно работать (can_work) ---
  {
    id: '1',
    name: 'Артём',
    department: 'Моушн (CGI)',
    skill: 'Видео',
    periods: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  }, // нет данных, 0 ч
  {
    id: '2',
    name: 'Олег',
    department: 'Дизайн',
    skill: 'Иллюстрация',
    periods: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22],
  }, // разовый пик (1 неделя), 22 ч
  {
    id: '3',
    name: 'Денис',
    department: 'Frontend',
    skill: 'HTML-баннеры',
    periods: [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 2],
  }, // свежая перегрузка, 9 ч
  {
    id: '4',
    name: 'Женя',
    department: 'Анимация',
    skill: 'Видео',
    periods: [5, 5, 6, 4, 4, 4, 0, 0, 0, 0, 0, 0],
  }, // равномерно (дек+янв), 32 ч
  {
    id: '5',
    name: 'Света',
    department: 'Команда Олеся',
    skill: 'Универсально',
    periods: [0, 0, 0, 0, 0, 25, 0, 0, 0, 0, 0, 0],
  }, // разовый пик (одна неделя янв), 25 ч
  {
    id: '6',
    name: 'Миша',
    department: 'Backend',
    skill: 'API',
    periods: [0, 0, 0, 0, 8, 8, 8, 6, 0, 0, 0, 0],
  }, // равномерно (только янв), 30 ч
  // --- Нормальная нагрузка (normal) ---
  {
    id: '7',
    name: 'Лида',
    department: 'Дизайн',
    skill: 'Веб',
    periods: [15, 15, 15, 15, 10, 0, 0, 0, 0, 0, 0, 0],
  }, // равномерно, 70 ч (60–80)
  {
    id: '8',
    name: 'Даша',
    department: 'Команда Олеся',
    skill: 'Универсально',
    periods: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  }, // хроническая (все 3 мес), 72 ч → normal (60–80)
  {
    id: '9',
    name: 'Костя',
    department: 'Анимация',
    skill: 'Моушн',
    periods: [10, 10, 10, 10, 8, 7, 5, 5, 0, 0, 0, 0],
  }, // равномерно, 65 ч, normal
  // --- Лучше отдыхать (better_rest) ---
  {
    id: '10',
    name: 'Мария',
    department: 'Дизайн',
    skill: 'Иллюстрация',
    periods: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 60],
  }, // свежая перегрузка, 120 ч
  {
    id: '11',
    name: 'Наташа',
    department: 'Frontend',
    skill: 'React',
    periods: [0, 0, 0, 0, 0, 0, 10, 20, 20, 20, 15, 5],
  }, // свежая перегрузка (большая доля в фев), 90 ч
  // --- Срочно отдыхать (urgent_rest) ---
  {
    id: '12',
    name: 'Игорь',
    department: 'Backend',
    skill: 'API',
    periods: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
  }, // хроническая, 120 ч
  {
    id: '13',
    name: 'Вика',
    department: 'Моушн (CGI)',
    skill: 'Видео',
    periods: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
  }, // хроническая, 96 ч
]

export function getMockSpecialistsWithMetrics(): SpecialistWithMetrics[] {
  return rawSpecialists.map((s) => ({
    ...s,
    metrics: getMetrics(s.periods),
  }))
}

export const mockSpecialistsWithMetrics = getMockSpecialistsWithMetrics()
