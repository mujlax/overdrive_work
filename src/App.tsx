import { useState, useMemo } from 'react'
import { Header } from './components/Header'
import { SummaryCards } from './components/SummaryCards'
import { FiltersBar, type FilterState } from './components/FiltersBar'
import { ViewTabs } from './components/ViewTabs'
import { SpecialistsTable } from './components/SpecialistsTable'
import { ChartView } from './components/ChartView'
import { useFilteredSpecialists } from './hooks/useFilteredSpecialists'
import { mockSpecialistsWithMetrics } from './data/mockSpecialists'

const defaultFilters: FilterState = {
  search: '',
  department: '',
  skill: '',
  status: '',
}

const statusOptions = [
  { value: 'can_work', label: 'Можно работать' },
  { value: 'normal', label: 'Нормальная нагрузка' },
  { value: 'better_rest', label: 'Лучше отдыхать' },
  { value: 'urgent_rest', label: 'Срочно отдыхать' },
]

export default function App() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [view, setView] = useState<'table' | 'chart'>('table')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = useFilteredSpecialists(mockSpecialistsWithMetrics, filters)

  const departments = useMemo(() => {
    const set = new Set(mockSpecialistsWithMetrics.map((s) => s.department))
    return Array.from(set).sort()
  }, [])

  const skills = useMemo(() => {
    const set = new Set(mockSpecialistsWithMetrics.map((s) => s.skill))
    return Array.from(set).sort()
  }, [])

  return (
    <>
      <Header />
      <SummaryCards specialists={filtered} />
      <FiltersBar
        filters={filters}
        onFiltersChange={setFilters}
        departments={departments}
        skills={skills}
        statusOptions={statusOptions}
      />
      <ViewTabs view={view} onViewChange={setView} />
      {view === 'table' ? (
        <SpecialistsTable
          specialists={filtered}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      ) : (
        <ChartView specialists={filtered} selectedId={selectedId} />
      )}
      <footer
        style={{
          marginTop: 'auto',
          padding: '1rem 2rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          fontSize: '0.8125rem',
          color: 'var(--text-muted)',
        }}
      >
        <span>
          Подсказка: сортировка «По приоритету отдыха» учитывает статус + свежесть (кто работал
          последним) как тай-брейкер.
        </span>
        <span>Weekly UI v1</span>
      </footer>
    </>
  )
}
