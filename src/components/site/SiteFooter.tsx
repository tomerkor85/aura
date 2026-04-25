import { SiteContent } from '@/types/content'

export default function SiteFooter({ footer }: { footer: SiteContent['footer'] }) {
  return (
    <footer className="bg-stone-950 border-t border-stone-800/30">
      <div className="max-w-screen-2xl mx-auto px-12 py-16">
        <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center mb-12">
          <div className="text-3xl font-headline italic text-stone-100 mb-8 md:mb-0">
            {footer.logo}
          </div>
          <div className="flex flex-row-reverse flex-wrap gap-x-10 gap-y-4">
            {footer.links.map((link, i) => (
              <a
                key={i}
                className="font-body text-stone-500 hover:text-orange-300 transition-all"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse justify-between items-center pt-8 border-t border-stone-900">
          <div className="font-body text-sm text-stone-600 mb-4 md:mb-0">
            {footer.copyright}
          </div>
          <div className="flex gap-4">
            <span className="text-xs font-label text-stone-700 uppercase tracking-widest">
              {footer.tagline}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
