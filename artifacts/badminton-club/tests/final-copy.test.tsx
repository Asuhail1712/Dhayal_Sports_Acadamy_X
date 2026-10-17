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
