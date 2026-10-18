import { Building2, School, Users, Trophy } from "lucide-react";
import { GlassCard, SectionIntro, TextLink } from "@/components/Design";
import { partnerTypes } from "@/lib/academy-content";
import type { CardMotif } from "@/components/CardArtwork";

const icons = [Building2, School, Users, Trophy];
const artwork: CardMotif[] = ["racket", "education", "team", "trophy"];
export function Partners({ detailed = false }: { detailed?: boolean }) {
  return (
    <section id="partners" className="section-shell bg-white">
      <div className="site-container">
        <SectionIntro
          heading={detailed ? "h1" : "h2"}
          label="Partner with us"
          title={
            <>
              Build <em>with us.</em>
            </>
          }
          action={
            <TextLink href="/contact?interest=Academy%20partnership">
              Become a Partner
            </TextLink>
          }
        />
        <div className="copy-grid">
          {partnerTypes.map((partner, i) => {
            const Icon = icons[i];
            return (
              <GlassCard
                key={partner.title}
                index={i}
                className="copy-card"
                artwork={artwork[i]}
                artworkTitle={
                  <h2 className="copy-card-title">{partner.title}</h2>
                }
                header={
                  <div className="icon-tile">
                    <Icon size={23} />
                  </div>
                }
              >
                <p>{detailed ? partner.body : partner.short}</p>
                <TextLink
                  href={
                    detailed
                      ? "/contact?interest=Academy%20partnership"
                      : "/partners"
                  }
                >
                  {detailed ? "Discuss a partnership" : "Explore partnerships"}
                </TextLink>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
