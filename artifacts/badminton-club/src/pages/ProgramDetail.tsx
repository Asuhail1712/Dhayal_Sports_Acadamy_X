import { motion } from "framer-motion";
import { AlertCircle, Clock, IndianRupee, User, Users } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { getProgramBySlug } from "@/lib/content";

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

export default function ProgramDetail({ slug }: { slug: string }) {
  const program = getProgramBySlug(slug);

  if (!program) {
    return (
      <PageShell className="pb-20">
        <section className="relative z-10 overflow-hidden">
          <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] border border-border bg-card p-10 text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
          >
            <h1 className="text-3xl font-black text-foreground">Program not found</h1>
            <p className="mt-4 text-muted-foreground">
              The training solution you opened is not available.
            </p>
          </motion.div>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell className="pb-20">
      <section className="relative z-10 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2.2rem] border border-border bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
        >
          <div className="relative h-[320px] overflow-hidden md:h-[460px]">
            <img
              src={program.heroImage}
              alt={program.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute left-6 right-6 top-6 flex justify-between md:left-8 md:right-8 md:top-8">
              <div className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-md ${getLevelColor(program.level)}`}>
                {program.level}
              </div>
              <div className="flex items-center rounded-full border border-border bg-white/95 px-4 py-2 backdrop-blur-md">
                {program.price > 0 ? (
                  <>
                    <IndianRupee className="mr-1 h-4 w-4 text-primary" />
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

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h1 className="max-w-4xl text-3xl font-black leading-tight text-white md:text-5xl">
                {program.name}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/80">
                {program.description}
              </p>
            </div>
          </div>

          <div className="grid gap-6 border-t border-border p-6 md:grid-cols-3 md:p-8">
            <div className="rounded-[1.6rem] border border-border bg-[#fafafa] p-5">
              <div className="flex items-center gap-3 text-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-semibold">{program.schedule}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{program.duration}</p>
            </div>
            <div className="rounded-[1.6rem] border border-border bg-[#fafafa] p-5">
              <div className="flex items-center gap-3 text-foreground">
                <User className="h-5 w-5 text-primary" />
                <span className="font-semibold">{program.coachName}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Program lead</p>
            </div>
            <div className="rounded-[1.6rem] border border-border bg-[#fafafa] p-5">
              <div className="flex items-center gap-3 text-foreground">
                <Users className="h-5 w-5 text-foreground/70" />
                <span className="font-semibold">Max {program.maxStudents} athletes</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Session capacity</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] border border-border bg-card p-8 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
          >
            <h2 className="text-2xl font-black text-foreground">Program Overview</h2>
            <div className="mt-6 space-y-5 text-foreground/75">
              {program.overview.map((paragraph) => (
                <p key={paragraph} className="leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[2rem] border border-border bg-card p-8 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
            >
              <h2 className="text-2xl font-black text-foreground">What’s Included</h2>
              <ul className="mt-6 space-y-4">
                {program.inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground/78">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.45, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[2rem] border border-border bg-card p-8 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-black text-foreground">Expected Outcomes</h2>
              </div>
              <ul className="mt-6 space-y-4">
                {program.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground/78">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
        </div>
      </section>
    </PageShell>
  );
}
