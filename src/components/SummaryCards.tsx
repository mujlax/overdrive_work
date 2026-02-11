import { Clock, Users, AlertCircle, Briefcase } from 'lucide-react'
import type { SpecialistWithMetrics } from '../types/overtime'

interface SummaryCardsProps {
  specialists: SpecialistWithMetrics[]
}

export function SummaryCards({ specialists }: SummaryCardsProps) {
  const totalHours = specialists.reduce((acc, s) => acc + s.metrics.total, 0)
  const withOvertime = specialists.filter((s) => s.metrics.total > 0).length
  const overloadRest = specialists.filter((s) => s.metrics.status.kind === 'overload_rest').length
  const underloadWork = specialists.filter((s) => s.metrics.status.kind === 'underload_work').length

  const cards = [
    { label: 'Всего переработок', value: `${totalHours} ч`, icon: Clock },
    { label: 'С переработками', value: String(withOvertime), icon: Users },
    { label: 'Выше нормы', value: String(overloadRest), icon: AlertCircle },
    { label: 'Ниже нормы', value: String(underloadWork), icon: Briefcase },
  ]

  return (
    <div
      data-tour="summary"
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
