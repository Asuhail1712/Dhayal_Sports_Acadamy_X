import { motion } from "framer-motion";
import { ArrowRight, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const cards = [
  ["Elite and Recreational Camps", "Tournament-level training of 6 to 8 hours a day, with player tracking, coach notes, direct feedback, sightseeing, and overseas tournaments."],
  ["Sports Education Tourism", "7, 10, or 15 day programs for schools across Asia with school visits, labs, friendly matches, theme parks, monuments, and complete travel support."],
  ["International Championships", "Masters and ranking tournaments across Asia and Europe with entries, visa letters, hotels, tickets, sightseeing, and coach support."],
] as const;

export function Camps() {
  return (
    <section id="camps" className="relative z-10 overflow-hidden bg-white py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Global exposure</p>
            <h2 className="mt-3 text-3xl font-black text-foreground md:text-5xl">Train abroad. Compete worldwide.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">Camps, school tours, and championships run by Dayal Sports Academy, Hong Kong.</p>
          </div>
          <Globe2 className="hidden h-16 w-16 text-secondary md:block" />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {cards.map(([title, description], index) => (
            <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="glass-panel rounded-[2rem] p-7">
              <div className="mb-8 text-5xl font-black text-primary/20">0{index + 1}</div>
              <h3 className="text-2xl font-black text-foreground">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </motion.article>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-primary/15 bg-primary/5 p-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">Popular routes: Hong Kong, Macau and China · Singapore, Malaysia, Hong Kong and China · Thailand, Hong Kong and China</p>
          <Button asChild className="shrink-0"><a href="#contact">Plan a camp or tour <ArrowRight className="ml-2 h-4 w-4" /></a></Button>
        </div>
      </div>
    </section>
  );
}
