import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function JoinUs() {
  return (
    <section className="relative z-10 bg-white py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Join us</p>
          <h2 className="mt-3 text-3xl font-black text-foreground md:text-5xl">Coach with us.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="glass-panel rounded-[2rem] p-7"><GraduationCap className="mb-5 h-9 w-9 text-primary" /><h3 className="text-2xl font-black">Coaches Program</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Grow your coaching career with scientific and traditional training, online and offline, taught by master trainers. Certification runs across Level 1, Level 2, and Level 3.</p></article>
          <article className="glass-panel rounded-[2rem] p-7"><BriefcaseBusiness className="mb-5 h-9 w-9 text-primary" /><h3 className="text-2xl font-black">Open roles</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Front Desk Manager, Physiotherapist, Nutritionist, Martial Artist, Fitness Trainer, Caretaker, and Consultant.</p><Button asChild className="mt-6"><a href="#contact">Apply now</a></Button></article>
        </div>
      </div>
    </section>
  );
}
