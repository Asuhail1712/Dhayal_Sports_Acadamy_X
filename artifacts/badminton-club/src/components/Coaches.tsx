import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Users } from 'lucide-react';
import { useLocation } from 'wouter';
import { useGetCoaches } from '@workspace/api-client-react';
import { fallbackCoaches } from '@/lib/fallback-data';

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
    <section id="coaches" className="py-24 relative z-10 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] blur-[2px] pointer-events-none mix-blend-screen">
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
            MEET THE <span className="text-secondary">TEAM</span>
          </motion.h2>
          <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto font-light">
            Former champions, specialists, and support professionals named in the proposal drive the academy model.
          </p>
        </div>

        {isLoading && (
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-panel h-[340px] rounded-[2rem] animate-pulse bg-white/5" />
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
                      borderColor: 'rgba(176,38,255,0.35)',
                      boxShadow: '0 8px 28px -12px rgba(176,38,255,0.22)',
                    }),
              }}
              viewport={{ once: false, amount: 0.65 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              key={coach.id}
              className="flex flex-col sm:flex-row glass-panel rounded-[2rem] overflow-hidden group transition-all duration-500 md:hover:border-secondary/30 md:hover:shadow-[0_10px_40px_-10px_rgba(176,38,255,0.2)]"
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
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-background/90 sm:from-background/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 sm:hidden">
                  <h3 className="text-2xl font-black text-white">{coach.name}</h3>
                  <p className="text-secondary text-sm font-bold uppercase tracking-wider">{coach.title}</p>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-6 sm:w-3/5 flex flex-col justify-center relative">
                <div className="hidden sm:block mb-6">
                  <h3 className="text-[25px] font-black text-white mb-2">{coach.name}</h3>
                  <p className="text-secondary text-sm font-bold uppercase tracking-wide leading-relaxed">{coach.title}</p>
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-white">{coach.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Users className="w-4 h-4 text-white/40" />
                    <span>{coach.studentsCount} Active Students</span>
                  </div>
                </div>

                <div className="space-y-5 mb-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {coach.specialties.map((spec: string) => (
                        <span key={spec} className="text-xs px-3 py-1.5 rounded-full glass-panel text-white/80 font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3 flex items-center gap-2">
                      <Award className="w-3 h-3 text-secondary" /> Top Achievement
                    </h4>
                    <p className="text-sm text-white/80 font-light leading-relaxed line-clamp-2">
                      {coach.achievements[0]}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                  <div className="flex justify-between text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">
                    <span>Experience Level</span>
                    <span className="text-secondary">Pro</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-secondary/50 to-secondary rounded-full"
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
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-8 text-white transition-colors hover:bg-white/10"
              onClick={() => {
                normalizeHomeHistoryEntry();
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
