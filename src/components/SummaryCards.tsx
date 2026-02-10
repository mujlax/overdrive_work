import { Clock, Users, AlertCircle, Bed } from 'lucide-react'
import type { SpecialistWithMetrics } from '../types/overtime'

interface SummaryCardsProps {
  specialists: SpecialistWithMetrics[]
}

export function SummaryCards({ specialists }: SummaryCardsProps) {
  const totalHours = specialists.reduce((acc, s) => acc + s.metrics.total, 0)
  const withOvertime = specialists.filter((s) => s.metrics.total > 0).length
  const urgentRest = specialists.filter((s) => s.metrics.status.kind === 'urgent_rest').length
  const betterRest = specialists.filter((s) => s.metrics.status.kind === 'better_rest').length

  const cards = [
    { label: 'Всего переработок', value: `${totalHours} ч`, icon: Clock },
    { label: 'С переработками', value: String(withOvertime), icon: Users },
    { label: 'Срочно отдыхать', value: String(urgentRest), icon: AlertCircle },
    { label: 'Лучше отдыхать', value: String(betterRest), icon: Bed },
  ]

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
        padding: '1rem 2rem',
      }}
    >
      {cards.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <Icon size={24} style={{ color: 'var(--text-muted)' }} />
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{label}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
