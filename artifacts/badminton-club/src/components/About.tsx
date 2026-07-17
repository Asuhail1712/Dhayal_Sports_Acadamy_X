import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Trophy, Users, Target, Activity } from 'lucide-react';

const stats = [
  { icon: Users, label: "Coaches & Mentors", value: 12, suffix: "+" },
  { icon: Trophy, label: "Mentor Visits / Year", value: 6, suffix: "" },
  { icon: Target, label: "Assessment Cycles / Year", value: 3, suffix: "" },
  { icon: Activity, label: "Overseas Partner Hubs", value: 3, suffix: "" },
];

function Counter({ from, to, duration = 2, suffix = "" }: { from: number, to: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(easeOut * (to - from) + from));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);

  return (
    <section id="about" ref={containerRef} className="relative z-10 overflow-hidden bg-white pt-24 pb-12">
      {/* Marquee Strip */}
      <div className="absolute top-0 left-0 w-full bg-primary/10 border-y border-primary/20 py-3 overflow-hidden flex whitespace-nowrap z-20">
        <div className="animate-marquee inline-block text-primary/80 font-black text-sm md:text-base tracking-widest uppercase">
          {Array(10).fill("DAYAL SPORTS ACADEMY · POWER PLUS INTELLIGENCE · TRAINING · ASSESSMENT · OVERSEAS EXPOSURE · ").join("")}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 leading-tight">
              ABOUT DAYAL<br/>
              <span className="text-gradient">SPORTS ACADEMY.</span>
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              We believe that when a child develops real sportsmanship and is given the right opportunity, they can bring laurels to their country. Our goal is to build a thriving sporting ecosystem, combining scientifically proven skills training with innovative technology to enhance performance, while nurturing a grassroots love for sport.
            </p>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              We help players unleash their full potential by building positive relationships and competitive character across the globe, through sports exchange programs, cultural exchange programs, friendly matches, national and overseas championships, and continuous education programs.
            </p>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              We nurture Power plus Intelligence to make champions with global exposure.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-primary hover:-translate-y-1 transition-transform">
                <h4 className="mb-2 text-xl font-bold text-foreground">Founder & Head Coach</h4>
                <p className="text-sm text-muted-foreground">Led by Dr. Yuva Dayalan, former international badminton player, Masters World Ranking Champion, and holder of 5 Guinness World Records.</p>
              </div>
              <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-primary hover:-translate-y-1 transition-transform">
                <h4 className="mb-2 text-xl font-bold text-foreground">Overseas Mentorship</h4>
                <p className="text-sm text-muted-foreground">Guided by former World Champion Xiong Guobao through scientific grip-based training and world-class mentorship systems.</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-panel p-4 md:p-6 rounded-3xl group glass-panel-hover"
                >
                  <div className="p-2 md:p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors w-fit mb-3">
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <p className="mb-2 text-[10px] font-bold uppercase leading-tight tracking-wider text-muted-foreground md:text-xs">{stat.label}</p>
                  <h3 className="text-2xl font-black text-foreground md:text-4xl">
                    <Counter from={0} to={stat.value} suffix={stat.suffix} />
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 neon-glow rounded-3xl translate-x-4 translate-y-4 opacity-50" />
            <motion.div style={{ y: photoY, scale: photoScale }} className="relative rounded-3xl overflow-hidden neon-border z-10 glass-panel h-[800px]">
              <img 
                src="https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&q=85" 
                alt="Dayal Sports Academy training" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
