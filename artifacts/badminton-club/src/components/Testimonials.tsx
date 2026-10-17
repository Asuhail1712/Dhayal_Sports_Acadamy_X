import { GlassCard, SectionIntro } from "@/components/Design";

export type PlayerTestimonial = {
  quote: string;
  name: string;
  program: string;
  photo: string;
};

// Only add genuine client-approved quotes and photographs here.
export const approvedTestimonials: PlayerTestimonial[] = [];

export function Testimonials({
  items = approvedTestimonials,
}: {
  items?: PlayerTestimonial[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="section-shell bg-white">
      <div className="site-container">
        <SectionIntro
          label="Testimonials"
          title={
            <>
              What our <em>players say.</em>
            </>
          }
          description="Real progress, in their own words."
        />
        <div className="copy-grid">
          {items.map((item, index) => (
            <GlassCard
              key={item.name + item.program}
              className="copy-card"
              index={index}
            >
              <blockquote className="text-lg font-semibold leading-relaxed">
                {item.quote}
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <img
                  src={item.photo}
                  alt={item.name}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <strong className="text-sm">{item.name}</strong>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.program}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
