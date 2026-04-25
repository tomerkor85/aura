'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useStaggerReveal } from '../hooks/useScrollReveal'

interface CardData {
  title: string
  category: string
  gradient: string
  height: number
}

// 3 columns, 2 cards each — col 1: tall+short, col 2: short+tall, col 3: medium+medium
const PORTFOLIO_COLS: CardData[][] = [
  [
    {
      title: 'קמפיין אופנה — עונת קיץ',
      category: 'AI Portrait',
      gradient: 'linear-gradient(135deg, #2C2520 0%, #5C3D28 50%, #3D2A1A 100%)',
      height: 360,
    },
    {
      title: 'זהות ויזואלית — מסעדה',
      category: 'זהות מותגית',
      gradient: 'linear-gradient(135deg, #1A1814 0%, #A0622E 100%)',
      height: 240,
    },
  ],
  [
    {
      title: 'תמונות מוצר — קוסמטיקה',
      category: 'תמונות מוצר',
      gradient: 'linear-gradient(135deg, #5C3D28 0%, #C89060 60%, #2C2520 100%)',
      height: 240,
    },
    {
      title: 'סרטון פרסום — אפליקציית טכנולוגיה',
      category: 'סרטוני AI',
      gradient: 'linear-gradient(135deg, #2C2520 0%, #A0622E 40%, #1A1814 100%)',
      height: 360,
    },
  ],
  [
    {
      title: 'קטלוג דיגיטלי — בוטיק עיצוב',
      category: 'תוכן סושיאל',
      gradient: 'linear-gradient(160deg, #3D2A1A 0%, #D4B89A 80%, #5C3D28 100%)',
      height: 300,
    },
    {
      title: 'פרסומת — מותג ספורט',
      category: 'פרסומות',
      gradient: 'linear-gradient(160deg, #1A1814 0%, #5C3D28 50%, #A0622E 100%)',
      height: 300,
    },
  ],
]

interface TiltCardProps {
  card: CardData
}

function TiltCard({ card }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    // Max ±8 degrees tilt
    rotateY.set(((x - centerX) / centerX) * 8)
    rotateX.set(-((y - centerY) / centerY) * 8)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div
      style={{ height: card.height, perspective: '1000px', flexShrink: 0 }}
      data-reveal
    >
      <motion.div
        ref={cardRef}
        className="portfolio-card"
        style={{
          width: '100%',
          height: '100%',
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.03 }}
        transition={{ scale: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }}
      >
        <div className="portfolio-card-inner" style={{ width: '100%', height: '100%' }}>
          {/* Gradient background */}
          <div
            className="portfolio-card-bg"
            style={{ background: card.gradient }}
          />

          {/* Hover amber overlay */}
          <div className="portfolio-card-overlay" />

          {/* Category badge */}
          <span className="portfolio-card-badge" aria-label={`קטגוריה: ${card.category}`}>
            {card.category}
          </span>

          {/* Slide-up info */}
          <div className="portfolio-card-info">
            <p className="portfolio-card-title">{card.title}</p>
            <p className="portfolio-card-cat">{card.category}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function PortfolioSection() {
  const containerRef = useStaggerReveal<HTMLDivElement>(120, 0.1)

  return (
    <section
      id="portfolio"
      className="portfolio-section section"
      aria-label="פורטפוליו נבחר"
    >
      <div className="content-container">
        {/* Header */}
        <header className="portfolio-header">
          <span className="portfolio-eyebrow">פורטפוליו נבחר</span>
          <h2 className="portfolio-headline">העבודות שלי</h2>
        </header>

        {/* Masonry grid — 3 columns with varying heights */}
        <div
          ref={containerRef}
          className="portfolio-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
          role="list"
          aria-label="גלריית עבודות"
        >
          {PORTFOLIO_COLS.map((col, colIndex) => (
            <div
              key={colIndex}
              className="portfolio-col"
              role="listitem"
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              {col.map((card, cardIndex) => (
                <TiltCard key={`${colIndex}-${cardIndex}`} card={card} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
