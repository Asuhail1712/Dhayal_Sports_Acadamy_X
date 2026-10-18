import {
  Brain,
  HeartPulse,
  Dumbbell,
  Apple,
  Waves,
  Trophy,
} from "lucide-react";
import { GlassCard, SectionIntro } from "@/components/Design";
import type { CardMotif } from "@/components/CardArtwork";
const artwork: CardMotif[] = ["brain", "heart", "dumbbell", "heart", "yoga"];

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
        <div className="support-grid">
          {disciplines.map(([Icon, title, description], i) => (
            <GlassCard
              key={title}
              index={i}
              className="support-card"
              artwork={artwork[i]}
              artworkTitle={<h3>{title}</h3>}
              header={
                <div className="icon-tile">
                  <Icon size={22} />
                </div>
              }
            >
              <p>{description}</p>
            </GlassCard>
          ))}
          <GlassCard
            className="support-card support-card--feature"
            index={5}
            artwork="trophy"
            artworkTitle={<h3>Champion</h3>}
            header={
              <div className="icon-tile">
                <Trophy size={22} />
              </div>
            }
          >
            <p>Teamwork and leadership, on and off the court.</p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
