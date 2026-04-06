"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "הבריף",
    body: "שולחים הודעה בוואטסאפ — מה המוצר, מה הקהל, מה התחושה.",
  },
  {
    num: "02",
    title: "היצירה",
    body: "הסוכן מתרגם לשפה ויז'ואלית ומייצר מבחר תמונות ברמת סטודיו.",
  },
  {
    num: "03",
    title: "המסירה",
    body: "בוחרים, מאשרים, מקבלים קבצים מוכנים לפרסום תוך דקות.",
  },
];

export default function TheSystem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Floating grid pattern moves with scroll */
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      id="system"
      ref={sectionRef}
      aria-labelledby="system-heading"
      className="relative overflow-hidden"
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
        backgroundColor: "var(--deep-umber)",
      }}
    >
      {/* ── AI Background Pattern — data grid ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ y: gridY }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(200,144,96,0.4) 60px, rgba(200,144,96,0.4) 61px),
              repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(200,144,96,0.4) 60px, rgba(200,144,96,0.4) 61px)
            `,
          }}
        />
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(200,144,96,0.5) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </motion.div>

      {/* ── Vertical accent lines on sides ── */}
      <div
        className="absolute top-0 bottom-0 hidden lg:block"
        style={{
          right: "8%",
          width: "1px",
          background: "linear-gradient(to bottom, transparent, rgba(160,98,46,0.15), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 bottom-0 hidden lg:block"
        style={{
          left: "8%",
          width: "1px",
          background: "linear-gradient(to bottom, transparent, rgba(160,98,46,0.15), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="site-container relative">
        {/* Centered section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-intro"
        >
          <p className="text-label mb-4" style={{ color: "var(--amber-wood)" }}>
            הסוכן החכם
          </p>
          <h2
            id="system-heading"
            className="text-section"
            style={{ color: "var(--linen-white)" }}
          >
            המערכת
          </h2>
          <span className="line-accent mt-6 block" aria-hidden="true" />
        </motion.div>

        {/* ── Main statement ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-center"
          style={{ marginBottom: "5rem" }}
        >
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
              fontWeight: 300,
              color: "var(--linen-white)",
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
            style={{
              color: "var(--sand-drift)",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            בלי פגישות. בלי תורים. ישירות מהוואטסאפ שלך.
          </p>
        </motion.div>

        {/* ── Three steps ────────────────────────────── */}
        <div className="relative" style={{ marginBottom: "5rem" }}>
          {/* Connecting line — desktop only */}
          <div
            className="hidden lg:block absolute"
            style={{
              top: "2rem",
              right: "calc(16.666% + 1rem)",
              left: "calc(16.666% + 1rem)",
              height: "1px",
              backgroundColor: "rgba(92, 61, 40, 0.4)",
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                className="text-center flex flex-col items-center gap-5"
              >
                {/* Step circle with pulse ring */}
                <div className="relative">
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      borderRadius: "50%",
                      border: "1px solid rgba(200, 144, 96, 0.3)",
                    }}
                    animate={{
                      scale: [1, 1.5],
                      opacity: [0.4, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: "easeOut",
                    }}
                    aria-hidden="true"
                  />
                  <div
                    style={{
                      width: "4rem",
                      height: "4rem",
                      borderRadius: "50%",
                      border: "1px solid rgba(92, 61, 40, 0.6)",
                      backgroundColor: "var(--void-black)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      zIndex: 1,
                    }}
                    aria-hidden="true"
                  >
                    <span
                      className="text-label"
                      style={{ color: "var(--caramel)" }}
                    >
                      {step.num}
                    </span>
                  </div>
                </div>

                <div>
                  <p
                    className="text-headline mb-3"
                    style={{ color: "var(--linen-white)" }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="text-subhead"
                    style={{
                      color: "var(--sand-drift)",
                      maxWidth: "260px",
                      margin: "0 auto",
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center"
        >
          <a
            href="#contact"
            className="cursor-pointer inline-block text-label transition-colors duration-200"
            style={{
              backgroundColor: "var(--linen-white)",
              color: "var(--void-black)",
              padding: "14px 48px",
              borderRadius: "var(--radius-md)",
              letterSpacing: "0.22em",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--sand-drift)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--linen-white)")
            }
          >
            שלחי בריף ראשון
          </a>
        </motion.div>
      </div>
    </section>
  );
}
