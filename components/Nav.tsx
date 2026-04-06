"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "גלריה", href: "#gallery" },
  { label: "המערכת", href: "#system" },
  { label: "החתימה", href: "#signature" },
  { label: "צור קשר", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="ניווט ראשי"
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(26, 24, 20, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(92, 61, 40, 0.2)" : "none",
      }}
    >
      <div className="site-container h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-label"
          style={{ color: "var(--caramel)", letterSpacing: "0.3em" }}
          aria-label="AURA by Tahel — חזרה לראש הדף"
        >
          AURA
        </a>

        {/* Links */}
        <ul className="hidden md:flex gap-10 list-none" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-label transition-colors duration-200 cursor-pointer"
                style={{ color: "var(--sand-drift)" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--linen-white)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--sand-drift)")
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile — thin line CTA */}
        <a
          href="#contact"
          className="md:hidden text-label cursor-pointer"
          style={{ color: "var(--caramel)" }}
        >
          צור קשר
        </a>
      </div>
    </nav>
  );
}
