'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/**
 * Each image is pinned to a fixed region of the hero viewport.
 * It starts tiny (far depth) and scales toward the viewer,
 * then blurs + fades as it "passes" the camera.
 *
 * top / left  — position in % of the hero container
 * w / h       — final card dimensions in px (spread covers full viewport)
 * delay       — stagger so images arrive sequentially
 * dur         — flight duration
 * driftX/Y    — subtle pixel drift toward center as image approaches
 */
/** vw = width as % of viewport, ar = height/width aspect ratio.
 *  Width is fluid: clamp(vw*5px, vw_vw, vw*24px) — tiny on mobile, huge on desktop.
 */
const FLY_IMAGES = [
  // ── top-left corner ──
  { src: '/images/w2.webp',  top: '4%',  left: '1%',  vw: 22, ar: 1.32, delay: 0,    dur: 2.9, driftX:  30, driftY:  18 },
  // ── top-center-left ──
  { src: '/images/w5.webp',  top: '2%',  left: '22%', vw: 30, ar: 1.31, delay: 0.35, dur: 2.7, driftX:  10, driftY:  24 },
  // ── top-right ──
  { src: '/images/w15.webp', top: '3%',  left: '66%', vw: 25, ar: 1.33, delay: 0.15, dur: 3.0, driftX: -28, driftY:  20 },
  // ── far-right ──
  { src: '/images/w22.webp', top: '28%', left: '74%', vw: 27, ar: 1.31, delay: 0.7,  dur: 2.8, driftX: -36, driftY:   8 },
  // ── far-left ──
  { src: '/images/w10.webp', top: '33%', left: '0%',  vw: 22, ar: 1.32, delay: 0.55, dur: 2.9, driftX:  34, driftY:   6 },
  // ── bottom-left ──
  { src: '/images/w37.webp', top: '64%', left: '3%',  vw: 26, ar: 1.32, delay: 1.2,  dur: 2.7, driftX:  24, driftY: -22 },
  // ── bottom-center ──
  { src: '/images/w53.webp', top: '68%', left: '32%', vw: 32, ar: 1.31, delay: 1.55, dur: 2.9, driftX:   4, driftY: -28 },
  // ── bottom-right ──
  { src: '/images/w67.webp', top: '62%', left: '68%', vw: 24, ar: 1.32, delay: 1.85, dur: 2.8, driftX: -24, driftY: -20 },
  // ── right-center (extra depth layer) ──
  { src: '/images/w1.webp',  top: '18%', left: '52%', vw: 19, ar: 1.33, delay: 0.9,  dur: 2.6, driftX: -16, driftY:  12 },
  // ── left-center extra ──
  { src: '/images/w31.webp', top: '50%', left: '16%', vw: 18, ar: 1.31, delay: 1.0,  dur: 2.7, driftX:  18, driftY: -12 },
];

// last image: delay 1.85 + dur 2.8 = 4.65s → reveal at 5.1s
const REVEAL_MS = 5100;

export default function HeroSection() {
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReveal(true), REVEAL_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero" id="hero">

      {/* ── Warm ambient glow — fades in with reveal ── */}
      <motion.div
        className="hero-ambient"
        initial={{ opacity: 0 }}
        animate={{ opacity: reveal ? 1 : 0 }}
        transition={{ duration: 2.4, ease: 'easeOut' }}
        aria-hidden="true"
      />


      {/* ── Flying images: spread across full hero ── */}
      <div className="hero-stage" aria-hidden="true">
        {FLY_IMAGES.map((img) => (
          <motion.div
            key={img.src}
            className="fly-card"
            style={{
              top:    img.top,
              left:   img.left,
              width:  `clamp(${Math.round(img.vw * 5)}px, ${img.vw}vw, ${Math.round(img.vw * 24)}px)`,
              aspectRatio: `1 / ${img.ar}`,
            }}
            initial={{
              scale:   0.045,
              opacity: 0,
              x:       0,
              y:       0,
              filter:  'blur(2px)',
            }}
            animate={{
              // 3 keyframes: far → mid → passing camera
              scale:   [0.045, 0.55,       2.8],
              opacity: [0,     1,           0  ],
              x:       [0,     img.driftX * 0.5, img.driftX],
              y:       [0,     img.driftY * 0.5, img.driftY],
              filter:  ['blur(2px)', 'blur(0px)', 'blur(16px)'],
            }}
            transition={{
              duration: img.dur,
              delay:    img.delay,
              times:    [0, 0.42, 1],
              ease:     'easeInOut',
            }}
          >
            <Image
              src={img.src}
              alt=""
              fill
              sizes="260px"
              style={{ objectFit: 'cover' }}
            />
            <div className="fly-card-shine" />
          </motion.div>
        ))}
      </div>

      {/* ── Logo + headline reveal ── */}
      <AnimatePresence>
        {reveal && (
          <motion.div
            className="hero-final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
          >
            {/* Eclipse logo mark — the one from template/12.48.35 */}
            <motion.div
              className="hero-mark-wrap"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/lologo.png"
                alt="Aura"
                width={360}
                height={360}
                priority
                style={{
                  mixBlendMode: 'screen',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              AI, when it&apos;s precise.
            </motion.h1>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              VISUAL CONTENT. BRANDING. AI CREATION.
            </motion.p>

            <motion.a
              className="hero-cta"
              href="#work"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              EXPLORE WORK <span className="hero-arrow">→</span>
            </motion.a>

            <motion.div
              className="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ duration: 1, delay: 1.7 }}
              aria-hidden="true"
            >
              ∨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
