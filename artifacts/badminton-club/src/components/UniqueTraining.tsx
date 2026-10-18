import { Waves, Bot, Dumbbell, Focus } from "lucide-react";
import { GlassCard, SectionIntro, TextLink } from "@/components/Design";
import { trainingMethods } from "@/lib/academy-content";

const icons = [Waves, Bot, Dumbbell, Focus];
export function UniqueTraining({ detailed = false }: { detailed?: boolean }) {
  return (
    <section
      id="how-we-train"
      className="section-shell section-soft accent-green"
    >
      <div className="site-container">
        <SectionIntro
          label="Unique training"
          title={
            <>
              Training <em>built different.</em>
            </>
          }
          description="Four methods that set our players apart."
          action={
            !detailed && <TextLink href="/programs">See how we train</TextLink>
          }
        />
        <div className="copy-grid">
          {trainingMethods.map((method, i) => {
            const Icon = icons[i];
            return (
              <GlassCard
                key={method.title}
                index={i}
                className="copy-card"
                artwork={false}
              >
                <div className="icon-tile">
                  <Icon size={23} />
                </div>
                <span className="pill pill--green">{method.category}</span>
                <h3 className="copy-card-title">{method.title}</h3>
                <p>{detailed ? method.body : method.short}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
