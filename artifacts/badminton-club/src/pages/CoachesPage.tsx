import { Award, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { fallbackCoaches } from "@/lib/fallback-data";

const coachImages = [
  "https://images.unsplash.com/photo-1539794830467-1f1755804d13?w=400&q=80",
  "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
  "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=400&q=80",
];

export default function CoachesPage() {
  return (
    <PageShell className="pb-20">
      <section className="relative z-10 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h1 className="text-3xl font-black text-foreground md:text-5xl">
            MEET THE <span className="text-primary">TEAM</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            Led by Dr. Yuva Dayalan, guided by former World Champion Xiong
            Guobao, and supported by Yoga Guru Dr. T.A. Krishnan, our team
            brings specialist coaching, athlete care, and global mentorship into
            one academy model.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {fallbackCoaches.map((coach, index) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col overflow-hidden rounded-[2rem] glass-panel transition-all duration-500 sm:flex-row md:hover:border-primary/30 md:hover:shadow-[0_20px_50px_rgba(255,90,0,0.15)]"
            >
              <div className="relative h-64 sm:h-auto sm:w-2/5 overflow-hidden flex-shrink-0">
                <img
                  src={coachImages[index % coachImages.length]}
                  alt={coach.name}
                  className="w-full h-full object-cover transition-transform duration-1000 filter saturate-[0.8] md:group-hover:scale-110 md:group-hover:saturate-100"
                />
                <div className="absolute bottom-4 left-4 sm:hidden">
                  <h2 className="text-2xl font-black text-white drop-shadow-lg">{coach.name}</h2>
                  <p className="text-primary text-sm font-bold uppercase tracking-wider">{coach.title}</p>
                </div>
              </div>

              <div className="p-6 sm:w-3/5 flex flex-col justify-center relative">
                <div className="hidden sm:block mb-6">
                  <h2 className="mb-2 text-[25px] font-black text-foreground">{coach.name}</h2>
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
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {coach.specialties.map((spec: string) => (
                        <span key={spec} className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground/80">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <Award className="w-3 h-3 text-primary" /> Top Achievement
                    </h3>
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
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      className="h-full rounded-full bg-[linear-gradient(135deg,#FF4D00,#FF8A00)]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </section>
    </PageShell>
  );
}
