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

const iconSize = 14

export function ExplanationCell({ metrics }: ExplanationCellProps) {
  const style = profileTagStyle[metrics.profile] ?? profileTagStyle.none
  return (
    <div
      style={{
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <span
        style={{
          padding: '0.125rem 0.375rem',
          borderRadius: 4,
          backgroundColor: style.bg,
          color: style.color,
          fontSize: '0.7rem',
          lineHeight: 1,
        }}
      >
        {metrics.profileLabel}
      </span>
      <span title={metrics.lastWorkedLabel ?? 'Последняя переработка'} style={{ display: 'inline-flex' }}>
        <Calendar size={iconSize} aria-hidden />
      </span>
      <span title={`Пик: ${metrics.peakLabel} (${metrics.peakValue}ч)`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.15rem' }}>
        <TrendingUp size={iconSize} aria-hidden />
        <span>{metrics.peakValue}ч</span>
      </span>
      <span title={`Февраль: ${metrics.febTotal}ч`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.15rem' }}>
        <Flame size={iconSize} aria-hidden />
        <span>{metrics.febTotal}ч</span>
      </span>
    </div>
  )
}
