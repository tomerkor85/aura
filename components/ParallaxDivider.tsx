"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxDividerProps {
  src: string;
  alt: string;
  height?: string;
  overlayText?: string;
  overlaySubtext?: string;
}

export default function ParallaxDivider({
  src,
  alt,
  height = "50vh",
  overlayText,
  overlaySubtext,
}: ParallaxDividerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const clipProgress = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [8, 0, 0, 8]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{
        height,
        clipPath: "inset(0)",
      }}
    >
      {/* Parallax image */}
      <motion.div
        className="absolute inset-0"
        style={{
          y,
          scale,
          top: "-20%",
          bottom: "-20%",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          quality={80}
          style={{ objectFit: "cover" }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,24,20,0.6) 0%, rgba(26,24,20,0.3) 50%, rgba(26,24,20,0.6) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Scan-line overlay (AI feel) */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(200,144,96,0.15) 3px, rgba(200,144,96,0.15) 4px)",
        }}
        aria-hidden="true"
      />

      {/* Optional text overlay */}
      {overlayText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              fontWeight: 300,
              color: "var(--linen-white)",
              letterSpacing: "0.08em",
              lineHeight: 1.15,
              textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            }}
          >
            {overlayText}
          </motion.p>
          {overlaySubtext && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-label mt-4"
              style={{
                color: "var(--caramel)",
                letterSpacing: "0.3em",
                textShadow: "0 2px 15px rgba(0,0,0,0.4)",
              }}
            >
              {overlaySubtext}
            </motion.p>
          )}
        </div>
      )}

      {/* Top / bottom edge lines */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: "1px", background: "rgba(200, 144, 96, 0.2)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "1px", background: "rgba(200, 144, 96, 0.2)" }}
        aria-hidden="true"
      />
    </div>
  );
}
