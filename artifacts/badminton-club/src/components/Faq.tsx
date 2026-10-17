import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal, TextLink, ease } from "@/components/Design";

const questions = [
  ["What age can my child start?", "From age 6 in our Grassroots program."],
  [
    "What is Badminton Yoga?",
    "Yogic techniques adapted for badminton to improve focus, flexibility, and consistency.",
  ],
  [
    "How do overseas camps work?",
    "We arrange visa invitation letters, flights, stay, training, transport and guides. Message us your group size and dates and we plan the itinerary.",
  ],
  [
    "Is this a daycare?",
    "No. Every session focuses on skill and technique, not supervision.",
  ],
  [
    "How much do classes cost?",
    "Fees depend on the program and batch. Message us on WhatsApp for current pricing.",
  ],
  [
    "Can adults join?",
    "Yes. We run Adult and Masters classes, Fitness, Corporate and Private programs.",
  ],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  const reduced = useReducedMotion();
  return (
    <section className="section-shell bg-white">
      <div className="site-container faq-layout">
        <Reveal>
          <div className="eyebrow">
            <span />A little more clarity
          </div>
          <h2 className="section-title">
            Good questions.
            <br />
            <em>Clear answers.</em>
          </h2>
          <p className="section-description">
            Everything you need to take the first step.
          </p>
          <TextLink href="/contact">Ask us anything</TextLink>
        </Reveal>
        <Reveal>
          {questions.map(([question, answer], i) => (
            <div className="faq-item" key={question}>
              <h3>
                <button
                  className="faq-trigger"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={id + "-" + i}
                  id={id + "-question-" + i}
                >
                  {question}
                  <Plus size={19} />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    className="faq-answer"
                    id={id + "-" + i}
                    role="region"
                    aria-labelledby={id + "-question-" + i}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.35, ease }}
                  >
                    <p>{answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
