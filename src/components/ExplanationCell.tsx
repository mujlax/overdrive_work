import { Calendar, TrendingUp, Flame } from 'lucide-react'
import type { OvertimeMetrics } from '../types/overtime'

interface ExplanationCellProps {
  metrics: OvertimeMetrics
}

const profileTagStyle: Record<string, { bg: string; color: string }> = {
  chronic: { bg: 'rgba(239, 68, 68, 0.2)', color: 'var(--status-urgent-rest)' },
  fresh_overload: { bg: 'rgba(160, 160, 160, 0.2)', color: 'var(--text-muted)' },
  single_peak: { bg: 'rgba(160, 160, 160, 0.2)', color: 'var(--text-muted)' },
  uniform: { bg: 'rgba(160, 160, 160, 0.2)', color: 'var(--text-muted)' },
  none: { bg: 'transparent', color: 'var(--text-muted)' },
}

const iconSize = 12

export function ExplanationCell({ metrics }: ExplanationCellProps) {
  const style = profileTagStyle[metrics.profile] ?? profileTagStyle.none
  return (
    <div
      style={{
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '0.5rem 0.75rem',
      }}
    >
      <span
        style={{
          padding: '0.125rem 0.375rem',
          borderRadius: 4,
          backgroundColor: style.bg,
          color: style.color,
          fontSize: '0.7rem',
        }}
      >
        {metrics.profileLabel}
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
        <Calendar size={iconSize} aria-hidden />
        {metrics.lastWorkedLabel ?? '—'}
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
        <TrendingUp size={iconSize} aria-hidden />
        {metrics.peakLabel} ({metrics.peakValue}ч)
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
        <Flame size={iconSize} aria-hidden />
        {metrics.febTotal}ч
      </span>
    </div>
  )
}
