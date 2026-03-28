import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ChevronRight, Clock, IndianRupee, User, Users } from "lucide-react";
import { useLocation } from "wouter";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { fallbackClasses } from "@/lib/fallback-data";
import { slugify } from "@/lib/content";
import { startRouteTransition } from "@/hooks/use-scroll-restoration";

const levelImages: Record<string, string> = {
  Beginner: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=80",
  Intermediate: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&q=80",
  Advanced: "https://images.unsplash.com/photo-1590075865003-e48277faa558?w=600&q=80",
  Elite: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&q=80",
  default: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&q=80",
};

function getLevelColor(level: string) {
  switch (level) {
    case "Beginner":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "Intermediate":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "Advanced":
      return "bg-secondary/20 text-secondary border-secondary/30";
    case "Elite":
      return "bg-primary/20 text-primary border-primary/30";
    default:
      return "bg-white/10 text-white border-white/20";
  }
}

function getSpotsIndicator(max: number) {
  if (max <= 4) return { text: "Limited", color: "text-destructive" };
  if (max <= 6) return { text: "Few spots", color: "text-yellow-500" };
  return { text: "Available", color: "text-emerald-500" };
}

export default function Programs() {
  const [, setLocation] = useLocation();
  const [filter, setFilter] = useState("All");
  const levels = ["All", "Beginner", "Intermediate", "Advanced", "Elite"];

  const filteredPrograms = useMemo(
    () => fallbackClasses.filter((program) => filter === "All" || program.level === filter),
    [filter]
  );
  const openProgram = (slug: string) => {
    const href = `/programs/${slug}`;
    startRouteTransition(href);
    setLocation(href);
  };

  return (
    <PageShell className="pb-20">
      <section className="relative z-10 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl font-black text-white md:text-5xl">
              TRAINING <span className="text-primary">SOLUTIONS</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-light text-white/60 md:text-base">
              Explore the academy&apos;s coaching programs, specialist services,
              assessments, and player development pathways.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap justify-center gap-3"
            >
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setFilter(level)}
                  className={`px-8 py-3 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                    filter === level
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105"
                      : "glass-panel text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {level}
                </button>
              ))}
            </motion.div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPrograms.map((program, index) => {
              const spots = getSpotsIndicator(program.maxStudents);

              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-card border border-white/10 rounded-[2rem] overflow-hidden group transition-all duration-500 md:hover:border-primary/50 md:hover:shadow-[0_10px_40px_-10px_rgba(0,240,255,0.2)] md:hover:-translate-y-2 flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img
                      src={levelImages[program.level] || levelImages.default}
                      alt={program.level}
                      className="block w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <div className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider backdrop-blur-md ${getLevelColor(program.level)}`}>
                        {program.level}
                      </div>
                      <div className="bg-background/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 flex items-center">
                        <IndianRupee className="w-4 h-4 text-primary mr-0.5" />
                        <span className="font-bold text-white">{program.price}</span>
                        <span className="text-xs text-white/50 ml-1">fee</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 -mt-px bg-card p-8 pt-4 flex flex-col flex-grow">
                    <h2 className="text-2xl font-black mb-3 text-white">{program.name}</h2>
                    <p className="text-white/60 text-sm mb-8 flex-grow line-clamp-2 font-light">
                      {program.description}
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center text-sm font-medium text-white/80">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-white">{program.schedule}</div>
                          <div className="text-white/40 text-xs">{program.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm font-medium text-white/80">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mr-4">
                          <User className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <div className="text-white">{program.coachName}</div>
                          <div className="text-white/40 text-xs">Program Lead</div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm font-medium text-white/80">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-4">
                          <Users className="w-5 h-5 text-white/70" />
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                          <div>
                            <div className="text-white">Max {program.maxStudents} Students</div>
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
                      className="w-full h-12 rounded-xl bg-primary/90 text-primary-foreground border border-primary/60 shadow-[0_0_20px_rgba(0,240,255,0.22)] transition-all md:hover:bg-primary md:hover:border-primary"
                      onPointerDown={() => startRouteTransition(`/programs/${slugify(program.name)}`)}
                      onClick={() => openProgram(slugify(program.name))}
                    >
                      Learn More
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
