import { ArrowRight, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard, Reveal, SectionIntro, SiteLink } from "@/components/Design";
import type { CardMotif } from "@/components/CardArtwork";
const artwork: CardMotif[] = ["trophy", "plane", "globe"];

const camps = [
  [
    "Elite & Recreational Camps",
    "Tournament-level training of 6 to 8 hours a day, with player tracking, coach notes, direct feedback, sightseeing, and overseas tournaments.",
  ],
  [
    "Sports Education Tourism",
    "7, 10, or 15 day programs for schools across Asia with school visits, labs, friendly matches, theme parks, monuments, and complete travel support.",
  ],
  [
    "International Championships",
    "Masters and ranking tournaments across Asia and Europe with entries, visa letters, hotels, tickets, sightseeing, and coach support.",
  ],
];

export function Camps() {
  return (
    <section id="camps" className="section-shell bg-white">
      <div className="site-container">
        <SectionIntro
          label="Beyond your home court"
          title={
            <>
              Train abroad.
              <br />
              <em>Compete worldwide.</em>
            </>
          }
          description="Camps, school tours, and championships run by Dayal Sports Academy, Hong Kong."
          action={
            <Globe2 size={48} strokeWidth={1} className="text-secondary/70" />
          }
        />
        <div className="camp-grid">
          {camps.map(([title, description], i) => (
            <GlassCard
              key={title}
              className="camp-card"
              index={i}
              artwork={artwork[i]}
              header={<span className="camp-index">0{i + 1}</span>}
              artworkTitle={<h3>{title}</h3>}
            >
              <p>{description}</p>
            </GlassCard>
          ))}
        </div>
        <Reveal className="camp-route">
          <p>
            Popular routes: Hong Kong, Macau & China; Singapore, Malaysia, Hong
            Kong & China.
          </p>
          <Button
            asChild
            variant="green"
            className="shrink-0 gap-4 rounded-full text-xs"
          >
            <SiteLink href="/camps-tours">
              Plan a Camp or Tour
              <ArrowRight size={15} />
            </SiteLink>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
