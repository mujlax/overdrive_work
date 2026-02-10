import { useMemo } from 'react'
import type { SpecialistWithMetrics } from '../types/overtime'
import type { FilterState } from '../components/FiltersBar'
import { applyCohortStatus } from '../lib/overtimeLogic'

export function useFilteredSpecialists(
  specialists: SpecialistWithMetrics[],
  filters: FilterState
): SpecialistWithMetrics[] {
  return useMemo(() => {
    const { search, department, skill, status } = filters
    const q = search.trim().toLowerCase()
    let list = specialists.filter((s) => {
      if (department && s.department !== department) return false
      if (skill && s.skill !== skill) return false
      if (q) {
        const match =
          s.name.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q) ||
          s.skill.toLowerCase().includes(q)
        if (!match) return false
      }
      return true
    })
    applyCohortStatus(list)
    if (status) list = list.filter((s) => s.metrics.status.kind === status)
    list = [...list].sort((a, b) => b.metrics.priorityScore - a.metrics.priorityScore)
    return list
  }, [specialists, filters])
}
