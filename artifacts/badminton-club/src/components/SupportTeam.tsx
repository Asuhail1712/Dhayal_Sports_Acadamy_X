import { motion } from "framer-motion";
import { Brain, HeartPulse, Dumbbell, Apple, Waves, Trophy } from "lucide-react";

const disciplines = [
  [Brain, "Sports Psychology", "Manage arousal, build self-esteem, and overcome fear, stress, and negative self-talk."],
  [HeartPulse, "Sports Physicians", "Push beyond your limits without injury, backed by our sports medicine team."],
  [Dumbbell, "Sports Physical Trainers", "Scientific physical conditioning that keeps improving your game."],
  [Apple, "Sports Nutritionists", "Nutrition planned around each player's individual needs."],
  [Waves, "Sports Yoga", "Yogic techniques adapted to your sport to sharpen focus, consistency, and recovery."],
] as const;

export function SupportTeam() {
  return (
    <section className="relative z-10 bg-[#fafafa] py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Whole-athlete support</p>
          <h2 className="mt-3 text-3xl font-black text-foreground md:text-5xl">A full support team behind every player.</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">Five specialist disciplines. One result: a champion.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {disciplines.map(([Icon, title, description], index) => (
            <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="glass-panel rounded-2xl p-5">
              <Icon className="mb-5 h-8 w-8 text-primary" />
              <h3 className="text-lg font-black text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </motion.article>
          ))}
          <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl bg-primary p-5 text-white sm:col-span-2 lg:col-span-5">
            <Trophy className="mb-4 h-8 w-8 text-secondary" />
            <h3 className="text-2xl font-black">Champion</h3>
            <p className="mt-2 max-w-xl text-sm text-white/80">Teamwork and leadership, on and off the court.</p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
