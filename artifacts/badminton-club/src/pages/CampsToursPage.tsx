import { Globe2, Plane, Trophy } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GlassCard, SectionIntro, Reveal, TextLink } from "@/components/Design";
import {
  campOptions,
  schoolTour,
  championshipTour,
  whatsappUrl,
} from "@/lib/academy-content";

export default function CampsToursPage() {
  return (
    <PageShell>
      <section className="section-shell">
        <div className="site-container">
          <SectionIntro
            heading="h1"
            label="Camps & Tours"
            title={
              <>
                Train abroad.
                <br />
                <em>Compete worldwide.</em>
              </>
            }
            description="Camps, school tours and championships run by Dayal Sports Academy, Hong Kong."
          />
          <Reveal className="camp-route">
            <Globe2 size={28} className="shrink-0 text-secondary" />
            <p>Led by a founder who has travelled to more than 85 countries.</p>
          </Reveal>
          <h2 className="mt-14 mb-8 text-3xl font-bold">
            Elite and Recreational Camps
          </h2>
          <div className="copy-grid">
            {campOptions.map((camp, i) => (
              <GlassCard key={camp.title} className="copy-card" index={i}>
                <span className="pill pill--green">
                  {i === 0 ? "6 to 8 hours a day" : "Explore and enjoy"}
                </span>
                <h3 className="copy-card-title">{camp.title}</h3>
                <p>{camp.body}</p>
                <TextLink
                  href={whatsappUrl(
                    "Hello Dayal Sports Academy, I would like to plan a " +
                      camp.title +
                      " experience.",
                  )}
                >
                  Enquire about this camp
                </TextLink>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      <section className="section-shell section-soft accent-green">
        <div className="site-container">
          <SectionIntro
            label="Sports Education Tourism (SET)"
            title={
              <>
                A world of <em>learning.</em>
              </>
            }
            description={schoolTour.overview}
            action={<Plane size={44} className="text-secondary" />}
          />
          <div className="copy-grid">
            <GlassCard className="copy-card">
              <h2 className="copy-card-title">How it works</h2>
              <p>{schoolTour.process}</p>
            </GlassCard>
            <GlassCard className="copy-card" index={1}>
              <h2 className="copy-card-title">What's included</h2>
              <p>{schoolTour.included}</p>
            </GlassCard>
          </div>
        </div>
      </section>
      <section className="section-shell">
        <div className="site-container">
          <SectionIntro
            label="International Championships Tourism"
            title={
              <>
                Compete on a <em>global stage.</em>
              </>
            }
            description={championshipTour}
            action={<Trophy size={44} className="text-primary" />}
          />
          <Reveal className="camp-route">
            <p>
              Ask us about tournament opportunities in Australia, Korea and
              Thailand. Dates and availability are confirmed directly with our
              team.
            </p>
            <TextLink
              href={whatsappUrl(
                "Hello Dayal Sports Academy, I would like to plan a camp or tour. My group size is __ and preferred dates are __.",
              )}
            >
              Plan a camp or tour
            </TextLink>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
