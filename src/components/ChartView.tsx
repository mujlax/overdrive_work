import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts'
import { PERIOD_LABELS } from '../types/overtime'
import type { SpecialistWithMetrics } from '../types/overtime'

interface ChartViewProps {
  specialists: SpecialistWithMetrics[]
}

const COLORS = [
  '#3b82f6',
  '#22c55e',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
]

export function ChartView({ specialists }: ChartViewProps) {
  const data = PERIOD_LABELS.map((label, i) => {
    const point: Record<string, string | number> = { period: label }
    specialists.forEach((s) => {
      point[s.name] = s.periods[i]
    })
    return point
  })

  return (
    <div style={{ padding: '1rem 2rem', height: 420 }}>
      <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        Часы переработок по неделям (время — по оси X, часы — по оси Y)
      </div>
      {specialists.length > 0 && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={380}>
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="period"
              tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
              stroke="var(--border)"
            />
            <YAxis
              tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
              stroke="var(--border)"
              label={{ value: 'Часы', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                color: 'var(--text)',
              }}
              labelFormatter={(label) => `Неделя: ${label}`}
              formatter={(value: number, name: string) => [`${value} ч`, name]}
              labelStyle={{ color: 'var(--text-muted)' }}
            />
            <Legend
              wrapperStyle={{ fontSize: '0.75rem' }}
              formatter={(value) => <span style={{ color: 'var(--text)' }}>{value}</span>}
            />
            {specialists.map((s, idx) => (
              <Line
                key={s.id}
                type="monotone"
                dataKey={s.name}
                stroke={COLORS[idx % COLORS.length]}
                strokeWidth={2}
                dot={{ r: 3, fill: COLORS[idx % COLORS.length] }}
                activeDot={{ r: 5 }}
                name={s.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
          Нет данных для графика.
        </div>
      )}
    </div>
  )
}
