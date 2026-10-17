import { UniqueTraining } from "@/components/UniqueTraining";
import { PageShell } from "@/components/PageShell";
import { ProgramCollection } from "@/components/ProgramCollection";
import { SectionIntro, TextLink } from "@/components/Design";
import { fallbackClasses } from "@/lib/fallback-data";

export default function Programs() {
  return (
    <PageShell>
      <section className="section-shell">
        <div className="site-container">
          <SectionIntro
            heading="h1"
            label="Training solutions"
            title={
              <>
                A pathway for
                <br />
                <em>every player.</em>
              </>
            }
            description="From the first grip to the pro circuit, every stage has a dedicated program."
            action={<TextLink href="/contact">Find the right program</TextLink>}
          />
        </div>
      </section>
      <UniqueTraining detailed />
      <section className="section-shell">
        <div className="site-container">
          <h2 className="mb-8 text-3xl font-bold">Find your program</h2>
          <ProgramCollection programs={fallbackClasses} />
          <p className="mt-8 text-sm text-muted-foreground">
            Fees and batch timings available on request via WhatsApp.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
