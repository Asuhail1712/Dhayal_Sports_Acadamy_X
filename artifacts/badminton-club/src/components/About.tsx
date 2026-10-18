import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight, Award, Medal, Globe2, MapPin } from "lucide-react";
import type { CardMotif } from "@/components/CardArtwork";
import { CountUp, GlassCard, Reveal, SiteLink } from "@/components/Design";

import { academyStats as stats, story } from "@/lib/academy-content";
const metricArtwork: CardMotif[] = ["trophy", "medal", "globe", "pins"];
const metricIcons = [Award, Medal, Globe2, MapPin];

export function About({ detailed = false }: { detailed?: boolean }) {
  const Heading = detailed ? "h1" : "h2";
  const layoutRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const layout = layoutRef.current;
    const photo = photoRef.current;
    const copy = copyRef.current;
    if (!layout || !photo || !copy) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      // Extend the image upward without moving its original bottom edge.
      const extension = desktop.matches
        ? Math.max(0, (copy.offsetHeight - photo.offsetHeight) / 2)
        : 0;
      layout.style.setProperty("--about-photo-extend", `${extension}px`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(photo);
    observer.observe(copy);
    desktop.addEventListener("change", measure);
    measure();
    return () => {
      observer.disconnect();
      desktop.removeEventListener("change", measure);
    };
  }, []);

  return (
    <section id="about" className="section-shell bg-white">
      <div className="site-container">
        <div className="about-layout" ref={layoutRef}>
          <div className="about-photo" ref={photoRef}>
            <Reveal className="about-photo-frame">
              <img
                src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1000&q=85"
                alt="Badminton players training on court"
                loading="lazy"
              />
              <GlassCard className="about-photo-tag" tilt={8} artwork={false}>
                <strong>5</strong>
                <p>
                  Guinness World Records.
                  <br />
                  One extraordinary academy.
                </p>
              </GlassCard>
            </Reveal>
          </div>
          <div className="about-copy" ref={copyRef}>
            <Reveal delay={0.1}>
              <div className="eyebrow">
                <span />
                About Dayal Sports Academy
              </div>
              <Heading className="section-title">
                Where sportsmanship
                <br />
                <em>becomes a career.</em>
              </Heading>
              {(detailed ? story.paragraphs : [story.short]).map(
                (paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ),
              )}
              {detailed && (
                <>
                  <p className="!text-foreground !font-semibold">
                    {story.quote}
                  </p>
                  <div className="about-mentors">
                    {story.values.map((value) => (
                      <div key={value.title}>
                        <strong>{value.title}</strong>
                        <span>{value.body}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <SiteLink
                href={detailed ? "/coaches" : "/about"}
                className="text-link mt-5"
              >
                {detailed
                  ? "Meet our full coaching team"
                  : "Read our full story"}{" "}
                <ArrowUpRight size={18} />
              </SiteLink>
            </Reveal>
          </div>
        </div>
        <div className="metric-grid">
          {stats.map((stat, i) => {
            const Icon = metricIcons[i];
            return (
              <GlassCard
                key={stat.label}
                index={i}
                className="metric-card"
                artwork={metricArtwork[i]}
                artworkTitle={
                  <strong>
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </strong>
                }
                header={
                  <div className="icon-tile">
                    <Icon size={21} />
                  </div>
                }
              >
                <p>{stat.label}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
