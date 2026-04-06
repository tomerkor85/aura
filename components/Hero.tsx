"use client";

import React from "react";

const allImages = [
  "/images/work/w1.jpeg",
  "/images/work/w2.jpeg",
  "/images/work/w3.png",
  "/images/work/w4.png",
  "/images/work/w5.jpg",
  "/images/work/w6.jpg",
  "/images/work/w7.jpg",
  "/images/work/w8.jpg",
  "/images/work/w9.jpg",
  "/images/work/w10.jpg",
  "/images/work/w11.jpg",
  "/images/work/w12.jpg",
  "/images/work/w13.jpg",
  "/images/work/w14.jpg",
  "/images/work/w15.jpg",
  "/images/work/w16.jpg",
  "/images/work/w17.jpg",
  "/images/work/w18.jpg",
  "/images/work/w19.png",
  "/images/work/w20.jpeg",
  "/images/work/w21.png",
  "/images/work/w22.png",
  "/images/work/w23.png",
  "/images/work/w24.png",
  "/images/work/w25.png",
  "/images/work/w26.png",
  "/images/work/w27.png",
  "/images/work/w28.png",
  "/images/work/w29.png",
  "/images/work/w30.png",
  "/images/work/w31.png",
  "/images/work/w32.png",
  "/images/work/w33.png",
  "/images/work/w34.png",
  "/images/work/w35.png",
  "/images/work/w36.png",
  "/images/work/w37.png",
  "/images/work/w38.png",
  "/images/work/w39.png",
  "/images/work/w40.png",
  "/images/work/w41.png",
  "/images/work/w42.png",
  "/images/work/w43.png",
  "/images/work/w44.png",
  "/images/work/w45.png",
  "/images/work/w46.png",
  "/images/work/w47.png",
  "/images/work/w48.png",
  "/images/work/w49.png",
  "/images/work/w50.png",
  "/images/work/w51.png",
  "/images/work/w52.png",
  "/images/work/w53.png",
  "/images/work/w54.png",
  "/images/work/w55.png",
  "/images/work/w56.png",
  "/images/work/w57.png",
  "/images/work/w58.png",
  "/images/work/w59.png",
  "/images/work/w60.png",
  "/images/work/w61.png",
  "/images/work/w62.png",
  "/images/work/w63.png",
  "/images/work/w64.png",
  "/images/work/w65.png",
  "/images/work/w66.png",
  "/images/work/w67.png",
];

const GAP = 6;
const ROWS = 4;

const row1: string[] = [];
const row2: string[] = [];
const row3: string[] = [];
const row4: string[] = [];

allImages.forEach((src, i) => {
  [row1, row2, row3, row4][i % ROWS].push(src);
});

function repeatUntilWide(images: string[], minItems: number) {
  const out: string[] = [];
  while (out.length < minItems) {
    out.push(...images);
  }
  return out;
}

type MarqueeRowProps = {
  images: string[];
  direction: "left" | "right";
  duration: string;
};

function MarqueeRow({ images, direction, duration }: MarqueeRowProps) {
  const base = repeatUntilWide(images, 24);
  const doubled = [...base, ...base];

  return (
    <div className="hero-row">
      <div
        className={`hero-track ${direction === "left" ? "hero-track-left" : "hero-track-right"}`}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {doubled.map((src, i) => (
          <div className="hero-tile" key={`${direction}-${i}-${src}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              draggable={false}
              loading={i < 8 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      aria-label="AURA — Creative AI Portfolio"
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          gap: GAP,
          padding: GAP,
        }}
      >
        <MarqueeRow images={row1} direction="left" duration="80s" />
        <MarqueeRow images={row2} direction="right" duration="92s" />
        <MarqueeRow images={row3} direction="left" duration="86s" />
        <MarqueeRow images={row4} direction="right" duration="98s" />
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to right, var(--void-black) 0%, transparent 12%, transparent 88%, var(--void-black) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 55% at center, rgba(26,24,20,0.68) 0%, rgba(26,24,20,0.28) 50%, transparent 100%)",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 70% at center, rgba(26,24,20,0.42) 0%, rgba(26,24,20,0.82) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.03,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(240,232,223,0.25) 2px, rgba(240,232,223,0.25) 3px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 2rem",
        }}
      >
        <span className="text-label" style={{ color: "var(--amber-wood)" }}>
          Creative AI Visual Studio
        </span>

        <h1
          className="text-hero"
          style={{
            color: "var(--linen-white)",
            textShadow: "0 4px 80px rgba(0,0,0,0.6)",
          }}
        >
          AURA
        </h1>

        <p
          className="text-label"
          style={{
            color: "var(--caramel)",
            letterSpacing: "0.35em",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            marginTop: "0.5rem",
          }}
        >
          by Tahel Creative AI
        </p>

        <p
          className="text-subhead"
          style={{
            color: "var(--sand-drift)",
            marginTop: "2rem",
            maxWidth: "28rem",
          }}
        >
          יצירה ויזואלית ברמה שלא הכרתם — AI, דיוק, ואסתטיקה
        </p>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          className="text-label"
          style={{ color: "var(--walnut-brown)", writingMode: "vertical-rl" }}
        >
          SCROLL
        </span>
        <div className="scroll-cue-line" />
      </div>
    </section>
  );
}
