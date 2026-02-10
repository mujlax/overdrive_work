import { MONTH_WEEKS } from '../types/overtime'
import type { SpecialistWithMetrics } from '../types/overtime'
import { StatusBadge } from './StatusBadge'
import { ExplanationCell } from './ExplanationCell'

interface SpecialistsTableProps {
  specialists: SpecialistWithMetrics[]
  selectedId: string | null
  onSelect: (id: string | null) => void
}

const cellStyle: React.CSSProperties = {
  padding: '0.5rem 0.75rem',
  borderBottom: '1px solid var(--border)',
  fontSize: '0.875rem',
}

const thStyle: React.CSSProperties = {
  ...cellStyle,
  textAlign: 'left',
  fontWeight: 600,
  color: 'var(--text-muted)',
  background: 'var(--bg-card)',
}

/** Фон колонки по индексу месяца (0, 1, 2) для чередования */
const scrollZoneMonthBg = (columnIndex: number) => {
  const monthIndex = Math.floor(columnIndex / 4) % 3
  return `var(--scroll-month-${monthIndex + 1})`
}

const STICKY_LEFT_1 = 0
const STICKY_WIDTH_1 = 120
const STICKY_LEFT_2 = STICKY_WIDTH_1
const STICKY_WIDTH_2 = 180

const W_TOTAL = 70
const W_STATUS = 160
const W_EXPLANATION = 200
const W_PRIORITY = 100
const STICKY_RIGHT_4 = 0
const STICKY_RIGHT_3 = W_PRIORITY
const STICKY_RIGHT_2 = W_PRIORITY + W_EXPLANATION
const STICKY_RIGHT_1 = W_PRIORITY + W_EXPLANATION + W_STATUS

const stickyRightTh = (right: number, _label: string) => ({
  ...thStyle,
  position: 'sticky' as const,
  right,
  zIndex: 2,
  background: 'var(--bg-card)',
  boxShadow: '-2px 0 4px rgba(0,0,0,0.2)',
  minWidth: right === STICKY_RIGHT_4 ? W_PRIORITY : right === STICKY_RIGHT_3 ? W_EXPLANATION : right === STICKY_RIGHT_2 ? W_STATUS : W_TOTAL,
})

const stickyRightTd = (right: number, width: number, bg: string) => ({
  ...cellStyle,
  position: 'sticky' as const,
  right,
  zIndex: 1,
  minWidth: width,
  background: bg,
  boxShadow: '-2px 0 4px rgba(0,0,0,0.2)',
})

export function SpecialistsTable({ specialists, selectedId, onSelect }: SpecialistsTableProps) {
  const rowBg = (s: SpecialistWithMetrics) =>
    selectedId === s.id ? 'var(--bg-elevated)' : 'var(--bg-page)'

  return (
    <div style={{ padding: '1rem 2rem' }}>
      <div style={{ overflowX: 'auto', margin: '0 -2rem', padding: '0 2rem' }}>
        <table style={{ width: 'max-content', minWidth: '100%' }}>
          <thead>
            <tr>
              <th
                style={{
                  ...thStyle,
                  position: 'sticky',
                  left: STICKY_LEFT_1,
                  zIndex: 3,
                  minWidth: STICKY_WIDTH_1,
                  background: 'var(--bg-card)',
                  boxShadow: '2px 0 4px rgba(0,0,0,0.2)',
                }}
              >
                Специалист
              </th>
              <th
                style={{
                  ...thStyle,
                  position: 'sticky',
                  left: STICKY_LEFT_2,
                  zIndex: 3,
                  minWidth: STICKY_WIDTH_2,
                  background: 'var(--bg-card)',
                  boxShadow: '2px 0 4px rgba(0,0,0,0.2)',
                }}
              >
                Отдел / Скилл
              </th>
              {MONTH_WEEKS.map(({ month }, monthIdx) => (
                <th
                  key={month}
                  colSpan={4}
                  style={{
                    ...thStyle,
                    minWidth: 72 * 4,
                    textAlign: 'center',
                    background: `var(--scroll-month-${monthIdx + 1})`,
                    borderLeft: '1px solid var(--border)',
                    borderRight: '1px solid var(--border)',
                  }}
                >
                  {month}
                </th>
              ))}
              <th style={stickyRightTh(STICKY_RIGHT_1, 'Всего')}>Всего</th>
              <th style={stickyRightTh(STICKY_RIGHT_2, 'Статус')}>Статус</th>
              <th style={stickyRightTh(STICKY_RIGHT_3, 'Объяснение')}>Объяснение</th>
              <th style={stickyRightTh(STICKY_RIGHT_4, 'PriorityScore')}>PriorityScore</th>
            </tr>
            <tr>
              <th
                style={{
                  ...thStyle,
                  position: 'sticky',
                  left: STICKY_LEFT_1,
                  zIndex: 2,
                  minWidth: STICKY_WIDTH_1,
                  background: 'var(--bg-card)',
                  boxShadow: '2px 0 4px rgba(0,0,0,0.2)',
                }}
              />
              <th
                style={{
                  ...thStyle,
                  position: 'sticky',
                  left: STICKY_LEFT_2,
                  zIndex: 2,
                  minWidth: STICKY_WIDTH_2,
                  background: 'var(--bg-card)',
                  boxShadow: '2px 0 4px rgba(0,0,0,0.2)',
                }}
              />
              {MONTH_WEEKS.flatMap(({ month }, monthIdx) =>
                [1, 2, 3, 4].map((w) => {
                  const colIndex = monthIdx * 4 + (w - 1)
                  return (
                    <th
                      key={`${month}-${w}`}
                      style={{
                        ...thStyle,
                        minWidth: 72,
                        textAlign: 'center',
                        background: scrollZoneMonthBg(colIndex),
                        borderLeft: '1px solid var(--border)',
                        ...(colIndex === 11 && { borderRight: '1px solid var(--border)' }),
                      }}
                    >
                      {w}
                    </th>
                  )
                })
              )}
              <th style={stickyRightTh(STICKY_RIGHT_1, '')} />
              <th style={stickyRightTh(STICKY_RIGHT_2, '')} />
              <th style={stickyRightTh(STICKY_RIGHT_3, '')} />
              <th style={stickyRightTh(STICKY_RIGHT_4, '')} />
            </tr>
          </thead>
          <tbody>
            {specialists.map((s) => (
              <tr
                key={s.id}
                onClick={() => onSelect(selectedId === s.id ? null : s.id)}
                style={{
                  background: selectedId === s.id ? 'var(--bg-elevated)' : undefined,
                  cursor: 'pointer',
                }}
              >
                <td
                  style={{
                    ...cellStyle,
                    position: 'sticky',
                    left: STICKY_LEFT_1,
                    zIndex: 1,
                    minWidth: STICKY_WIDTH_1,
                    background: rowBg(s),
                    boxShadow: '2px 0 4px rgba(0,0,0,0.2)',
                  }}
                >
                  {s.name}
                </td>
                <td
                  style={{
                    ...cellStyle,
                    position: 'sticky',
                    left: STICKY_LEFT_2,
                    zIndex: 1,
                    minWidth: STICKY_WIDTH_2,
                    background: rowBg(s),
                    boxShadow: '2px 0 4px rgba(0,0,0,0.2)',
                  }}
                >
                  {s.department} / {s.skill}
                </td>
                {s.periods.map((h, i) => (
                  <td
                    key={i}
                    style={{
                      ...cellStyle,
                      background: scrollZoneMonthBg(i),
                      borderLeft: '1px solid var(--border)',
                      ...(i === 11 && { borderRight: '1px solid var(--border)' }),
                    }}
                  >
                    {h}
                  </td>
                ))}
                <td style={stickyRightTd(STICKY_RIGHT_1, W_TOTAL, rowBg(s))}>{s.metrics.total}</td>
                <td style={stickyRightTd(STICKY_RIGHT_2, W_STATUS, rowBg(s))}>
                  <StatusBadge kind={s.metrics.status.kind} label={s.metrics.status.label} />
                </td>
                <td style={stickyRightTd(STICKY_RIGHT_3, W_EXPLANATION, rowBg(s))}>
                  <ExplanationCell metrics={s.metrics} />
                </td>
                <td style={stickyRightTd(STICKY_RIGHT_4, W_PRIORITY, rowBg(s))}>
                  {s.metrics.priorityScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
