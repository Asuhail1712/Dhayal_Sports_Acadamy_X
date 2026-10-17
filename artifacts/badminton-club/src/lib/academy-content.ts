export const navigation = [
  { label: "Programs", href: "/programs" },
  { label: "Coaches", href: "/coaches" },
  { label: "Camps & Tours", href: "/camps-tours" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

export function whatsappUrl(
  message = "Hello Dayal Sports Academy, I would like to book a trial.",
) {
  const configured = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, "");
  return `https://wa.me/${configured || "85266285295"}?text=${encodeURIComponent(message)}`;
}

export const enquiryInterests = [
  "Classes",
  "Summer camp",
  "School tour",
  "Championship tour",
  "Academy partnership",
  "Coach program",
  "ProShop",
] as const;

export const academyStats = [
  { value: 5, suffix: "", label: "Guinness World Records (our founder)" },
  { value: 4, suffix: "+", label: "Decades of world champion mentorship" },
  { value: 85, suffix: "+", label: "Countries travelled by our founder" },
  { value: 12, suffix: "", label: "Partner centres in 4 regions" },
];

export const story = {
  short:
    "We believe every child deserves the chance to discover sport and, with the right guidance, grow into an athlete who makes their country proud. From Chennai to Hong Kong, our players train, travel and compete through exchange programs, camps and championships, backed by scientific training and global exposure.",
  paragraphs: [
    "We believe every child deserves the chance to discover sport and, with the right guidance, grow into an athlete who makes their country proud. Dayal Sports Academy builds a thriving sporting ecosystem where proven science, modern technology and grassroots passion come together.",
    "From Chennai to Hong Kong, our players train, travel and compete through exchange programs, friendly matches, national and overseas championships and continuing education. We nurture power and intelligence, so every player grows with global exposure.",
  ],
  quote:
    "Not a babysitting service. Every session builds skill, technique and character.",
  values: [
    {
      title: "Scientific training",
      body: "Proven methods, robo feeding and player tracking.",
    },
    {
      title: "Global exposure",
      body: "Exchange programs, camps and championships abroad.",
    },
    {
      title: "Whole-athlete growth",
      body: "Discipline, perseverance and sportsmanship, on and off the court.",
    },
  ],
  learning: [
    {
      title: "No Compromise on Learning",
      body: "We are not a babysitting service. Every session is built around real learning, not aimless running around. Every participant is actively engaged in skill and technique development, and in the values that shape an athlete long after they leave the court: discipline, perseverance and sportsmanship.",
    },
    {
      title: "Age-Appropriate Training",
      body: "Every age group learns differently, so we do not use one method for every player. Our training is tailor-made to each stage of development, giving every child personalised guidance in a positive, stimulating environment.",
    },
  ],
};

export const trainingMethods = [
  {
    category: "Signature",
    title: "Badminton Yoga",
    short:
      "Yogic technique adapted for the court, created by our founder, to build focus, flexibility and consistency.",
    body: "Created by our founder, Badminton Yoga adapts traditional yogic technique to the specific demands of competitive badminton. It builds the flexibility, breath control and mental focus that help players stay consistent deep into a match, and recover faster between sessions.",
  },
  {
    category: "Technology",
    title: "Robo Training",
    short:
      "Precise, repeatable shuttle feeding for faster skill mastery and more quality reps.",
    body: "Our robo feeding systems deliver shuttles with precise, repeatable placement and speed, so players can drill a single stroke until it becomes automatic. More quality reps in less time, and technique that holds up under match pressure.",
  },
  {
    category: "Conditioning",
    title: "Functional Training",
    short:
      "Strength, speed and agility work built around badminton's movements, with injury prevention built in.",
    body: "Badminton asks the body to sprint, lunge, jump and change direction in a split second. Our functional training is built around those exact movements, developing strength and agility while reducing the risk of injury.",
  },
  {
    category: "Skill",
    title: "Coordination Training",
    short:
      "Hand-eye coordination, footwork and timing, blended with disciplines like Kalari.",
    body: "Good hands start with good eyes. We combine racket-specific coordination drills with traditional disciplines like Kalari to sharpen hand-eye coordination, footwork and shot timing.",
  },
];

export type AcademyProgram = {
  id: number;
  name: string;
  slug: string;
  level: string;
  age: string;
  description: string;
  summary: string;
  legacySlugs: string[];
};

export const academyPrograms: AcademyProgram[] = [
  {
    id: 1,
    name: "Grassroots",
    slug: "grassroots",
    level: "Beginner",
    age: "Ages 6-9",
    legacySlugs: ["grassroots-ages-6-9"],
    summary:
      "The first step onto the court: badminton fundamentals, core strength and basic fitness in a fun, low-pressure environment.",
    description:
      "The first step onto the court. Grassroots introduces the fundamentals of badminton alongside core strength training and the basic fitness every young athlete needs, in a fun, low-pressure environment.",
  },
  {
    id: 2,
    name: "Beginner Track",
    slug: "beginner-track",
    level: "Beginner",
    age: "Ages 9-11",
    legacySlugs: ["beginner-track-prerequisite-class-ages-9-11"],
    summary:
      "A required step before Intermediate, building speed, proper footwork, agility and scientific technique.",
    description:
      "A required step before Intermediate. Players build speed around the court, develop proper footwork, and are introduced to agility drills and the scientific techniques that define our coaching approach.",
  },
  {
    id: 4,
    name: "Intermediate",
    slug: "intermediate",
    level: "Intermediate",
    age: "Technical development",
    legacySlugs: ["intermediate-class"],
    summary:
      "Build a complete technical foundation in serves, returns, clears, smashes, drops, lifts and net shots.",
    description:
      "Players go deep into technique: serves, returns, clears, smashes, drops, lifts and net shots. By the end of this stage, players have a complete technical foundation to build on.",
  },
  {
    id: 7,
    name: "Junior Elite",
    slug: "junior-elite",
    level: "Advanced",
    age: "Ages 11-15",
    legacySlugs: ["junior-elite-team-ages-11-15"],
    summary:
      "High-level singles and doubles drills that shape promising juniors into tournament-ready athletes.",
    description:
      "High-level singles and doubles drills for players ready to compete. This is where promising juniors are shaped into tournament-ready athletes.",
  },
  {
    id: 8,
    name: "Senior Elite",
    slug: "senior-elite",
    level: "Advanced",
    age: "Ages 15-19",
    legacySlugs: ["senior-elite-team-ages-15-19"],
    summary:
      "Advanced singles and doubles strategy with intensive gameplay for state and national-level competition.",
    description:
      "Advanced singles and doubles strategy paired with intensive gameplay, preparing players for state and national-level competition.",
  },
  {
    id: 10,
    name: "Pro Team",
    slug: "pro-team",
    level: "Elite",
    age: "Ages 19+",
    legacySlugs: ["pro-team-ages-19"],
    summary:
      "Personalised coaching, focused skill development and immediate professional feedback for national-level players.",
    description:
      "Personalised, tailored coaching built around each player's individual strengths and gaps. Includes focused skill development, customised programs for national-level players, and immediate feedback from professional coaches, so players fast-track their progress.",
  },
  {
    id: 9,
    name: "Adult / Masters",
    slug: "adult-masters",
    level: "Advanced",
    age: "Adults and Masters",
    legacySlugs: ["adult-masters-class"],
    summary:
      "Learn the game, sharpen strategy or prepare for Masters tournaments from state to international level.",
    description:
      "For adults learning the game for the first time, or looking to sharpen strategy and technique. We also prepare Masters-level players for tournaments at state, provincial, national and international level.",
  },
  {
    id: 5,
    name: "Badminton Fitness",
    slug: "badminton-fitness",
    level: "Intermediate",
    age: "Fitness and conditioning",
    legacySlugs: ["badminton-fitness-class"],
    summary:
      "Full-body badminton training for strength, cardiovascular fitness and heart health.",
    description:
      "Badminton is a full-body sport: running, jumping and swinging in equal measure. This class builds the strength, cardiovascular fitness and heart health that come from playing it well.",
  },
  {
    id: 6,
    name: "Corporate",
    slug: "corporate",
    level: "Intermediate",
    age: "Colleagues and teams",
    legacySlugs: ["corporate-class"],
    summary:
      "Training, friendly tournaments and an active way to build teamwork with colleagues.",
    description:
      "Training, friendly tournaments, or just a fun, active way to connect with colleagues. Corporate classes build teamwork in a safe, welcoming environment.",
  },
  {
    id: 11,
    name: "Private",
    slug: "private",
    level: "Elite",
    age: "One-to-one coaching",
    legacySlugs: ["private-class"],
    summary:
      "Expert one-to-one coaching with robo and scientific equipment to target skills and correct technique.",
    description:
      "One-to-one time with an expert coach, using robo and scientific training equipment to target specific skills, correct technique issues and accelerate progress faster than group sessions allow.",
  },
  {
    id: 3,
    name: "Semi-Private",
    slug: "semi-private",
    level: "Beginner",
    age: "Families and friends",
    legacySlugs: ["semi-private-family-and-friends-beginner"],
    summary:
      "A relaxed, guided introduction for families and friends, learning at their own pace.",
    description:
      "A relaxed, guided introduction to badminton for families and friends training together. Everyone learns basic grips, swings and footwork at their own pace, with plenty of fun rallies and no pressure.",
  },
];

export type AcademyCoach = {
  id: number;
  name: string;
  title: string;
  bio: string;
  short: string;
  specialties: string[];
  credentials?: string;
  highlights?: string[];
};
export const academyCoaches: AcademyCoach[] = [
  {
    id: 1,
    name: "Dr. Yuva Dayalan, N.I.S.",
    title: "Founder, Head Coach and Mentor",
    short:
      "Master world badminton champion, holder of 5 Guinness World Records, creator of Badminton Yoga and trainer of national teams.",
    bio: "Master world badminton champion and former Indian squad player, with masters titles won in Taiwan, China and Thailand. Holds 5 Guinness World Records. Founder of Dayal Group, creator of Yuvaayoga and Badminton Yoga, and trainer of the Chinese, Hong Kong and Indian national teams.",
    specialties: ["Badminton Yoga", "Scientific training", "National teams"],
    credentials:
      "M.Sc. (Computer Science), M.Sc. (Yoga), MBA, PG Diploma in Fitness Management and Sports and Exercise Nutrition (Hong Kong), PhD.",
    highlights: [
      "Champion, Men's Singles 45+, and bronze, Men's Doubles 45+, Sawasdee Cup, Chiang Mai, 2024.",
    ],
  },
  {
    id: 2,
    name: "Xiong Gubao",
    title: "Overseas Mentor, Former World Champion",
    short:
      "The backhand king. Former world champion and World Masters Champion (Korea, 2023), guiding our scientific grip approach.",
    bio: "Known as the backhand king. Current World Masters Champion (Korea, 2023). Guides our training method with a scientific grip approach, runs coaching programs to sharpen our coaches, and works directly with students on technique.",
    specialties: ["Grip science", "Backhand technique", "Coach development"],
    highlights: [
      "French Open Men's Singles Champion (1985)",
      "Asian Championships Men's Singles Champion (1988)",
      "Hong Kong Open Men's Singles Champion (1988)",
      "Thomas Cup winner (1986, 1988, 1990)",
      "Asian Games Team Champion (1990)",
      "Indonesian Open Men's Singles Champion (1989)",
      "Japan Open Men's Singles Champion (1987)",
      "World Tour Grand Prix Men's Singles Champion (1987-1988)",
    ],
  },
  {
    id: 3,
    name: "Mr. Chandrasekar",
    title: "Singles Mentor",
    short:
      "Former national player, many-time state champion and appointed coach of the RBI badminton team.",
    bio: "Former national player and a gifted singles specialist. Many-time state champion with a national ranking, and appointed coach of the RBI badminton team. Grooms our singles players on skill and technique.",
    specialties: ["Singles", "Skill", "Technique"],
  },
  {
    id: 4,
    name: "Mr. Roy Mathew",
    title: "Doubles Mentor",
    short:
      "Former Indian doubles champion and India No. 1, with coaching experience in the UAE and India.",
    bio: "Former Indian doubles champion who represented India at international championships and was ranked India No. 1 in doubles. Has trained doubles and mixed doubles players in the UAE and India.",
    specialties: ["Doubles", "Mixed doubles", "International experience"],
  },
  {
    id: 5,
    name: "Mrs. Vadhana Moulei",
    title: "Women's Mentor",
    short:
      "The first woman from Tamil Nadu to win the national title, guiding our women players and supporting girl children.",
    bio: "The first woman from Tamil Nadu to win the national title. State champion and nationally ranked for years. Guides our women players through challenges toward their goals, and supports the welfare of girl children.",
    specialties: ["Women's badminton", "Player welfare", "Mentorship"],
  },
  {
    id: 6,
    name: "Bishmachari Dr. T.A. Krishnan",
    title: "Yoga Mentor",
    short:
      "Yoga guru with 8 decades of experience, guiding yoga and Badminton Yoga programs.",
    bio: "Yoga guru with 8 decades of experience, guiding our yoga and Badminton Yoga programs.",
    specialties: ["Yoga", "Badminton Yoga", "Focus and consistency"],
  },
];
export const supportProfiles = [
  { name: "Dr. Kannan Pugalzhendi", title: "Sports Doctor" },
  { name: "Mrs. Shiny Chandran", title: "Sports Nutrition" },
  {
    name: "Mrs. Lakshmi Yuva",
    title: "Overseas Director and Coordination Trainer",
  },
];
export const founderStory =
  "Dr. Yuva Dayalan is a master world ranking badminton champion and the founder of Dayal Group. He holds 5 Guinness World Records and created Yuvaayoga and Badminton Yoga, a training method that blends yogic technique with the demands of competitive badminton. He has coached the national badminton teams of China, Hong Kong and India, and has trained world top-ranked players including Saina Nehwal, P.V. Sindhu, Kidambi Srikanth, H.S. Prannoy and Gayatri Gopichand.";
export const mentorStory =
  "Known as the backhand king, Xiong Gubao is a former world champion and the current World Masters Champion (Korea, 2023). He guides our training method with a scientific grip approach designed to help players reach their goals faster, and has trained world-class players including Taufik Hidayat, Lee Chong Wei, Lin Dan and Carolina Marin.";

export const campOptions = [
  {
    title: "Elite / Advance Camps",
    body: "Train like a competitive athlete in a professional environment. Our summer and winter camps follow the same structured development system used for tournament players, with 6 to 8 hours of focused training a day. A player tracking system records progress through scientific technique, with coaches sharing notes and direct feedback so every player understands their strengths and where to improve. Camps are led by current and former world and national champions, with local sightseeing and overseas tournaments built into the experience.",
  },
  {
    title: "Recreational / Intermediate Camps",
    body: "For players who want to explore the fundamentals in a relaxed group setting. These camps cover basic footwork and strokes, singles and doubles strategy, hand-eye coordination and racket timing, combined with fun exercises, school visits, local sightseeing, cultural exchange and the chance to play in overseas tournaments.",
  },
];
export const schoolTour = {
  overview:
    "We run sports and cultural education tourism programs for schools across Asia, giving students the chance to explore overseas schools, see their classrooms and lab facilities, play friendly matches, visit consulates and experience new cultures through theme parks and sightseeing.",
  process:
    "Programs are built around your school: we confirm student and staff numbers with school management, choose a 7, 10 or 15-day format, and select a route. Popular routes include Hong Kong, Macau & China, or Singapore, Malaysia, Hong Kong & China.",
  included:
    "Visa invitation letters, flights from any major Indian city, hotel or studio-flat accommodation, school visits, friendly tournaments, prize distribution, theme parks, monuments, local food, shopping and stadium visits.",
};
export const championshipTour =
  "Our founder has reached the podium at multiple World Masters tournaments across Taiwan, China, Macau, Hong Kong, India, Korea, Thailand and Canada, and has strong relationships with sports associations and tournament organisers worldwide. We help players enter masters and ranking tournaments across Asia and Europe, arranging visa letters, entries, hotel accommodation, tickets and sightseeing.";

export const partnerTypes = [
  {
    title: "Academy Partners",
    short:
      "Scientific training, Badminton Robos, Badminton Yoga and Kalari for every stage of player development.",
    body: "We believe talent is built through discipline, strategy and heart. Whether you're setting up an academy for first-time players or developing national champions, our tailor-made programs combine scientific training and advanced equipment like Badminton Robos with traditional disciplines such as Badminton Yoga and Kalari, to fuel growth on and off the court.",
  },
  {
    title: "School Partners",
    short:
      "Safe, low-impact badminton programs that build motor skills, alertness and proud school teams.",
    body: "Badminton is a low-impact sport with no aggressive physical contact, making it a safe choice for schools while improving motor skills, balance and coordination. As one of the fastest sports in the world, it also sharpens alertness, a benefit that carries into the classroom. With training levels from Little Champion through Intermediate, High School and Tournament Team, we help schools build a badminton program students are proud to represent.",
  },
  {
    title: "Corporate Partners",
    short:
      "Expert-led coaching for teamwork, healthy competition and performance under pressure.",
    body: "We help companies build a strong team-work ethic, embrace healthy competition, perform under pressure and improve as a team, guided by our expert coaches.",
  },
  {
    title: "Sports Club Partners",
    short:
      "Short-term improvement and long-term development to help your team compete at a higher level.",
    body: "We're proud to collaborate with sports clubs and push their trainees toward real results, our players consistently reach the podium in tournaments. Whether your goal is short-term improvement or long-term development, our coaches help your team compete at a higher level.",
  },
];
export const networkRegions = [
  [
    "Hong Kong",
    "Dayal Leisure and Cultural Association, Sky Warriors, Indian Royals, Sarjan's",
  ],
  [
    "China",
    "Kim Chan Rong Sports Academy, Nanchang | Xiong Gubao Badminton Academy, Guangzhou",
  ],
  ["Malaysia", "Michael Badminton Academy, Kuala Lumpur"],
  [
    "India",
    "Chennai: Yuchan Badminton Academy, Star Sports Academy | Sivakasi: AJ Stadium | Cumbum: MKM Sports Village | Kerala: Sneham Academy, Varkala",
  ],
];
export const educationPartners =
  "Our partner academies work with reputed ICSE, CBSE and State Board schools and universities within a 3 to 5 km radius, cutting travel time and giving players more time to train. We also support students with online tuition from experienced teachers.";
export const proShop = {
  short:
    "Most partner academies stock a DAYAL ProShop with special discounts for students and members. Our Chennai showrooms sponsor state and national players and offer 10% to 50% off badminton products, sports flooring and fitness equipment.",
  full: "Most of our partner academies are equipped with a DAYAL ProShop, offering special discounts to students and members. Our flagship showrooms in Chennai sponsor state and national players and offer 10% to 50% off badminton products, sports flooring and fitness equipment.",
};
export const coachingProgram =
  "Build your badminton coaching career with us. Our certification program combines scientific and traditional training methods, taught offline and online by some of the best master trainers in the world. Whether you're aiming for professional coaching, grassroots training, or simply want to stay sharp while helping others improve, we have a path for you, covering Level 1, Level 2 and Level 3 coaching certification.";
export const openRoles = [
  "Front Desk Manager",
  "Physiotherapist",
  "Nutritionist",
  "Martial Artist",
  "Fitness Trainer",
  "Caretaker",
  "Consultant",
];
