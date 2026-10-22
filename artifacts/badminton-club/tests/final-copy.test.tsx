import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import type { ReactElement } from "react";
import Home from "../src/pages/Home";
import AboutPage from "../src/pages/AboutPage";
import Programs from "../src/pages/Programs";
import CoachesPage from "../src/pages/CoachesPage";
import CampsToursPage from "../src/pages/CampsToursPage";
import PartnersPage from "../src/pages/PartnersPage";
import GalleryPage from "../src/pages/GalleryPage";
import ContactPage from "../src/pages/ContactPage";
import JoinUsPage from "../src/pages/JoinUsPage";
import ProgramDetail from "../src/pages/ProgramDetail";
import {
  academyPrograms,
  academyCoaches,
  navigation,
  enquiryInterests,
  whatsappUrl,
  trainingMethods,
  story,
  partnerTypes,
} from "../src/lib/academy-content";
import { getProgramBySlug } from "../src/lib/content";
import { buildEnquiryPayload } from "../src/lib/enquiry";
import { Testimonials } from "../src/components/Testimonials";
import { GlassCard } from "../src/components/Design";
import { cardMotifs } from "../src/components/CardArtwork";
import { JournalCards } from "../src/components/BlogSection";
import { ProgramCollection } from "../src/components/ProgramCollection";
import { CoachCollection } from "../src/components/CoachCollection";
import { UniqueTraining } from "../src/components/UniqueTraining";
import { Gallery } from "../src/components/Gallery";
import { PhotoCollection } from "../src/components/PhotoCollection";
import { PhotoFrame } from "../src/components/PhotoFrame";
import { SupportTeam } from "../src/components/SupportTeam";
import { getStackScrollTarget } from "../src/lib/scroll-story";
import { getCardPointer } from "../src/lib/card-pointer";
import {
  PHOTO_ADVANCE_MS,
  schedulePhotoAdvance,
} from "../src/lib/photo-playback";
import {
  aboutPhotos,
  programPhotos,
  trainingPhotos,
  supportPhotos,
  galleryPhotos,
  filterGalleryPhotos,
  getProgramPhoto,
} from "../src/lib/academy-media";
import { blogPosts } from "../src/lib/content";
import {
  campOptions,
  schoolTour,
  championshipTour,
  networkRegions,
  educationPartners,
  proShop,
  coachingProgram,
  openRoles,
} from "../src/lib/academy-content";
import enquiryRouter, {
  validatePayload,
  escapeHtml,
} from "../../api-server/src/routes/enquiries";

const pages: [string, ReactElement][] = [
  ["/", <Home />],
  ["/about", <AboutPage />],
  ["/programs", <Programs />],
  ["/coaches", <CoachesPage />],
  ["/camps-tours", <CampsToursPage />],
  ["/partners", <PartnersPage />],
  ["/gallery", <GalleryPage />],
  ["/contact", <ContactPage />],
  ["/join-us", <JoinUsPage />],
];
const render = (page: ReactElement, path: string) =>
  renderToStaticMarkup(<Router ssrPath={path}>{page}</Router>);
const text = (html: string) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

for (const [path, component] of pages) {
  test(`${path} renders one page heading and only valid internal destinations`, () => {
    const html = render(component, path);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="(\/[^"]*)"/g)) {
      const url = new URL(href.replace(/&amp;/g, "&"), "https://example.test");
      if (url.pathname.startsWith("/programs/"))
        assert.ok(getProgramBySlug(url.pathname.slice(10)), href);
      else
        assert.ok(
          pages.some(([route]) => route === url.pathname) ||
            url.pathname === "/blogs",
          href,
        );
    }
  });
}

test("all new page routes are registered and all primary navigation routes exist", () => {
  const app = readFileSync("artifacts/badminton-club/src/App.tsx", "utf8");
  for (const [path] of pages.slice(1))
    assert.ok(app.includes(`path="${path}"`), path);
  assert.deepEqual(
    navigation.map((item) => item.label),
    ["Programs", "Coaches", "Camps & Tours", "Partners", "Contact"],
  );
});

test("all 11 programs have exact full copy, working detail pages, WhatsApp enquiries and legacy URLs", () => {
  assert.equal(academyPrograms.length, 11);
  const html = render(<Programs />, "/programs");
  for (const program of academyPrograms) {
    assert.ok(text(html).includes(program.description));
    const detail = render(
      <ProgramDetail slug={program.slug} />,
      "/programs/" + program.slug,
    );
    assert.ok(text(detail).includes(program.description));
    assert.ok(
      html.includes(
        whatsappUrl(
          "Hello Dayal Sports Academy, I would like to enquire about " +
            program.name +
            ".",
        ),
      ),
    );
    for (const old of program.legacySlugs)
      assert.equal(getProgramBySlug(old)?.id, program.id);
  }
});

test("home shows the six required program and coach previews", () => {
  const html = render(<Home />, "/");
  assert.ok(html.includes("High Performance Badminton<br/>and Yoga Academy"));
  assert.equal((html.match(/class="program-card-body"/g) || []).length, 6);
  assert.equal((html.match(/class="coach-info"/g) || []).length, 6);
  for (const coach of academyCoaches)
    assert.ok(text(html).includes(coach.short));
  assert.ok(!html.includes("active students"));
  assert.ok(!html.includes("Mentor visits / year"));
  assert.ok(!html.includes("Assessment cycles / year"));
});

test("About, training methods and partner pages contain their full document copy", () => {
  const about = text(render(<AboutPage />, "/about"));
  for (const paragraph of story.paragraphs)
    assert.ok(about.includes(paragraph));
  for (const item of story.learning) assert.ok(about.includes(item.body));
  const programs = text(render(<Programs />, "/programs"));
  for (const method of trainingMethods)
    assert.ok(programs.includes(method.body));
  const partners = text(render(<PartnersPage />, "/partners"));
  for (const partner of partnerTypes)
    assert.ok(partners.includes(partner.body));
});

test("contact includes all fields, seven interests and contextual preselection", () => {
  const html = render(<ContactPage />, "/contact?interest=ProShop");
  for (const field of [
    "firstName",
    "lastName",
    "email",
    "phone",
    "interest",
    "message",
  ])
    assert.ok(html.includes(`name="${field}"`));
  assert.equal(enquiryInterests.length, 7);
  for (const interest of enquiryInterests)
    assert.ok(text(html).includes(interest));
  assert.ok(html.includes('<option value="ProShop" selected="">'));
});

test("enquiry intro groups the badge, heading and description without a tall editorial gap", () => {
  const html = render(<ContactPage />, "/contact");
  const intro = html.slice(
    html.indexOf('class="contact-enquiry-intro"'),
    html.indexOf("<form"),
  );
  assert.ok(intro.includes('class="contact-enquiry-copy"'));
  assert.ok(intro.includes("Your next step"));
  assert.ok(intro.includes("Send an enquiry."));
  assert.ok(intro.includes("Tell us a little about you."));
  assert.ok(intro.includes('class="card-illustration"'));
  assert.ok(!intro.includes("card-visual-row"));
  assert.ok(
    intro.indexOf("Your next step") < intro.indexOf("Send an enquiry."),
  );
  assert.ok(
    intro.indexOf("Send an enquiry.") <
      intro.indexOf("Tell us a little about you."),
  );
});

test("camps, tours, network, ProShop and coach education include all supplied detail copy", () => {
  const camps = text(render(<CampsToursPage />, "/camps-tours"));
  for (const camp of campOptions) assert.ok(camps.includes(camp.body));
  for (const paragraph of Object.values(schoolTour))
    assert.ok(camps.includes(paragraph));
  assert.ok(camps.includes(championshipTour));
  const partners = text(render(<PartnersPage />, "/partners"));
  for (const [, region] of networkRegions) assert.ok(partners.includes(region));
  assert.ok(partners.includes(educationPartners));
  assert.ok(partners.includes(proShop.full));
  const join = render(<JoinUsPage />, "/join-us");
  assert.ok(text(join).includes(coachingProgram));
  for (const role of openRoles) {
    assert.ok(text(join).includes(role));
    assert.ok(
      join.includes(
        encodeURIComponent(
          "Hello Dayal Sports Academy, I would like to apply for the " +
            role +
            " role. Please share the role details and application process.",
        ),
      ),
    );
  }
});

test("testimonials stay hidden until genuine approved content is supplied", () => {
  assert.equal(render(<Testimonials />, "/"), "");
  assert.ok(!text(render(<Home />, "/")).includes("What our players say."));
});

test("all sixteen card motifs render decorative artwork without changing links or content", () => {
  assert.equal(cardMotifs.length, 16);
  for (const motif of cardMotifs) {
    const html = render(
      <GlassCard
        artwork={motif}
        index={1}
        artworkTitle={<h3>Existing card content</h3>}
      >
        <p>Existing description</p>
        <a href="/contact">Enquire</a>
      </GlassCard>,
      "/",
    );
    assert.ok(html.includes('data-card-motif="' + motif + '"'));
    assert.ok(html.includes('data-card-tone="green"'));
    assert.ok(html.includes('class="card-decoration" aria-hidden="true"'));
    assert.ok(html.includes('focusable="false"'));
    assert.ok(html.includes('<a href="/contact">Enquire</a>'));
    assert.ok(!html.includes("tabindex"));
    assert.ok(html.includes('data-artwork-layout="header"'));
    assert.ok(html.includes('class="card-visual-row" data-has-title="true"'));
    assert.ok(
      html.includes('class="card-visual-title"><h3>Existing card content</h3>'),
    );
    assert.ok(html.includes('class="card-art-stage" aria-hidden="true"'));
    const background = html.slice(
      html.indexOf('class="card-decoration"'),
      html.indexOf('class="card-visual-row"'),
    );
    assert.ok(!background.includes('class="card-illustration"'));
    assert.ok(
      html.indexOf("<h3>Existing card content") <
        html.indexOf('class="card-illustration"'),
    );
    assert.ok(
      html.indexOf('class="card-illustration"') <
        html.indexOf("<p>Existing description</p>"),
    );
  }
});

test("small photo badges can opt out without losing their content", () => {
  const html = render(
    <GlassCard artwork={false}>Existing badge</GlassCard>,
    "/",
  );
  assert.ok(html.includes("Existing badge"));
  assert.ok(!html.includes("card-decoration"));
  assert.ok(!html.includes("data-card-motif"));
  assert.ok(!html.includes("card-illustration"));
  assert.ok(!html.includes("card-visual-row"));
});

test("every decorated card has one illustration or supplied portrait outside its background layer", () => {
  for (const [path, component] of pages) {
    const html = render(component, path);
    assert.equal(
      (html.match(/class="card-illustration"/g) || []).length +
        (html.match(/class="card-portrait"/g) || []).length,
      (html.match(/data-card-motif=/g) || []).length,
      path,
    );
    assert.equal(
      (html.match(/class="card-visual-row"/g) || []).length,
      (html.match(/data-has-title="true"/g) || []).length,
      path + " headings must share the editorial composition",
    );
    for (const [, background] of html.matchAll(
      /class="card-decoration"[^>]*>([\s\S]*?)<\/svg><\/div>/g,
    )) {
      assert.ok(!background.includes("card-illustration"), path);
    }
  }
});

test("all 35 active academy photos are assigned only to their matching content groups", () => {
  const photos = [
    ...aboutPhotos,
    ...Object.values(programPhotos).filter((photo) => photo !== undefined),
    ...Object.values(trainingPhotos),
    ...Object.values(supportPhotos),
    ...galleryPhotos,
  ];
  assert.equal(photos.length, 35);
  assert.equal(new Set(photos.map((photo) => photo.id)).size, 35);
  assert.deepEqual(aboutPhotos.length, 3);
  assert.equal(Object.keys(programPhotos).length, 6);
  assert.equal(Object.keys(trainingPhotos).length, 4);
  assert.equal(Object.keys(supportPhotos).length, 5);
  for (const photo of photos) {
    assert.ok(photo.src.startsWith("/images/academy/"));
    assert.ok(photo.alt.length > 15);
    assert.ok(photo.srcSet.includes("-small.webp"));
    assert.ok(photo.width > 0 && photo.height > 0);
    const image = readFileSync("artifacts/badminton-club/public" + photo.src);
    assert.equal(image.toString("ascii", 0, 4), "RIFF");
    assert.equal(image.toString("ascii", 8, 12), "WEBP");
    assert.ok(
      readFileSync(
        "artifacts/badminton-club/public/images/academy/" +
          photo.id +
          "-small.webp",
      ).length > 0,
    );
  }
});

test("six named program photos appear on cards and detail pages while other programs retain stock imagery", () => {
  const programs = render(<Programs />, "/programs");
  for (const program of academyPrograms) {
    const photo = getProgramPhoto(program.slug);
    const detail = getProgramBySlug(program.slug)!;
    if (photo) {
      assert.equal(detail.heroImage, photo.src);
      assert.ok(programs.includes(photo.src));
      assert.ok(
        render(
          <ProgramDetail slug={program.slug} />,
          "/programs/" + program.slug,
        ).includes(photo.src),
      );
    } else {
      assert.ok(detail.heroImage.startsWith("https://images.unsplash.com/"));
      assert.equal(detail.heroPhoto, undefined);
    }
  }
});

test("About retains its first photo and carousel controls with the two replacements in filename order", () => {
  const about = render(
    <PhotoCollection photos={aboutPhotos} label="About Dayal Sports Academy" />,
    "/",
  );
  assert.ok(
    about.includes('aria-label="Next About Dayal Sports Academy photo"'),
  );
  assert.ok(about.includes("1 / 3"));
  assert.equal(aboutPhotos[0].id, "about-racket");
  assert.equal(aboutPhotos[1].id, "about-newspaper-update");
  assert.equal(aboutPhotos[2].id, "about-medal-update");
  assert.ok(about.includes(aboutPhotos[0].src));
  assert.ok(
    about.includes('aria-label="Pause About Dayal Sports Academy slideshow"'),
  );
  assert.equal(
    (about.match(/class="academy-photo-controls"/g) || []).length,
    1,
  );
  const component = readFileSync(
    "artifacts/badminton-club/src/components/PhotoCollection.tsx",
    "utf8",
  );
  assert.ok(!component.includes("setInterval"));
  assert.ok(component.includes("useInView(ref, { amount: 0.35 })"));
  assert.ok(
    component.includes(
      "autoEnabled && visible && pageVisible && !hovered && !focused",
    ),
  );
  assert.ok(component.includes("visibilitychange"));
  assert.ok(component.includes("paused === null && !reduced"));
  const single = render(
    <PhotoCollection photos={aboutPhotos.slice(0, 1)} label="Single" />,
    "/",
  );
  assert.ok(!single.includes("academy-photo-controls"));
});

test("Unique Training uses one static, uncropped replacement per card on home and Programs", () => {
  for (const detailed of [false, true]) {
    const training = render(
      <UniqueTraining detailed={detailed} />,
      detailed ? "/programs" : "/",
    );
    assert.equal(
      (training.match(/class="training-card-photo"/g) || []).length,
      4,
    );
    assert.equal((training.match(/<img\b/g) || []).length, 4);
    assert.ok(!training.includes("academy-photo-controls"));
    assert.ok(!training.includes("academy-photo-collection"));
    assert.ok(!training.includes("carousel"));
    for (const method of trainingMethods) {
      const photo = trainingPhotos[method.title];
      assert.ok(training.includes(photo.src));
      assert.ok(
        training.includes(`aspect-ratio:${photo.width} / ${photo.height}`),
      );
      assert.equal(
        (training.match(new RegExp(`data-photo-id="${photo.id}"`, "g")) || [])
          .length,
        1,
      );
    }
  }
});

test("all eleven renamed New Update files are exported and mapped to their requested placements", () => {
  const updates = JSON.parse(
    readFileSync(
      "artifacts/badminton-club/assets/academy-photo-updates.json",
      "utf8",
    ),
  );
  const sources: Record<string, string> = {
    [trainingPhotos["Badminton Yoga"].id]: "Yoga.png",
    [trainingPhotos["Robo Training"].id]: "Robo.png",
    [trainingPhotos["Functional Training"].id]: "Functional.png",
    [trainingPhotos["Coordination Training"].id]: "Coordination.png",
    [aboutPhotos[1].id]: "About 2png.png",
    [aboutPhotos[2].id]: "About 3.png",
  };
  Object.values(supportPhotos).forEach((photo, index) => {
    sources[photo.id] = `Discipline${index + 1}.png`;
  });
  assert.equal(Object.keys(updates).length, 11);
  assert.equal(Object.keys(sources).length, 11);
  for (const [id, filename] of Object.entries(sources)) {
    const info = updates[id];
    assert.equal(info.source, `New Update/${filename}`);
    assert.match(info.sourceSha256, /^[a-f0-9]{64}$/);
    for (const [suffix, bytes] of [
      ["", info.bytes],
      ["-small", info.smallBytes],
    ] as const) {
      assert.equal(
        readFileSync(
          `artifacts/badminton-club/public/images/academy/${id}${suffix}.webp`,
        ).length,
        bytes,
      );
    }
    assert.ok(info.smallWidth <= 640);
  }
  const originals = JSON.parse(
    readFileSync("artifacts/badminton-club/assets/academy-photos.json", "utf8"),
  );
  assert.equal(Object.keys(originals).length, 45);
  for (const [id, info] of Object.entries(originals) as [
    string,
    { bytes: number; smallBytes: number },
  ][]) {
    assert.equal(
      readFileSync(`artifacts/badminton-club/public/images/academy/${id}.webp`)
        .length,
      info.bytes,
    );
    assert.equal(
      readFileSync(
        `artifacts/badminton-club/public/images/academy/${id}-small.webp`,
      ).length,
      info.smallBytes,
    );
  }
});

test("visible photo collections advance only after three seconds and cancel pending playback", (context) => {
  context.mock.timers.enable({ apis: ["setTimeout"] });
  assert.equal(PHOTO_ADVANCE_MS, 3000);
  let advances = 0;
  schedulePhotoAdvance(true, 3, () => advances++);
  context.mock.timers.tick(2000);
  assert.equal(advances, 0, "must not advance after only two seconds");
  context.mock.timers.tick(999);
  assert.equal(advances, 0);
  context.mock.timers.tick(1);
  assert.equal(advances, 1);
  const cancel = schedulePhotoAdvance(true, 3, () => advances++);
  context.mock.timers.tick(1500);
  cancel?.();
  schedulePhotoAdvance(false, 3, () => advances++);
  schedulePhotoAdvance(true, 1, () => advances++);
  schedulePhotoAdvance(true, 0, () => advances++);
  context.mock.timers.tick(10000);
  assert.equal(advances, 1);
  schedulePhotoAdvance(true, 3, () => advances++);
  context.mock.timers.tick(2999);
  assert.equal(advances, 1);
  context.mock.timers.tick(1);
  assert.equal(advances, 2);
});

test("Inside Dayal displays all 17 supplied images, a five-photo preview and working category data", () => {
  const full = render(<Gallery />, "/gallery");
  const preview = render(<Gallery preview />, "/");
  assert.equal(galleryPhotos.length, 17);
  assert.equal((full.match(/class="gallery-tile"/g) || []).length, 17);
  assert.equal((preview.match(/class="gallery-tile"/g) || []).length, 5);
  assert.ok(!full.includes("images.unsplash.com"));
  assert.ok(!full.includes("illustrative photography"));
  for (const category of ["Training", "Camps", "Tournaments", "Yoga"]) {
    const photos = filterGalleryPhotos(category);
    assert.ok(photos.length > 0);
    assert.ok(photos.every((photo) => photo.category === category));
  }
  assert.deepEqual(filterGalleryPhotos("ProShop"), []);
});

test("five full support cards keep their own image and content without changing hero or blog images", () => {
  const home = render(<Home />, "/");
  assert.equal((home.match(/class="support-stack-card"/g) || []).length, 5);
  assert.equal((home.match(/class="support-card-copy"/g) || []).length, 5);
  for (const photo of Object.values(supportPhotos))
    assert.ok(home.includes(`data-support-photo="${photo.id}"`));
  const support = render(<SupportTeam />, "/");
  assert.equal((support.match(/role="listitem"/g) || []).length, 5);
  assert.ok(support.includes('class="support-stack" role="list"'));
  assert.ok(!support.includes("data-active="));
  assert.ok(!support.includes('class="support-grid"'));
  assert.ok(!support.includes('class="support-scroll"'));
  for (const title of Object.keys(supportPhotos))
    assert.ok(support.includes(`aria-label="Show ${title}"`));
  assert.ok(support.includes("Teamwork and leadership, on and off the court."));
  assert.ok(home.includes('src="/images/hero.jpeg"'));
  for (const post of blogPosts)
    assert.ok(post.image.startsWith("https://images.unsplash.com/"));
});

test("support cards reuse the ProShop gradient and bottom swoosh without adding illustrations", () => {
  const support = render(<SupportTeam />, "/");
  const cards = [
    ...support.matchAll(
      /<article[^>]*class="support-stack-card"[^>]*>([\s\S]*?)<\/article>/g,
    ),
  ];
  assert.equal(cards.length, 5);
  assert.ok(!support.includes('class="card-illustration"'));
  for (const [, content] of cards) {
    assert.equal((content.match(/class="card-decoration"/g) || []).length, 1);
    assert.equal((content.match(/class="card-swoosh"/g) || []).length, 1);
    assert.ok(content.includes('class="card-decoration" aria-hidden="true"'));
    const decoration = content.indexOf('class="card-decoration"');
    const light = content.indexOf('class="support-pointer-light"');
    const photo = content.indexOf('class="support-card-visual"');
    const copy = content.indexOf('class="support-card-copy"');
    assert.ok(decoration < light && light < photo && photo < copy);
  }
});

test("support cards remain readable in DOM order and use native scrolling without switch thresholds", () => {
  const support = render(<SupportTeam />, "/");
  const cards = [
    ...support.matchAll(
      /<article[^>]*class="support-stack-card"[^>]*>([\s\S]*?)<\/article>/g,
    ),
  ];
  assert.equal(cards.length, 5);
  Object.entries(supportPhotos).forEach(([title, photo], index) => {
    const [markup, content] = cards[index];
    assert.ok(content.includes(title));
    assert.ok(content.includes(photo.src));
    assert.ok(markup.includes(`style="z-index:${index + 1}"`));
    const opening = markup.slice(0, markup.indexOf(">") + 1);
    assert.ok(!opening.includes("aria-hidden"));
    assert.ok(!content.includes('class="support-card-copy" aria-hidden='));
    assert.ok(!markup.includes("data-active="));
  });
  const component = readFileSync(
    "artifacts/badminton-club/src/components/SupportTeam.tsx",
    "utf8",
  );
  assert.ok(!component.includes("addEventListener"));
  assert.ok(!component.includes("requestAnimationFrame"));
  assert.ok(!component.includes("setActive"));
  assert.ok(!component.includes("preventDefault"));
  assert.ok(!component.includes("scrollTop"));
});

test("support jump controls target real card positions, including backward navigation and resized cards", () => {
  const geometry = {
    stackTop: 1800,
    pageY: 2000,
    stickyTop: 124,
    heights: [480, 480, 480, 480, 480],
    gap: 32,
  };
  for (let index = 0; index < 5; index++) {
    assert.equal(
      getStackScrollTarget({ ...geometry, index }),
      3676 + index * 512,
    );
  }
  assert.equal(
    getStackScrollTarget({
      ...geometry,
      stackTop: -200,
      pageY: 4000,
      index: 0,
    }),
    3676,
  );
  assert.equal(
    getStackScrollTarget({
      ...geometry,
      heights: [430, 460, 520],
      gap: 24,
      index: 2,
    }),
    4614,
  );
  assert.equal(getStackScrollTarget({ ...geometry, index: -5 }), 3676);
  assert.equal(getStackScrollTarget({ ...geometry, index: 9 }), 5724);
  assert.equal(getStackScrollTarget({ ...geometry, heights: [], index: 0 }), 0);
  assert.equal(
    getStackScrollTarget({ ...geometry, stackTop: -9000, index: 0 }),
    0,
  );
});

test("large glass cards use subtle continuous pointer tilt with bounded highlights", () => {
  const rect = { left: 100, top: 50, width: 1000, height: 500 };
  assert.deepEqual(getCardPointer(rect, 600, 300), {
    rotateX: 0,
    rotateY: 0,
    lightX: 50,
    lightY: 50,
  });
  assert.deepEqual(getCardPointer(rect, 100, 50), {
    rotateX: 1.5,
    rotateY: -1.5,
    lightX: 0,
    lightY: 0,
  });
  assert.deepEqual(getCardPointer(rect, 1100, 550), {
    rotateX: -1.5,
    rotateY: 1.5,
    lightX: 100,
    lightY: 100,
  });
  assert.deepEqual(
    getCardPointer(rect, -100, -100),
    getCardPointer(rect, 100, 50),
  );
  assert.deepEqual(
    getCardPointer(rect, 9999, 9999),
    getCardPointer(rect, 1100, 550),
  );
  assert.deepEqual(getCardPointer({ ...rect, width: 0, height: 0 }, 100, 50), {
    rotateX: 0,
    rotateY: 0,
    lightX: 50,
    lightY: 50,
  });
  assert.ok(
    Math.abs(getCardPointer(rect, 601, 300).rotateY - 0.003) < 0.000001,
  );
});

test("support pointer effects live inside stable sticky wrappers and respect touch and reduced motion", () => {
  const support = render(<SupportTeam />, "/");
  assert.equal(
    (support.match(/class="support-glass-surface"/g) || []).length,
    5,
  );
  assert.equal(
    (support.match(/class="support-pointer-light"/g) || []).length,
    5,
  );
  assert.equal((support.match(/class="support-stack-card"/g) || []).length, 5);
  const source = readFileSync(
    "artifacts/badminton-club/src/components/SupportGlassSurface.tsx",
    "utf8",
  );
  assert.ok(source.includes('event.pointerType !== "mouse"'));
  assert.ok(source.includes('"(hover: hover) and (pointer: fine)"'));
  assert.ok(source.includes("useReducedMotion()"));
  assert.ok(source.includes("event.currentTarget.parentElement"));
  assert.ok(source.includes("onPointerLeave={reset}"));
  assert.ok(source.includes("onPointerCancel={reset}"));
  assert.ok(source.includes("stiffness: 220, damping: 28"));
  assert.ok(source.includes("radial-gradient(480px circle"));
  assert.ok(!source.includes("rgba(255,255,255,0.42)"));
  assert.ok(!source.includes("whileInView"));
  assert.ok(!source.includes("setState"));
});

test("all supplied photos fill their frames with one accessible image and no fitted backdrop", () => {
  const photos = [
    ...aboutPhotos,
    ...Object.values(programPhotos).filter((photo) => photo !== undefined),
    ...Object.values(trainingPhotos),
    ...Object.values(supportPhotos),
    ...galleryPhotos,
  ];
  assert.equal(photos.length, 35);
  for (const photo of photos) {
    const html = render(<PhotoFrame photo={photo} sizes="500px" />, "/");
    assert.ok(html.includes('data-fit="cover"'), photo.id);
    assert.ok(html.includes('class="academy-photo-image"'), photo.id);
    assert.ok(
      html.includes(`object-fit:cover;object-position:${photo.position}`),
      photo.id,
    );
    assert.equal((html.match(/<img\b/g) || []).length, 1, photo.id);
    assert.equal((html.match(/\balt="[^"]+"/g) || []).length, 1, photo.id);
    assert.ok(!html.includes("academy-photo-backdrop"), photo.id);
    assert.ok(!html.includes("contain"), photo.id);
  }
});

test("gallery and program detail photos retain focal crops while filling their containers", () => {
  assert.equal(
    galleryPhotos.find((photo) => photo.id === "inside-yoga-awards")?.position,
    "50% 70%",
  );
  assert.equal(
    galleryPhotos.find((photo) => photo.id === "inside-academy-community")
      ?.position,
    "50% 60%",
  );
  assert.equal(
    galleryPhotos.find((photo) => photo.id === "inside-podium")?.position,
    "50% 60%",
  );
  assert.equal(
    galleryPhotos.find((photo) => photo.id === "inside-team-journey")?.position,
    "50% 76%",
  );
  assert.equal(programPhotos.intermediate?.position, "48% 12%");
  assert.equal(programPhotos["pro-team"]?.position, "50% 18%");
  const proTeam = render(
    <ProgramDetail slug="pro-team" />,
    "/programs/pro-team",
  );
  assert.ok(proTeam.includes("object-fit:cover;object-position:50% 18%"));
  const detail = render(
    <ProgramDetail slug="grassroots" />,
    "/programs/grassroots",
  );
  assert.ok(detail.includes('data-fit="cover" data-photo-id="grassroots"'));
  assert.ok(detail.includes("object-fit:cover;object-position:50% 28%"));
  assert.ok(detail.includes('loading="eager" fetchPriority="high"'));
  const gallery = readFileSync(
    "artifacts/badminton-club/src/components/Gallery.tsx",
    "utf8",
  );
  assert.ok(gallery.includes("style={{ objectPosition: photo.position }}"));
});

test("journal cards use a padded editorial composition and coach cards keep their artwork exclusion", () => {
  const html = render(<Home />, "/");
  const journal = render(<JournalCards posts={blogPosts} />, "/blogs");
  assert.equal(
    (journal.match(/class="card-visual-row" data-has-title="true"/g) || [])
      .length,
    blogPosts.length,
  );
  assert.equal(
    (journal.match(/class="journal-card-body"/g) || []).length,
    blogPosts.length,
  );
  assert.equal(
    (journal.match(/class="card-illustration"/g) || []).length,
    blogPosts.length,
  );
  assert.equal((html.match(/class="coach-initials"/g) || []).length, 6);
  for (const [, header] of html.matchAll(
    /class="coach-monogram"[^>]*>([\s\S]*?)<div class="coach-info"/g,
  )) {
    assert.ok(header.includes('class="coach-initials"'));
    assert.ok(!header.includes('class="card-illustration"'));
    assert.ok(header.includes('class="pill"'));
  }
  assert.ok(!html.includes("coach-orbit"));
});

test("program, coach and Unique Training cards omit artwork while preserving their original visuals", () => {
  for (const preview of [false, true]) {
    const programs = render(
      <ProgramCollection programs={academyPrograms} preview={preview} />,
      "/programs",
    );
    const coaches = render(
      <CoachCollection coaches={academyCoaches} preview={preview} />,
      "/coaches",
    );
    const training = render(
      <UniqueTraining detailed={!preview} />,
      "/programs",
    );
    for (const html of [programs, coaches, training]) {
      assert.ok(!html.includes("card-illustration"));
      assert.ok(!html.includes("card-decoration"));
      assert.ok(!html.includes("card-visual-row"));
      assert.ok(!html.includes("card-heading-row"));
      assert.ok(!html.includes("data-card-motif"));
    }
    assert.ok(programs.includes('class="program-card-image"'));
    assert.ok(coaches.includes('class="coach-initials"'));
    assert.equal(
      (training.match(/class="icon-tile"/g) || []).length,
      trainingMethods.length,
    );
  }
});

test("home statistics use the four requested trophy, medal, globe and location artworks", () => {
  const html = render(<Home />, "/");
  for (const motif of ["trophy", "medal", "globe", "pins"]) {
    assert.match(
      html,
      new RegExp(
        'class="premium-card metric-card"[^>]+data-card-motif="' + motif + '"',
      ),
    );
  }
  assert.equal(
    (html.match(/class="premium-card metric-card"/g) || []).length,
    4,
  );
  for (const [, card] of html.matchAll(
    /<article class="premium-card metric-card"[^>]*>([\s\S]*?)<\/article>/g,
  )) {
    assert.ok(card.includes('class="card-visual-title"><strong>'));
    assert.ok(card.includes('class="card-art-stage"'));
    assert.ok(
      card.indexOf('class="card-visual-title"') <
        card.indexOf('class="card-art-stage"'),
    );
    assert.ok(card.indexOf('class="card-art-stage"') < card.indexOf("<p>"));
  }
});

test("WhatsApp links use the existing contact and encode special characters safely", () => {
  const message = "Private / Semi-Private & family + trial?";
  const url = new URL(whatsappUrl(message));
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, "/85266285295");
  assert.equal(url.searchParams.get("text"), message);
});

test("enquiries preserve phone and interest for current and older API deployments", () => {
  const payload = buildEnquiryPayload({
    firstName: " Test ",
    lastName: " Player ",
    email: " player@example.com ",
    phone: " +852 6628 5295 ",
    interest: " Classes ",
    message: " Grassroots enquiry ",
  });
  assert.equal(payload.firstName, "Test");
  assert.equal(payload.phone, "+852 6628 5295");
  assert.equal(payload.interest, "Classes");
  assert.ok(payload.message.includes("WhatsApp: +852 6628 5295"));
  assert.ok(payload.message.includes("Interested in: Classes"));
  assert.deepEqual(validatePayload(payload), payload);
  const legacy = validatePayload({
    firstName: "Test",
    lastName: "Player",
    email: "player@example.com",
    message: "Trial",
  });
  assert.equal(legacy.phone, "");
  assert.throws(() => validatePayload({ ...payload, email: "bad" }));
  assert.throws(() => validatePayload({ ...payload, phone: "not-a-number" }));
  assert.equal(
    escapeHtml('<b>"A&B"</b>'),
    "&lt;b&gt;&quot;A&amp;B&quot;&lt;/b&gt;",
  );
});

test("Google Script delivery forwards the new fields without sending a real enquiry", async () => {
  const originalFetch = globalThis.fetch;
  const originalDelivery = process.env.ENQUIRY_DELIVERY;
  let forwarded: Record<string, string> | undefined;
  delete process.env.ENQUIRY_DELIVERY;
  globalThis.fetch = (async (_url, options) => {
    forwarded = JSON.parse(String(options?.body));
    return new Response(JSON.stringify({ status: "success" }), { status: 200 });
  }) as typeof fetch;
  try {
    const handler = enquiryRouter.stack.find(
      (layer) => layer.route?.path === "/enquiries",
    )!.route!.stack[0].handle;
    let status = 0;
    let response: unknown;
    const res = {
      status(code: number) {
        status = code;
        return this;
      },
      json(value: unknown) {
        response = value;
      },
    };
    await handler(
      {
        body: buildEnquiryPayload({
          firstName: "Test",
          lastName: "Player",
          email: "player@example.com",
          phone: "+852 1234 5678",
          interest: "School tour",
          message: "Test only",
        }),
      },
      res,
      () => {},
    );
    assert.equal(status, 202);
    assert.deepEqual(response, { ok: true });
    assert.equal(forwarded?.phone, "+852 1234 5678");
    assert.equal(forwarded?.interest, "School tour");
    assert.ok(forwarded?.message.includes("School tour"));
  } finally {
    globalThis.fetch = originalFetch;
    if (originalDelivery === undefined) delete process.env.ENQUIRY_DELIVERY;
    else process.env.ENQUIRY_DELIVERY = originalDelivery;
  }
});
