"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── NOIR Color Tokens ─────────────────────────────────── */
const c = {
  bg: "#0A0A0A",
  bgAlt: "#111111",
  red: "#C41E3A",
  redSoft: "rgba(196, 30, 58, 0.12)",
  redLine: "rgba(196, 30, 58, 0.3)",
  white: "#FFFFFF",
  whiteSoft: "rgba(255, 255, 255, 0.7)",
  whiteMuted: "rgba(255, 255, 255, 0.35)",
  line: "rgba(255, 255, 255, 0.08)",
};

const projects = [
  { id: 1, title: "Brand Identity", subtitle: "זהות ויז'ואלית לסטארט-אפ", color: "#151515" },
  { id: 2, title: "Product Imagery", subtitle: "ויז'ואליזציה היפר-ריאליסטית", color: "#121212" },
  { id: 3, title: "Campaign Art", subtitle: "קמפיין דיגיטלי 360°", color: "#0E0E0E" },
  { id: 4, title: "Architectural Viz", subtitle: "הדמיות AI לפרויקט נדל\"ן", color: "#131313" },
  { id: 5, title: "Fashion Editorial", subtitle: "לוק-בוק דיגיטלי — קיץ 2025", color: "#101010" },
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

export default function DesignNoir() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div style={{ background: c.bg, color: c.white, minHeight: "100vh" }}>
      {/* ── Nav ────────────────────────────────────────── */}
      <nav
        className="fixed top-0 right-0 left-0 z-50"
        style={{
          background: "rgba(10, 10, 10, 0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${c.line}`,
        }}
      >
        <div className="site-container h-16 flex items-center justify-between">
          <span
            className="text-label"
            style={{ color: c.red, letterSpacing: "0.3em", fontWeight: 500 }}
          >
            AURA
          </span>
          <div className="hidden md:flex gap-10">
            {["גלריה", "המערכת", "החתימה", "צור קשר"].map((label) => (
              <span
                key={label}
                className="text-label"
                style={{ color: c.whiteSoft, letterSpacing: "0.18em" }}
              >
                {label}
              </span>
            ))}
          </div>
          <span className="text-label md:hidden" style={{ color: c.red }}>
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
        {/* Red vertical line accent */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: "1px",
            height: "120px",
            background: `linear-gradient(to bottom, ${c.red}, transparent)`,
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={heroInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.25, 0, 0, 1] }}
        >
          <p
            className="text-label mb-8"
            style={{ color: c.red, letterSpacing: "0.5em" }}
          >
            CREATIVE AI STUDIO
          </p>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(5rem, 14vw, 12rem)",
              fontWeight: 300,
              letterSpacing: "0.3em",
              lineHeight: 0.9,
              color: c.white,
            }}
          >
            AURA
          </h1>
          <div
            style={{
              width: "60px",
              height: "1px",
              backgroundColor: c.red,
              margin: "2rem auto",
            }}
            aria-hidden="true"
          />
          <p
            className="text-label"
            style={{ color: c.whiteMuted, letterSpacing: "0.35em" }}
          >
            by Tahel Kornfeld
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-subhead mt-12 max-w-md"
          style={{ color: c.whiteSoft }}
        >
          ויז'ואל סטרטגיסטית. AI יוצר. הצומת בין טכנולוגיה לרגישות אנושית.
        </motion.p>

        {/* Bottom line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: "1px",
            height: "80px",
            background: `linear-gradient(to bottom, transparent, ${c.whiteMuted})`,
          }}
          aria-hidden="true"
        />
      </section>

      {/* ── Gallery — full-width cinematic strips ──────── */}
      <section style={{ paddingTop: "var(--space-section)" }}>
        <div className="site-container">
          <FadeIn>
            <div className="section-intro">
              <p className="text-label mb-4" style={{ color: c.red }}>
                עבודות נבחרות
              </p>
              <h2 className="text-section" style={{ color: c.white }}>
                הגלריה
              </h2>
              <span
                className="line-accent mt-6 block"
                style={{ background: c.red, margin: "0 auto", marginTop: "1.5rem" }}
                aria-hidden="true"
              />
            </div>
          </FadeIn>
        </div>

        {/* Cinematic horizontal strips */}
        <div style={{ borderBottom: `1px solid ${c.line}` }}>
          {projects.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.05}>
              <article
                className="group"
                style={{ borderTop: `1px solid ${c.line}` }}
              >
                <div
                  className="site-container flex items-center justify-between py-8 lg:py-12 transition-all duration-500"
                  style={{ cursor: "pointer" }}
                >
                  {/* Number */}
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(2rem, 4vw, 4rem)",
                      fontWeight: 300,
                      color: c.whiteMuted,
                      minWidth: "5rem",
                      transition: "color 400ms",
                    }}
                    className="group-hover:!text-[rgba(196,30,58,0.7)]"
                  >
                    {String(p.id).padStart(2, "0")}
                  </span>

                  {/* Title + subtitle */}
                  <div className="flex-1 px-8">
                    <h3
                      className="text-headline"
                      style={{ color: c.white, transition: "color 400ms" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-subhead mt-1" style={{ color: c.whiteMuted }}>
                      {p.subtitle}
                    </p>
                  </div>

                  {/* CTA line */}
                  <div
                    className="hidden md:block transition-all duration-500"
                    style={{
                      width: "40px",
                      height: "1px",
                      backgroundColor: c.whiteMuted,
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Hover reveal image placeholder */}
                <div
                  className="overflow-hidden transition-all duration-700"
                  style={{
                    height: "0",
                    backgroundColor: p.color,
                  }}
                />
              </article>
            </FadeIn>
          ))}
        </div>

        <div style={{ height: "var(--space-section)" }} />
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
              <p className="text-label mb-4" style={{ color: c.red }}>
                הסוכן החכם
              </p>
              <h2 className="text-section" style={{ color: c.white }}>
                המערכת
              </h2>
              <span
                className="line-accent mt-6 block"
                style={{ background: c.red, margin: "0 auto", marginTop: "1.5rem" }}
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
                  color: c.white,
                  lineHeight: 1.2,
                  letterSpacing: "0.04em",
                  maxWidth: "820px",
                  margin: "0 auto 1.5rem",
                }}
              >
                שלחי בריף. קבלי תמונות ברמת סטודיו.
              </p>
              <p className="text-subhead" style={{ color: c.whiteSoft, maxWidth: "480px", margin: "0 auto" }}>
                בלי פגישות. בלי תורים. ישירות מהוואטסאפ שלך.
              </p>
            </div>
          </FadeIn>

          {/* Steps — minimal numbered rows */}
          <div style={{ marginBottom: "5rem", maxWidth: "700px", margin: "0 auto 5rem" }}>
            {[
              { num: "01", title: "הבריף", body: "שולחים הודעה בוואטסאפ — מה המוצר, מה הקהל, מה התחושה." },
              { num: "02", title: "היצירה", body: "הסוכן מתרגם לשפה ויז'ואלית ומייצר מבחר תמונות ברמת סטודיו." },
              { num: "03", title: "המסירה", body: "בוחרים, מאשרים, מקבלים קבצים מוכנים לפרסום תוך דקות." },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={0.3 + i * 0.12}>
                <div
                  className="flex gap-8 items-start"
                  style={{
                    borderTop: `1px solid ${c.line}`,
                    padding: "2rem 0",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "2rem",
                      fontWeight: 300,
                      color: c.red,
                      flexShrink: 0,
                      minWidth: "3rem",
                    }}
                  >
                    {step.num}
                  </span>
                  <div>
                    <p className="text-headline mb-2" style={{ color: c.white }}>
                      {step.title}
                    </p>
                    <p className="text-subhead" style={{ color: c.whiteSoft }}>
                      {step.body}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
            <div style={{ borderTop: `1px solid ${c.line}` }} />
          </div>

          <FadeIn delay={0.7}>
            <div className="text-center">
              <span
                className="inline-block text-label"
                style={{
                  backgroundColor: c.white,
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
          {/* Editorial name — massive outlined */}
          <FadeIn>
            <div
              className="relative overflow-hidden text-center"
              style={{
                borderTop: `1px solid ${c.line}`,
                borderBottom: `1px solid ${c.line}`,
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
                  WebkitTextStroke: `1px ${c.whiteMuted}`,
                  userSelect: "none",
                }}
              >
                TAHEL
              </p>
              <p
                className="text-label text-center mt-4"
                style={{ color: c.red, letterSpacing: "0.35em" }}
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
                  border: `1px solid ${c.line}`,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div style={{ width: "32px", height: "1px", backgroundColor: c.red }} />
                  <p className="text-label" style={{ color: c.white, letterSpacing: "0.3em" }}>
                    TAHEL KORNFELD
                  </p>
                  <p className="text-label" style={{ color: c.whiteMuted, letterSpacing: "0.2em" }}>
                    Creative AI Director
                  </p>
                  <div style={{ width: "32px", height: "1px", backgroundColor: c.red }} />
                </div>
              </div>

              {/* Stat */}
              <div className="flex items-baseline gap-4 mt-6">
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    fontWeight: 300,
                    color: c.red,
                    lineHeight: 1,
                  }}
                >
                  200+
                </span>
                <span className="text-label" style={{ color: c.whiteSoft }}>
                  פרויקטים
                </span>
              </div>
            </FadeIn>

            {/* Content */}
            <FadeIn delay={0.2} className="lg:col-span-7">
              <div style={{ paddingTop: "1rem" }}>
                <p className="text-label mb-3" style={{ color: c.red }}>
                  מאחורי AURA
                </p>
                <h2 className="text-section mb-5" style={{ color: c.white }}>
                  החתימה
                </h2>
                <span className="line-accent block mb-10" style={{ background: c.red }} />

                <p className="text-subhead mb-4" style={{ color: c.whiteSoft }}>
                  אני טהל קורנפלד — ויז'ואל סטרטגיסטית ומומחית AI יוצר.
                </p>
                <p className="text-subhead mb-10" style={{ color: c.whiteSoft }}>
                  עבודתי נמצאת בצומת שבין אינטלקט טכנולוגי לרגישות אנושית. אני לא מייצרת תמונות — אני מייצרת שפה ויז'ואלית שמותגים זוכרים.
                </p>

                {[
                  { num: "01", label: "ראייה אסטרטגית", text: "כל תמונה היא הצהרה מותגית." },
                  { num: "02", label: "דיוק טכנולוגי", text: "Runway, Kling, Sora. הכלים משתנים. הסטנדרט — לא." },
                  { num: "03", label: "רגישות אנושית", text: "AI יוצר. אני מכוונת." },
                ].map((s) => (
                  <div
                    key={s.num}
                    className="flex items-baseline gap-5"
                    style={{
                      borderTop: `1px solid ${c.line}`,
                      padding: "1.25rem 0",
                    }}
                  >
                    <span
                      className="text-label"
                      style={{ color: c.whiteMuted, flexShrink: 0, minWidth: "2rem" }}
                    >
                      {s.num}
                    </span>
                    <div>
                      <p className="text-label mb-1" style={{ color: c.red }}>
                        {s.label}
                      </p>
                      <p className="text-subhead" style={{ color: c.white }}>
                        {s.text}
                      </p>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${c.line}` }} />
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
              <p className="text-label mb-5" style={{ color: c.red }}>
                נתחיל לעבוד?
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                  fontWeight: 300,
                  letterSpacing: "0.06em",
                  color: c.white,
                  lineHeight: 1.1,
                  marginBottom: "1.5rem",
                }}
              >
                בואי נייצר משהו שיזכרו
              </h2>
              <div
                style={{
                  width: "60px",
                  height: "1px",
                  backgroundColor: c.red,
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
                  backgroundColor: c.white,
                  color: c.bg,
                  padding: "15px 52px",
                  borderRadius: "var(--radius-md)",
                  letterSpacing: "0.22em",
                }}
              >
                שליחת בריף
              </span>

              <div
                style={{
                  width: "1px",
                  height: "32px",
                  backgroundColor: c.line,
                }}
              />

              <span className="text-label" style={{ color: c.red }}>
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
          borderTop: `1px solid ${c.line}`,
          padding: "40px 0",
        }}
      >
        <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-label" style={{ color: c.red, letterSpacing: "0.3em" }}>
            AURA
          </span>
          <p className="text-label" style={{ color: c.whiteMuted }}>
            © 2025 Tahel Creative AI. כל הזכויות שמורות.
          </p>
          <p className="text-label" style={{ color: c.whiteMuted }}>
            by Tahel Kornfeld
          </p>
        </div>
      </footer>
    </div>
  );
}
