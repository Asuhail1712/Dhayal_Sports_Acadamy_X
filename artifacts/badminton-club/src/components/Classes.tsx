import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, IndianRupee, User, ChevronRight, AlertCircle } from 'lucide-react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useGetClasses } from '@workspace/api-client-react';
import { fallbackClasses } from '@/lib/fallback-data';
import { slugify } from '@/lib/content';

const levelImages: Record<string, string> = {
  Beginner: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=80",
  Intermediate: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&q=80",
  Advanced: "https://images.unsplash.com/photo-1590075865003-e48277faa558?w=600&q=80",
  Elite: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&q=80",
  default: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&q=80"
};

export function Classes() {
  const { data, isLoading, error } = useGetClasses();
  const [, setLocation] = useLocation();
  const [filter, setFilter] = useState<string>('All');
  const [isDesktop, setIsDesktop] = useState(false);
  const classes = Array.isArray(data) ? data : fallbackClasses;

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Elite'];
  const filteredClasses = classes.filter(c => filter === 'All' || c.level === filter);
  const previewClasses = useMemo(() => {
    if (filter !== 'All') {
      return filteredClasses.slice(0, 6);
    }

    const grouped = levels.slice(1).map((level) =>
      filteredClasses.filter((cls) => cls.level === level)
    );
    const mixed: typeof filteredClasses = [];
    let round = 0;

    while (mixed.length < 6 && grouped.some((group) => group[round])) {
      for (const group of grouped) {
        if (group[round]) {
          mixed.push(group[round]);
        }

        if (mixed.length === 6) {
          break;
        }
      }

      round += 1;
    }

    return mixed;
  }, [filter, filteredClasses]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Intermediate': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Advanced': return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'Elite': return 'bg-primary/20 text-primary border-primary/30';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  const getSpotsIndicator = (max: number) => {
    if (max <= 4) return { text: "Limited", color: "text-destructive" };
    if (max <= 6) return { text: "Few spots", color: "text-yellow-500" };
    return { text: "Available", color: "text-emerald-500" };
  };

  const openProgramFromHome = (slug: string) => {
    setLocation(`/programs/${slug}`);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const sync = () => setIsDesktop(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener('change', sync);
    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

  return (
    <section id="classes" className="py-24 relative z-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-5xl font-black mb-4"
          >
            TRAINING <span className="text-primary">SOLUTIONS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-sm md:text-base max-w-2xl mx-auto font-light"
          >
            Explore the academy's coaching programs, specialist services, assessments, and player development pathways.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`px-8 py-3 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                  filter === level 
                    ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105' 
                    : 'glass-panel text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {level}
              </button>
            ))}
          </motion.div>
        </div>

        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-panel h-[500px] rounded-[2rem] animate-pulse bg-white/5" />
            ))}
          </div>
        )}

        {error && Array.isArray(data) && (
          <div className="text-center py-12 glass-panel rounded-3xl border-destructive/50">
            <p className="text-destructive font-medium">Failed to load classes. Please try again later.</p>
          </div>
        )}

        <div className="flex flex-col gap-12">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {previewClasses.map((cls) => {
                const spots = getSpotsIndicator(cls.maxStudents);
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    whileInView={
                      isDesktop
                        ? undefined
                        : {
                            scale: 1.015,
                            borderColor: 'rgba(0, 240, 255, 0.5)',
                            boxShadow: '0 10px 40px -10px rgba(0,240,255,0.2)',
                          }
                    }
                    viewport={{ once: false, amount: 0.7 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.4 }}
                    key={cls.id}
                    className="bg-card border border-white/10 rounded-[2rem] overflow-hidden group transition-all duration-500 md:hover:border-primary/50 md:hover:shadow-[0_10px_40px_-10px_rgba(0,240,255,0.2)] md:hover:-translate-y-2 flex flex-col h-full"
                  >
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <motion.img 
                        src={levelImages[cls.level] || levelImages.default} 
                        alt={cls.level} 
                        initial={isDesktop ? undefined : { scale: 1 }}
                        whileInView={isDesktop ? undefined : { scale: 1.05 }}
                        viewport={{ once: false, amount: 0.7 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="block w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                      
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <div className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider backdrop-blur-md ${getLevelColor(cls.level)}`}>
                          {cls.level}
                        </div>
                        <div className="bg-background/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 flex items-center">
                          <IndianRupee className="w-4 h-4 text-primary mr-0.5" />
                          <span className="font-bold text-white">{cls.price}</span>
                          <span className="text-xs text-white/50 ml-1">fee</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 -mt-px bg-card p-8 pt-4 flex flex-col flex-grow">
                      <h3 className="text-2xl font-black mb-3 text-white">{cls.name}</h3>
                      <p className="text-white/60 text-sm mb-8 flex-grow line-clamp-2 font-light">
                        {cls.description}
                      </p>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-center text-sm font-medium text-white/80">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 md:group-hover:bg-primary/20 transition-colors">
                            <Clock className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-white">{cls.schedule}</div>
                            <div className="text-white/40 text-xs">{cls.duration}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm font-medium text-white/80">
                          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mr-4 md:group-hover:bg-secondary/20 transition-colors">
                            <User className="w-5 h-5 text-secondary" />
                          </div>
                          <div>
                            <div className="text-white">{cls.coachName}</div>
                            <div className="text-white/40 text-xs">Program Lead</div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm font-medium text-white/80">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-4 md:group-hover:bg-white/10 transition-colors">
                            <Users className="w-5 h-5 text-white/70" />
                          </div>
                          <div className="flex-1 flex justify-between items-center">
                            <div>
                              <div className="text-white">Max {cls.maxStudents} Students</div>
                              <div className="text-white/40 text-xs">Per session</div>
                            </div>
                            <div className={`flex items-center text-xs font-bold ${spots.color}`}>
                              <AlertCircle className="w-3 h-3 mr-1" />
                              {spots.text}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="default"
                        className="w-full h-12 rounded-xl bg-primary/90 text-primary-foreground border border-primary/60 shadow-[0_0_20px_rgba(0,240,255,0.22)] transition-all md:hover:bg-primary md:hover:border-primary group/btn"
                        onClick={() => openProgramFromHome(slugify(cls.name))}
                      >
                        Learn More
                        <ChevronRight className="ml-2 w-4 h-4 md:group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredClasses.length > previewClasses.length && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="h-12 rounded-full border-white/15 px-8 text-white hover:bg-white/10"
                onClick={() => setLocation("/programs")}
              >
                View More
              </Button>
            </div>
          )}
        </div>
        
        {!isLoading && filteredClasses.length === 0 && (
          <div className="text-center py-12 text-white/50">
            No classes found for the selected level.
          </div>
        )}
      </div>
    </section>
  );
}
