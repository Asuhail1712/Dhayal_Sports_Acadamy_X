import { PageShell } from "@/components/PageShell";
import { About } from "@/components/About";
import { SupportTeam } from "@/components/SupportTeam";
import { CoachCollection } from "@/components/CoachCollection";
import { GlassCard, SectionIntro, TextLink } from "@/components/Design";
import {
  story,
  academyCoaches,
  founderStory,
  mentorStory,
} from "@/lib/academy-content";

export default function AboutPage() {
  const mentors = academyCoaches.slice(0, 2).map((coach, i) => ({
    ...coach,
    bio: i === 0 ? founderStory : mentorStory,
  }));
  return (
    <PageShell>
      <About detailed />
      <section className="section-shell section-soft">
        <div className="site-container">
          <SectionIntro
            label="How we train"
            title={
              <>
                Real learning. <em>At every age.</em>
              </>
            }
          />
          <div className="copy-grid">
            {story.learning.map((point, i) => (
              <GlassCard
                className="copy-card"
                key={point.title}
                index={i}
                artwork={i === 0 ? "education" : "progress"}
                artworkTitle={
                  <h2 className="copy-card-title">{point.title}</h2>
                }
              >
                <p>{point.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      <section className="section-shell">
        <div className="site-container">
          <SectionIntro
            label="Founder and overseas mentor"
            title={
              <>
                Guided by <em>champions.</em>
              </>
            }
          />
          <CoachCollection coaches={mentors} />
        </div>
      </section>
      <SupportTeam />
      <div className="site-container pb-16">
        <TextLink href="/coaches">Meet our full coaching team</TextLink>
      </div>
    </PageShell>
  );
}
