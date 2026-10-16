import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Classes } from '@/components/Classes';
import { Coaches } from '@/components/Coaches';
import { Gallery } from '@/components/Gallery';
import { Partners } from '@/components/Partners';
import { BlogSection } from '@/components/BlogSection';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { TrustStrip } from '@/components/TrustStrip';
import { SupportTeam } from '@/components/SupportTeam';
import { Camps } from '@/components/Camps';
import { Network } from '@/components/Network';
import { JoinUs } from '@/components/JoinUs';
import { Faq } from '@/components/Faq';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary-foreground">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <Classes />
        <Coaches />
        <SupportTeam />
        <Camps />
        <Network />
        <Gallery />
        <Partners />
        <JoinUs />
        <BlogSection />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
