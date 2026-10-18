import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import { GlassCard, Reveal, TextLink } from "@/components/Design";

export function JoinUs() {
  return (
    <section className="section-shell section-soft accent-green">
      <div className="site-container join-layout">
        <Reveal>
          <div className="eyebrow">
            <span />
            Build something with us
          </div>
          <h2 className="section-title">
            Coach
            <br />
            <em>with us.</em>
          </h2>
          <p className="section-description">
            Grow your coaching career with scientific and traditional training,
            online and offline. Certification runs across Level 1, Level 2 and
            Level 3.
          </p>
        </Reveal>
        <div className="join-cards">
          <GlassCard
            className="join-card"
            artwork="education"
            header={
              <div className="icon-tile">
                <GraduationCap size={23} />
              </div>
            }
            artworkTitle={<h3>Coaches Program</h3>}
          >
            <p>
              Grow your coaching career with scientific and traditional
              training, online and offline, taught by master trainers.
              Certification runs across Level 1, Level 2, and Level 3.
            </p>
            <TextLink href="/join-us">Explore coach education</TextLink>
          </GlassCard>
          <GlassCard
            className="join-card"
            index={1}
            artwork="team"
            header={
              <div className="icon-tile">
                <BriefcaseBusiness size={23} />
              </div>
            }
            artworkTitle={<h3>Open roles</h3>}
          >
            <p>
              Front Desk Manager, Physiotherapist, Nutritionist, Martial Artist,
              Fitness Trainer, Caretaker, and Consultant.
            </p>
            <TextLink href="/join-us">View Open Roles</TextLink>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
