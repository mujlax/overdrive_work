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
      <div style={{ maxWidth: '56rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
          Баланс нагрузки команды
        </h1>
        <p
          style={{
            margin: '0.5rem 0 0',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
          }}
        >
          Часы переработок по неделям, статусы относительно медианы по выборке. Цель — выровнять
          нагрузку и вовремя перераспределять задачи.
        </p>
        <ul
          style={{
            margin: '0.75rem 0 0',
            paddingLeft: '1.25rem',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
          }}
        >
          <li>Перегруз виден сразу — не нужно гадать, кого пора разгрузить или отправить отдыхать.</li>
          <li>Видно, у кого нагрузка ниже среднего — проще и обоснованнее просить подставить.</li>
          <li>Специалисты сами видят, когда их помощь, скорее всего, понадобится — можно планировать заранее.</li>
          <li>Справедливо: сравнение с командой, а не с «жёсткими» нормами; одна картинка по неделям вместо разрозненных отчётов.</li>
        </ul>
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
