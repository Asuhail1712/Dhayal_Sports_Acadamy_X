import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Users } from 'lucide-react';
import { useLocation } from 'wouter';
import { useGetCoaches } from '@workspace/api-client-react';
import { fallbackCoaches } from '@/lib/fallback-data';
import { startRouteTransition } from '@/hooks/use-scroll-restoration';

const coachImages = [
  "https://images.unsplash.com/photo-1539794830467-1f1755804d13?w=400&q=80",
  "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
  "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=400&q=80"
];

export function Coaches() {
  const { data, isLoading } = useGetCoaches();
  const [, setLocation] = useLocation();
  const coaches = Array.isArray(data) ? data : fallbackCoaches;
  const [isDesktop, setIsDesktop] = React.useState(false);
  const visibleCoaches = coaches.slice(0, 6);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const sync = () => setIsDesktop(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener('change', sync);
    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

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

  return (
    <section id="coaches" className="relative z-10 overflow-hidden bg-white py-24">
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]">
        <img 
          src={`${import.meta.env.BASE_URL}images/court-texture.png`} 
          alt="Texture" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-5xl font-black mb-4"
          >
            MEET THE <span className="text-primary">TEAM</span>
          </motion.h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:text-base">
            Led by Dr. Yuva Dayalan, guided by former World Champion Xiong Guobao, and supported by Yoga Guru Dr. T.A. Krishnan, our team brings specialist coaching, athlete care, and global mentorship into one academy model.
          </p>
        </div>

        {isLoading && (
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-panel h-[340px] animate-pulse rounded-[2rem] bg-white/80" />
            ))}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {visibleCoaches.map((coach, index) => (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{
                ...(isDesktop
                  ? {}
                  : {
                      borderColor: 'rgba(255,90,0,0.28)',
                      boxShadow: '0 8px 28px -12px rgba(255,90,0,0.18)',
                    }),
              }}
              viewport={{ once: false, amount: 0.65 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              key={coach.id}
              className="group flex flex-col overflow-hidden rounded-[2rem] glass-panel transition-all duration-500 sm:flex-row md:hover:border-primary/30 md:hover:shadow-[0_20px_50px_rgba(255,90,0,0.15)]"
            >
              {/* Photo Area */}
              <div className="relative h-64 sm:h-auto sm:w-2/5 overflow-hidden flex-shrink-0">
                <motion.img 
                  src={coachImages[index % coachImages.length]} 
                  alt={coach.name} 
                  initial={isDesktop ? undefined : { scale: 1 }}
                  whileInView={isDesktop ? undefined : { scale: 1.03 }}
                  viewport={{ once: false, amount: 0.65 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full h-full object-cover transition-transform duration-1000 filter saturate-[0.8] md:group-hover:scale-110 md:group-hover:saturate-100"
                />
                <div className="absolute bottom-4 left-4 sm:hidden">
                  <h3 className="text-2xl font-black text-white drop-shadow-lg">{coach.name}</h3>
                  <p className="text-primary text-sm font-bold uppercase tracking-wider">{coach.title}</p>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-6 sm:w-3/5 flex flex-col justify-center relative">
                <div className="hidden sm:block mb-6">
                  <h3 className="mb-2 text-[25px] font-black text-foreground">{coach.name}</h3>
                  <p className="text-primary text-sm font-bold uppercase tracking-wide leading-relaxed">{coach.title}</p>
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-bold text-foreground">{coach.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{coach.studentsCount} Active Students</span>
                  </div>
                </div>

                <div className="space-y-5 mb-6">
                  <div>
                    <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {coach.specialties.map((spec: string) => (
                        <span key={spec} className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground/80">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <Award className="w-3 h-3 text-primary" /> Top Achievement
                    </h4>
                    <p className="line-clamp-2 text-sm leading-relaxed text-foreground/80">
                      {coach.achievements[0]}
                    </p>
                  </div>
                </div>

                <div className="mt-auto border-t border-border pt-4">
                  <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <span>Experience Level</span>
                    <span className="text-primary">Pro</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-accent">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                      className="h-full rounded-full bg-[linear-gradient(135deg,#FF4D00,#FF8A00)]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {coaches.length > 6 && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center rounded-full border border-primary px-8 text-primary transition-colors hover:bg-primary hover:text-white"
              onPointerDown={() => startRouteTransition("/coaches")}
              onClick={() => {
                normalizeHomeHistoryEntry();
                startRouteTransition("/coaches");
                setLocation("/coaches");
              }}
            >
              View More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
