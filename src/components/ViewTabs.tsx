interface ViewTabsProps {
  view: 'table' | 'chart'
  onViewChange: (view: 'table' | 'chart') => void
}

export function ViewTabs({ view, onViewChange }: ViewTabsProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 0,
        padding: '0 2rem',
        marginTop: '1rem',
      }}
    >
      <button
        type="button"
        onClick={() => onViewChange('table')}
        style={{
          padding: '0.5rem 1rem',
          background: view === 'table' ? 'var(--bg-elevated)' : 'transparent',
          border: '1px solid var(--border)',
          borderRight: view === 'table' ? '1px solid var(--border)' : 'none',
          borderTopLeftRadius: 'var(--radius)',
          borderBottomLeftRadius: 'var(--radius)',
          color: 'var(--text)',
          fontSize: '0.875rem',
        }}
      >
        Таблица
      </button>
      <button
        type="button"
        onClick={() => onViewChange('chart')}
        style={{
          padding: '0.5rem 1rem',
          background: view === 'chart' ? 'var(--bg-elevated)' : 'transparent',
          border: '1px solid var(--border)',
          borderTopRightRadius: 'var(--radius)',
          borderBottomRightRadius: 'var(--radius)',
          color: 'var(--text)',
          fontSize: '0.875rem',
        }}
      >
        График
      </button>
    </div>
  )
}
