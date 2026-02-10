import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { PERIOD_LABELS } from '../types/overtime'
import type { SpecialistWithMetrics } from '../types/overtime'

interface ChartViewProps {
  specialists: SpecialistWithMetrics[]
  selectedId: string | null
}

export function ChartView({ specialists, selectedId }: ChartViewProps) {
  const selected = selectedId
    ? specialists.find((s) => s.id === selectedId)
    : specialists[0] ?? null

  const data = selected
    ? PERIOD_LABELS.map((label, i) => ({
        period: label,
        hours: selected.periods[i],
      }))
    : []

  return (
    <div style={{ padding: '1rem 2rem', height: 360 }}>
      {selected && (
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          {selected.name} — {selected.department} / {selected.skill}
        </div>
      )}
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <XAxis
              dataKey="period"
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              stroke="var(--border)"
            />
            <YAxis
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              stroke="var(--border)"
            />
            <Tooltip
              contentStyle={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                color: 'var(--text)',
              }}
              formatter={(value: number) => [`${value} ч`, 'Часы']}
              labelFormatter={(label) => label}
            />
            <Bar dataKey="hours" radius={4} fill="var(--accent)">
              {data.map((_, i) => (
                <Cell key={i} fill="var(--accent)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
          Нет данных для графика. Выберите специалиста в таблице.
        </div>
      )}
    </div>
  )
}
