import { AlertCircle, Clock, IndianRupee, User, Users } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { getProgramBySlug } from "@/lib/content";

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

export default function ProgramDetail({ slug }: { slug: string }) {
  const program = getProgramBySlug(slug);

  if (!program) {
    return (
      <PageShell className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-[2rem] border border-white/10 bg-card/60 p-10 text-center backdrop-blur-md">
            <h1 className="text-3xl font-black text-white">Program not found</h1>
            <p className="mt-4 text-white/60">
              The training solution you opened is not available.
            </p>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell className="pt-32 pb-20">
      <section className="container mx-auto px-4 md:px-6">
        <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-card/70 backdrop-blur-md">
          <div className="relative h-[320px] overflow-hidden md:h-[460px]">
            <img
              src={program.heroImage}
              alt={program.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />

            <div className="absolute left-6 right-6 top-6 flex justify-between md:left-8 md:right-8 md:top-8">
              <div className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-md ${getLevelColor(program.level)}`}>
                {program.level}
              </div>
              <div className="flex items-center rounded-full border border-white/10 bg-background/80 px-4 py-2 backdrop-blur-md">
                <IndianRupee className="mr-1 h-4 w-4 text-primary" />
                <span className="font-bold text-white">{program.price}</span>
                <span className="ml-1 text-xs text-white/50">fee</span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h1 className="max-w-4xl text-3xl font-black leading-tight text-white md:text-5xl">
                {program.name}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/72">
                {program.description}
              </p>
            </div>
          </div>

          <div className="grid gap-6 border-t border-white/10 p-6 md:grid-cols-3 md:p-8">
            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-center gap-3 text-white">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-semibold">{program.schedule}</span>
              </div>
              <p className="mt-2 text-sm text-white/50">{program.duration}</p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-center gap-3 text-white">
                <User className="h-5 w-5 text-secondary" />
                <span className="font-semibold">{program.coachName}</span>
              </div>
              <p className="mt-2 text-sm text-white/50">Program lead</p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-center gap-3 text-white">
                <Users className="h-5 w-5 text-white/70" />
                <span className="font-semibold">Max {program.maxStudents} athletes</span>
              </div>
              <p className="mt-2 text-sm text-white/50">Session capacity</p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-card/60 p-8 backdrop-blur-md">
            <h2 className="text-2xl font-black text-white">Program Overview</h2>
            <div className="mt-6 space-y-5 text-white/70">
              {program.overview.map((paragraph) => (
                <p key={paragraph} className="leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-card/60 p-8 backdrop-blur-md">
              <h2 className="text-2xl font-black text-white">What’s Included</h2>
              <ul className="mt-6 space-y-4">
                {program.inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/72">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-card/60 p-8 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-black text-white">Expected Outcomes</h2>
              </div>
              <ul className="mt-6 space-y-4">
                {program.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/72">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
