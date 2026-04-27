import Image from "next/image";
import HeroSection from "@/components/HeroSection";

const services = [
  {
    name: "AI Imagery",
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 4l2 2-13 13-2-2z" />
        <path d="M24 8l2 2" />
        <path d="M9 19l-4 11 11-4" />
        <circle cx="27" cy="6" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="31" cy="10" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="29" cy="3" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "AI Videos",
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="17" cy="17" r="13" />
        <polygon points="14,12 14,22 24,17" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Branding & Identity",
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 4l7 7-17 17H6v-7z" />
        <path d="M19 8l7 7" />
      </svg>
    ),
  },
  {
    name: "Catalogs & Print",
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 6h9a5 5 0 010 10H6V6z" />
        <path d="M15 16h4a5 5 0 010 10H6V16" />
        <path d="M28 6v22" />
      </svg>
    ),
  },
  {
    name: "Social Media Content",
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 29s-12-7-12-16a7 7 0 0114 0 7 7 0 0114 0c0 9-12 16-16 16z" />
      </svg>
    ),
  },
  {
    name: "Logo & Branding",
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13" cy="17" r="8" />
        <circle cx="21" cy="17" r="8" />
      </svg>
    ),
  },
];

const work = [
  { title: "Campaign Visuals",    type: "AI Imagery",          image: "/images/w1.webp"  },
  { title: "Product Videos",      type: "AI Videos",           image: "/images/w5.webp"  },
  { title: "Branding Project",    type: "Branding & Identity", image: "/images/w24.webp" },
  { title: "Social Media Content",type: "Content Creation",    image: "/images/w37.webp" },
  { title: "Print Design",        type: "Catalogs & Print",    image: "/images/w53.webp" },
  { title: "Logo & Branding",     type: "Branding & Identity", image: "/images/w67.webp" },
];

const mosaicImages = [
  "/images/w2.webp",
  "/images/w10.webp",
  "/images/w15.webp",
  "/images/w22.webp",
  "/images/w31.webp",
];

const process = [
  { number: "01", title: "Discover", copy: "We dive into your vision, goals and audience."        },
  { number: "02", title: "Create",   copy: "AI-powered creation and visual development."           },
  { number: "03", title: "Refine",   copy: "We perfect every detail until it's right."             },
  { number: "04", title: "Deliver",  copy: "Final delivery in all formats you need."               },
];

export default function HomePage() {
  return (
    <main className="site-shell">

      {/* ─── NAVBAR ─── */}
      <header className="topbar">
        <a className="brand-wordmark" href="#hero">A U R A</a>
        <nav className="topnav" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
          <button className="menu-btn" aria-label="Open menu">
            <span /><span />
          </button>
        </nav>
      </header>

      {/* ─── HERO (animated) ─── */}
      <HeroSection />

      {/* ─── ABOUT ─── */}
      <section className="section about-section" id="about">
        <div className="about-text">
          <p className="section-label">About Aura</p>
          <h2>We turn ideas into powerful visual experiences.</h2>
          <p>
            Combining AI-generated imagery and videos with creative direction
            and branding to build visual identity that stands out.
          </p>
          <a className="btn-outline" href="#contact">LEARN MORE →</a>
        </div>
        <div className="about-mosaic">
          {mosaicImages.map((src, i) => (
            <div className={`mosaic-item mosaic-item-${i + 1}`} key={src}>
              <Image src={src} alt="" fill sizes="33vw" style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="section services-section" id="services">
        <p className="section-label">Services</p>
        <div className="services-row">
          {services.map((s) => (
            <div className="service-card" key={s.name}>
              <div className="service-icon">{s.icon}</div>
              <p className="service-name">{s.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WORK ─── */}
      <section className="section work-section" id="work">
        <div className="work-header">
          <p className="section-label">Selected Work</p>
          <a className="text-link-arrow" href="#contact">VIEW ALL WORK →</a>
        </div>
        <div className="work-grid">
          {work.map((item) => (
            <article className="work-card" key={item.title}>
              <div className="work-img">
                <Image src={item.image} alt={item.title} fill sizes="33vw" style={{ objectFit: "cover" }} />
              </div>
              <div className="work-meta">
                <p className="work-title">{item.title}</p>
                <p className="work-type">{item.type.toUpperCase()}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="section process-section" id="process">
        <div className="process-left">
          <p className="section-label">Our Process</p>
          <h2>Strategy. Creativity. AI Precision.</h2>
          <p>
            A seamless process that combines creative direction with the power
            of AI to deliver impactful results.
          </p>
          <a className="btn-outline" href="#contact">VIEW PROCESS →</a>
        </div>
        <div className="process-steps">
          {process.map((step) => (
            <div className="process-step" key={step.number}>
              <p className="step-number">{step.number}</p>
              <div className="step-divider" />
              <p className="step-title">{step.title.toUpperCase()}</p>
              <p className="step-copy">{step.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BIO ─── */}
      <section className="section bio-section">
        <div className="bio-portrait">
          <Image
            src="/images/w1.webp"
            alt="Aura founder"
            fill
            sizes="35vw"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
        <div className="bio-text">
          <p className="section-label">Who I Am</p>
          <h2>I&apos;m the creative behind Aura.</h2>
          <p>
            With a passion for visual storytelling and an eye for details,
            I help brands and businesses stand out in a crowded world.
            AI is not just a tool for me — it&apos;s a new way to imagine,
            create and bring ideas to life.
          </p>
          <div className="signature">Aura</div>
        </div>
        <div className="bio-attrs">
          {[
            { label: "Visual Creator & AI Enthusiast" },
            { label: "5+ Years in Design & Branding" },
            { label: "AI-Generated Visuals & Videos" },
            { label: "Focused on Quality & Impact" },
          ].map((a) => (
            <div className="bio-attr" key={a.label}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#C47A3A" strokeWidth="1.2" strokeLinecap="round">
                <circle cx="10" cy="10" r="8" /><path d="M10 6v4l3 2" />
              </svg>
              <p className="attr-title">{a.label}</p>
            </div>
          ))}
          <a className="btn-outline" href="#contact" style={{ marginTop: "4px" }}>LET&apos;S WORK TOGETHER →</a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer" id="contact">
        <div className="footer-brand">
          <span className="brand-wordmark footer-logo">A U R A</span>
          <p className="footer-tagline">AI, WHEN IT&apos;S PRECISE.</p>
        </div>
        <div className="footer-col">
          <p className="footer-col-label">Quick Links</p>
          <nav>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="footer-col">
          <p className="footer-col-label">Contact</p>
          <a href="mailto:hello@aurastudio.com">hello@aurastudio.com</a>
          <a href="https://wa.me/" target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
        </div>
        <div className="footer-col">
          <p className="footer-col-label">Stay Connected</p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-copy">
          <p>© 2024 Aura Studio. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}
