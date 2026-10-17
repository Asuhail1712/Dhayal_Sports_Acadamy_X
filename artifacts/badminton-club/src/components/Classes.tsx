import { ProgramCollection } from "@/components/ProgramCollection";
import { SectionIntro, TextLink } from "@/components/Design";
import { fallbackClasses } from "@/lib/fallback-data";

export function Classes() {
  return (
    <section id="classes" className="section-shell section-soft">
      <div className="site-container">
        <SectionIntro
          label="Find your next level"
          title={
            <>
              A pathway for
              <br />
              <em>every player.</em>
            </>
          }
          description="From the first grip to the pro circuit."
          action={<TextLink href="/programs">View All Programs</TextLink>}
        />
        <ProgramCollection programs={fallbackClasses.slice(0, 6)} preview />
      </div>
    </section>
  );
}
