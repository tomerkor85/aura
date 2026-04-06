import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURA by Tahel | Creative AI",
  description: "ויז'ואל סטרטגיסטית. AI יוצר. הצומת בין טכנולוגיה לרגישות אנושית.",
  keywords: ["AI", "creative", "visual strategy", "Tahel", "AURA", "generative art"],
  openGraph: {
    title: "AURA by Tahel | Creative AI",
    description: "ויז'ואל סטרטגיסטית. AI יוצר. הצומת בין טכנולוגיה לרגישות אנושית.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body
        style={
          {
            "--font-heading": "var(--font-cormorant)",
            "--font-body": "var(--font-dm-sans)",
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
