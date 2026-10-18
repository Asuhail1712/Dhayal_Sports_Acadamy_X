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

test("every decorated card has one illustration outside its background layer with a separate title column", () => {
  for (const [path, component] of pages) {
    const html = render(component, path);
    assert.equal(
      (html.match(/class="card-illustration"/g) || []).length,
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
