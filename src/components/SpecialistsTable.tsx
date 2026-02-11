import type { SpecialistWithMetrics } from '../types/overtime'
import { getPeriodConfig } from '../lib/periodData'
import type { PeriodMode } from '../types/overtime'
import { StatusBadge } from './StatusBadge'
import { ExplanationCell } from './ExplanationCell'

interface SpecialistsTableProps {
  specialists: SpecialistWithMetrics[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  periodMode: PeriodMode
}

const cellStyle: React.CSSProperties = {
  padding: '0.5rem 0.75rem',
  borderBottom: '1px solid var(--border)',
  fontSize: '0.875rem',
}

const thStyle: React.CSSProperties = {
  ...cellStyle,
  boxSizing: 'border-box',
  textAlign: 'left',
  fontWeight: 600,
  color: 'var(--text-muted)',
  background: 'var(--bg-card)',
}

const STICKY_LEFT_1 = 0
const STICKY_WIDTH_1 = 120
const STICKY_LEFT_2 = STICKY_WIDTH_1
const STICKY_WIDTH_2 = 180

const W_TOTAL = 70
const W_STATUS = 160
const W_EXPLANATION = 200
const STICKY_RIGHT_1 = W_EXPLANATION + W_STATUS
const STICKY_RIGHT_2 = W_EXPLANATION
const STICKY_RIGHT_3 = 0

/** Высота первой строки thead */
const THEAD_FIRST_ROW_HEIGHT = 48
/** Высота вспомогательных строк thead (недели/дни) */
const THEAD_SUBROW_HEIGHT = 32
const FIXED_ROW_HEIGHT = 40

const stickyRightTh = (right: number, width: number): React.CSSProperties => ({
  ...thStyle,
  position: 'sticky',
  right,
  zIndex: 2,
  width,
  minWidth: width,
  height: THEAD_FIRST_ROW_HEIGHT,
  minHeight: THEAD_FIRST_ROW_HEIGHT,
  boxSizing: 'border-box',
  background: 'var(--bg-card)',
  boxShadow: '-2px 0 4px rgba(0,0,0,0.2)',
})

const stickyRightThSubrow = (right: number, width: number): React.CSSProperties => ({
  ...thStyle,
  position: 'sticky',
  right,
  zIndex: 2,
  width,
  minWidth: width,
  height: THEAD_SUBROW_HEIGHT,
  minHeight: THEAD_SUBROW_HEIGHT,
  padding: '0.25rem 0.75rem',
  lineHeight: 1,
  boxSizing: 'border-box',
  background: 'var(--bg-card)',
  boxShadow: '-2px 0 4px rgba(0,0,0,0.2)',
  borderBottom: '1px solid var(--border)',
})

const stickyRightTd = (right: number, width: number, bg: string): React.CSSProperties => ({
  ...cellStyle,
  position: 'sticky',
  right,
  zIndex: 1,
  width,
  minWidth: width,
  height: FIXED_ROW_HEIGHT,
  maxHeight: FIXED_ROW_HEIGHT,
  verticalAlign: 'middle',
  overflow: 'hidden',
  boxSizing: 'border-box',
  background: bg,
  boxShadow: '-2px 0 4px rgba(0,0,0,0.2)',
})

export function SpecialistsTable({ specialists, selectedId, onSelect, periodMode }: SpecialistsTableProps) {
  const config = getPeriodConfig(periodMode)
  const labels = config.labels
  const groups = config.groups
  const lastColIndex = labels.length - 1

  const rowBg = (s: SpecialistWithMetrics) =>
    selectedId === s.id ? 'var(--bg-elevated)' : 'var(--bg-page)'

  return (
    <div style={{ padding: '1rem 2rem' }}>
      <div style={{ overflowX: 'auto', margin: '0 -2rem', padding: '0 2rem' }}>
        <table style={{ width: 'max-content', minWidth: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ height: THEAD_FIRST_ROW_HEIGHT }}>
                <th
                  style={{
                    ...thStyle,
                    height: THEAD_FIRST_ROW_HEIGHT,
                    minHeight: THEAD_FIRST_ROW_HEIGHT,
                    boxSizing: 'border-box',
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
                    height: THEAD_FIRST_ROW_HEIGHT,
                    minHeight: THEAD_FIRST_ROW_HEIGHT,
                    boxSizing: 'border-box',
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
                {groups ? (
                  groups.map(({ month, count }, monthIdx) => (
                    <th
                      key={month}
                      colSpan={count}
                      style={{
                        ...thStyle,
                        height: THEAD_FIRST_ROW_HEIGHT,
                        minHeight: THEAD_FIRST_ROW_HEIGHT,
                        boxSizing: 'border-box',
                        minWidth: periodMode === 'days' ? 40 : 72 * count,
                        textAlign: 'center',
                        background: `var(--scroll-month-${monthIdx + 1})`,
                        borderLeft: '1px solid var(--border)',
                        borderRight: '1px solid var(--border)',
                      }}
                    >
                      {month}
                    </th>
                  ))
                ) : (
                  labels.map((label, i) => (
                    <th
                      key={label}
                      style={{
                        ...thStyle,
                        height: THEAD_FIRST_ROW_HEIGHT,
                        minHeight: THEAD_FIRST_ROW_HEIGHT,
                        boxSizing: 'border-box',
                        minWidth: 72,
                        textAlign: 'center',
                        background: config.getMonthBg(i),
                        borderLeft: '1px solid var(--border)',
                        ...(i === lastColIndex && { borderRight: '1px solid var(--border)' }),
                      }}
                    >
                      {label}
                    </th>
                  ))
                )}
                <th style={stickyRightTh(STICKY_RIGHT_1, W_TOTAL)}>Всего</th>
                <th data-tour="column-status" style={stickyRightTh(STICKY_RIGHT_2, W_STATUS)}>Статус</th>
                <th data-tour="column-explanation" style={stickyRightTh(STICKY_RIGHT_3, W_EXPLANATION)}>Объяснение</th>
              </tr>
              {groups && periodMode === 'weeks' && (
                <tr style={{ height: THEAD_SUBROW_HEIGHT }}>
                  <th
                    style={{
                      ...thStyle,
                      height: THEAD_SUBROW_HEIGHT,
                      minHeight: THEAD_SUBROW_HEIGHT,
                      padding: '0.25rem 0.75rem',
                      lineHeight: 1,
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
                      height: THEAD_SUBROW_HEIGHT,
                      minHeight: THEAD_SUBROW_HEIGHT,
                      padding: '0.25rem 0.75rem',
                      lineHeight: 1,
                      position: 'sticky',
                      left: STICKY_LEFT_2,
                      zIndex: 2,
                      minWidth: STICKY_WIDTH_2,
                      background: 'var(--bg-card)',
                      boxShadow: '2px 0 4px rgba(0,0,0,0.2)',
                    }}
                  />
                  {labels.map((_, i) => (
                    <th
                      key={i}
                      style={{
                        ...thStyle,
                        height: THEAD_SUBROW_HEIGHT,
                        minHeight: THEAD_SUBROW_HEIGHT,
                        padding: '0.25rem 0.75rem',
                        lineHeight: 1,
                        minWidth: 72,
                        textAlign: 'center',
                        background: config.getMonthBg(i),
                        borderLeft: '1px solid var(--border)',
                        ...(i === lastColIndex && { borderRight: '1px solid var(--border)' }),
                      }}
                    >
                      {Math.floor(i % 4) + 1}
                    </th>
                  ))}
                  <th style={stickyRightThSubrow(STICKY_RIGHT_1, W_TOTAL)} />
                  <th style={stickyRightThSubrow(STICKY_RIGHT_2, W_STATUS)} />
                  <th style={stickyRightThSubrow(STICKY_RIGHT_3, W_EXPLANATION)} />
                </tr>
              )}
              {groups && periodMode === 'days' && (
                <tr style={{ height: THEAD_SUBROW_HEIGHT }}>
                  <th style={{ ...thStyle, height: THEAD_SUBROW_HEIGHT, minHeight: THEAD_SUBROW_HEIGHT, padding: '0.25rem 0.75rem', lineHeight: 1, position: 'sticky', left: STICKY_LEFT_1, zIndex: 2, minWidth: STICKY_WIDTH_1, background: 'var(--bg-card)', boxShadow: '2px 0 4px rgba(0,0,0,0.2)' }} />
                  <th style={{ ...thStyle, height: THEAD_SUBROW_HEIGHT, minHeight: THEAD_SUBROW_HEIGHT, padding: '0.25rem 0.75rem', lineHeight: 1, position: 'sticky', left: STICKY_LEFT_2, zIndex: 2, minWidth: STICKY_WIDTH_2, background: 'var(--bg-card)', boxShadow: '2px 0 4px rgba(0,0,0,0.2)' }} />
                  {labels.map((label, i) => (
                    <th
                      key={i}
                      style={{
                        ...thStyle,
                        height: THEAD_SUBROW_HEIGHT,
                        minHeight: THEAD_SUBROW_HEIGHT,
                        padding: '0.25rem 0.75rem',
                        lineHeight: 1,
                        minWidth: 40,
                        textAlign: 'center',
                        fontSize: '0.7rem',
                        background: config.getMonthBg(i),
                        borderLeft: '1px solid var(--border)',
                        ...(i === lastColIndex && { borderRight: '1px solid var(--border)' }),
                      }}
                    >
                      {label.split(' ')[1] ?? label}
                    </th>
                  ))}
                  <th style={stickyRightThSubrow(STICKY_RIGHT_1, W_TOTAL)} />
                  <th style={stickyRightThSubrow(STICKY_RIGHT_2, W_STATUS)} />
                  <th style={stickyRightThSubrow(STICKY_RIGHT_3, W_EXPLANATION)} />
                </tr>
              )}
            </thead>
            <tbody>
              {specialists.map((s) => {
                const values = config.getValues(s)
                return (
                  <tr
                    key={s.id}
                    onClick={() => onSelect(selectedId === s.id ? null : s.id)}
                    style={{
                      height: FIXED_ROW_HEIGHT,
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
                    {values.map((h, i) => (
                      <td
                        key={i}
                        style={{
                          ...cellStyle,
                          minWidth: periodMode === 'days' ? 40 : 72,
                          background: config.getMonthBg(i),
                          borderLeft: '1px solid var(--border)',
                          ...(i === lastColIndex && { borderRight: '1px solid var(--border)' }),
                        }}
                      >
                        {periodMode === 'days' ? (h > 0 ? h.toFixed(1) : '—') : h}
                      </td>
                    ))}
                    <td style={stickyRightTd(STICKY_RIGHT_1, W_TOTAL, rowBg(s))}>{s.metrics.total}</td>
                    <td style={stickyRightTd(STICKY_RIGHT_2, W_STATUS, rowBg(s))}>
                      <StatusBadge kind={s.metrics.status.kind} label={s.metrics.status.label} />
                    </td>
                    <td style={stickyRightTd(STICKY_RIGHT_3, W_EXPLANATION, rowBg(s))}>
                      <ExplanationCell metrics={s.metrics} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
      </div>
    </div>
  )
}
