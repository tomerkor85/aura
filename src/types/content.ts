export interface NavLink {
  label: string
  href: string
}

export interface Stat {
  value: string
  label: string
}

export interface Bullet {
  icon: string
  text: string
}

export interface ServiceCard {
  id: string
  icon: string
  title: string
  description: string
  layout: 'large' | 'small'
  variant: 'dark' | 'accent' | 'muted'
  imageUrl: string
  backgroundOpacity: number
}

export interface Location {
  city: string
  address: string
}

export interface SocialLinks {
  instagram: string
  linkedin: string
  behance: string
}

export type HeroLayoutMode = 'text-only' | 'image-bg' | 'video-bg' | 'image-grid' | 'floating-cards'

export interface FloatingCardImage {
  src: string
  alt?: string
}

export interface SiteContent {
  nav: {
    logo: string
    links: NavLink[]
    ctaButton: string
  }
  hero: {
    badge: string
    title: string
    titleItalic: string
    subtitle: string
    ctaButton: string
    layoutMode: HeroLayoutMode
    backgroundImage: string
    backgroundVideo: string
    backgroundOpacity: number
    gridImages: string[]
    floatingCards: FloatingCardImage[]
  }
  gap: {
    imageUrl: string
    floatingCardText: string
    heading: string
    headingHighlight: string
    headingSuffix: string
    description: string
    stats: Stat[]
  }
  solution: {
    title: string
    description: string
    bullets: Bullet[]
    imageUrl: string
  }
  services: {
    title: string
    subtitle: string
    cards: ServiceCard[]
  }
  about: {
    badge: string
    title: string
    titleItalic: string
    description: string
    quote: string
    quoteAuthor: string
    imageUrl: string
  }
  contact: {
    title: string
    titleHighlight: string
    description: string
    whatsappNumber: string
    whatsappLabel: string
    whatsappStatus: string
    socialLinks: SocialLinks
    locations: Location[]
    formSubjects: string[]
    submitButton: string
  }
  footer: {
    logo: string
    links: NavLink[]
    copyright: string
    tagline: string
  }
}
