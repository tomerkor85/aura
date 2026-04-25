'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'עבודות',   href: '#work' },
  { label: 'שירותים',  href: '#services' },
  { label: 'על טהל',   href: '#about' },
  { label: 'צור קשר',  href: '#cta' },
]

export default function MenuOverlay() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onOpen  = () => setIsOpen(true)
    const onClose = () => setIsOpen(false)
    window.addEventListener('aura:menu:open',  onOpen)
    window.addEventListener('aura:menu:close', onClose)
    return () => {
      window.removeEventListener('aura:menu:open',  onOpen)
      window.removeEventListener('aura:menu:close', onClose)
    }
  }, [])

  function handleLinkClick() {
    window.dispatchEvent(new CustomEvent('aura:menu:close'))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="menu-overlay"
          initial={{ y: '-100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          role="dialog"
          aria-modal="true"
          aria-label="תפריט ניווט"
        >
          <nav>
            <ul className="menu-overlay__nav">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <a
                    href={link.href}
                    className="menu-overlay__link"
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="menu-overlay__footer">
            Aura by Tahel Creative AI
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
