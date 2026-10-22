import originalManifest from "../../assets/academy-photos.json";
import updates from "../../assets/academy-photo-updates.json";

const manifest = { ...originalManifest, ...updates };

export type AcademyPhoto = {
  id: string;
  src: string;
  srcSet: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
};

function photo(
  id: keyof typeof manifest,
  alt: string,
  options: Pick<AcademyPhoto, "position"> = {},
): AcademyPhoto {
  const info = manifest[id];
  const base = `${import.meta.env.BASE_URL}images/academy/${id}`;
  return {
    id,
    src: `${base}.webp`,
    srcSet: `${base}-small.webp ${info.smallWidth}w, ${base}.webp ${info.width}w`,
    alt,
    width: info.width,
    height: info.height,
    position: "50% 50%",
    ...options,
  };
}

export const aboutPhotos = [
  photo(
    "about-racket",
    "The academy founder demonstrating a badminton racket",
    { position: "30% 50%" },
  ),
  photo(
    "about-newspaper-update",
    "Newspaper coverage of the founder's approach to yoga and badminton",
    { position: "50% 0%" },
  ),
  photo(
    "about-medal-update",
    "The academy founder displaying a marathon finisher medal",
    {
      position: "50% 35%",
    },
  ),
];

export const programPhotos: Partial<Record<string, AcademyPhoto>> = {
  grassroots: photo(
    "grassroots",
    "A young player practising badminton fundamentals with a coach",
    { position: "50% 28%" },
  ),
  "beginner-track": photo(
    "beginner-track",
    "A beginner practising a badminton shot with guidance from a coach",
    { position: "50% 22%" },
  ),
  intermediate: photo(
    "intermediate",
    "A player practising an overhead badminton stroke",
    { position: "48% 12%" },
  ),
  "junior-elite": photo(
    "junior-elite",
    "Junior players working on doubles with their coach",
    { position: "50% 28%" },
  ),
  "senior-elite": photo(
    "senior-elite",
    "Senior players reaching for a shot during a doubles rally",
    { position: "52% 45%" },
  ),
  "pro-team": photo(
    "pro-team",
    "A player practising badminton with a shuttle feeding machine",
    { position: "50% 18%" },
  ),
};

export function getProgramPhoto(slug: string) {
  return programPhotos[slug];
}

export const trainingPhotos: Record<string, AcademyPhoto> = {
  "Badminton Yoga": photo(
    "training-yoga-update",
    "Players practising yoga together on an indoor court",
  ),
  "Robo Training": photo(
    "training-robo-update",
    "A player training with the academy's shuttle feeding machine",
  ),
  "Functional Training": photo(
    "training-functional-update",
    "Players practising lunges with training equipment and coaches",
  ),
  "Coordination Training": photo(
    "training-coordination-update",
    "Players working on balance and footwork with agility ladders",
  ),
};

export const supportPhotos: Record<string, AcademyPhoto> = {
  "Sports Psychology": photo(
    "sports-psychology-update",
    "Sports psychology support specialist",
    { position: "50% 18%" },
  ),
  "Sports Physicians": photo(
    "sports-physician-update",
    "Sports physician portrait",
    {
      position: "50% 5%",
    },
  ),
  "Sports Physical Trainers": photo(
    "sports-trainer-update",
    "Sports physical trainer",
    { position: "50% 12%" },
  ),
  "Sports Nutritionists": photo(
    "sports-nutritionist-update",
    "Sports nutrition specialist",
    { position: "50% 5%" },
  ),
  "Sports Yoga": photo(
    "sports-yoga-update",
    "Sports yoga instructor portrait",
    {
      position: "50% 5%",
    },
  ),
};

export const galleryCategories = [
  "All",
  "Training",
  "Camps",
  "Tournaments",
  "Yoga",
  "ProShop",
];

type GalleryPhoto = AcademyPhoto & { title: string; category: string };

const galleryFocus: Partial<
  Record<keyof typeof manifest, Pick<AcademyPhoto, "position">>
> = {
  "inside-yoga-practice": { position: "50% 28%" },
  "inside-team-journey": { position: "50% 76%" },
  "inside-travelling-team": { position: "50% 78%" },
  "inside-court-practice": { position: "50% 60%" },
  "inside-medal-presentation": { position: "50% 40%" },
  "inside-yoga-awards": { position: "50% 70%" },
  "inside-player-mentorship": { position: "50% 30%" },
  "inside-international-community": { position: "50% 72%" },
  "inside-academy-community": { position: "50% 60%" },
  "inside-podium": { position: "50% 60%" },
  "inside-court-community": { position: "50% 65%" },
  "inside-academy-gathering": { position: "50% 62%" },
};

function galleryPhoto(
  id: keyof typeof manifest,
  title: string,
  category: string,
  alt: string,
): GalleryPhoto {
  return {
    ...photo(id, alt, galleryFocus[id]),
    title,
    category,
  };
}

export const galleryPhotos = [
  galleryPhoto(
    "inside-yoga-practice",
    "Focus on the mat",
    "Yoga",
    "Players practising a standing yoga pose on colourful mats",
  ),
  galleryPhoto(
    "inside-court-team",
    "Our courtside community",
    "Training",
    "Players and coaches standing together on a badminton court",
  ),
  galleryPhoto(
    "inside-team-journey",
    "The journey together",
    "Camps",
    "Academy players travelling together through an airport",
  ),
  galleryPhoto(
    "inside-court-practice",
    "Every session counts",
    "Training",
    "A young badminton player practising a shot on court",
  ),
  galleryPhoto(
    "inside-medal-presentation",
    "Celebrating progress",
    "Tournaments",
    "Players with their medals and certificates",
  ),
  galleryPhoto(
    "inside-yoga-awards",
    "Moments of achievement",
    "Tournaments",
    "Participants holding awards at a yoga competition",
  ),
  galleryPhoto(
    "inside-group-yoga",
    "Stronger in balance",
    "Yoga",
    "A group practising yoga together with an instructor",
  ),
  galleryPhoto(
    "inside-player-mentorship",
    "Learning together",
    "Training",
    "A player and mentor posing for a photograph",
  ),
  galleryPhoto(
    "inside-international-community",
    "A shared love of sport",
    "Training",
    "A large group gathered inside a sports hall",
  ),
  galleryPhoto(
    "inside-partner-yoga",
    "Building balance",
    "Yoga",
    "Two people practising a yoga pose together",
  ),
  galleryPhoto(
    "inside-academy-community",
    "One community",
    "Training",
    "Academy participants gathered for a group photograph",
  ),
  galleryPhoto(
    "inside-podium",
    "Proud moments",
    "Tournaments",
    "Athletes receiving awards on a podium",
  ),
  galleryPhoto(
    "inside-court-community",
    "Beyond the rally",
    "Training",
    "Players and coaches gathered on an indoor badminton court",
  ),
  galleryPhoto(
    "inside-academy-gathering",
    "Growing together",
    "Training",
    "An academy group gathered for a community event",
  ),
  galleryPhoto(
    "inside-travelling-team",
    "Beyond our home court",
    "Camps",
    "A travelling team standing together in an airport",
  ),
  galleryPhoto(
    "inside-yoga-session",
    "Movement and mindfulness",
    "Yoga",
    "A group stretching on yoga mats in a sports hall",
  ),
  galleryPhoto(
    "inside-outdoor-yoga",
    "A breath of fresh air",
    "Yoga",
    "Children practising yoga outside a community building",
  ),
];

export function filterGalleryPhotos(category: string, preview = false) {
  const filtered = galleryPhotos.filter(
    (item) => category === "All" || item.category === category,
  );
  return preview ? filtered.slice(0, 5) : filtered;
}
