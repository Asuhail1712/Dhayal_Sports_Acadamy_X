import { fallbackClasses } from "@/lib/fallback-data";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const programImagesByLevel: Record<string, string> = {
  Beginner:
    "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1400&q=85",
  Intermediate:
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1400&q=85",
  Advanced:
    "https://images.unsplash.com/photo-1590075865003-e48277faa558?w=1400&q=85",
  Elite:
    "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1400&q=85",
  default:
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1400&q=85",
};

const levelAudience: Record<string, string> = {
  Beginner:
    "Players beginning structured badminton training and families looking for a disciplined development environment.",
  Intermediate:
    "Players ready for higher training load, periodic assessment, and deeper specialist support around performance and recovery.",
  Advanced:
    "Competitive athletes who need event-specific mentoring, technical refinement, and supporting fitness systems.",
  Elite:
    "High-commitment players aiming for tournament pathways, advanced equipment integration, and specialist input around competition.",
};

const levelOutcome: Record<string, string> = {
  Beginner:
    "Stronger training habits, cleaner fundamentals, and a clear transition into performance-led academy routines.",
  Intermediate:
    "Better movement quality, structured performance reviews, and integrated support across assessment, medicine, and nutrition.",
  Advanced:
    "Sharper event-specific preparation, improved match intelligence, and a more rounded training ecosystem around the athlete.",
  Elite:
    "Higher competition readiness, stronger exposure opportunities, and a more complete pathway around serious performance goals.",
};

export type ProgramDetail = {
  id: number;
  slug: string;
  name: string;
  level: string;
  description: string;
  schedule: string;
  duration: string;
  maxStudents: number;
  price: number;
  coachName: string;
  heroImage: string;
  overview: string[];
  inclusions: string[];
  outcomes: string[];
};

export const programDetails: ProgramDetail[] = fallbackClasses.map((program) => ({
  ...program,
  slug: slugify(program.name),
  heroImage: programImagesByLevel[program.level] || programImagesByLevel.default,
  overview: [
    `${program.name} is part of the academy's ${program.level.toLowerCase()} pathway and is structured around ${program.schedule.toLowerCase()} delivery.`,
    `${program.description} The format is planned for ${program.duration.toLowerCase()} under the supervision of ${program.coachName}.`,
    `Within the Dayal Sports Academy framework, this program is designed to build a stronger connection between technical learning, match readiness, and athlete support.`,
  ],
  inclusions: [
    `${program.schedule} scheduling format`,
    `${program.duration} development cycle`,
    `Lead coaching oversight from ${program.coachName}`,
    `Capacity planning for up to ${program.maxStudents} athletes`,
  ],
  outcomes: [
    levelAudience[program.level] || levelAudience.Beginner,
    levelOutcome[program.level] || levelOutcome.Beginner,
    "A clearer development track that connects daily training with measurable athlete progress.",
  ],
}));

export function getProgramBySlug(slug: string) {
  return programDetails.find((program) => program.slug === slug);
}

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedAt: string;
  excerpt: string;
  image: string;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "building-school-badminton-pathways",
    title: "Building school badminton pathways that actually last",
    category: "School Partnerships",
    readTime: "4 min read",
    publishedAt: "March 2026",
    excerpt:
      "How low-impact school badminton programs build movement skills, focus, and a real progression pathway for young players.",
    image:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1400&q=85",
    body: [
      "Badminton is a strong school sport because it is low-impact, non-contact, and adaptable for young learners. It helps children develop motor skills, balance, coordination, alertness, focus, and healthy competitive habits.",
      "At Dayal Sports Academy, school partnerships are structured around age-appropriate progression. Young players can move from Little Champion foundations into school teams, academy tracks, and tournament preparation with clearer milestones.",
      "The best school programs combine participation with ambition. Students get safe, enjoyable exposure to sport, while schools gain a long-term pathway for developing confident, disciplined, and competition-ready players.",
    ],
  },
  {
    slug: "why-quarterly-assessment-matters",
    title: "Why we assess every 3 months",
    category: "Assessment",
    readTime: "3 min read",
    publishedAt: "February 2026",
    excerpt:
      "Regular biomechanic and skill assessment keeps player progress visible and helps coaches adjust training with confidence.",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1400&q=85",
    body: [
      "Training without checkpoints can feel active without being precise. Every 3 months, assessment gives players, parents, and coaches a shared view of technical progress, physical readiness, and training priorities.",
      "The academy uses biomechanic MSA assessment with posture, muscle length, anthropometry, and fitness testing support. This helps identify movement quality, flexibility, strength, balance, and readiness for higher training load.",
      "Assessment reports are designed to be practical. Progress can be shared with families and management, helping coaches adjust training blocks before small issues become invisible inside routine.",
    ],
  },
  {
    slug: "what-world-class-mentorship-looks-like",
    title: "What world-class mentorship looks like inside a training system",
    category: "Mentorship",
    readTime: "5 min read",
    publishedAt: "January 2026",
    excerpt:
      "Elite mentors add the most value when specialist visits are built into the larger coaching system.",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1400&q=85",
    body: [
      "World-class mentorship works best when it reinforces a system that already exists. Specialist visits should deepen daily training rather than feel like isolated events.",
      "Dayal Sports Academy plans up to 6 mentor visits per year from national and international champions, covering singles, doubles, mixed doubles, grip science, tactical habits, and competition readiness.",
      "Guidance from mentors like former World Champion Xiong Guobao helps players understand technical details at a higher level, while also sharpening the standard for the internal coaching team.",
    ],
  },
  {
    slug: "sports-medicine-is-a-performance-tool",
    title: "Sports medicine is a performance tool, not just injury support",
    category: "Athlete Care",
    readTime: "4 min read",
    publishedAt: "December 2025",
    excerpt:
      "Medical and rehabilitation support should be part of performance planning, not only the response after something goes wrong.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=85",
    body: [
      "In badminton, small physical limitations quickly influence movement quality, timing, and confidence. That is why sports medicine belongs inside the performance conversation from the start.",
      "When posture, mobility, load tolerance, and recovery are monitored early, athletes can train with more continuity and less guesswork.",
      "A good support structure does not remove hard training. It makes hard training more sustainable.",
    ],
  },
  {
    slug: "why-doubles-specialists-matter",
    title: "Why doubles specialists matter in a complete academy setup",
    category: "Coaching",
    readTime: "3 min read",
    publishedAt: "November 2025",
    excerpt:
      "Specialist coaching matters because doubles, mixed doubles, and singles demand different decision-making patterns and court habits.",
    image:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1400&q=85",
    body: [
      "A complete academy cannot treat every event as the same problem with different rallies. Doubles and mixed doubles create unique demands around positioning, rotation, and tactical communication.",
      "Specialist coaches help athletes understand those demands earlier and more clearly. That shortens the gap between general training and event-specific decision making.",
      "It also gives players a more honest pathway. Athletes can start discovering where their strengths fit best instead of being pushed through a one-size-fits-all model.",
    ],
  },
  {
    slug: "building-complete-athletes-beyond-court-drills",
    title: "Building complete athletes beyond court drills",
    category: "Holistic Development",
    readTime: "4 min read",
    publishedAt: "October 2025",
    excerpt:
      "Coordination, mobility, speed, and recovery work create the kind of athlete who can absorb more high-quality badminton training.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&q=85",
    body: [
      "Badminton development is not only racket work. Better movement, stronger physical preparation, and improved recovery habits change how much technical training an athlete can actually absorb.",
      "That is why the academy keeps holistic modules inside the wider performance model. Yoga, coordination work, and conditioning are not decorative add-ons; they support durability and learning.",
      "When these elements are planned well, athletes become easier to coach and more prepared for competition pressure.",
    ],
  },
];

export function getBlogBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
