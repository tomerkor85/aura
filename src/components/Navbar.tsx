'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'בית', href: '#' },
  { label: 'פורטפוליו', href: '#portfolio' },
  { label: 'שירותים', href: '#services' },
  { label: 'צור קשר', href: '#cta' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Manage drawer inert attribute (avoids React type conflict with inert prop)
  useEffect(() => {
    const drawer = drawerRef.current
    if (!drawer) return
    if (drawerOpen) {
      drawer.removeAttribute('inert')
      document.body.style.overflow = 'hidden'
    } else {
      drawer.setAttribute('inert', '')
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  // Close drawer on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
      <nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        role="navigation"
        aria-label="ניווט ראשי"
      >
        {/* Logo — RTL: right side */}
        <a href="#" className="navbar-logo" aria-label="אורה — דף הבית">
          אורה
        </a>

        {/* Desktop links — RTL: left side */}
        <ul className="navbar-links" role="list">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} role="listitem">
              <a
                href={link.href}
                aria-current={i === 0 ? 'page' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={`navbar-hamburger${drawerOpen ? ' open' : ''}`}
          onClick={() => setDrawerOpen((v) => !v)}
          aria-label={drawerOpen ? 'סגור תפריט' : 'פתח תפריט'}
          aria-expanded={drawerOpen}
          aria-controls="navbar-drawer"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile full-screen drawer */}
      <div
        id="navbar-drawer"
        ref={drawerRef}
        className={`navbar-drawer${drawerOpen ? ' open' : ''}`}
        aria-hidden={!drawerOpen}
        role="dialog"
        aria-label="תפריט ניווט"
      >
        {NAV_LINKS.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            className="navbar-drawer-link"
            onClick={closeDrawer}
            initial={{ opacity: 0, x: 40 }}
            animate={drawerOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ delay: i * 0.08, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {link.label}
          </motion.a>
        ))}
      </div>
    </>
  )
}
