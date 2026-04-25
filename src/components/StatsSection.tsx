'use client'
import { useCountUp } from '../hooks/useCountUp'

const STATS = [
  { target: 50, suffix: '+', label: 'לקוחות מרוצים' },
  { target: 200, suffix: '+', label: 'פרויקטים שהושלמו' },
  { target: 3, suffix: '', label: 'שנות ניסיון' },
  { target: 100, suffix: '%', label: 'AI Generated' },
]

interface StatItemProps {
  target: number
  suffix: string
  label: string
  animDelay: number
}

function StatItem({ target, suffix, label, animDelay }: StatItemProps) {
  const [displayValue, ref] = useCountUp(target, 2000, suffix)

  return (
    <div className="stat-item">
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className="stat-number"
        style={{ animationDelay: `${animDelay}s` }}
        aria-label={`${target}${suffix} ${label}`}
      >
        {displayValue}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section
      className="stats-section section"
      aria-label="נתונים ומספרים"
    >
      <div className="content-container">
        <div className="stats-grid" role="list">
          {STATS.map((stat, i) => (
            <div key={i} role="listitem">
              <StatItem
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                animDelay={i * 0.4}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
