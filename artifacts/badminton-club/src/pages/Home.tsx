import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Classes } from "@/components/Classes";
import { Coaches } from "@/components/Coaches";
import { Gallery } from "@/components/Gallery";
import { Partners } from "@/components/Partners";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { TrustStrip } from "@/components/TrustStrip";
import { SupportTeam } from "@/components/SupportTeam";
import { Camps } from "@/components/Camps";
import { JoinUs } from "@/components/JoinUs";
import { Faq } from "@/components/Faq";
import { UniqueTraining } from "@/components/UniqueTraining";
import { ProShop } from "@/components/ProShop";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary-foreground">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <UniqueTraining />
        <Classes />
        <Coaches />
        <SupportTeam />
        <Camps />
        <Partners />
        <ProShop />
        <Gallery preview />
        <Testimonials />
        <JoinUs />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
