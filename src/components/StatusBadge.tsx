import { AlertCircle, Activity, Briefcase } from 'lucide-react'
import type { StatusKind } from '../types/overtime'

interface StatusBadgeProps {
  kind: StatusKind
  label: string
}

const config: Record<
  StatusKind,
  { icon: typeof Activity; bg: string; color: string }
> = {
  overload_rest: { icon: AlertCircle, bg: 'rgba(239, 68, 68, 0.15)', color: 'var(--status-urgent-rest)' },
  normal: { icon: Activity, bg: 'rgba(14, 165, 233, 0.15)', color: 'var(--status-normal)' },
  underload_work: { icon: Briefcase, bg: 'rgba(34, 197, 94, 0.15)', color: 'var(--status-can-work)' },
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
