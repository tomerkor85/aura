import { SiteContent } from '@/types/content'
import FloatingCardsHero from './FloatingCardsHero'

function HeroContent({ hero }: { hero: SiteContent['hero'] }) {
  return (
    <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full flex flex-col items-start md:items-center text-right md:text-center">
      <span className="text-primary font-body uppercase tracking-[0.4em] text-xs font-semibold mb-6">
        {hero.badge}
      </span>
      <h1 className="font-headline text-6xl md:text-9xl font-extrabold tracking-tighter text-on-background mb-8 leading-[0.9] text-glow">
        {hero.title}{' '}
        <span className="italic font-light text-primary">{hero.titleItalic}</span>
      </h1>
      <p className="font-headline text-2xl md:text-4xl text-secondary-fixed max-w-3xl leading-relaxed mb-12 opacity-90">
        {hero.subtitle}
      </p>
      <a
        href="#contact"
        className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-10 py-4 rounded-full font-body font-bold text-lg hover:brightness-110 transition-all inline-block"
      >
        {hero.ctaButton}
      </a>
    </div>
  )
}

function ScrollHint() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30 z-10">
      <span className="material-symbols-outlined text-4xl animate-bounce">expand_more</span>
    </div>
  )
}

export default function HeroSection({ hero }: { hero: SiteContent['hero'] }) {
  const base = 'relative w-full min-h-screen flex items-center justify-center overflow-hidden'
  const opacity = hero.backgroundOpacity ?? 0.5

  if (hero.layoutMode === 'image-bg' && hero.backgroundImage) {
    return (
      <section className={base}>
        <img
          src={hero.backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-surface/40 to-surface/80" />
        <HeroContent hero={hero} />
        <ScrollHint />
      </section>
    )
  }

  if (hero.layoutMode === 'video-bg' && hero.backgroundVideo) {
    return (
      <section className={base}>
        <video
          src={hero.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-surface/40 to-surface/80" />
        <HeroContent hero={hero} />
        <ScrollHint />
      </section>
    )
  }

  if (hero.layoutMode === 'image-grid' && hero.gridImages.length > 0) {
    return (
      <section className={base}>
        {/* Masonry grid — images maintain natural height (not equal boxes) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ opacity }}
          aria-hidden="true"
        >
          <div
            style={{
              columnCount: 3,
              columnGap: '4px',
              padding: '4px',
            }}
          >
            {hero.gridImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                style={{
                  display: 'block',
                  width: '100%',
                  marginBottom: '4px',
                  breakInside: 'avoid',
                }}
              />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-surface/70 via-surface/50 to-surface/90" />
        <HeroContent hero={hero} />
        <ScrollHint />
      </section>
    )
  }

  if (hero.layoutMode === 'floating-cards') {
    return <FloatingCardsHero hero={hero} />
  }

  // Default: text-only
  return (
    <section className={`${base} hero-gradient`}>
      <HeroContent hero={hero} />
      <ScrollHint />
    </section>
  )
}
