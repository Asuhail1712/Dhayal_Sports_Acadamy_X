import { fallbackCoaches } from "@/lib/fallback-data";
import { CoachCollection } from "@/components/CoachCollection";
import { SectionIntro, TextLink } from "@/components/Design";

export function Coaches() {
  return (
    <section id="coaches" className="section-shell bg-white accent-green">
      <div className="site-container">
        <SectionIntro
          label="The people behind the progress"
          title={
            <>
              Train with
              <br />
              <em>champions.</em>
            </>
          }
          description="A team led by a master world champion and guided by a former world champion."
          action={<TextLink href="/coaches">View Full Team</TextLink>}
        />
        <CoachCollection coaches={fallbackCoaches} preview />
      </div>
    </section>
  );
}
