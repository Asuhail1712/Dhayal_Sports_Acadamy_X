import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { whatsappUrl, type AcademyProgram } from "@/lib/academy-content";
import { GlassCard, SiteLink, ease } from "@/components/Design";

const levels = ["All", "Beginner", "Intermediate", "Advanced", "Elite"];
const images: Record<string, string> = {
  Beginner:
    "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1000&q=85",
  Intermediate:
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1000&q=85",
  Advanced:
    "https://images.unsplash.com/photo-1590075865003-e48277faa558?w=1000&q=85",
  Elite:
    "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1000&q=85",
};

export function ProgramCollection({
  programs,
  preview = false,
}: {
  programs: AcademyProgram[];
  preview?: boolean;
}) {
  const [filter, setFilter] = useState("All");
  const id = useId();
  const reduced = useReducedMotion();
  const filtered = programs.filter(
    (program) => filter === "All" || program.level === filter,
  );
  const visible = preview ? filtered.slice(0, 6) : filtered;

  return (
    <>
      <div
        className="program-filters"
        role="group"
        aria-label="Filter programs by level"
      >
        {levels.map((level) => (
          <button
            key={level}
            className={
              "program-filter " +
              (filter === level ? "program-filter--active" : "")
            }
            aria-pressed={filter === level}
            onClick={() => setFilter(level)}
          >
            {filter === level && (
              <motion.span
                className="program-filter-active"
                layoutId={"filter-" + id}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span>{level}</span>
          </button>
        ))}
      </div>
      <motion.div
        layout
        className={
          "program-grid " +
          (preview && filter === "All" ? "program-grid--preview" : "")
        }
      >
        <AnimatePresence mode="popLayout">
          {visible.map((program, index) => (
            <motion.div
              key={program.id}
              layout
              initial={reduced ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease }}
            >
              <GlassCard
                className="program-card h-full"
                index={index}
                artwork={false}
              >
                <SiteLink
                  href={"/programs/" + program.slug}
                  className="program-card-image"
                  aria-label={"Explore " + program.name}
                >
                  <img
                    src={images[program.level] || images.Beginner}
                    alt="Badminton training and court sessions"
                    loading="lazy"
                  />
                  <span
                    className={
                      "pill " +
                      (program.level === "Beginner" ? "pill--green" : "")
                    }
                  >
                    {program.level}
                  </span>
                  <span className="program-card-index">0{index + 1}</span>
                </SiteLink>
                <div className="program-card-body">
                  <h3>
                    <SiteLink href={"/programs/" + program.slug}>
                      {program.name}
                    </SiteLink>
                  </h3>
                  <p>{preview ? program.summary : program.description}</p>
                  <div className="program-meta">
                    <span>
                      <Clock3 size={13} />
                      {program.age}
                    </span>
                  </div>
                  <div className="program-card-bottom">
                    <div>Fees and batch timings on request</div>
                    <a
                      href={whatsappUrl(
                        "Hello Dayal Sports Academy, I would like to enquire about " +
                          program.name +
                          ".",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Enquire
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {visible.length === 0 && (
        <p className="py-12 text-sm text-muted-foreground">
          No programs are available for this level yet.
        </p>
      )}
    </>
  );
}
