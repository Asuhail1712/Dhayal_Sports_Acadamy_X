import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [220, -220]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -420]);
  const y3 = useTransform(scrollYProgress, [0, 1], [140, -140]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const sync = () => setIsDesktop(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener('change', sync);
    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden bg-background z-10 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 md:items-end">
          
          <motion.div
            style={isDesktop ? { y: y1 } : undefined}
            initial={isDesktop ? undefined : { opacity: 0.9 }}
            whileInView={isDesktop ? undefined : { opacity: 1 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative h-44 sm:h-64 md:h-[500px] rounded-2xl md:rounded-[2rem] overflow-hidden glass-panel border-white/10 group"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=85"
              alt="Badminton Action"
              initial={isDesktop ? undefined : { scale: 1 }}
              whileInView={isDesktop ? undefined : { scale: 1.08 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="w-full h-full object-cover opacity-70 transition-all duration-500 filter grayscale group-hover:opacity-100 group-hover:grayscale-0 md:group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
          </motion.div>

          <motion.div
            style={isDesktop ? { y: y2 } : undefined}
            initial={isDesktop ? undefined : { opacity: 0.9 }}
            whileInView={isDesktop ? undefined : { opacity: 1 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative h-52 sm:h-72 md:h-[640px] rounded-2xl md:rounded-[2rem] overflow-hidden group border border-white/5 shadow-2xl z-20"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=85"
              alt="Badminton Match"
              initial={isDesktop ? undefined : { scale: 1 }}
              whileInView={isDesktop ? undefined : { scale: 1.08 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/50 group-hover:bg-background/30 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white text-center tracking-tighter leading-[0.95] drop-shadow-2xl">
                DAYAL <br/><span className="text-primary text-glow">ACADEMY</span>
              </h2>
            </div>
          </motion.div>

          <motion.div
            style={isDesktop ? { y: y3 } : undefined}
            initial={isDesktop ? undefined : { opacity: 0.9 }}
            whileInView={isDesktop ? undefined : { opacity: 1 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative h-44 sm:h-64 md:h-[500px] rounded-2xl md:rounded-[2rem] overflow-hidden glass-panel border-white/10 group"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=85"
              alt="Badminton Court"
              initial={isDesktop ? undefined : { scale: 1 }}
              whileInView={isDesktop ? undefined : { scale: 1.08 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="w-full h-full object-cover opacity-70 transition-all duration-500 filter grayscale group-hover:opacity-100 group-hover:grayscale-0 md:group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
