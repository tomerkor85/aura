import { SiteContent } from '@/types/content'

export default function SolutionSection({ solution }: { solution: SiteContent['solution'] }) {
  return (
    <section className="py-32 relative">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="bg-surface-container-highest rounded-[2rem] p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="relative z-10 grid md:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center">
              <h3 className="font-headline text-4xl md:text-5xl font-bold mb-8">
                {solution.title}
              </h3>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-10">
                {solution.description}
              </p>
              <ul className="space-y-6">
                {solution.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary">{bullet.icon}</span>
                    <span className="font-body">{bullet.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full animate-pulse" />
              <div className="absolute inset-8 border border-primary/20 rounded-full" />
              <img
                src={solution.imageUrl}
                alt="AI creative solution"
                className="w-full h-full object-cover rounded-full p-12"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
