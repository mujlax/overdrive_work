import type { PeriodMode } from '../types/overtime'

interface PeriodModeTabsProps {
  periodMode: PeriodMode
  onPeriodModeChange: (mode: PeriodMode) => void
}

const modes: { value: PeriodMode; label: string }[] = [
  { value: 'days', label: 'По дням' },
  { value: 'weeks', label: 'По неделям' },
  { value: 'months', label: 'По месяцам' },
]

export function PeriodModeTabs({ periodMode, onPeriodModeChange }: PeriodModeTabsProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 0,
        padding: '0 2rem',
        marginTop: '0.5rem',
      }}
    >
      {modes.map((m, i) => (
        <button
          key={m.value}
          type="button"
          onClick={() => onPeriodModeChange(m.value)}
          style={{
            padding: '0.5rem 1rem',
            background: periodMode === m.value ? 'var(--bg-elevated)' : 'transparent',
            border: '1px solid var(--border)',
            borderRight: i < modes.length - 1 ? 'none' : '1px solid var(--border)',
            borderTopLeftRadius: i === 0 ? 'var(--radius)' : 0,
            borderBottomLeftRadius: i === 0 ? 'var(--radius)' : 0,
            borderTopRightRadius: i === modes.length - 1 ? 'var(--radius)' : 0,
            borderBottomRightRadius: i === modes.length - 1 ? 'var(--radius)' : 0,
            color: 'var(--text)',
            fontSize: '0.875rem',
          }}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}
