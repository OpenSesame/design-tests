const PAD = { top: 16, right: 16, bottom: 28, left: 36 }
const VIEW_W = 340
const VIEW_H = 160
const CHART_W = VIEW_W - PAD.left - PAD.right
const CHART_H = VIEW_H - PAD.top - PAD.bottom

function smoothPath(points, minVal, maxVal) {
  const n = points.length
  const xStep = CHART_W / (n - 1)

  const pts = points.map((v, i) => ({
    x: PAD.left + i * xStep,
    y: PAD.top + CHART_H - ((v - minVal) / (maxVal - minVal)) * CHART_H,
  }))

  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < n - 1; i++) {
    const cp1x = pts[i].x + xStep * 0.45
    const cp1y = pts[i].y
    const cp2x = pts[i + 1].x - xStep * 0.45
    const cp2y = pts[i + 1].y
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pts[i + 1].x} ${pts[i + 1].y}`
  }
  return { d, pts }
}

function areaPath(pts, minY) {
  const first = pts[0]
  const last = pts[pts.length - 1]
  const n = pts.length
  const xStep = CHART_W / (n - 1)

  let d = `M ${first.x} ${minY}`
  d += ` L ${first.x} ${first.y}`
  for (let i = 0; i < n - 1; i++) {
    const cp1x = pts[i].x + xStep * 0.45
    const cp2x = pts[i + 1].x - xStep * 0.45
    d += ` C ${cp1x} ${pts[i].y}, ${cp2x} ${pts[i + 1].y}, ${pts[i + 1].x} ${pts[i + 1].y}`
  }
  d += ` L ${last.x} ${minY} Z`
  return d
}

export default function CapabilityVelocityChart({ data }) {
  const values = data.map(d => d.score)
  const minVal = 55
  const maxVal = 82
  const { d: linePath, pts } = smoothPath(values, minVal, maxVal)
  const bottomY = PAD.top + CHART_H
  const area = areaPath(pts, bottomY)

  const yTicks = [60, 70, 80]

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Y-axis grid lines + labels */}
      {yTicks.map(tick => {
        const y = PAD.top + CHART_H - ((tick - minVal) / (maxVal - minVal)) * CHART_H
        return (
          <g key={tick}>
            <line
              x1={PAD.left} y1={y} x2={PAD.left + CHART_W} y2={y}
              stroke="var(--outline-tertiary)" strokeWidth="1"
            />
            <text
              x={PAD.left - 6} y={y + 4}
              textAnchor="end"
              fontSize="10"
              fill="var(--text-hint)"
              fontFamily="Poppins, Arial, sans-serif"
            >
              {tick}
            </text>
          </g>
        )
      })}

      {/* Area fill */}
      <path d={area} fill="url(#velocityGrad)" />

      {/* Line */}
      <path d={linePath} fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Data points */}
      {pts.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill="var(--brand)" />
      ))}

      {/* X-axis labels */}
      {data.map((d, i) => (
        <text
          key={i}
          x={PAD.left + i * (CHART_W / (data.length - 1))}
          y={VIEW_H - 6}
          textAnchor="middle"
          fontSize="10"
          fill="var(--text-hint)"
          fontFamily="Poppins, Arial, sans-serif"
        >
          {d.month}
        </text>
      ))}
    </svg>
  )
}
