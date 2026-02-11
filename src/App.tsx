import { useState, useMemo, useEffect } from 'react'
import { Header } from './components/Header'
import { SummaryCards } from './components/SummaryCards'
import { FiltersBar, type FilterState } from './components/FiltersBar'
import { ViewTabs } from './components/ViewTabs'
import { PeriodModeTabs } from './components/PeriodModeTabs'
import { SpecialistsTable } from './components/SpecialistsTable'
import { ChartView } from './components/ChartView'
import { useFilteredSpecialists } from './hooks/useFilteredSpecialists'
import { mockSpecialistsEqualTotalsWithMetrics } from './data/mockSpecialistsEqualTotals'
import { runDemoTour, TOUR_DONE_KEY } from './lib/demoTour'
import type { PeriodMode } from './types/overtime'

const defaultFilters: FilterState = {
  search: '',
  department: '',
  skill: '',
  status: '',
}

const statusOptions = [
  { value: 'overload_rest', label: 'Выше нормы' },
  { value: 'normal', label: 'В норме' },
  { value: 'underload_work', label: 'Ниже нормы' },
]

export default function App() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [view, setView] = useState<'table' | 'chart'>('table')
  const [periodMode, setPeriodMode] = useState<PeriodMode>('weeks')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = useFilteredSpecialists(mockSpecialistsEqualTotalsWithMetrics, filters)

  const departments = useMemo(() => {
    const set = new Set(mockSpecialistsEqualTotalsWithMetrics.map((s) => s.department))
    return Array.from(set).sort()
  }, [])

  const skills = useMemo(() => {
    const set = new Set(mockSpecialistsEqualTotalsWithMetrics.map((s) => s.skill))
    return Array.from(set).sort()
  }, [])

  useEffect(() => {
    if (localStorage.getItem(TOUR_DONE_KEY)) return
    const t = setTimeout(() => runDemoTour(), 400)
    return () => clearTimeout(t)
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
      <div data-tour="view-tabs">
        <ViewTabs view={view} onViewChange={setView} />
      </div>
      <div data-tour="period-tabs">
        <PeriodModeTabs periodMode={periodMode} onPeriodModeChange={setPeriodMode} />
      </div>
      <div data-tour="main-content">
        {view === 'table' ? (
          <SpecialistsTable
            specialists={filtered}
            selectedId={selectedId}
            onSelect={setSelectedId}
            periodMode={periodMode}
          />
        ) : (
          <ChartView specialists={filtered} periodMode={periodMode} />
        )}
      </div>
      <footer
        data-tour="footer"
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
          Статусы: относительно медианы по текущей выборке (норма ±20%). Сортировка: сначала выше нормы, затем ниже нормы.
        </span>
        <span>Weekly UI v1</span>
      </footer>
    </>
  )
}
