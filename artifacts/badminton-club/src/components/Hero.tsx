import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0px", "420px"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const abstractY = useTransform(scrollYProgress, [0, 1], ["0px", "-240px"]);
  const orbsY = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "-150px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const words = "POWER PLUS INTELLIGENCE".split(" ");

  // Generate particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 10 + 10}s`
  }));

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image & Overlay (Layer 1) */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1920&q=90" 
          alt="Badminton Smash" 
          className="w-full h-full object-cover object-[64%_top] sm:object-top opacity-60 -translate-y-10 sm:translate-y-0"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/80 to-background" />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute bg-primary rounded-full blur-[1px]"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              animation: `particle-drift ${p.duration} linear infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Layer 3: Floating glowing orbs */}
      <motion.div style={{ y: orbsY }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-primary/30 blur-[100px] animate-float" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-secondary/20 blur-[120px] animate-float-delayed" />
      </motion.div>

      {/* Main Content (Layer 4) */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center justify-center mt-10 sm:mt-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 inline-flex max-w-[18rem] items-center justify-center gap-2 px-3 sm:max-w-none sm:px-4 py-2 rounded-full hero-glass border-primary/30"
        >
          <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[8px] leading-none sm:text-sm font-medium tracking-[0.16em] text-primary uppercase text-center">High Performance Badminton Academy</span>
        </motion.div>

        <div className="mb-6">
          <h1 className="sm:hidden text-center font-black tracking-[-0.04em] leading-[0.86]">
            <motion.span
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
              className="block text-[3.2rem] text-white"
              style={{ transformOrigin: "bottom" }}
            >
              POWER
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-2 block text-[3.2rem] text-white"
              style={{ transformOrigin: "bottom" }}
            >
              PLUS
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mt-2 block text-[2.95rem] text-gradient"
              style={{ transformOrigin: "bottom" }}
            >
              INTELLIGENCE
            </motion.span>
          </h1>

          <h1 className="hidden sm:flex max-w-[22rem] sm:max-w-none text-[4rem] sm:text-6xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-[-0.04em] text-center flex-wrap justify-center gap-x-2 sm:gap-x-3">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                className={i === 2 ? "text-gradient" : "text-white"}
                style={{ transformOrigin: "bottom" }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-[12px] md:text-[15px] text-white/72 mb-6 max-w-[22rem] sm:max-w-3xl md:max-w-6xl mx-auto text-center leading-[1.5] font-light px-1 sm:px-0"
        >
          <span className="block sm:hidden">
            Dayal Sports Academy was established to promote sports and fitness through education programs, training solutions, workshops, camps, and championships, helping players grow toward national and international standards.
          </span>
          <span className="hidden sm:block">
            Dayal Sports Academy was established to promote sports and fitness through education programs, training solutions, workshops, camps, and championships.
          </span>
          <span className="hidden sm:block">
            Helping players grow toward national and international standards.
          </span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <Button size="default" className="w-full sm:w-auto text-[15px] sm:text-base h-11 px-7 group bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] transition-all rounded-full" asChild>
            <a href="#classes" className="inline-flex items-center justify-center whitespace-nowrap">
              View Programs
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button size="default" variant="outline" className="w-full sm:w-auto text-[15px] sm:text-base h-11 px-7 rounded-full border-white/20 text-white hover:bg-white/10 hero-glass" asChild>
            <a href="#about">
              About Academy
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Layer 2: Abstract Element / Shuttlecock */}
      <motion.div 
        style={{ y: abstractY }}
        className="absolute bottom-0 right-0 max-w-lg opacity-40 z-0 pointer-events-none"
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/abstract-shuttlecock.png`} 
          alt="" 
          className="w-full h-full object-contain blur-[2px]"
        />
      </motion.div>

      {/* Stat Bar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-20 hidden md:block"
      >
        <div className="hero-glass rounded-2xl py-4 flex items-center justify-evenly divide-x divide-white/10">
          <div className="px-6 text-center w-1/4">
            <div className="text-2xl font-black text-white">5</div>
            <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Guinness Records</div>
          </div>
          <div className="px-6 text-center w-1/4">
            <div className="text-2xl font-black text-white">6</div>
            <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Mentor Visits / Year</div>
          </div>
          <div className="px-6 text-center w-1/4">
            <div className="text-2xl font-black text-white">4</div>
            <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Assessment Cycles / Year</div>
          </div>
          <div className="px-6 text-center w-1/4">
            <div className="text-2xl font-black text-white">20%</div>
            <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Dayal Member Benefit</div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center text-white/40 animate-bounce-slow"
      >
        <span className="text-xs uppercase tracking-widest mb-2 font-medium">Scroll</span>
        <ArrowDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}
