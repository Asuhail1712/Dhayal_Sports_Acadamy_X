import { ArrowLeft, ArrowRight, Waves, Clock3 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { GlassCard, Reveal, SiteLink, TextLink } from "@/components/Design";
import { getProgramBySlug } from "@/lib/content";
import { whatsappUrl } from "@/lib/academy-content";

export default function ProgramDetail({ slug }: { slug: string }) {
  const program = getProgramBySlug(slug);
  if (!program)
    return (
      <PageShell>
        <section className="section-shell">
          <div className="site-container">
            <h1 className="section-title">Program not found.</h1>
            <p className="section-description">
              The program you opened is not available.
            </p>
            <TextLink href="/programs">Explore all programs</TextLink>
          </div>
        </section>
      </PageShell>
    );
  return (
    <PageShell>
      <section className="section-shell">
        <div className="site-container">
          <SiteLink href="/programs" className="detail-breadcrumb">
            <ArrowLeft size={14} />
            Programs / {program.level}
          </SiteLink>
          <Reveal className="detail-program-heading">
            <div>
              <span className="pill">{program.age}</span>
              <h1 className="section-title mt-6">{program.name}</h1>
              <p className="section-description">{program.description}</p>
            </div>
            <Button
              asChild
              variant="green"
              className="h-12 shrink-0 gap-4 rounded-full text-sm"
            >
              <a
                href={whatsappUrl(
                  "Hello Dayal Sports Academy, I would like to enquire about " +
                    program.name +
                    ".",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enquire <ArrowRight size={15} />
              </a>
            </Button>
          </Reveal>
          <Reveal className="detail-program-photo">
            <img
              src={program.heroImage}
              alt="Badminton training and athlete development"
              fetchPriority="high"
            />
          </Reveal>
          <div className="copy-grid mt-10">
            <GlassCard
              className="copy-card"
              artwork="progress"
              artworkTitle={
                <h2 className="copy-card-title">Plan your training</h2>
              }
              header={
                <div className="icon-tile">
                  <Clock3 size={22} />
                </div>
              }
            >
              <p>Fees and batch timings available on request via WhatsApp.</p>
              <TextLink
                href={whatsappUrl(
                  "Hello Dayal Sports Academy, please share fees and batch timings for " +
                    program.name +
                    ".",
                )}
              >
                Ask about {program.name}
              </TextLink>
            </GlassCard>
            <GlassCard
              className="copy-card"
              index={1}
              artwork="racket"
              artworkTitle={
                <h2 className="copy-card-title">Training built different.</h2>
              }
              header={
                <div className="icon-tile">
                  <Waves size={22} />
                </div>
              }
            >
              <p>
                Explore Badminton Yoga, Robo Training, Functional Training and
                Coordination Training.
              </p>
              <TextLink href="/programs">See how we train</TextLink>
            </GlassCard>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
