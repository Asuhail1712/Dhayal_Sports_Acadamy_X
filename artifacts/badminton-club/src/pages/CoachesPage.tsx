import { PageShell } from "@/components/PageShell";
import { CoachCollection } from "@/components/CoachCollection";
import { SectionIntro, TextLink } from "@/components/Design";
import { GlassCard } from "@/components/Design";
import { supportProfiles, whatsappUrl } from "@/lib/academy-content";
import { fallbackCoaches } from "@/lib/fallback-data";

export default function CoachesPage() {
  return (
    <PageShell>
      <section className="section-shell accent-green">
        <div className="site-container">
          <SectionIntro
            heading="h1"
            label="Meet the team"
            title={
              <>
                Train with
                <br />
                <em>champions.</em>
              </>
            }
            description="A team led by a master world champion and guided by a former world champion."
            action={
              <TextLink
                href={whatsappUrl(
                  "Hello Dayal Sports Academy, I would like to enquire about training with our coaches.",
                )}
              >
                Enquire about training with our coaches
              </TextLink>
            }
          />
          <CoachCollection coaches={fallbackCoaches} />
          <h2 className="mt-16 mb-8 text-3xl font-bold">Support team</h2>
          <div className="copy-grid copy-grid--three">
            {supportProfiles.map((person, i) => (
              <GlassCard key={person.name} className="copy-card" index={i}>
                <span className="pill pill--green">{person.title}</span>
                <h3 className="copy-card-title">{person.name}</h3>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
