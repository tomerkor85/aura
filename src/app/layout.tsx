import type { Metadata } from 'next'
import ScrollProvider from '@/components/ScrollProvider'
import MosaicLayer from '@/components/MosaicLayer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aura by Tahel Creative AI',
  description: 'אורה — שפה ויזואלית מדויקת לעסקים. תמונות AI, תוכן ויזואלי, קמפיינים מותגיים.',
  openGraph: {
    title: 'Aura by Tahel Creative AI',
    description: 'אורה — שפה ויזואלית מדויקת לעסקים.',
    locale: 'he_IL',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <ScrollProvider>
          <MosaicLayer />
          <div className="content-layer">{children}</div>
        </ScrollProvider>
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  )
}
