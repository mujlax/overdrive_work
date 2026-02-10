import { Zap, Activity, Bed, AlertCircle } from 'lucide-react'
import type { StatusKind } from '../types/overtime'

interface StatusBadgeProps {
  kind: StatusKind
  label: string
}

const config: Record<
  StatusKind,
  { icon: typeof Zap; bg: string; color: string }
> = {
  can_work: { icon: Zap, bg: 'rgba(34, 197, 94, 0.15)', color: 'var(--status-can-work)' },
  normal: { icon: Activity, bg: 'rgba(14, 165, 233, 0.15)', color: 'var(--status-normal)' },
  better_rest: { icon: Bed, bg: 'rgba(245, 158, 11, 0.15)', color: 'var(--status-better-rest)' },
  urgent_rest: { icon: AlertCircle, bg: 'rgba(239, 68, 68, 0.15)', color: 'var(--status-urgent-rest)' },
}

export function StatusBadge({ kind, label }: StatusBadgeProps) {
  const { icon: Icon, bg, color } = config[kind]
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.25rem 0.5rem',
        borderRadius: 'var(--radius)',
        backgroundColor: bg,
        color,
        fontSize: '0.8125rem',
        fontWeight: 500,
      }}
    >
      <Icon size={14} />
      {label}
    </span>
  )
}
