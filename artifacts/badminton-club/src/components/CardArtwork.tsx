import type { CSSProperties, ReactNode } from "react";
import type { AcademyPhoto } from "@/lib/academy-media";
import {
  Trophy,
  Medal,
  Globe2,
  MapPin,
  Feather,
  Focus,
  Bot,
  Dumbbell,
  Waves,
  Plane,
  GraduationCap,
  Users,
  ShoppingBag,
  HeartPulse,
  Brain,
  TrendingUp,
} from "lucide-react";

export const cardMotifs = [
  "trophy",
  "medal",
  "globe",
  "pins",
  "shuttlecock",
  "racket",
  "robot",
  "dumbbell",
  "yoga",
  "plane",
  "education",
  "team",
  "shop",
  "heart",
  "brain",
  "progress",
] as const;

export type CardMotif = (typeof cardMotifs)[number];
export type CardTone = "blue" | "green";

const icons = {
  trophy: Trophy,
  medal: Medal,
  globe: Globe2,
  pins: MapPin,
  shuttlecock: Feather,
  racket: Focus,
  robot: Bot,
  dumbbell: Dumbbell,
  yoga: Waves,
  plane: Plane,
  education: GraduationCap,
  team: Users,
  shop: ShoppingBag,
  heart: HeartPulse,
  brain: Brain,
  progress: TrendingUp,
};

export function CardIllustration({ motif }: { motif: CardMotif }) {
  const index = cardMotifs.indexOf(motif);
  const style: CSSProperties = {
    backgroundImage: `url("${import.meta.env.BASE_URL}images/card-artwork.webp")`,
    backgroundPosition: `${((index % 4) * 100) / 3}% ${(Math.floor(index / 4) * 100) / 3}%`,
  };
  return <div className="card-illustration" style={style} aria-hidden="true" />;
}

export function CardVisual({
  motif,
  header,
  title,
  image,
}: {
  motif: CardMotif;
  header?: ReactNode;
  title?: ReactNode;
  image?: AcademyPhoto;
}) {
  const Icon = icons[motif];
  return (
    <div
      className="card-visual-row"
      data-has-title={title ? "true" : undefined}
    >
      <div className="card-visual-leading">
        {header ?? (
          <div className="icon-tile" aria-hidden="true">
            <Icon size={22} />
          </div>
        )}
      </div>
      {title && <div className="card-visual-title">{title}</div>}
      <div className="card-art-stage" aria-hidden={image ? undefined : true}>
        {image ? (
          <img
            className="card-portrait"
            src={image.src}
            srcSet={image.srcSet}
            sizes="200px"
            width={image.width}
            height={image.height}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: image.position }}
          />
        ) : (
          <CardIllustration motif={motif} />
        )}
      </div>
    </div>
  );
}

export function CardArtwork() {
  return (
    <div className="card-decoration" aria-hidden="true">
      <svg
        className="card-swoosh"
        viewBox="0 0 420 120"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          d="M0 120C156 120 244 74 420 8V43C242 104 170 120 0 120Z"
          fill="currentColor"
          opacity=".15"
        />
        <path
          d="M0 120C162 119 267 90 420 42V60C255 112 173 124 0 120Z"
          fill="currentColor"
          opacity=".08"
        />
        <path
          d="M63 120C208 112 300 77 420 17"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity=".23"
        />
      </svg>
    </div>
  );
}
