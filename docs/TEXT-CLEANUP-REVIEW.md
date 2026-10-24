# Final text-only cleanup — local review

Preview: **http://127.0.0.1:5183/**. Start/restart from `prototype` with `npm run dev -- --port 5183`.

Started from clean `feature/phase-3-cinematic-projects` at approved checkpoint `4bdba342ea2805faaa1a3e3f92a968df5872a9eb`. Work remains local and unstaged. No commit, push, merge or deployment.

## Before / after inventory

| Section | Removed from the visible presentation | Preserved or relocated |
| --- | --- | --- |
| Hero | Header “SB / Independent Web Developer”; “Web experiences…” description; Visible/Underlying/Experience aside; scroll-to-work prompt; 01/02 index; decorative arrows beside Selected Work and Explore selected work. | Sahil Bhardwaj / Web Developer, main hero typography, service categories, MacBook, Explore selected work, Menu, sound and motion controls. |
| Smile Care | Selected Work / 01; repeated handoff slogan and Practice Project / 2026 caption; Design → Development/media footer; chapter/image counters; Evidence/Inspect Captures and Original views prompts; generic capture captions; Beneath the Interface; Continue to SIX&7 and arrow; numbered implementation labels. | Actual project name now occupies the existing first label cell instead of repeating in the technology column. Main headline, technologies, Practice Project badge, fictional-content and demo safeguards, screenshot tabs and implementation disclosure remain. Chapter capture notes remain screen-reader accessible. |
| SIX&7 | Previous/next numbered boxes; Final Perspective/Genuine Shopify Draft Preview caption suffixes; Next Point of View; Selected Work 02/Shopify Theme Customization rail labels; numbered Browse/Detail/Every Screen/Built to Edit kickers; Storefront Is the Evidence; Original Captures/Actual Project Imagery prompts; closing Design → Development kicker; numeric build-label prefixes; repeated visible capture dates and “actual Shopify preview” suffixes. | SIX&7, Commerce with a Point of View, Practice Project, Liquid/Dawn/OS2.0, screenshot identities, price/availability qualification and password-protected storefront label remain. The full earlier Motion Lab explanation was moved into the existing Project scope & capture notes disclosure. Dates remain accessible. |
| Ember & Oak | Numbered passage boxes; outgoing “last perspective/into depth” labels; Different Sense of Place eyebrow; Selected Work 03; chapter kickers/Roman numerals; Warmth/Space/Character; redundant closer-look prompt/count; generic Original Project Capture tags. | Fictional-restaurant status, actual project descriptions, technology labels, request-versus-booking boundaries, image/source notes, image identity captions and gallery controls. Generic capture tags remain accessible. |
| ClientScout AI | Numbered passage boxes; Atmosphere/Final Perspective and Intelligent Workspace labels; Selected Work 04; seven numbered chapter kickers; Fourth Featured Project kicker; A/B source prefixes; numeric source-status markers. | In Development, local/single-user scope, capture date, synthetic records, disabled providers, committed/pending/unverified/deferred status content, crop/excerpt labels, architecture technologies, source links and controls. |
| Additional Work | Selected Studies suffix; 04 Different Perspectives; card index/Selected Study labels; One Workspace/A Wider Collection; Four Studies/One Continuing Practice; “to explore” from the swipe hint; visible active-project count. | All four cards, descriptions, categories, technologies, factual notes, working links and picker/arrow controls. Live project announcements and keyboard instructions remain available to assistive technology; the concise swipe/drag hint stays visible. |
| Showreel | Repeated web-development introduction; From the Collection echo suffix; An Original Portfolio Film; Different Medium/Same Intention eyebrow. | Actual film, poster, title, duration/sound notice, native controls, feedback/error/replay states, caption/transcript guidance and exact transcript. |
| Skills | Row numbers; The Toolkit and Design into Development labels. | Expertise label, capability groups, descriptions, technologies and evidence links. |
| About | Person Behind the Build; Thoughtful by Design/Considered in Code monogram microcopy. | Name, monogram, meaningful biography, headline and contact CTA. |
| Contact | Start a Conversation/Your Next Website eyebrow wording. | Contact identifier, headline, enquiry copy, approved email and all three profile actions, unchanged URLs/security attributes. |
| Footer | Designed with Intent/Built with Care tagline. | Functional SB return link, navigation, copyright and back-to-studio action. |

## Ambiguous copy deliberately retained for manual review

- Smile’s main “A calmer interface. A custom foundation.” headline: removed as the repeated transition caption, retained as the meaningful main project heading.
- SIX&7’s “Everyday. In motion.” identity and unique cinematic/closing headlines such as “Commerce, edited.”, “From motion, to atmosphere.” and “Evidence, before the next step.”
- Large closing statements such as “Made to move. Built to edit.”, “Crafted for the feeling.”, “A clearer view. A deliberate next step.” and the gallery/showreel closing lines. Removing these would alter approved visual anchors rather than just captions.
- ClientScout viewport-excerpt, synthetic-data/date, source-version and provider notes; functional workflow step numbers; architecture labels; original-image identities, short browser-window titles such as “Homepage / project capture”, and essential scope qualifications.
- Gallery descriptions, the concise swipe hint, functional numeric project-picker buttons, and meaningful Skills/About/Contact copy.

No text embedded in original screenshots or either video was edited.

## Scope and preservation

No existing stylesheet, timeline/controller module, asset file, dependency, metadata/configuration file or contact/project data file changed. All 43 runtime assets remain byte-identical. Smile’s inline motion setup and the hero’s controller logic are preserved.

The only CSS addition, `src/text-cleanup.css`, handles removal-related reflow: keep header controls at their existing right edge; collapse the implementation label-only track, expertise number-only track and SIX&7 heading label-only tracks; restore the retained category/availability text styles when they become an only child. It adds no color, font, animation, timing, image, card, button or navigation redesign. Existing section/card hierarchy is intact apart from removing decorative text nodes and their now-unnecessary wrappers.

Before captures were made from the clean approved build. An isolated, untouched archive of the approved commit on local port 5180 supplied paired preservation checks. Both views use the actual application, not mockups. MacBook video frames can differ with playback time; their source media are unchanged.

## Verification

- Production TypeScript/Vite build and all 43 runtime size/SHA-256 checks pass.
- **18 paired cleanup checks pass:** unchanged headings, button names/actions, retained URLs/security attributes, images/alt text/dimensions/order, scope/status disclosures, gallery live announcements, accessible references, no empty textual controls/captions, six responsive sizes and no overflow. Five entrances retain identical scroll travel, depth, rotation and scale at start/midpoint/end. [Paired results](../qa/text-cleanup/results.json).
- Copy-dependent regression assertions were updated to check viewport bounds after decorative rails were removed. Smile’s normal-motion regression now compares deterministic forward/reverse poses instead of comparing screenshots containing intentionally removed text. All unrelated behavior assertions remain.
- **All 241 existing regression checks pass** across the portfolio, gallery, native film/audio, accessibility, responsive and subfolder suites. Together with the 18 paired cleanup checks, **259 checks pass**. The final production smoke has zero browser errors. [Regression results](../qa/text-cleanup/regression-results.json), [smoke results](../qa/production-results.json).

## Genuine visual evidence

| View | Before | After |
| --- | --- | --- |
| Desktop hero | [Before](../qa/text-cleanup/before/1440-intro.png) | [After](../qa/text-cleanup/after/1440-intro.png) |
| Smile | [Before](../qa/text-cleanup/before/1440-work.png) | [After](../qa/text-cleanup/after/1440-work.png) |
| SIX&7 | [Before](../qa/text-cleanup/before/1440-six-title.png) | [After](../qa/text-cleanup/after/1440-six-title.png) |
| Mobile SIX&7 | [Before](../qa/text-cleanup/before/390-six-responsive.png) | [After](../qa/text-cleanup/after/390-six-responsive.png) |
| Gallery | [Before](../qa/text-cleanup/before/1440-additional-projects.png) | [After](../qa/text-cleanup/after/1440-additional-projects.png) |
| Skills | [Before](../qa/text-cleanup/before/1440-skills.png) | [After](../qa/text-cleanup/after/1440-skills.png) |
| Mobile Contact | [Before](../qa/text-cleanup/before/390-contact.png) | [After](../qa/text-cleanup/after/390-contact.png) |

Browser evidence uses local Chrome and touch emulation; no new physical-device or Safari certification is claimed. Awaiting visual approval; mobile animation polish is not included.
