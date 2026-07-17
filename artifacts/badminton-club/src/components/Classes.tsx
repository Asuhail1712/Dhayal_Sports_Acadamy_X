import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, IndianRupee, User, ChevronRight, AlertCircle } from 'lucide-react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useGetClasses } from '@workspace/api-client-react';
import { fallbackClasses } from '@/lib/fallback-data';
import { slugify } from '@/lib/content';
import { startRouteTransition } from '@/hooks/use-scroll-restoration';

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
      case 'Beginner': return 'border-emerald-200 bg-emerald-50 text-emerald-700';
      case 'Intermediate': return 'border-primary/20 bg-primary/10 text-primary';
      case 'Advanced': return 'border-primary/20 bg-primary/10 text-primary';
      case 'Elite': return 'border-primary/20 bg-primary/10 text-primary';
      default: return 'border-border bg-accent text-foreground';
    }
  };

  const getSpotsIndicator = (max: number) => {
    if (max <= 4) return { text: "Limited", color: "text-destructive" };
    if (max <= 6) return { text: "Few spots", color: "text-yellow-500" };
    return { text: "Available", color: "text-emerald-500" };
  };

  const normalizeHomeHistoryEntry = () => {
    if (window.location.pathname !== '/' || !window.location.hash) {
      return;
    }

    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}${window.location.search}`,
    );
  };

  const openProgramFromHome = (slug: string) => {
    normalizeHomeHistoryEntry();
    const href = `/programs/${slug}`;
    startRouteTransition(href);
    setLocation(href);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const sync = () => setIsDesktop(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener('change', sync);
    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

  return (
    <section id="classes" className="relative z-10 bg-[#fafafa] py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/8 via-background to-background" />
      
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
            className="mx-auto max-w-2xl text-sm text-muted-foreground md:text-base"
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
                    ? 'scale-105 bg-[linear-gradient(135deg,#FF4D00,#FF8A00)] text-primary-foreground shadow-[0_16px_32px_rgba(255,90,0,0.24)]'
                    : 'glass-panel text-foreground/70 hover:bg-white hover:text-foreground'
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
              <div key={i} className="glass-panel h-[500px] animate-pulse rounded-[2rem] bg-white/70" />
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
                            borderColor: 'rgba(255, 90, 0, 0.3)',
                            boxShadow: '0 10px 40px -10px rgba(255,90,0,0.16)',
                          }
                    }
                    viewport={{ once: false, amount: 0.7 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.4 }}
                    key={cls.id}
                    className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-500 md:hover:-translate-y-2 md:hover:border-primary/30 md:hover:shadow-[0_20px_50px_rgba(255,90,0,0.15)]"
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
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <div className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider backdrop-blur-md ${getLevelColor(cls.level)}`}>
                          {cls.level}
                        </div>
                        <div className="flex items-center rounded-full border border-border bg-white/95 px-4 py-1.5 backdrop-blur-md">
                          {cls.price > 0 ? (
                            <>
                              <IndianRupee className="w-4 h-4 text-primary mr-0.5" />
                              <span className="font-bold text-foreground">{cls.price}</span>
                              <span className="ml-1 text-xs text-muted-foreground">fee</span>
                            </>
                          ) : (
                            <span className="text-xs font-bold uppercase tracking-wide text-primary">
                              Contact for pricing
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 -mt-px bg-card p-8 pt-4 flex flex-col flex-grow">
                      <h3 className="mb-3 text-2xl font-black text-foreground">{cls.name}</h3>
                      <p className="mb-8 flex-grow line-clamp-2 text-sm text-muted-foreground">
                        {cls.description}
                      </p>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-center text-sm font-medium text-foreground/80">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 md:group-hover:bg-primary/20 transition-colors">
                            <Clock className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-foreground">{cls.schedule}</div>
                            <div className="text-xs text-muted-foreground">{cls.duration}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm font-medium text-foreground/80">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 md:group-hover:bg-primary/20 transition-colors">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-foreground">{cls.coachName}</div>
                            <div className="text-xs text-muted-foreground">Program Lead</div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm font-medium text-foreground/80">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent transition-colors md:group-hover:bg-accent/75">
                            <Users className="h-5 w-5 text-foreground/70" />
                          </div>
                          <div className="flex-1 flex justify-between items-center">
                            <div>
                              <div className="text-foreground">Max {cls.maxStudents} Students</div>
                              <div className="text-xs text-muted-foreground">Per session</div>
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
                        className="group/btn h-12 w-full rounded-xl border border-primary/30 bg-primary text-primary-foreground"
                        onPointerDown={() => startRouteTransition(`/programs/${slugify(cls.name)}`)}
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
                className="h-12 rounded-full border-border px-8 text-foreground hover:bg-white"
                onPointerDown={() => startRouteTransition("/programs")}
                onClick={() => {
                  normalizeHomeHistoryEntry();
                  startRouteTransition("/programs");
                  setLocation("/programs");
                }}
              >
                View More
              </Button>
            </div>
          )}
        </div>
        
        {!isLoading && filteredClasses.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No classes found for the selected level.
          </div>
        )}
      </div>
    </section>
  );
}
