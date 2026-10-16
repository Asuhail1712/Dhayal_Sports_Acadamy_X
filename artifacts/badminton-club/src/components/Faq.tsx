import { motion } from "framer-motion";

const questions = [
  ["What age can my child start?", "From age 6 in our Grassroots program."],
  ["What is Badminton Yoga?", "Yogic techniques adapted for badminton to improve focus, flexibility, and consistency."],
  ["How do overseas camps work?", "We arrange visa invitation letters, flights, stay, training, transport, and guides."],
  ["Is this a daycare?", "No. Every session focuses on skill and technique, not supervision."],
  ["How much do classes cost?", "Fees depend on the program and batch. Message us on WhatsApp for current pricing."],
  ["Can adults join?", "Yes. We run Adult and Masters, Fitness, Corporate, and Private programs."],
] as const;

export function Faq() {
  return (
    <section className="relative z-10 bg-[#fafafa] py-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <div className="mb-12 text-center"><p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">FAQ</p><h2 className="mt-3 text-3xl font-black text-foreground md:text-5xl">Questions, answered.</h2></div>
        <div className="grid gap-4 md:grid-cols-2">
          {questions.map(([question, answer], index) => <motion.details key={question} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="glass-panel rounded-2xl p-5"><summary className="cursor-pointer font-bold text-foreground">{question}</summary><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{answer}</p></motion.details>)}
        </div>
      </div>
    </section>
  );
}
