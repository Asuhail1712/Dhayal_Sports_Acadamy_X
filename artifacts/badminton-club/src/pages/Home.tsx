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

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Classes />
        <Coaches />
        <Gallery />
        <Partners />
        <BlogSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
