"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: 1,
    num: "01",
    title: "קמפיין מותג",
    subtitle: "זהות ויז'ואל לסטארט-אפ B2B",
    tag: "Brand Identity",
    src: "/images/gallery/1-brand.png",
  },
  {
    id: 2,
    num: "02",
    title: "מוצר 3D",
    subtitle: "ויז'ואליזציה היפר-ריאליסטית",
    tag: "Product Imagery",
    src: "/images/gallery/2-product.png",
  },
  {
    id: 3,
    num: "03",
    title: "קמפיין סושיאל",
    subtitle: "שפה ויז'ואלית עקבית לאינסטגרם",
    tag: "Campaign Art",
    src: "/images/gallery/3-campaign.png",
  },
  {
    id: 4,
    num: "04",
    title: "אופנה",
    subtitle: "לוק-בוק דיגיטלי — קיץ 2025",
    tag: "Fashion Editorial",
    src: "/images/gallery/4-fashion.png",
  },
  {
    id: 5,
    num: "05",
    title: "יוקרה",
    subtitle: "הדמיות AI לעולם הפרימיום",
    tag: "Luxury Branding",
    src: "/images/gallery/5-luxury.png",
  },
];

function Strip({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isFlipped = index % 2 === 1;

  /* Per-strip parallax */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.9, delay: index * 0.06 }}
      className="group relative"
      style={{ borderTop: "1px solid rgba(92, 61, 40, 0.22)" }}
      role="article"
      aria-label={`פרויקט: ${project.title}`}
    >
      <div
        className="flex flex-col md:flex-row"
        style={{
          flexDirection: isFlipped ? "row-reverse" : "row",
          minHeight: "420px",
        }}
      >
        {/* ── Image column ─────────────────────────── */}
        <div
          className="relative overflow-hidden w-full md:w-[58%] shrink-0"
          style={{ minHeight: "320px" }}
          aria-hidden="true"
        >
            <motion.div
              className="absolute inset-0"
              style={{
                y: imgY,
                scale: imgScale,
                top: "-10%",
                bottom: "-10%",
              }}
            >
              <Image
                src={project.src}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                quality={80}
                style={{ objectFit: "cover" }}
              />
            </motion.div>

            {/* Hover overlay with scan lines */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(160,98,46,0.04) 2px, rgba(160,98,46,0.04) 3px)",
              }}
              aria-hidden="true"
            />

            {/* Thin bottom tag */}
            <div
              className="absolute bottom-0 left-0 right-0 px-8 py-4 flex justify-end"
              style={{
                borderTop: "1px solid rgba(92, 61, 40, 0.18)",
                background: "linear-gradient(to top, rgba(26,24,20,0.6), transparent)",
              }}
            >
              <span
                className="text-label"
                style={{ color: "var(--caramel)" }}
              >
                {project.tag}
              </span>
            </div>
        </div>

        {/* ── Text column ──────────────────────────── */}
        <div
          className="flex flex-col justify-between px-10 py-10 w-full md:w-[42%] shrink-0"
        >
          {/* Top: number + title */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.06 + 0.2 }}
              className="text-label mb-6"
              style={{ color: "var(--walnut-brown)" }}
            >
              {project.num}
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.06 + 0.28 }}
              className="text-section"
              style={{ color: "var(--linen-white)", lineHeight: 1.05 }}
            >
              {project.title}
            </motion.h3>
          </div>

          {/* Bottom: subtitle + CTA */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.06 + 0.45 }}
              className="text-subhead mb-8"
              style={{ color: "var(--sand-drift)" }}
            >
              {project.subtitle}
            </motion.p>

            <span
              className="text-label inline-flex items-center gap-3 transition-colors duration-200"
              style={{
                color: "var(--amber-wood)",
                borderBottom: "1px solid rgba(160, 98, 46, 0.3)",
                paddingBottom: "4px",
              }}
            >
              צפה בעבודה
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Gallery() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      style={{
        paddingTop: "var(--space-section)",
        backgroundColor: "var(--void-black)",
      }}
    >
      {/* Section heading */}
      <div className="site-container">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0, 0, 1] }}
          className="section-intro"
          style={{ marginBottom: "4rem" }}
        >
          <p className="text-label mb-4" style={{ color: "var(--amber-wood)" }}>
            עבודות נבחרות
          </p>
          <h2
            id="gallery-heading"
            className="text-section"
            style={{ color: "var(--linen-white)" }}
          >
            הגלריה המדויקת
          </h2>
          <span className="line-accent mt-6 block" aria-hidden="true" />
        </motion.div>
      </div>

      {/* Full-width strips */}
      <div
        style={{
          borderBottom: "1px solid rgba(92, 61, 40, 0.22)",
          paddingBottom: "0",
        }}
      >
        {projects.map((project, i) => (
          <Strip key={project.id} project={project} index={i} />
        ))}
      </div>

      <div style={{ height: "var(--space-section)" }} />
    </section>
  );
}
