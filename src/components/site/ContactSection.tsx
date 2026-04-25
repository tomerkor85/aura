'use client'

import { useState } from 'react'
import { SiteContent } from '@/types/content'

export default function ContactSection({ contact }: { contact: SiteContent['contact'] }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    // Simple simulation — replace with real email API if needed
    await new Promise((r) => setTimeout(r, 800))
    setStatus('done')
  }

  return (
    <section className="py-32 bg-surface" id="contact">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-24">
          <div className="flex flex-col justify-center">
            <h2 className="font-headline text-5xl md:text-7xl font-bold mb-8">
              {contact.title}{' '}
              <span className="italic text-primary">{contact.titleHighlight}</span>
            </h2>
            <p className="font-body text-xl text-stone-400 mb-12 leading-loose">
              {contact.description}
            </p>
            <div className="flex flex-col gap-6 mb-12">
              <a
                className="flex items-center gap-4 group"
                href={`https://wa.me/${contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <svg className="w-6 h-6 fill-primary group-hover:fill-on-primary transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-sm font-label text-stone-500 uppercase tracking-widest">
                    {contact.whatsappStatus}
                  </span>
                  <span className="text-xl font-body font-semibold">{contact.whatsappLabel}</span>
                </div>
              </a>

              {contact.locations.length > 0 && (
                <div className="flex flex-col gap-3">
                  {contact.locations.map((loc, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary mt-0.5">location_on</span>
                      <div>
                        <span className="block font-body font-semibold">{loc.city}</span>
                        <span className="block font-body text-stone-400 text-sm">{loc.address}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-4 items-center">
                {contact.socialLinks.instagram && contact.socialLinks.instagram !== '#' && (
                  <a
                    className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-stone-100 hover:text-stone-900 transition-all duration-300"
                    href={contact.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                )}
                {contact.socialLinks.linkedin && contact.socialLinks.linkedin !== '#' && (
                  <a
                    className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-stone-100 hover:text-stone-900 transition-all duration-300"
                    href={contact.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
                {contact.socialLinks.behance && contact.socialLinks.behance !== '#' && (
                  <a
                    className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-stone-100 hover:text-stone-900 transition-all duration-300"
                    href={contact.socialLinks.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="font-headline font-bold text-xs">Be</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-surface-container-low p-8 md:p-12 rounded-3xl border border-outline-variant/20 shadow-2xl relative z-10">
              {status === 'done' ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
                  <span className="material-symbols-outlined text-primary text-6xl">check_circle</span>
                  <p className="font-headline text-2xl">תודה! נחזור אליכם בקרוב.</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-label text-xs uppercase tracking-widest text-stone-500" htmlFor="name">
                        שם מלא
                      </label>
                      <input
                        className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-on-surface"
                        id="name"
                        placeholder="השם שלך"
                        type="text"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-label text-xs uppercase tracking-widest text-stone-500" htmlFor="email">
                        דוא&quot;ל
                      </label>
                      <input
                        className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-on-surface"
                        id="email"
                        placeholder="example@domain.com"
                        type="email"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label text-xs uppercase tracking-widest text-stone-500" htmlFor="subject">
                      נושא הפנייה
                    </label>
                    <select
                      className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-on-surface appearance-none"
                      id="subject"
                    >
                      {contact.formSubjects.map((subject, i) => (
                        <option key={i}>{subject}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label text-xs uppercase tracking-widest text-stone-500" htmlFor="message">
                      הודעה
                    </label>
                    <textarea
                      className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-on-surface h-32"
                      id="message"
                      placeholder="ספרו לנו קצת על הפרויקט..."
                    />
                  </div>
                  <button
                    className="w-full bg-primary text-on-primary py-4 rounded-xl font-body font-bold text-lg hover:brightness-110 transition-all flex items-center justify-center gap-3 disabled:opacity-60"
                    type="submit"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'שולח...' : contact.submitButton}
                    {status !== 'sending' && (
                      <span className="material-symbols-outlined">send</span>
                    )}
                  </button>
                </form>
              )}
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-0" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-0" />
          </div>
        </div>
      </div>
    </section>
  )
}
