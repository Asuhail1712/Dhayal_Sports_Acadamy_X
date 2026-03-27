import { db, classesTable, coachesTable } from "@workspace/db";

async function seed() {
  console.log("Seeding database...");

  await db.delete(classesTable);
  await db.delete(coachesTable);

  await db.insert(coachesTable).values([
    {
      name: "Li Wei",
      title: "Head Coach & Former National Champion",
      bio: "With over 20 years of professional badminton experience, Li Wei has coached national teams and produced dozens of champions. His innovative training techniques combine traditional Asian methods with modern sports science.",
      specialties: ["Singles Strategy", "Footwork Mastery", "Mental Conditioning", "Smash Technique"],
      experience: "20+ years",
      achievements: ["3x National Champion", "Olympic Bronze Medalist", "BWF World Tour Coach of the Year", "Coached 12 national team players"],
      imageUrl: "/images/coach1.jpg",
      rating: "4.9",
      studentsCount: 320,
    },
    {
      name: "Sarah Mitchell",
      title: "Junior Development Coach",
      bio: "Sarah brings a passion for nurturing young talent. A former Commonwealth Games competitor, she specializes in developing fundamentals and building confidence in junior players aged 8-18.",
      specialties: ["Junior Development", "Doubles Play", "Net Play", "Serve & Return"],
      experience: "12 years",
      achievements: ["Commonwealth Games Silver Medalist", "National Junior Coach Award", "Developed 5 junior national champions", "UEFA Coaching Certificate"],
      imageUrl: "/images/coach2.jpg",
      rating: "4.8",
      studentsCount: 210,
    },
    {
      name: "Marcus Chen",
      title: "Fitness & Performance Coach",
      bio: "Marcus combines his sports science degree with professional badminton expertise to design comprehensive fitness programs. He specializes in explosive power training, agility, and injury prevention.",
      specialties: ["Agility Training", "Power Development", "Injury Prevention", "Advanced Doubles"],
      experience: "8 years",
      achievements: ["Sports Science MSc", "Certified Strength & Conditioning Specialist", "National Team Fitness Coordinator", "Published badminton fitness research"],
      imageUrl: "/images/coach3.jpg",
      rating: "4.7",
      studentsCount: 175,
    },
    {
      name: "Priya Sharma",
      title: "Women's Elite Program Director",
      bio: "Priya is a former World No. 8 doubles specialist who now leads our elite women's program. Her tactical insights and personal experience at the highest levels make her an exceptional coach for competitive players.",
      specialties: ["Doubles Tactics", "Women's Singles", "Tournament Preparation", "Leadership"],
      experience: "15 years",
      achievements: ["Former World No. 8 Doubles", "Asian Games Gold Medalist", "BWF World Championships Finalist", "Elevated club to national ranking #2"],
      imageUrl: "/images/coach4.jpg",
      rating: "4.9",
      studentsCount: 145,
    },
  ]);

  await db.insert(classesTable).values([
    {
      name: "Badminton Foundations",
      level: "Beginner",
      description: "Perfect for complete newcomers! Learn the basic rules, grips, stances, and fundamental strokes. Build your confidence on court with our friendly and supportive environment.",
      schedule: "Mon & Wed, 6:00 PM - 7:30 PM",
      duration: "90 min",
      maxStudents: 12,
      price: "45.00",
      coachName: "Sarah Mitchell",
    },
    {
      name: "Shuttle Smashers",
      level: "Beginner",
      description: "Build on your basics and start rallying confidently. Focus on consistent clears, drops, and net play fundamentals. Perfect for those who have played casually but want structured coaching.",
      schedule: "Tue & Thu, 5:30 PM - 7:00 PM",
      duration: "90 min",
      maxStudents: 10,
      price: "50.00",
      coachName: "Marcus Chen",
    },
    {
      name: "Intermediate Power Play",
      level: "Intermediate",
      description: "Take your game to the next level with advanced stroke techniques, tactical play, and competitive rallying. Includes singles and doubles strategy sessions and point-play scenarios.",
      schedule: "Mon & Fri, 7:30 PM - 9:00 PM",
      duration: "90 min",
      maxStudents: 8,
      price: "65.00",
      coachName: "Li Wei",
    },
    {
      name: "Doubles Mastery",
      level: "Intermediate",
      description: "Specifically designed for doubles play. Learn rotations, communication patterns, attacking and defensive formations, and how to read your opponents. Ideal for club players wanting to compete.",
      schedule: "Sat, 9:00 AM - 11:00 AM",
      duration: "120 min",
      maxStudents: 8,
      price: "70.00",
      coachName: "Priya Sharma",
    },
    {
      name: "Advanced Competitive",
      level: "Advanced",
      description: "For serious competitive players. Intensive training covering advanced deception, speed drills, match analysis, and tournament preparation. Regular sparring with competitive players included.",
      schedule: "Tue, Thu & Sat, 7:00 PM - 9:00 PM",
      duration: "120 min",
      maxStudents: 6,
      price: "95.00",
      coachName: "Li Wei",
    },
    {
      name: "Women's Advanced Program",
      level: "Advanced",
      description: "A tailored advanced program for women focusing on athleticism, tactical awareness, and competition readiness. Includes video analysis sessions and personalized development plans.",
      schedule: "Wed & Fri, 7:00 PM - 9:00 PM",
      duration: "120 min",
      maxStudents: 6,
      price: "90.00",
      coachName: "Priya Sharma",
    },
    {
      name: "Elite Performance Program",
      level: "Elite",
      description: "By invitation only. Our flagship elite program for players targeting national and international competition. Features one-on-one coaching, match analysis, mental coaching, and peak performance training.",
      schedule: "Mon, Wed & Fri, 6:00 AM - 8:00 AM",
      duration: "120 min",
      maxStudents: 4,
      price: "150.00",
      coachName: "Li Wei",
    },
    {
      name: "Junior Stars Elite",
      level: "Elite",
      description: "Intensive training for juniors aged 14-18 with national team aspirations. Combines technique refinement, strength & conditioning, and competition strategy. Pathway program to national squad.",
      schedule: "Sat & Sun, 8:00 AM - 11:00 AM",
      duration: "180 min",
      maxStudents: 6,
      price: "120.00",
      coachName: "Sarah Mitchell",
    },
  ]);

  console.log("Database seeded successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
