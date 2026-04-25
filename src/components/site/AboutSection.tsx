import { SiteContent } from '@/types/content'

export default function AboutSection({ about }: { about: SiteContent['about'] }) {
  return (
    <section className="py-32 bg-surface/44" id="about">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="flex flex-col md:flex-row-reverse gap-20 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="font-body text-xs uppercase tracking-[0.5em] text-primary mb-6">
              {about.badge}
            </h2>
            <h3 className="font-headline text-5xl md:text-7xl font-bold mb-10 leading-tight">
              {about.title}{' '}
              <span className="italic font-light">{about.titleItalic}</span>
            </h3>
            <p className="font-body text-xl text-stone-400 leading-loose mb-10">
              {about.description}
            </p>
            <div className="p-8 border border-outline-variant/20 rounded-xl bg-surface/18">
              <p className="font-headline italic text-2xl text-on-surface mb-4">
                &ldquo;{about.quote}&rdquo;
              </p>
              <span className="font-body font-bold text-primary">{about.quoteAuthor}</span>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-[3/4] rounded-full overflow-hidden border-[16px] border-surface-container-high shadow-2xl">
              <img
                src={about.imageUrl}
                alt="Creative Director portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
