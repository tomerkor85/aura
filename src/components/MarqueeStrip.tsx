const MARQUEE_ITEMS = [
  'תמונות AI',
  'סרטוני AI',
  'פרסומות',
  'תמונות מוצר',
  'זהות מותגית',
  'קמפיינים',
  'AI Portrait',
  'תוכן סושיאל',
]

export default function MarqueeStrip() {
  // Duplicate items for seamless infinite loop
  const allItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div className="marquee-strip section" aria-label="תחומי עיסוק" role="marquee">
      <div className="marquee-track" aria-hidden="true">
        {allItems.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
            <span className="marquee-item">{item}</span>
            <span className="marquee-sep" aria-hidden="true">●</span>
          </span>
        ))}
      </div>
    </div>
  )
}
