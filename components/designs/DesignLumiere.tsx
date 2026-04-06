"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── LUMIÈRE Color Tokens ──────────────────────────────── */
const c = {
  bg: "#FAF7F2",
  bgAlt: "#F0EBE3",
  gold: "#B8860B",
  goldSoft: "rgba(184, 134, 11, 0.12)",
  goldLine: "rgba(184, 134, 11, 0.25)",
  text: "#1A1814",
  textSoft: "#5C5347",
  textMuted: "#9A8F82",
};

const projects = [
  { id: 1, title: "Brand Identity", subtitle: "שפה ויז'ואלית למותג יוקרה", color: "#E8E0D4" },
  { id: 2, title: "Product Imagery", subtitle: "ויז'ואליזציה היפר-ריאליסטית", color: "#DDD5C8" },
  { id: 3, title: "Campaign Art", subtitle: "קמפיין דיגיטלי 360°", color: "#D4CBBB" },
  { id: 4, title: "Editorial", subtitle: "לוק-בוק דיגיטלי — קיץ 2025", color: "#E2D9CB" },
];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function DesignLumiere() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div style={{ background: c.bg, color: c.text, minHeight: "100vh" }}>
      {/* ── Nav ────────────────────────────────────────── */}
      <nav
        className="fixed top-0 right-0 left-0 z-50"
        style={{
          background: "rgba(250, 247, 242, 0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${c.goldLine}`,
        }}
      >
        <div className="site-container h-16 flex items-center justify-between">
          <span
            className="text-label"
            style={{ color: c.gold, letterSpacing: "0.3em" }}
          >
            AURA
          </span>
          <div className="hidden md:flex gap-10">
            {["גלריה", "המערכת", "החתימה", "צור קשר"].map((label) => (
              <span
                key={label}
                className="text-label"
                style={{ color: c.textSoft, letterSpacing: "0.18em" }}
              >
                {label}
              </span>
            ))}
          </div>
          <span className="text-label md:hidden" style={{ color: c.gold }}>
            צור קשר
          </span>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center text-center px-8"
        style={{ height: "100svh", minHeight: "600px" }}
      >
        {/* Thin decorative frame */}
        <div
          className="absolute"
          style={{
            inset: "3rem",
            border: `1px solid ${c.goldLine}`,
            borderRadius: "var(--radius-lg)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0, 0, 1] }}
        >
          <p
            className="text-label mb-6"
            style={{ color: c.gold, letterSpacing: "0.4em" }}
          >
            Creative AI Studio
          </p>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(4rem, 10vw, 9rem)",
              fontWeight: 300,
              letterSpacing: "0.25em",
              lineHeight: 1,
              color: c.text,
            }}
          >
            AURA
          </h1>
          <p
            className="text-label mt-4"
            style={{ color: c.textMuted, letterSpacing: "0.35em" }}
          >
            by Tahel Kornfeld
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-subhead mt-10 max-w-md"
          style={{ color: c.textSoft }}
        >
          ויז'ואל סטרטגיסטית. AI יוצר. הצומת בין טכנולוגיה לרגישות אנושית.
        </motion.p>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          aria-hidden="true"
        >
          <span className="text-label" style={{ color: c.textMuted }}>
            SCROLL
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: `linear-gradient(to bottom, ${c.goldLine}, transparent)`,
            }}
          />
        </div>
      </section>

      {/* ── Gallery ────────────────────────────────────── */}
      <section style={{ paddingTop: "var(--space-section)", paddingBottom: "var(--space-section)" }}>
        <div className="site-container">
          <FadeIn>
            <div className="section-intro">
              <p className="text-label mb-4" style={{ color: c.gold }}>
                עבודות נבחרות
              </p>
              <h2
                className="text-section"
                style={{ color: c.text }}
              >
                הגלריה
              </h2>
              <span
                className="line-accent mt-6 block"
                style={{ background: c.gold, margin: "0 auto", marginTop: "1.5rem" }}
                aria-hidden="true"
              />
            </div>
          </FadeIn>

          {/* 2x2 editorial grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.1}>
                <article
                  className="group relative overflow-hidden"
                  style={{
                    aspectRatio: "4/3",
                    backgroundColor: p.color,
                    borderRadius: "var(--radius-lg)",
                    border: `1px solid ${c.goldLine}`,
                  }}
                >
                  {/* Large faded number */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(6rem, 12vw, 14rem)",
                        fontWeight: 300,
                        color: "rgba(184, 134, 11, 0.06)",
                        lineHeight: 1,
                        transition: "color 500ms",
                      }}
                      className="group-hover:!text-[rgba(184,134,11,0.12)]"
                    >
                      {String(p.id).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Bottom info bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 px-8 py-5 flex items-end justify-between"
                    style={{ borderTop: `1px solid ${c.goldLine}` }}
                  >
                    <div>
                      <p className="text-label mb-1" style={{ color: c.gold }}>
                        {p.title}
                      </p>
                      <p className="text-subhead" style={{ color: c.textSoft }}>
                        {p.subtitle}
                      </p>
                    </div>
                    <span
                      className="text-label transition-colors duration-200"
                      style={{ color: c.gold, borderBottom: `1px solid ${c.goldLine}`, paddingBottom: "2px" }}
                    >
                      צפה בעבודה
                    </span>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── The System ─────────────────────────────────── */}
      <section
        style={{
          paddingTop: "var(--space-section)",
          paddingBottom: "var(--space-section)",
          backgroundColor: c.bgAlt,
        }}
      >
        <div className="site-container">
          <FadeIn>
            <div className="section-intro">
              <p className="text-label mb-4" style={{ color: c.gold }}>
                הסוכן החכם
              </p>
              <h2 className="text-section" style={{ color: c.text }}>
                המערכת
              </h2>
              <span
                className="line-accent mt-6 block"
                style={{ background: c.gold, margin: "0 auto", marginTop: "1.5rem" }}
                aria-hidden="true"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="text-center" style={{ marginBottom: "5rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                  fontWeight: 300,
                  color: c.text,
                  lineHeight: 1.2,
                  letterSpacing: "0.04em",
                  maxWidth: "820px",
                  margin: "0 auto 1.5rem",
                }}
              >
                שלחי בריף. קבלי תמונות ברמת סטודיו.
              </p>
              <p
                className="text-subhead"
                style={{ color: c.textSoft, maxWidth: "480px", margin: "0 auto" }}
              >
                בלי פגישות. בלי תורים. ישירות מהוואטסאפ שלך.
              </p>
            </div>
          </FadeIn>

          {/* Steps — horizontal cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ marginBottom: "5rem" }}>
            {[
              { num: "01", title: "הבריף", body: "שולחים הודעה בוואטסאפ — מה המוצר, מה הקהל, מה התחושה." },
              { num: "02", title: "היצירה", body: "הסוכן מתרגם לשפה ויז'ואלית ומייצר מבחר תמונות ברמת סטודיו." },
              { num: "03", title: "המסירה", body: "בוחרים, מאשרים, מקבלים קבצים מוכנים לפרסום תוך דקות." },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={0.3 + i * 0.12}>
                <div
                  className="text-center flex flex-col items-center gap-5 p-10"
                  style={{
                    backgroundColor: c.bg,
                    borderRadius: "var(--radius-lg)",
                    border: `1px solid ${c.goldLine}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "2.5rem",
                      fontWeight: 300,
                      color: c.gold,
                    }}
                  >
                    {step.num}
                  </span>
                  <p className="text-headline" style={{ color: c.text }}>
                    {step.title}
                  </p>
                  <p
                    className="text-subhead"
                    style={{ color: c.textSoft, maxWidth: "260px" }}
                  >
                    {step.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.7}>
            <div className="text-center">
              <span
                className="inline-block text-label"
                style={{
                  backgroundColor: c.text,
                  color: c.bg,
                  padding: "14px 48px",
                  borderRadius: "var(--radius-md)",
                  letterSpacing: "0.22em",
                }}
              >
                שלחי בריף ראשון
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── The Signature ──────────────────────────────── */}
      <section
        style={{
          paddingTop: "var(--space-section)",
          paddingBottom: "var(--space-section)",
          backgroundColor: c.bg,
        }}
      >
        <div className="site-container">
          {/* Editorial name */}
          <FadeIn>
            <div
              className="relative overflow-hidden text-center"
              style={{
                borderTop: `1px solid ${c.goldLine}`,
                borderBottom: `1px solid ${c.goldLine}`,
                paddingTop: "2rem",
                paddingBottom: "2rem",
                marginBottom: "5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(5rem, 16vw, 18rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  lineHeight: 0.85,
                  color: "transparent",
                  WebkitTextStroke: `1px ${c.goldLine}`,
                  userSelect: "none",
                }}
              >
                TAHEL
              </p>
              <p
                className="text-label text-center mt-4"
                style={{ color: c.gold, letterSpacing: "0.35em" }}
              >
                KORNFELD
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Portrait */}
            <FadeIn delay={0.1} className="lg:col-span-5">
              <div
                style={{
                  aspectRatio: "3/4",
                  backgroundColor: c.bgAlt,
                  borderRadius: "var(--radius-lg)",
                  border: `1px solid ${c.goldLine}`,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div style={{ width: "32px", height: "1px", backgroundColor: c.gold }} />
                  <p className="text-label" style={{ color: c.gold, letterSpacing: "0.3em" }}>
                    TAHEL KORNFELD
                  </p>
                  <p className="text-label" style={{ color: c.textMuted, letterSpacing: "0.2em" }}>
                    Creative AI Director
                  </p>
                  <div style={{ width: "32px", height: "1px", backgroundColor: c.gold }} />
                </div>
              </div>
            </FadeIn>

            {/* Content */}
            <FadeIn delay={0.2} className="lg:col-span-7">
              <div style={{ paddingTop: "1rem" }}>
                <p className="text-label mb-3" style={{ color: c.gold }}>
                  מאחורי AURA
                </p>
                <h2 className="text-section mb-5" style={{ color: c.text }}>
                  החתימה
                </h2>
                <span className="line-accent block mb-10" style={{ background: c.gold }} />

                <p className="text-subhead mb-4" style={{ color: c.textSoft }}>
                  אני טהל קורנפלד — ויז'ואל סטרטגיסטית ומומחית AI יוצר.
                </p>
                <p className="text-subhead mb-10" style={{ color: c.textSoft }}>
                  עבודתי נמצאת בצומת שבין אינטלקט טכנולוגי לרגישות אנושית. אני לא מייצרת תמונות — אני מייצרת שפה ויז'ואלית שמותגים זוכרים.
                </p>

                {/* Three pillars */}
                {[
                  { num: "01", label: "ראייה אסטרטגית", text: "כל תמונה היא הצהרה מותגית." },
                  { num: "02", label: "דיוק טכנולוגי", text: "Runway, Kling, Sora. הכלים משתנים. הסטנדרט — לא." },
                  { num: "03", label: "רגישות אנושית", text: "AI יוצר. אני מכוונת." },
                ].map((s) => (
                  <div
                    key={s.num}
                    className="flex items-baseline gap-5"
                    style={{
                      borderTop: `1px solid ${c.goldLine}`,
                      padding: "1.25rem 0",
                    }}
                  >
                    <span
                      className="text-label"
                      style={{ color: c.textMuted, flexShrink: 0, minWidth: "2rem" }}
                    >
                      {s.num}
                    </span>
                    <div>
                      <p className="text-label mb-1" style={{ color: c.gold }}>
                        {s.label}
                      </p>
                      <p className="text-subhead" style={{ color: c.text }}>
                        {s.text}
                      </p>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${c.goldLine}` }} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "var(--space-section)",
          paddingBottom: "var(--space-section)",
          backgroundColor: c.bgAlt,
        }}
      >
        <div className="site-container" style={{ maxWidth: "880px" }}>
          <FadeIn>
            <div className="text-center" style={{ marginBottom: "5rem" }}>
              <p className="text-label mb-5" style={{ color: c.gold }}>
                נתחיל לעבוד?
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                  fontWeight: 300,
                  letterSpacing: "0.06em",
                  color: c.text,
                  lineHeight: 1.1,
                  marginBottom: "1.5rem",
                }}
              >
                בואי נייצר משהו שיזכרו
              </h2>
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  backgroundColor: c.gold,
                  margin: "0 auto",
                }}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col items-center gap-6">
              <span
                className="inline-block text-label"
                style={{
                  backgroundColor: c.text,
                  color: c.bg,
                  padding: "15px 52px",
                  borderRadius: "var(--radius-md)",
                  letterSpacing: "0.22em",
                }}
              >
                שליחת בריף
              </span>
              <span className="text-label" style={{ color: c.gold }}>
                WhatsApp
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer
        style={{
          backgroundColor: c.bg,
          borderTop: `1px solid ${c.goldLine}`,
          padding: "40px 0",
        }}
      >
        <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-label" style={{ color: c.gold, letterSpacing: "0.3em" }}>
            AURA
          </span>
          <p className="text-label" style={{ color: c.textMuted }}>
            © 2025 Tahel Creative AI. כל הזכויות שמורות.
          </p>
          <p className="text-label" style={{ color: c.textMuted }}>
            by Tahel Kornfeld
          </p>
        </div>
      </footer>
    </div>
  );
}
