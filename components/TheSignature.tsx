"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const statements = [
  {
    num: "01",
    label: "ראייה אסטרטגית",
    text: "כל תמונה היא הצהרה מותגית.",
  },
  {
    num: "02",
    label: "דיוק טכנולוגי",
    text: "Runway, Kling, Sora. הכלים משתנים. הסטנדרט — לא.",
  },
  {
    num: "03",
    label: "רגישות אנושית",
    text: "AI יוצר. אני מכוונת.",
  },
];

export default function TheSignature() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Parallax on the TAHEL editorial text */
  const nameX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 1, 1, 0.2]);

  return (
    <section
      id="signature"
      ref={sectionRef}
      aria-labelledby="signature-heading"
      className="relative overflow-hidden"
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
        backgroundColor: "var(--void-black)",
      }}
    >
      {/* ── AI ambient background — floating particles ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(200,144,96,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="site-container">
        {/* ── Full-width name header ─────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative overflow-hidden"
          style={{
            borderTop: "1px solid rgba(92, 61, 40, 0.25)",
            borderBottom: "1px solid rgba(92, 61, 40, 0.25)",
            paddingTop: "2rem",
            paddingBottom: "2rem",
            marginBottom: "5rem",
          }}
          aria-hidden="true"
        >
          {/* "TAHEL" — parallax scroll movement */}
          <motion.p
            style={{
              x: nameX,
              opacity: nameOpacity,
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(5rem, 16vw, 18rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 0.85,
              color: "transparent",
              WebkitTextStroke: "1px rgba(160, 98, 46, 0.35)",
              textAlign: "center",
              userSelect: "none",
            }}
          >
            TAHEL
          </motion.p>
          <p
            className="text-label text-center mt-4"
            style={{ color: "var(--caramel)", letterSpacing: "0.35em" }}
          >
            KORNFELD
          </p>
        </motion.div>

        {/* ── Two-column: portrait + content ────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Portrait — 5 columns — now with real image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div
              style={{
                aspectRatio: "3/4",
                borderRadius: "var(--radius-lg)",
                border: "1px solid rgba(92, 61, 40, 0.35)",
                overflow: "hidden",
                position: "relative",
              }}
              role="img"
              aria-label="תמונת פורטרט של טהל קורנפלד"
            >
              <Image
                src="/images/dividers/portrait.png"
                alt="Tahel Kornfeld — Creative AI Director"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                quality={85}
                style={{ objectFit: "cover" }}
              />

              {/* Subtle overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, transparent 40%, rgba(26,24,20,0.4) 100%)",
                }}
                aria-hidden="true"
              />

              {/* AI scan-line on hover */}
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(200,144,96,0.06) 3px, rgba(200,144,96,0.06) 4px)",
                }}
                aria-hidden="true"
              />
            </div>

            {/* Stat below portrait */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex items-baseline gap-4 mt-6"
              aria-label="מעל 200 פרויקטים"
            >
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 300,
                  color: "var(--caramel)",
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                }}
              >
                200+
              </span>
              <span
                className="text-label"
                style={{ color: "var(--sand-drift)" }}
              >
                פרויקטים
              </span>
            </motion.div>
          </motion.div>

          {/* Content — 7 columns */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-between"
            style={{ paddingTop: "1rem" }}
          >
            {/* Section heading */}
            <div className="mb-10">
              <p
                className="text-label mb-3"
                style={{ color: "var(--amber-wood)" }}
              >
                מאחורי AURA
              </p>
              <h2
                id="signature-heading"
                className="text-section"
                style={{ color: "var(--linen-white)" }}
              >
                החתימה
              </h2>
              <span className="line-accent mt-5 block" aria-hidden="true" />
            </div>

            {/* Bio */}
            <div style={{ marginBottom: "3rem" }}>
              <p
                className="text-subhead mb-4"
                style={{ color: "var(--sand-drift)" }}
              >
                אני טהל קורנפלד — ויז'ואל סטרטגיסטית ומומחית AI יוצר.
              </p>
              <p
                className="text-subhead"
                style={{ color: "var(--sand-drift)" }}
              >
                עבודתי נמצאת בצומת שבין אינטלקט טכנולוגי לרגישות אנושית. אני
                לא מייצרת תמונות — אני מייצרת שפה ויז'ואלית שמותגים זוכרים.
              </p>
            </div>

            {/* Three statements */}
            <div>
              {statements.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.65 }}
                  className="flex items-baseline gap-5"
                  style={{
                    borderTop: "1px solid rgba(92, 61, 40, 0.2)",
                    padding: "1.25rem 0",
                  }}
                >
                  <span
                    className="text-label"
                    style={{
                      color: "var(--walnut-brown)",
                      flexShrink: 0,
                      minWidth: "2rem",
                    }}
                  >
                    {s.num}
                  </span>
                  <div>
                    <p
                      className="text-label mb-1"
                      style={{ color: "var(--caramel)" }}
                    >
                      {s.label}
                    </p>
                    <p
                      className="text-subhead"
                      style={{ color: "var(--linen-white)" }}
                    >
                      {s.text}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div
                style={{ borderTop: "1px solid rgba(92, 61, 40, 0.2)" }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
