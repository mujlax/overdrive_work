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

export function ExplanationCell({ metrics }: ExplanationCellProps) {
  const style = profileTagStyle[metrics.profile] ?? profileTagStyle.none
  return (
    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
      <span
        style={{
          display: 'inline-block',
          marginRight: '0.5rem',
          padding: '0.125rem 0.375rem',
          borderRadius: 4,
          backgroundColor: style.bg,
          color: style.color,
          fontSize: '0.75rem',
        }}
      >
        {metrics.profileLabel}
      </span>
      <div>последний раз: {metrics.lastWorkedLabel ?? 'нет'}</div>
      <div>
        пик: {metrics.peakLabel} ({metrics.peakValue}ч)
      </div>
      <div>Фев (свежие): {metrics.febTotal}ч</div>
    </div>
  )
}
