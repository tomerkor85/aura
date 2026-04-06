import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import ParallaxDivider from "@/components/ParallaxDivider";
import TheSystem from "@/components/TheSystem";
import TheSignature from "@/components/TheSignature";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />

        <ParallaxDivider
          src="/images/dividers/portrait.png"
          alt="Creative AI — Fashion Portrait"
          height="45vh"
          overlayText="AI שמרגיש אנושי"
          overlaySubtext="CREATIVE INTELLIGENCE"
        />

        <Gallery />

        <ParallaxDivider
          src="/images/dividers/jerusalem.png"
          alt="Creative AI — Jerusalem Editorial"
          height="45vh"
          overlayText="כל פיקסל, כוונה"
          overlaySubtext="PRECISION"
        />

        <TheSystem />

        <ParallaxDivider
          src="/images/dividers/serum-pink.png"
          alt="Creative AI — Product Photography"
          height="45vh"
          overlayText="מוצר. מותג. אור."
          overlaySubtext="PRODUCT IMAGERY"
        />

        <TheSignature />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
