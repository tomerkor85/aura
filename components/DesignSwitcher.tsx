"use client";

import { motion, AnimatePresence } from "framer-motion";

const designs = [
  { id: 1, name: "AURA", subtitle: "Dark Luxury" },
  { id: 2, name: "LUMIÈRE", subtitle: "Light Editorial" },
  { id: 3, name: "NOIR", subtitle: "Cinematic Minimal" },
];

interface DesignSwitcherProps {
  activeDesign: number;
  onSwitch: (id: number) => void;
}

export default function DesignSwitcher({
  activeDesign,
  onSwitch,
}: DesignSwitcherProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 px-2 py-2"
      style={{
        background: "rgba(26, 24, 20, 0.85)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(200, 144, 96, 0.2)",
        borderRadius: "var(--radius-full)",
      }}
      role="tablist"
      aria-label="בחירת עיצוב"
    >
      {designs.map((d) => {
        const isActive = d.id === activeDesign;
        return (
          <button
            key={d.id}
            role="tab"
            aria-selected={isActive}
            aria-label={`עיצוב ${d.name} — ${d.subtitle}`}
            onClick={() => onSwitch(d.id)}
            className="relative cursor-pointer px-5 py-2.5 transition-all duration-300"
            style={{
              border: "none",
              borderRadius: "var(--radius-full)",
              background: "transparent",
              outline: "none",
            }}
          >
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="active-design-pill"
                  className="absolute inset-0"
                  style={{
                    background: "rgba(200, 144, 96, 0.15)",
                    border: "1px solid rgba(200, 144, 96, 0.35)",
                    borderRadius: "var(--radius-full)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </AnimatePresence>
            <span
              className="relative z-10 text-label"
              style={{
                color: isActive ? "var(--caramel)" : "var(--sand-drift)",
                transition: "color 300ms",
                whiteSpace: "nowrap",
              }}
            >
              {d.name}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}
