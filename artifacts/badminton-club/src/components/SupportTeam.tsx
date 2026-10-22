import { useId, useRef } from "react";
import {
  Brain,
  HeartPulse,
  Dumbbell,
  Apple,
  Waves,
  Trophy,
  ArrowDown,
} from "lucide-react";
import { SectionIntro } from "@/components/Design";
import { PhotoFrame } from "@/components/PhotoFrame";
import { SupportGlassSurface } from "@/components/SupportGlassSurface";
import { supportPhotos } from "@/lib/academy-media";
import { getStackScrollTarget } from "@/lib/scroll-story";

const disciplines = [
  [
    Brain,
    "Sports Psychology",
    "Manage arousal, build self-esteem, and overcome fear, stress, and negative self-talk.",
  ],
  [
    HeartPulse,
    "Sports Physicians",
    "Push beyond your limits without injury, backed by our sports medicine team.",
  ],
  [
    Dumbbell,
    "Sports Physical Trainers",
    "Consistent, scientific physical conditioning that keeps improving your game.",
  ],
  [
    Apple,
    "Sports Nutritionists",
    "Nutrition planned around each player's individual needs.",
  ],
  [
    Waves,
    "Sports Yoga",
    "Yogic techniques limited to your sport to sharpen focus, consistency and recovery.",
  ],
] as const;

export function SupportTeam() {
  const id = useId();
  const stackRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    const stack = stackRef.current;
    if (!stack?.offsetHeight) return;
    const cards = Array.from(stack.children) as HTMLElement[];
    const styles = getComputedStyle(stack);
    window.scrollTo({
      top: getStackScrollTarget({
        stackTop: stack.getBoundingClientRect().top,
        pageY: window.scrollY,
        stickyTop:
          parseFloat(styles.getPropertyValue("--support-sticky-top")) || 0,
        heights: cards.map((card) => card.offsetHeight),
        gap: parseFloat(styles.rowGap) || 0,
        index,
      }),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <section className="section-shell section-soft accent-green">
      <div className="site-container">
        <SectionIntro
          label="Whole-athlete support"
          title={
            <>
              A full support team
              <br />
              <em>behind every player.</em>
            </>
          }
          description="Five specialist disciplines. One result: a champion."
        />
        <nav className="support-stack-nav" aria-label="Support disciplines">
          {disciplines.map(([, title], index) => (
            <button
              key={title}
              type="button"
              aria-label={`Show ${title}`}
              aria-controls={`${id}-card-${index}`}
              onClick={() => goTo(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="support-step-label">{title}</span>
            </button>
          ))}
        </nav>
        <div
          ref={stackRef}
          className="support-stack"
          role="list"
          aria-label="Five specialist disciplines"
        >
          {disciplines.map(([Icon, title, description], index) => (
            <article
              key={title}
              id={`${id}-card-${index}`}
              className="support-stack-card"
              role="listitem"
              aria-labelledby={`${id}-heading-${index}`}
              data-support-tone={index % 2 ? "green" : "blue"}
              style={{ zIndex: index + 1 }}
            >
              <SupportGlassSurface>
                <div
                  className="support-card-visual"
                  data-support-photo={supportPhotos[title].id}
                >
                  <PhotoFrame
                    photo={supportPhotos[title]}
                    sizes="(max-width: 767px) calc(100vw - 68px), 48vw"
                  />
                  <div className="support-image-label" aria-hidden="true">
                    <span>Whole-athlete support</span>
                    <strong>{String(index + 1).padStart(2, "0")} / 05</strong>
                  </div>
                </div>
                <div className="support-card-copy">
                  <div className="support-card-kicker">
                    <div className="icon-tile">
                      <Icon size={24} aria-hidden="true" />
                    </div>
                    <span>Discipline {String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 id={`${id}-heading-${index}`}>{title}</h3>
                  <p>{description}</p>
                  {index < disciplines.length - 1 && (
                    <span className="support-scroll-hint">
                      <ArrowDown size={17} aria-hidden="true" /> Scroll to
                      explore
                    </span>
                  )}
                </div>
              </SupportGlassSurface>
            </article>
          ))}
        </div>
        <div className="support-champion-note">
          <Trophy size={23} aria-hidden="true" />
          <p>
            <strong>Champion</strong>Teamwork and leadership, on and off the
            court.
          </p>
        </div>
      </div>
    </section>
  );
}
