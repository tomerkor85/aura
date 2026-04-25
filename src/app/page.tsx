import { readFileSync } from 'fs'
import { join } from 'path'
import { SiteContent } from '@/types/content'
import NavBar from '@/components/site/NavBar'
import HeroSection from '@/components/site/HeroSection'
import GapSection from '@/components/site/GapSection'
import SolutionSection from '@/components/site/SolutionSection'
import ServicesGrid from '@/components/site/ServicesGrid'
import AboutSection from '@/components/site/AboutSection'
import ContactSection from '@/components/site/ContactSection'
import SiteFooter from '@/components/site/SiteFooter'

export const dynamic = 'force-dynamic'

function getContent(): SiteContent {
  const path = join(process.cwd(), 'data', 'content.json')
  return JSON.parse(readFileSync(path, 'utf-8'))
}

export default function Home() {
  const content = getContent()

  return (
    <>
      <NavBar nav={content.nav} />
      <main>
        <HeroSection hero={content.hero} />
        <GapSection gap={content.gap} />
        <SolutionSection solution={content.solution} />
        <ServicesGrid services={content.services} />
        <AboutSection about={content.about} />
        <ContactSection contact={content.contact} />
      </main>
      <SiteFooter footer={content.footer} />
    </>
  )
}
