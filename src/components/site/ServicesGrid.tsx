import { SiteContent, ServiceCard } from '@/types/content'

function BgImage({ card }: { card: ServiceCard }) {
  if (!card.imageUrl) return null
  return (
    <div
      className="absolute inset-0 bg-cover bg-center rounded-xl"
      style={{
        backgroundImage: `url(${card.imageUrl})`,
        opacity: card.backgroundOpacity ?? 1,
      }}
      aria-hidden="true"
    />
  )
}

function CardLarge({ card }: { card: ServiceCard }) {
  return (
    <div className="md:col-span-8 rounded-xl p-10 flex flex-col justify-between group hover:brightness-110 transition-all duration-500 overflow-hidden relative bg-surface/30 border border-white/10 min-h-[280px]">
      <BgImage card={card} />
      {/* Dark scrim so text stays readable over any bg image */}
      {card.imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-l from-surface/42 to-surface/18 rounded-xl" />
      )}
      {!card.imageUrl && (
        <div className="absolute -bottom-10 -left-10 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
          <span className="material-symbols-outlined text-[20rem]">diamond</span>
        </div>
      )}
      <div className="relative z-10">
        {card.icon && (
          <span className="material-symbols-outlined text-5xl text-primary mb-6 block">{card.icon}</span>
        )}
        <h4 className="font-headline text-4xl font-bold mb-4">{card.title}</h4>
        <p className="font-body text-stone-400 max-w-md">{card.description}</p>
      </div>
    </div>
  )
}

function CardSmallAccent({ card }: { card: ServiceCard }) {
  return (
    <div className="md:col-span-4 bg-primary-container/86 border border-primary/25 rounded-xl p-10 flex flex-col justify-end text-on-primary-container relative overflow-hidden min-h-[240px]">
      <BgImage card={card} />
      {card.imageUrl && (
        <div className="absolute inset-0 bg-primary-container/30 rounded-xl" />
      )}
      {card.icon && (
        <div className="absolute top-0 right-0 p-10 opacity-50 z-10">
          <span className="material-symbols-outlined text-6xl">{card.icon}</span>
        </div>
      )}
      <div className="relative z-10">
        <h4 className="font-headline text-3xl font-bold mb-4">{card.title}</h4>
        <p className="font-body opacity-80">{card.description}</p>
      </div>
    </div>
  )
}

function CardSmallMuted({ card }: { card: ServiceCard }) {
  return (
    <div className="md:col-span-4 bg-surface/28 rounded-xl border border-outline-variant/20 p-10 flex flex-col items-center text-center justify-center gap-6 relative overflow-hidden min-h-[240px]">
      <BgImage card={card} />
      {card.imageUrl && (
        <div className="absolute inset-0 bg-surface/34 rounded-xl" />
      )}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {card.icon && (
          <span className="material-symbols-outlined text-5xl text-secondary">{card.icon}</span>
        )}
        <h4 className="font-headline text-2xl font-bold">{card.title}</h4>
        <p className="font-body text-sm text-stone-500">{card.description}</p>
      </div>
    </div>
  )
}

export default function ServicesGrid({ services }: { services: SiteContent['services'] }) {
  return (
    <section className="py-32 bg-surface/50" id="services">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="mb-20 text-center">
          <h2 className="font-headline text-5xl md:text-6xl font-bold mb-4">{services.title}</h2>
          <p className="font-body text-stone-500 max-w-xl mx-auto">{services.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {services.cards.map((card) => {
            if (card.layout === 'large') return <CardLarge key={card.id} card={card} />
            if (card.variant === 'accent') return <CardSmallAccent key={card.id} card={card} />
            return <CardSmallMuted key={card.id} card={card} />
          })}
        </div>
      </div>
    </section>
  )
}
