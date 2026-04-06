"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [name, setName] = useState("");
  const [brief, setBrief] = useState("");
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgGridY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !brief.trim()) return;
    setSent(true);
  };

  const lineStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${
      focused === field ? "var(--caramel)" : "rgba(92, 61, 40, 0.45)"
    }`,
    padding: "1rem 0",
    color: "var(--linen-white)",
    fontFamily: "var(--font-body)",
    fontSize: "1.1rem",
    letterSpacing: "0.04em",
    outline: "none",
    transition: "border-color 250ms",
    display: "block",
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="relative overflow-hidden"
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
        backgroundColor: "var(--deep-umber)",
      }}
    >
      {/* ── AI Background — radial dot grid ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ y: bgGridY }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(200,144,96,0.5) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </motion.div>

      {/* ── Vertical accent lines ── */}
      <div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 hidden lg:block"
        style={{
          width: "1px",
          background:
            "linear-gradient(to bottom, transparent, rgba(160,98,46,0.08), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="site-container relative" style={{ maxWidth: "880px" }}>
        {/* ── Big statement heading ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center"
          style={{ marginBottom: "5rem" }}
        >
          <p
            className="text-label mb-5"
            style={{ color: "var(--amber-wood)" }}
          >
            נתחיל לעבוד?
          </p>
          <h2
            id="contact-heading"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 300,
              letterSpacing: "0.06em",
              color: "var(--linen-white)",
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
              backgroundColor: "var(--amber-wood)",
              margin: "0 auto",
            }}
            aria-hidden="true"
          />
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                fontWeight: 300,
                color: "var(--caramel)",
                letterSpacing: "0.08em",
              }}
            >
              קיבלתי. אחזור אליך בקרוב.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            noValidate
            aria-label="טופס יצירת קשר"
          >
            {/* Name */}
            <div style={{ marginBottom: "2.5rem" }}>
              <label
                htmlFor="contact-name"
                className="text-label block mb-2"
                style={{ color: "var(--sand-drift)" }}
              >
                שם
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                autoComplete="name"
                required
                aria-required="true"
                placeholder="השם שלך"
                style={lineStyle("name")}
              />
            </div>

            {/* Brief */}
            <div style={{ marginBottom: "3.5rem" }}>
              <label
                htmlFor="contact-brief"
                className="text-label block mb-2"
                style={{ color: "var(--sand-drift)" }}
              >
                הבריף שלך
              </label>
              <textarea
                id="contact-brief"
                rows={4}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                onFocus={() => setFocused("brief")}
                onBlur={() => setFocused(null)}
                required
                aria-required="true"
                placeholder="ספרי לי על הפרויקט, המותג, מה את מחפשת..."
                style={{ ...lineStyle("brief"), resize: "none" }}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
              <button
                type="submit"
                className="cursor-pointer text-label transition-colors duration-200"
                style={{
                  backgroundColor: "var(--linen-white)",
                  color: "var(--void-black)",
                  padding: "15px 52px",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  letterSpacing: "0.22em",
                  width: "100%",
                  maxWidth: "260px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--sand-drift)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--linen-white)")
                }
              >
                שליחה
              </button>

              <div
                style={{
                  width: "1px",
                  height: "32px",
                  backgroundColor: "rgba(92, 61, 40, 0.35)",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-label cursor-pointer transition-colors duration-200 flex items-center gap-2"
                style={{ color: "var(--caramel)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--linen-white)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--caramel)")
                }
                aria-label="פנייה ישירה בוואטסאפ"
              >
                <span>WhatsApp</span>
                <span
                  style={{
                    display: "inline-block",
                    width: "16px",
                    height: "1px",
                    backgroundColor: "currentColor",
                    transition: "width 200ms",
                  }}
                  aria-hidden="true"
                />
              </a>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
