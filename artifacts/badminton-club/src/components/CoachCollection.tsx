import { Award, ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/Design";
import { whatsappUrl, type AcademyCoach } from "@/lib/academy-content";

export function CoachCollection({
  coaches,
  preview = false,
}: {
  coaches: AcademyCoach[];
  preview?: boolean;
}) {
  return (
    <div className="coach-grid">
      {coaches.map((coach, i) => (
        <GlassCard
          key={coach.id}
          className="coach-card"
          index={i}
          artwork={false}
        >
          <div className="coach-monogram" aria-hidden="true">
            <span className="coach-initials">
              {coach.name
                .replace(/^(Bishmachari |Dr\. |Mrs\. |Mr\. )+/g, "")
                .split(" ")
                .slice(0, 2)
                .map((part) => part[0])
                .join("")}
            </span>
            <div className="pill">
              {i < 2 ? "World champion mentorship" : "Athlete development"}
            </div>
          </div>
          <div className="coach-info">
            <h3>{coach.name}</h3>
            <p className="coach-role">{coach.title}</p>
            <p>{preview ? coach.short : coach.bio}</p>
            <div className="coach-tags">
              {coach.specialties.map((specialty) => (
                <span key={specialty}>{specialty}</span>
              ))}
            </div>
            {!preview && coach.credentials && (
              <p className="mt-4">
                <strong>Credentials: </strong>
                {coach.credentials}
              </p>
            )}
            {!preview && coach.highlights && (
              <ul className="space-y-3">
                {coach.highlights.map((highlight) => (
                  <li className="coach-achievement" key={highlight}>
                    <Award size={16} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
            <a
              href={whatsappUrl(
                "Hello Dayal Sports Academy, I would like to enquire about training with our coaches.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link mt-4"
            >
              Train with our team <ArrowUpRight size={16} />
            </a>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
