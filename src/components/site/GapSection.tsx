import { SiteContent } from '@/types/content'

export default function GapSection({ gap }: { gap: SiteContent['gap'] }) {
  return (
    <section className="py-32 bg-surface-container-low/85 backdrop-blur-md overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img
                src={gap.imageUrl}
                alt="Brand identity portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-surface-container-highest rounded-xl p-8 backdrop-blur-3xl border border-outline-variant/20 hidden md:block">
              <div className="flex flex-col gap-4">
                <span className="material-symbols-outlined text-primary text-4xl">analytics</span>
                <p className="font-body text-sm leading-relaxed text-on-surface-variant">
                  {gap.floatingCardText}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h2 className="font-headline text-5xl md:text-7xl font-bold leading-tight">
              {gap.heading}{' '}
              <span className="italic text-primary">{gap.headingHighlight}</span>{' '}
              {gap.headingSuffix}
            </h2>
            <p className="font-body text-xl text-stone-400 leading-loose max-w-xl">
              {gap.description}
            </p>
            <div className="w-full h-[1px] bg-outline-variant/30" />
            <div className="flex gap-12">
              {gap.stats.map((stat, i) => (
                <div key={i}>
                  <span className="block text-4xl font-headline text-primary mb-2">
                    {stat.value}
                  </span>
                  <span className="text-sm font-label uppercase tracking-widest text-stone-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
