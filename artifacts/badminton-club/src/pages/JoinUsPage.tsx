import { GraduationCap, BriefcaseBusiness } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GlassCard, SectionIntro, TextLink } from "@/components/Design";
import { coachingProgram, openRoles, whatsappUrl } from "@/lib/academy-content";

export default function JoinUsPage() {
  return (
    <PageShell>
      <section className="section-shell section-soft accent-green">
        <div className="site-container">
          <SectionIntro
            heading="h1"
            label="Join Us"
            title={
              <>
                Coach <em>with us.</em>
              </>
            }
            description={coachingProgram}
            action={<GraduationCap size={48} className="text-secondary" />}
          />
          <div className="copy-grid copy-grid--three">
            {[1, 2, 3].map((level) => (
              <GlassCard
                key={level}
                className="copy-card"
                index={level - 1}
                artwork="education"
                header={
                  <span className="pill pill--green">
                    Coaching certification
                  </span>
                }
                artworkTitle={
                  <h2 className="copy-card-title">Level {level}</h2>
                }
              >
                <TextLink href="/contact?interest=Coach%20program">
                  Enquire about certification
                </TextLink>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      <section className="section-shell">
        <div className="site-container">
          <SectionIntro
            label="Open roles"
            title={
              <>
                Find your <em>place.</em>
              </>
            }
            action={<BriefcaseBusiness size={44} className="text-primary" />}
          />
          <div className="copy-grid">
            {openRoles.map((role, i) => (
              <GlassCard
                key={role}
                className="copy-card"
                index={i}
                artwork="team"
                artworkTitle={<h2 className="copy-card-title">{role}</h2>}
              >
                <TextLink
                  href={whatsappUrl(
                    "Hello Dayal Sports Academy, I would like to apply for the " +
                      role +
                      " role. Please share the role details and application process.",
                  )}
                >
                  Apply now
                </TextLink>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
