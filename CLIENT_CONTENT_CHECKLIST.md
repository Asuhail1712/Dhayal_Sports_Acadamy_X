# Final Website Copy: Publication Checklist

Source: Dayal_Sports_Academy_Final_Website_Copy.pdf (12 pages, 17 October 2026).

The supplied copy has been applied to Home, About, Programs, Coaches, Camps & Tours, Partners, Gallery, Contact and Join Us. Existing journal and program URLs remain available. The blue/green visual system and recent hero, badge and responsive refinements are preserved.

## Client Materials Still Required

- Testimonials: 3 to 4 genuine quotes, names, programs, photos and publication consent. The testimonial component is ready but stays hidden until approved entries are supplied. No invented testimonials are shown.
- Gallery: approved photographs of age-group court sessions, robo feeding, Badminton Yoga, overseas camps, school tours, tournament podiums, coach/student sessions and ProShop. The existing five-image collection remains; stock training photography is identified as illustrative. The homepage cannot reach the requested 8 to 12 authentic images until these are supplied.
- Support-team biographies: approved write-ups for Dr. T.A. Krishnan, Dr. Kannan Pugalzhendi, Mrs. Shiny Chandran and Mrs. Lakshmi Yuva. Only the supplied yoga description and the other three names/roles are used.
- Founder and overseas mentor: written approval to publish their bios and the named players before public launch.
- Confirm final spellings: Chandrasekar, Vadhana Moulei, Xiong Gubao and Dr. Kannan Pugalzhendi. These follow the final-copy document.
- Tournament calendar: exact dates and confirmed 2026/2027 events in Australia, Korea and Thailand. No unconfirmed dated schedule is advertised.
- Chennai/India contact number. Existing Hong Kong contact details remain; no number has been invented.
- Open roles: descriptions, requirements and application process. All seven supplied titles have an application link; no job requirements are invented.
- ProShop: direct store URL (if any), showroom addresses and opening hours. The Visit the ProShop CTA asks the team for visit details via WhatsApp instead of linking to an unprovided store.
- Confirm the WhatsApp destination. It currently uses the existing Hong Kong mobile +852 6628 5295; deployments can override it with VITE_WHATSAPP_NUMBER.

## Operational Checks

- Deploy both frontend and API changes for the new structured enquiry phone/interest fields. The frontend also includes them in the message for compatibility with older API deployments.
- Confirm live enquiry delivery and receipt without sending test enquiries to the client from automated checks.
- Complete a desktop/mobile visual pass before publishing; automated build checks do not replace visual review.

## Repeatable Checks

- Frontend content, page-rendering, internal-link, legacy-program-URL and mocked enquiry-delivery checks: `pnpm --filter @workspace/badminton-club run test:content`.
- Frontend typecheck/build: `pnpm --filter @workspace/badminton-club run typecheck` and `pnpm --filter @workspace/badminton-club run build`.
- API typecheck: `pnpm --filter @workspace/api-server run typecheck`.
