import { Search } from 'lucide-react'

export interface FilterState {
  search: string
  department: string
  skill: string
  status: string
}

interface FiltersBarProps {
  filters: FilterState
  onFiltersChange: (f: FilterState) => void
  departments: string[]
  skills: string[]
  statusOptions: { value: string; label: string }[]
}

export function FiltersBar({
  filters,
  onFiltersChange,
  departments,
  skills,
  statusOptions,
}: FiltersBarProps) {
  const update = (patch: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...patch })
  }

  const reset = () => {
    onFiltersChange({
      search: '',
      department: '',
      skill: '',
      status: '',
    })
  }

  return (
    <div
      style={{
        padding: '1rem 2rem',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div
          style={{
            position: 'relative',
            flex: '1 1 240px',
            minWidth: 200,
          }}
        >
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }}
          />
          <input
            type="text"
            placeholder="Поиск по имени / отделу / скиллу"
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem 0.5rem 2.5rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              color: 'var(--text)',
              fontSize: '0.875rem',
            }}
          />
        </div>
        <select
          value={filters.department}
          onChange={(e) => update({ department: e.target.value })}
          style={{
            padding: '0.5rem 0.75rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            color: 'var(--text)',
            fontSize: '0.875rem',
            minWidth: 140,
          }}
        >
          <option value="">Все отделы</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          value={filters.skill}
          onChange={(e) => update({ skill: e.target.value })}
          style={{
            padding: '0.5rem 0.75rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            color: 'var(--text)',
            fontSize: '0.875rem',
            minWidth: 140,
          }}
        >
          <option value="">Все скиллы</option>
          {skills.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={filters.status}
          onChange={(e) => update({ status: e.target.value })}
          style={{
            padding: '0.5rem 0.75rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            color: 'var(--text)',
            fontSize: '0.875rem',
            minWidth: 140,
          }}
        >
          <option value="">Все статусы</option>
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={reset}
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            color: 'var(--text)',
            fontSize: '0.875rem',
          }}
        >
          Показывать всех
        </button>
      </div>
      <div
        style={{
          marginTop: '0.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
        }}
      >
        <span>Правила: LOW=60ч, MID=80ч</span>
        <span>Свежая перегрузка: ≥ 60% за последние 4 недели</span>
        <span>Хроника: ≥ 6 активных недель и span ≥8</span>
      </div>
    </div>
  )
}
