import { Filter, ArrowUpDown } from 'lucide-react'

export function Header() {
  return (
    <header
      style={{
        padding: '1.5rem 2rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
          Еженедельный мониторинг перегруза
        </h1>
        <p
          style={{
            margin: '0.5rem 0 0',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            maxWidth: '56rem',
          }}
        >
          Гранулярность по неделям вместо 1–15 / 15–30. Статус выставляется по правилам (low/mid,
          хроническая, свежая перегрузка) и сортируется по приоритету отдыха (строже учитывает «кто
          работал последним»).
        </p>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            color: 'var(--text)',
            fontSize: '0.875rem',
          }}
        >
          <Filter size={16} />
          Фильтры
        </button>
        <button
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            color: 'var(--text)',
            fontSize: '0.875rem',
          }}
        >
          <ArrowUpDown size={16} />
          Сортировка
        </button>
      </div>
    </header>
  )
}
