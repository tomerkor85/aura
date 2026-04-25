'use client'

import { useEffect, useState } from 'react'
import { SiteContent, ServiceCard, HeroLayoutMode } from '@/types/content'

const SECTIONS = ['nav', 'hero', 'gap', 'solution', 'services', 'about', 'contact', 'footer'] as const
type Section = typeof SECTIONS[number]

const SECTION_LABELS: Record<Section, string> = {
  nav: 'ניווט',
  hero: 'Hero',
  gap: 'הפער',
  solution: 'הפתרון',
  services: 'שירותים',
  about: 'אודות',
  contact: 'צור קשר',
  footer: 'פוטר',
}

/* ─── Reusable primitives ───────────────────────────────────────── */

function Field({
  label,
  value,
  onChange,
  multiline = false,
  dir = 'rtl',
  placeholder = '',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  dir?: string
  placeholder?: string
}) {
  const cls =
    'w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500 transition-colors'
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea className={cls + ' h-24 resize-y'} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} dir={dir} />
      ) : (
        <input className={cls} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} dir={dir} />
      )}
    </div>
  )
}

function NumberField({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">{label}</label>
        <span className="text-xs text-amber-400 font-mono">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-amber-500"
      />
      <div className="flex justify-between text-xs text-zinc-600">
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6 space-y-5">
      <h3 className="text-lg font-bold text-amber-400">{title}</h3>
      {children}
    </div>
  )
}

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">{label}</label>
      <select
        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500"
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

/* ─── Main page ─────────────────────────────────────────────────── */

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [content, setContent] = useState<SiteContent | null>(null)
  const [activeSection, setActiveSection] = useState<Section>('hero')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('aura_admin_pwd')
    if (saved) { setPassword(saved); tryAuth(saved) }
  }, [])

  async function tryAuth(pwd: string) {
    const res = await fetch('/api/content')
    if (!res.ok) { setAuthError('שגיאה בטעינה'); return }
    const data = await res.json()
    const check = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pwd, content: data }),
    })
    if (check.ok) {
      setContent(data)
      setAuthed(true)
      localStorage.setItem('aura_admin_pwd', pwd)
    } else {
      setAuthError('סיסמה שגויה')
      localStorage.removeItem('aura_admin_pwd')
    }
  }

  async function handleSave() {
    if (!content) return
    setSaving(true); setSaveMsg('')
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, content }),
    })
    setSaving(false)
    setSaveMsg(res.ok ? 'נשמר בהצלחה!' : 'שגיאה בשמירה')
    setTimeout(() => setSaveMsg(''), 3000)
  }

  function update<K extends keyof SiteContent>(section: K, value: SiteContent[K]) {
    setContent((prev) => prev ? { ...prev, [section]: value } : prev)
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center" dir="rtl">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-amber-400 font-serif">Aura Admin</h1>
            <p className="text-zinc-500 text-sm mt-2">הזינו סיסמת מנהל</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500"
              placeholder="סיסמה"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setAuthError('') }}
              onKeyDown={(e) => e.key === 'Enter' && tryAuth(password)}
            />
            {authError && <p className="text-red-400 text-sm text-center">{authError}</p>}
            <button className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-lg transition-colors" onClick={() => tryAuth(password)}>
              כניסה
            </button>
          </div>
          <p className="text-zinc-600 text-xs text-center">ברירת מחדל: aura2024</p>
        </div>
      </div>
    )
  }

  if (!content) return null

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100" dir="rtl">
      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-amber-400">Aura Admin</h1>
          <a href="/" target="_blank" className="text-xs text-zinc-500 hover:text-zinc-300 underline underline-offset-2">צפה באתר ↗</a>
        </div>
        <div className="flex items-center gap-3">
          {saveMsg && (
            <span className={`text-sm ${saveMsg.includes('שגיאה') ? 'text-red-400' : 'text-green-400'}`}>{saveMsg}</span>
          )}
          <button
            className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold px-6 py-2 rounded-lg text-sm transition-colors"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'שומר...' : 'שמור שינויים'}
          </button>
          <button className="text-zinc-500 hover:text-zinc-300 text-sm px-3 py-2"
            onClick={() => { localStorage.removeItem('aura_admin_pwd'); setAuthed(false) }}>
            יציאה
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 shrink-0 sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto border-l border-zinc-800 bg-zinc-900/50">
          <nav className="p-3 space-y-1">
            {SECTIONS.map((s) => (
              <button
                key={s}
                className={`w-full text-right px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === s ? 'bg-amber-600/20 text-amber-400' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
                }`}
                onClick={() => setActiveSection(s)}
              >
                {SECTION_LABELS[s]}
              </button>
            ))}
          </nav>
        </div>

        {/* Editor area */}
        <div className="flex-1 p-8 space-y-6 max-w-3xl">
          {activeSection === 'nav'      && <NavEditor      nav={content.nav}           onChange={(v) => update('nav', v)} />}
          {activeSection === 'hero'     && <HeroEditor     hero={content.hero}          onChange={(v) => update('hero', v)} />}
          {activeSection === 'gap'      && <GapEditor      gap={content.gap}            onChange={(v) => update('gap', v)} />}
          {activeSection === 'solution' && <SolutionEditor solution={content.solution}  onChange={(v) => update('solution', v)} />}
          {activeSection === 'services' && <ServicesEditor services={content.services}  onChange={(v) => update('services', v)} />}
          {activeSection === 'about'    && <AboutEditor    about={content.about}        onChange={(v) => update('about', v)} />}
          {activeSection === 'contact'  && <ContactEditor  contact={content.contact}    onChange={(v) => update('contact', v)} />}
          {activeSection === 'footer'   && <FooterEditor   footer={content.footer}      onChange={(v) => update('footer', v)} />}
        </div>
      </div>
    </div>
  )
}

/* ─── Section editors ───────────────────────────────────────────── */

function NavEditor({ nav, onChange }: { nav: SiteContent['nav']; onChange: (v: SiteContent['nav']) => void }) {
  return (
    <div className="space-y-6">
      <SectionCard title="ניווט עליון">
        <Field label="לוגו" value={nav.logo} onChange={(v) => onChange({ ...nav, logo: v })} dir="ltr" />
        <Field label="כפתור CTA" value={nav.ctaButton} onChange={(v) => onChange({ ...nav, ctaButton: v })} />
      </SectionCard>
      <SectionCard title="קישורי ניווט">
        {nav.links.map((link, i) => (
          <div key={i} className="flex gap-3 items-end">
            <div className="flex-1">
              <Field label="תווית" value={link.label} onChange={(v) => {
                const links = [...nav.links]; links[i] = { ...link, label: v }; onChange({ ...nav, links })
              }} />
            </div>
            <div className="flex-1">
              <Field label="קישור" value={link.href} onChange={(v) => {
                const links = [...nav.links]; links[i] = { ...link, href: v }; onChange({ ...nav, links })
              }} dir="ltr" />
            </div>
            <button className="mb-0.5 text-red-400 hover:text-red-300 text-xl pb-2"
              onClick={() => onChange({ ...nav, links: nav.links.filter((_, j) => j !== i) })}>×</button>
          </div>
        ))}
        <button className="text-sm text-amber-400 hover:text-amber-300 border border-amber-600/30 rounded-lg px-4 py-2"
          onClick={() => onChange({ ...nav, links: [...nav.links, { label: '', href: '#' }] })}>+ הוסף קישור</button>
      </SectionCard>
    </div>
  )
}

function HeroEditor({ hero, onChange }: { hero: SiteContent['hero']; onChange: (v: SiteContent['hero']) => void }) {
  const mode = hero.layoutMode ?? 'text-only'

  return (
    <div className="space-y-6">
      <SectionCard title="Hero — טקסט">
        <Field label="תג עליון (Badge)" value={hero.badge} onChange={(v) => onChange({ ...hero, badge: v })} dir="ltr" />
        <Field label="כותרת ראשית" value={hero.title} onChange={(v) => onChange({ ...hero, title: v })} dir="ltr" />
        <Field label="כותרת — חלק נטוי" value={hero.titleItalic} onChange={(v) => onChange({ ...hero, titleItalic: v })} dir="ltr" />
        <Field label="תת-כותרת" value={hero.subtitle} onChange={(v) => onChange({ ...hero, subtitle: v })} />
        <Field label="כפתור CTA" value={hero.ctaButton} onChange={(v) => onChange({ ...hero, ctaButton: v })} />
      </SectionCard>

      <SectionCard title="Hero — רקע">
        <SelectField<HeroLayoutMode>
          label="סוג רקע"
          value={mode}
          options={[
            { value: 'text-only',      label: 'ללא רקע (טקסט בלבד)' },
            { value: 'image-bg',       label: 'תמונת רקע בודדת' },
            { value: 'video-bg',       label: 'וידאו רקע' },
            { value: 'image-grid',     label: 'גריד תמונות (masonry)' },
            { value: 'floating-cards', label: 'קלפים צפים תלת-מימדיים' },
          ]}
          onChange={(v) => onChange({ ...hero, layoutMode: v })}
        />

        {(mode === 'image-bg' || mode === 'video-bg') && (
          <NumberField
            label="שקיפות רקע"
            value={hero.backgroundOpacity ?? 0.5}
            min={0} max={1} step={0.05}
            onChange={(v) => onChange({ ...hero, backgroundOpacity: v })}
          />
        )}

        {mode === 'image-bg' && (
          <Field label="URL תמונת רקע" value={hero.backgroundImage} onChange={(v) => onChange({ ...hero, backgroundImage: v })} dir="ltr" placeholder="https://..." />
        )}

        {mode === 'video-bg' && (
          <Field label="URL וידאו רקע" value={hero.backgroundVideo} onChange={(v) => onChange({ ...hero, backgroundVideo: v })} dir="ltr" placeholder="https://...mp4" />
        )}

        {mode === 'floating-cards' && (
          <div className="space-y-4">
            <p className="text-xs text-zinc-500">5 קלפים צפים עם אנימציית כבידה אפסית ופרלקס מאוס — הוסף/עדכן URL לכל קלף</p>
            {(hero.floatingCards ?? []).map((card, i) => (
              <div key={i} className="flex gap-3 items-center">
                <div className="flex-1">
                  <Field
                    label={`קלף ${i + 1}`}
                    value={card.src}
                    onChange={(v) => {
                      const floatingCards = [...(hero.floatingCards ?? [])]; floatingCards[i] = { ...floatingCards[i], src: v }
                      onChange({ ...hero, floatingCards })
                    }}
                    dir="ltr"
                    placeholder="/images/product.webp"
                  />
                </div>
                {card.src && (
                  <img src={card.src} alt="" className="w-12 h-12 object-cover rounded border border-zinc-700 mt-5 shrink-0" />
                )}
                <button className="text-red-400 hover:text-red-300 text-xl mt-5 shrink-0"
                  onClick={() => onChange({ ...hero, floatingCards: (hero.floatingCards ?? []).filter((_, j) => j !== i) })}>×</button>
              </div>
            ))}
            {(hero.floatingCards ?? []).length < 5 && (
              <button className="text-sm text-amber-400 hover:text-amber-300 border border-amber-600/30 rounded-lg px-4 py-2"
                onClick={() => onChange({ ...hero, floatingCards: [...(hero.floatingCards ?? []), { src: '', alt: '' }] })}>
                + הוסף קלף (מקסימום 5)
              </button>
            )}
          </div>
        )}

        {mode === 'image-grid' && (
          <div className="space-y-4">
            <NumberField
              label="שקיפות גריד"
              value={hero.backgroundOpacity ?? 0.5}
              min={0} max={1} step={0.05}
              onChange={(v) => onChange({ ...hero, backgroundOpacity: v })}
            />
            <p className="text-xs text-zinc-500">התמונות מוצגות בגריד masonry — כל תמונה שומרת על גובהה הטבעי</p>
            {(hero.gridImages ?? []).map((url, i) => (
              <div key={i} className="flex gap-3 items-center">
                <div className="flex-1">
                  <Field
                    label={`תמונה ${i + 1}`}
                    value={url}
                    onChange={(v) => {
                      const gridImages = [...(hero.gridImages ?? [])]; gridImages[i] = v
                      onChange({ ...hero, gridImages })
                    }}
                    dir="ltr"
                    placeholder="https://..."
                  />
                </div>
                {url && (
                  <img src={url} alt="" className="w-12 h-12 object-cover rounded border border-zinc-700 mt-5 shrink-0" />
                )}
                <button className="text-red-400 hover:text-red-300 text-xl mt-5 shrink-0"
                  onClick={() => onChange({ ...hero, gridImages: (hero.gridImages ?? []).filter((_, j) => j !== i) })}>×</button>
              </div>
            ))}
            <button className="text-sm text-amber-400 hover:text-amber-300 border border-amber-600/30 rounded-lg px-4 py-2"
              onClick={() => onChange({ ...hero, gridImages: [...(hero.gridImages ?? []), ''] })}>
              + הוסף תמונה לגריד
            </button>
          </div>
        )}
      </SectionCard>
    </div>
  )
}

function GapEditor({ gap, onChange }: { gap: SiteContent['gap']; onChange: (v: SiteContent['gap']) => void }) {
  return (
    <div className="space-y-6">
      <SectionCard title="כותרת ותיאור">
        <Field label="פתיחת כותרת" value={gap.heading} onChange={(v) => onChange({ ...gap, heading: v })} />
        <Field label="כותרת מודגשת (זהב)" value={gap.headingHighlight} onChange={(v) => onChange({ ...gap, headingHighlight: v })} />
        <Field label="המשך כותרת" value={gap.headingSuffix} onChange={(v) => onChange({ ...gap, headingSuffix: v })} />
        <Field label="תיאור" value={gap.description} onChange={(v) => onChange({ ...gap, description: v })} multiline />
        <Field label="טקסט כרטיס צף" value={gap.floatingCardText} onChange={(v) => onChange({ ...gap, floatingCardText: v })} />
        <Field label="URL תמונה" value={gap.imageUrl} onChange={(v) => onChange({ ...gap, imageUrl: v })} dir="ltr" />
      </SectionCard>
      <SectionCard title="סטטיסטיקות">
        {gap.stats.map((stat, i) => (
          <div key={i} className="flex gap-3 items-end">
            <div className="w-32">
              <Field label="ערך" value={stat.value} onChange={(v) => { const s = [...gap.stats]; s[i] = { ...stat, value: v }; onChange({ ...gap, stats: s }) }} dir="ltr" />
            </div>
            <div className="flex-1">
              <Field label="תווית" value={stat.label} onChange={(v) => { const s = [...gap.stats]; s[i] = { ...stat, label: v }; onChange({ ...gap, stats: s }) }} />
            </div>
            <button className="text-red-400 hover:text-red-300 text-xl pb-2"
              onClick={() => onChange({ ...gap, stats: gap.stats.filter((_, j) => j !== i) })}>×</button>
          </div>
        ))}
        <button className="text-sm text-amber-400 border border-amber-600/30 rounded-lg px-4 py-2"
          onClick={() => onChange({ ...gap, stats: [...gap.stats, { value: '', label: '' }] })}>+ הוסף סטטיסטיקה</button>
      </SectionCard>
    </div>
  )
}

function SolutionEditor({ solution, onChange }: { solution: SiteContent['solution']; onChange: (v: SiteContent['solution']) => void }) {
  return (
    <div className="space-y-6">
      <SectionCard title="הפתרון — תוכן">
        <Field label="כותרת" value={solution.title} onChange={(v) => onChange({ ...solution, title: v })} />
        <Field label="תיאור" value={solution.description} onChange={(v) => onChange({ ...solution, description: v })} multiline />
        <Field label="URL תמונה (כדור/orb)" value={solution.imageUrl} onChange={(v) => onChange({ ...solution, imageUrl: v })} dir="ltr" />
        {solution.imageUrl && (
          <img src={solution.imageUrl} alt="" className="w-24 h-24 object-cover rounded-full border border-zinc-700" />
        )}
      </SectionCard>
      <SectionCard title="רשימת נקודות + אייקונים">
        <p className="text-xs text-zinc-500">שם האייקון — מתוך <a href="https://fonts.google.com/icons" target="_blank" className="text-amber-400 underline">Google Material Symbols</a>. השאר ריק להסרת האייקון.</p>
        {solution.bullets.map((bullet, i) => (
          <div key={i} className="flex gap-3 items-end">
            <div className="w-44">
              <Field label="אייקון Material" value={bullet.icon} onChange={(v) => {
                const bullets = [...solution.bullets]; bullets[i] = { ...bullet, icon: v }; onChange({ ...solution, bullets })
              }} dir="ltr" placeholder="auto_awesome" />
            </div>
            <div className="flex-1">
              <Field label="טקסט" value={bullet.text} onChange={(v) => {
                const bullets = [...solution.bullets]; bullets[i] = { ...bullet, text: v }; onChange({ ...solution, bullets })
              }} />
            </div>
            <button className="text-red-400 hover:text-red-300 text-xl pb-2"
              onClick={() => onChange({ ...solution, bullets: solution.bullets.filter((_, j) => j !== i) })}>×</button>
          </div>
        ))}
        <button className="text-sm text-amber-400 border border-amber-600/30 rounded-lg px-4 py-2"
          onClick={() => onChange({ ...solution, bullets: [...solution.bullets, { icon: 'star', text: '' }] })}>+ הוסף נקודה</button>
      </SectionCard>
    </div>
  )
}

function ServicesEditor({ services, onChange }: { services: SiteContent['services']; onChange: (v: SiteContent['services']) => void }) {
  function updateCard(i: number, updated: ServiceCard) {
    const cards = [...services.cards]; cards[i] = updated; onChange({ ...services, cards })
  }

  return (
    <div className="space-y-6">
      <SectionCard title="כותרת סקשן">
        <Field label="כותרת" value={services.title} onChange={(v) => onChange({ ...services, title: v })} />
        <Field label="תת-כותרת" value={services.subtitle} onChange={(v) => onChange({ ...services, subtitle: v })} />
      </SectionCard>

      {services.cards.map((card, i) => (
        <SectionCard key={card.id} title={`כרטיס ${i + 1}${card.title ? ` — ${card.title}` : ''}`}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">גודל</label>
              <select className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500"
                value={card.layout} onChange={(e) => updateCard(i, { ...card, layout: e.target.value as 'large' | 'small' })}>
                <option value="large">גדול (8 עמודות)</option>
                <option value="small">קטן (4 עמודות)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">סגנון</label>
              <select className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500"
                value={card.variant} onChange={(e) => updateCard(i, { ...card, variant: e.target.value as 'dark' | 'accent' | 'muted' })}>
                <option value="dark">כהה</option>
                <option value="accent">זהב (amber)</option>
                <option value="muted">עמום</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">אייקון Material (השאר ריק להסרה)</label>
            <div className="flex gap-3 items-center">
              <input
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 text-sm focus:outline-none focus:border-amber-500"
                value={card.icon} placeholder="workspace_premium"
                onChange={(e) => updateCard(i, { ...card, icon: e.target.value })}
                dir="ltr"
              />
              {card.icon && (
                <span className="material-symbols-outlined text-amber-400 text-2xl">{card.icon}</span>
              )}
              {card.icon && (
                <button className="text-zinc-500 hover:text-red-400 text-sm border border-zinc-700 rounded px-2 py-1"
                  onClick={() => updateCard(i, { ...card, icon: '' })}>הסר</button>
              )}
            </div>
          </div>

          <Field label="כותרת" value={card.title} onChange={(v) => updateCard(i, { ...card, title: v })} />
          <Field label="תיאור" value={card.description} onChange={(v) => updateCard(i, { ...card, description: v })} multiline />

          <div className="space-y-3">
            <Field label="URL תמונת רקע" value={card.imageUrl} onChange={(v) => updateCard(i, { ...card, imageUrl: v })} dir="ltr" placeholder="https://..." />
            {card.imageUrl && (
              <div className="flex items-start gap-4">
                <img src={card.imageUrl} alt="" className="w-24 h-16 object-cover rounded border border-zinc-700 shrink-0" />
                <div className="flex-1">
                  <NumberField
                    label="שקיפות תמונה"
                    value={card.backgroundOpacity ?? 1}
                    min={0} max={1} step={0.05}
                    onChange={(v) => updateCard(i, { ...card, backgroundOpacity: v })}
                  />
                </div>
                <button className="text-zinc-500 hover:text-red-400 text-xs border border-zinc-700 rounded px-2 py-1 mt-5 shrink-0"
                  onClick={() => updateCard(i, { ...card, imageUrl: '' })}>הסר תמונה</button>
              </div>
            )}
          </div>

          <button className="text-sm text-red-400 hover:text-red-300 border border-red-800/30 rounded-lg px-4 py-2"
            onClick={() => onChange({ ...services, cards: services.cards.filter((_, j) => j !== i) })}>
            מחק כרטיס
          </button>
        </SectionCard>
      ))}

      <button
        className="w-full text-amber-400 hover:text-amber-300 border-2 border-dashed border-amber-600/30 rounded-xl py-4 text-sm font-medium transition-colors hover:border-amber-600/60"
        onClick={() => onChange({
          ...services,
          cards: [...services.cards, {
            id: Date.now().toString(), icon: 'star', title: 'שירות חדש',
            description: '', layout: 'small', variant: 'dark', imageUrl: '', backgroundOpacity: 1,
          }]
        })}
      >
        + הוסף קטגוריה / שירות
      </button>
    </div>
  )
}

function AboutEditor({ about, onChange }: { about: SiteContent['about']; onChange: (v: SiteContent['about']) => void }) {
  return (
    <SectionCard title="אודות">
      <Field label="תג (Badge)" value={about.badge} onChange={(v) => onChange({ ...about, badge: v })} dir="ltr" />
      <Field label="כותרת" value={about.title} onChange={(v) => onChange({ ...about, title: v })} />
      <Field label="כותרת — חלק נטוי" value={about.titleItalic} onChange={(v) => onChange({ ...about, titleItalic: v })} />
      <Field label="תיאור" value={about.description} onChange={(v) => onChange({ ...about, description: v })} multiline />
      <Field label="ציטוט" value={about.quote} onChange={(v) => onChange({ ...about, quote: v })} multiline />
      <Field label="חתימת ציטוט" value={about.quoteAuthor} onChange={(v) => onChange({ ...about, quoteAuthor: v })} />
      <Field label="URL תמונה" value={about.imageUrl} onChange={(v) => onChange({ ...about, imageUrl: v })} dir="ltr" placeholder="https://..." />
      {about.imageUrl && (
        <div className="flex items-center gap-4">
          <img src={about.imageUrl} alt="" className="w-20 h-20 object-cover rounded-full border border-zinc-700" />
          <button className="text-sm text-red-400 hover:text-red-300 border border-red-800/30 rounded-lg px-3 py-1.5"
            onClick={() => onChange({ ...about, imageUrl: '' })}>הסר תמונה</button>
        </div>
      )}
    </SectionCard>
  )
}

function ContactEditor({ contact, onChange }: { contact: SiteContent['contact']; onChange: (v: SiteContent['contact']) => void }) {
  return (
    <div className="space-y-6">
      <SectionCard title="כותרת ותוכן">
        <Field label="כותרת" value={contact.title} onChange={(v) => onChange({ ...contact, title: v })} />
        <Field label="כותרת מודגשת (זהב)" value={contact.titleHighlight} onChange={(v) => onChange({ ...contact, titleHighlight: v })} />
        <Field label="תיאור" value={contact.description} onChange={(v) => onChange({ ...contact, description: v })} multiline />
        <Field label="טקסט כפתור שליחה" value={contact.submitButton} onChange={(v) => onChange({ ...contact, submitButton: v })} />
      </SectionCard>
      <SectionCard title="WhatsApp">
        <Field label="מספר WhatsApp (ללא +)" value={contact.whatsappNumber} onChange={(v) => onChange({ ...contact, whatsappNumber: v })} dir="ltr" />
        <Field label="תווית כפתור" value={contact.whatsappLabel} onChange={(v) => onChange({ ...contact, whatsappLabel: v })} />
        <Field label="סטטוס זמינות" value={contact.whatsappStatus} onChange={(v) => onChange({ ...contact, whatsappStatus: v })} />
      </SectionCard>
      <SectionCard title="רשתות חברתיות">
        <Field label="Instagram URL" value={contact.socialLinks.instagram} onChange={(v) => onChange({ ...contact, socialLinks: { ...contact.socialLinks, instagram: v } })} dir="ltr" />
        <Field label="LinkedIn URL" value={contact.socialLinks.linkedin} onChange={(v) => onChange({ ...contact, socialLinks: { ...contact.socialLinks, linkedin: v } })} dir="ltr" />
        <Field label="Behance URL" value={contact.socialLinks.behance} onChange={(v) => onChange({ ...contact, socialLinks: { ...contact.socialLinks, behance: v } })} dir="ltr" />
      </SectionCard>
      <SectionCard title="מיקומים">
        {contact.locations.map((loc, i) => (
          <div key={i} className="flex gap-3 items-end">
            <div className="w-36"><Field label="עיר" value={loc.city} onChange={(v) => { const l = [...contact.locations]; l[i] = { ...loc, city: v }; onChange({ ...contact, locations: l }) }} /></div>
            <div className="flex-1"><Field label="כתובת" value={loc.address} onChange={(v) => { const l = [...contact.locations]; l[i] = { ...loc, address: v }; onChange({ ...contact, locations: l }) }} /></div>
            <button className="text-red-400 text-xl pb-2" onClick={() => onChange({ ...contact, locations: contact.locations.filter((_, j) => j !== i) })}>×</button>
          </div>
        ))}
        <button className="text-sm text-amber-400 border border-amber-600/30 rounded-lg px-4 py-2"
          onClick={() => onChange({ ...contact, locations: [...contact.locations, { city: '', address: '' }] })}>+ הוסף מיקום</button>
      </SectionCard>
      <SectionCard title="נושאי פנייה (קטגוריות טופס)">
        {contact.formSubjects.map((subject, i) => (
          <div key={i} className="flex gap-3 items-end">
            <div className="flex-1"><Field label={`נושא ${i + 1}`} value={subject} onChange={(v) => { const fs = [...contact.formSubjects]; fs[i] = v; onChange({ ...contact, formSubjects: fs }) }} /></div>
            <button className="text-red-400 text-xl pb-2" onClick={() => onChange({ ...contact, formSubjects: contact.formSubjects.filter((_, j) => j !== i) })}>×</button>
          </div>
        ))}
        <button className="text-sm text-amber-400 border border-amber-600/30 rounded-lg px-4 py-2"
          onClick={() => onChange({ ...contact, formSubjects: [...contact.formSubjects, ''] })}>+ הוסף נושא</button>
      </SectionCard>
    </div>
  )
}

function FooterEditor({ footer, onChange }: { footer: SiteContent['footer']; onChange: (v: SiteContent['footer']) => void }) {
  function moveLink(i: number, dir: -1 | 1) {
    const links = [...footer.links]
    const j = i + dir
    if (j < 0 || j >= links.length) return
    ;[links[i], links[j]] = [links[j], links[i]]
    onChange({ ...footer, links })
  }

  return (
    <div className="space-y-6">
      <SectionCard title="פוטר">
        <Field label="לוגו" value={footer.logo} onChange={(v) => onChange({ ...footer, logo: v })} dir="ltr" />
        <Field label="זכויות יוצרים" value={footer.copyright} onChange={(v) => onChange({ ...footer, copyright: v })} dir="ltr" />
        <Field label="תגית (Tagline)" value={footer.tagline} onChange={(v) => onChange({ ...footer, tagline: v })} dir="ltr" />
      </SectionCard>
      <SectionCard title="קישורי פוטר — ניתן לסדר מחדש">
        <p className="text-xs text-zinc-500">השתמש בחצים ↑↓ לשינוי סדר הקישורים</p>
        {footer.links.map((link, i) => (
          <div key={i} className="flex gap-2 items-end">
            {/* Reorder buttons */}
            <div className="flex flex-col gap-0.5 pb-2">
              <button
                className="text-zinc-500 hover:text-amber-400 text-xs leading-none px-1 py-0.5 border border-zinc-700 rounded disabled:opacity-20"
                onClick={() => moveLink(i, -1)}
                disabled={i === 0}
                title="הזז למעלה"
              >▲</button>
              <button
                className="text-zinc-500 hover:text-amber-400 text-xs leading-none px-1 py-0.5 border border-zinc-700 rounded disabled:opacity-20"
                onClick={() => moveLink(i, 1)}
                disabled={i === footer.links.length - 1}
                title="הזז למטה"
              >▼</button>
            </div>
            <div className="flex-1">
              <Field label="תווית" value={link.label} onChange={(v) => {
                const links = [...footer.links]; links[i] = { ...link, label: v }; onChange({ ...footer, links })
              }} />
            </div>
            <div className="flex-1">
              <Field label="קישור" value={link.href} onChange={(v) => {
                const links = [...footer.links]; links[i] = { ...link, href: v }; onChange({ ...footer, links })
              }} dir="ltr" />
            </div>
            <button className="text-red-400 text-xl pb-2"
              onClick={() => onChange({ ...footer, links: footer.links.filter((_, j) => j !== i) })}>×</button>
          </div>
        ))}
        <button className="text-sm text-amber-400 border border-amber-600/30 rounded-lg px-4 py-2"
          onClick={() => onChange({ ...footer, links: [...footer.links, { label: '', href: '#' }] })}>+ הוסף קישור</button>
      </SectionCard>
    </div>
  )
}
