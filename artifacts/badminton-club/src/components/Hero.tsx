import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp, SiteLink, ease } from "@/components/Design";

import { academyStats as stats, whatsappUrl } from "@/lib/academy-content";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={ref} id="home" className="hero-section">
      <motion.div
        className="hero-backdrop"
        style={reduced ? undefined : { y, scale }}
      >
        <img
          src={import.meta.env.BASE_URL + "images/hero.jpeg"}
          alt="The Dayal Academy badminton team on court"
          fetchPriority="high"
        />
      </motion.div>
      <div className="site-container hero-content">
        <div className="hero-copy">
          <motion.div
            className="eyebrow hero-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span />
            <div>
              High Performance Badminton
              <br />
              and Yoga Academy
            </div>
          </motion.div>
          <h1 className="hero-heading" aria-label="Power Plus Intelligence">
            {["POWER", "PLUS", "INTELLIGENCE"].map((word, i) => (
              <motion.span
                key={word}
                className={i === 2 ? "hero-highlight" : ""}
                initial={
                  reduced ? false : { clipPath: "inset(0% -12% 100% -12%)" }
                }
                animate={{
                  clipPath: "inset(-18% -12% -20% -12%)",
                  transitionEnd: { clipPath: "none" },
                }}
                transition={{ duration: 1, delay: 0.1 + i * 0.12, ease }}
              >
                <motion.span
                  initial={reduced ? false : { y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.12, ease }}
                >
                  {word}
                </motion.span>
              </motion.span>
            ))}
          </h1>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8, ease }}
          >
            <p className="hero-description">
              <span>Train under world champions. Learn through science. </span>
              <span>Compete across the globe. Dayal Sports Academy </span>
              <span>
                builds champions from grassroots to pro level, with
                scientific{" "}
              </span>
              <span>
                training, Badminton Yoga, robo feeding and overseas exposure.
              </span>
            </p>
            <div className="hero-buttons">
              <Button
                asChild
                variant="green"
                className="h-12 gap-5 rounded-full px-6 text-xs"
              >
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Trial
                  <ArrowRight size={16} />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="hero-secondary h-12 rounded-full px-6 text-xs"
              >
                <SiteLink href="/programs">Explore Programs</SiteLink>
              </Button>
            </div>
            <a className="hero-scroll" href="#about">
              <ArrowDown size={14} />
              Discover the academy
            </a>
          </motion.div>
        </div>
        <motion.div
          className="hero-photo-note"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease }}
        >
          <div className="icon-tile">
            <Trophy size={21} />
          </div>
          <div>
            <strong>World champion mentorship.</strong>
            <small>Extraordinary people. A shared ambition.</small>
          </div>
        </motion.div>
      </div>
      <div className="site-container hero-stats">
        <p className="hero-stats-caption">
          A stronger game.
          <br />A bigger possibility.
        </p>
        {stats.map((stat) => (
          <div className="hero-stat" key={stat.label}>
            <strong>
              <CountUp value={stat.value} suffix={stat.suffix} />
            </strong>
            <small>{stat.label}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
