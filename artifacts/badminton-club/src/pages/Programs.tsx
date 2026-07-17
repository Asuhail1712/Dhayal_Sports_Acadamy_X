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
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "Intermediate":
      return "border-primary/20 bg-primary/10 text-primary";
    case "Advanced":
      return "border-primary/20 bg-primary/10 text-primary";
    case "Elite":
      return "border-primary/20 bg-primary/10 text-primary";
    default:
      return "border-border bg-accent text-foreground";
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
            <h1 className="text-3xl font-black text-foreground md:text-5xl">
              TRAINING <span className="text-primary">SOLUTIONS</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
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
                      ? "scale-105 bg-[linear-gradient(135deg,#FF4D00,#FF8A00)] text-primary-foreground shadow-[0_16px_32px_rgba(255,90,0,0.24)]"
                      : "glass-panel text-foreground/70 hover:bg-white hover:text-foreground"
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
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-500 md:hover:-translate-y-2 md:hover:border-primary/30 md:hover:shadow-[0_20px_50px_rgba(255,90,0,0.15)]"
                >
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img
                      src={levelImages[program.level] || levelImages.default}
                      alt={program.level}
                      className="block w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <div className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider backdrop-blur-md ${getLevelColor(program.level)}`}>
                        {program.level}
                      </div>
                      <div className="flex items-center rounded-full border border-border bg-white/95 px-4 py-1.5 backdrop-blur-md">
                        {program.price > 0 ? (
                          <>
                            <IndianRupee className="w-4 h-4 text-primary mr-0.5" />
                            <span className="font-bold text-foreground">{program.price}</span>
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
                    <h2 className="mb-3 text-2xl font-black text-foreground">{program.name}</h2>
                    <p className="mb-8 flex-grow line-clamp-2 text-sm text-muted-foreground">
                      {program.description}
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center text-sm font-medium text-foreground/80">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-foreground">{program.schedule}</div>
                          <div className="text-xs text-muted-foreground">{program.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm font-medium text-foreground/80">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-foreground">{program.coachName}</div>
                          <div className="text-xs text-muted-foreground">Program Lead</div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm font-medium text-foreground/80">
                        <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                          <Users className="h-5 w-5 text-foreground/70" />
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                          <div>
                            <div className="text-foreground">Max {program.maxStudents} Students</div>
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
                      className="h-12 w-full rounded-xl border border-primary/30 bg-primary text-primary-foreground"
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
