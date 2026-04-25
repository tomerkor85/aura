'use client'

import { useState, useEffect } from 'react'

// Global event system for menu state (avoids context in server layout)
export function openMenu() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('aura:menu:open'))
  }
}
export function closeMenu() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('aura:menu:close'))
  }
}

export default function MenuButton() {
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

  function toggle() {
    if (isOpen) {
      window.dispatchEvent(new CustomEvent('aura:menu:close'))
    } else {
      window.dispatchEvent(new CustomEvent('aura:menu:open'))
    }
  }

  return (
    <button
      className={`menu-button${isOpen ? ' menu-button--open' : ''}`}
      onClick={toggle}
      aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
      aria-expanded={isOpen}
    >
      <span>{isOpen ? '' : 'תפריט'}</span>
      <span className="menu-button__icon" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </button>
  )
}
