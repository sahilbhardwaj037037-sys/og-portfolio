# Phase 3B — Smile Care → SIX&7

Implementation visually approved by the user; feature-branch checkpoint authorized, October 23, 2026. Branch: `feature/phase-3-cinematic-projects`. Approved rollback checkpoint: `893bd29a46366b18e008de9149c4161f959e34c9`. No merge or deployment. Ember & Oak, ClientScout AI and the commercial reel are not implemented.

Preview: **http://127.0.0.1:5173/**. The existing dev preview is preserved. If it is stopped, run `npm run dev` from `prototype`. Begin with the hero and scroll through Smile Care to see the passage. The new “Continue to SIX&7” link skips directly to its readable heading; it intentionally bypasses the decorative passage for keyboard navigation. Direct entry: **http://127.0.0.1:5173/#six-and-seven**.

## Implemented presentation

The final, appended Smile Care homepage plane recedes left and into depth while the real SIX&7 storefront approaches. A 1600px CSS perspective, shared world dolly, opposing Y rotations and different Z positions create foreshortening and spatial overlap. An independent background layer blends warm ivory into graphite. Explicit scroll poses reconstruct the same movement in reverse.

The passage uses a **CSS sticky shell**, with a GSAP ScrollTrigger controlling only its children over 120svh of travel. It does not introduce a pin spacer or another scroll controller. At arrival the incoming plane is frontal; the same DOM stage then releases into normal flow. This avoids a separate endpoint image swap. The existing hero camera, projection math and ScrollTrigger pin remain unchanged.

SIX&7 has its own editorial composition: an oversized typographic introduction, broad collection study, asymmetric desktop/mobile product composition, three native mobile captures, implementation notes, an independent six-image evidence gallery and a final storefront/type composition. The closing section exposes a future attachment ID, `six7-closing`; `next` remains `null`. No empty future chapter or dead next-project link is rendered. The existing final navigation moves after SIX&7.

The screenshot planes animate only in eligible desktop/fine-pointer normal-motion contexts. Collection and closing studies animate one screenshot each; the product study animates two. The passage has two planes. Responsive mobile studies are static. Plane width is also bounded by viewport height, so the frontal screenshot and labels fit short desktop windows. There is no new permanent RAF, React state update per scroll frame, WebGL canvas, dependency, font, video or soundtrack.

## Original media and factual boundaries

All six WebPs in `public/media/six7/` are unchanged from the approved `six7-shopify-store` capture manifest at revision `0d3c1ad98d849135906743a5e57b8e63edcffdc0`. They total **192,184 bytes**. [Capture provenance](../licenses/six7-captures.txt) records the October 17 capture date, October 20 documentation review, Draft-preview hero, and earlier Cream Motion Lab internal/mobile views. Original dimensions, dates and interface content are retained. Availability and prices remain historical screenshot content.

The showcase identifies a Shopify practice project using Liquid, Dawn 16, JSON templates, CSS, vanilla JavaScript and Online Store 2.0 section schemas. It credits native Shopify/Dawn commerce foundations. It does not claim the separate Next.js implementation, custom payment processing, current stock, fulfillment, sales results, a commissioned client or a publicly accessible checkout. The real storefront link is explicitly labeled **Password-protected storefront**. No brand-registration claim or new license grant is made.

All 15 current runtime assets match `docs/asset-integrity.json`, including all nine pre-existing assets. The GLB, MP4, WAV, original `scene.tsx`, `screenVideo.ts`, `SmileCareStory.tsx`, hero environment/audio source and approved `refinement.css` remain byte-identical to the rollback checkpoint.

## Static layouts, access and failures

Depth enhancement requires at least 1000×700, a fine pointer/hover, normal motion and supported CSS clipping/perspective behavior. Smaller, short-window, touch and reduced-motion contexts get a natural-height static opening and the complete chapter. All new scroll transforms and temporary `will-change` hints are removed when motion mode changes. Existing reduced-motion Smile Care rows are untouched.

The new content retains semantic headings, genuine-image alt text, captions, native buttons, keyboard focus and native disclosure controls. Decorative passage copies are hidden from assistive technology; the original captures and captions are available through the semantic chapter and evidence gallery. A one-shot vertical IntersectionObserver prepares the incoming image near the passage, avoiding a native lazy-loading stall while the plane is horizontally outside the viewport. It does not request SIX&7 images during initial hero load. Decoding uses a clearly labeled loading surface with reserved dimensions, then a short image reveal; reduced motion disables that reveal transition. Failed captures receive labeled replacement surfaces. No project text depends on WebGL availability.

The new evidence gallery does not control Smile Care's independent gallery. Initial project deep links resolve to the canonical readable heading after upstream geometry is ready. Native implementation disclosure changes refresh ScrollTrigger measurements. No global theme switch, wheel interception, sound duplication or commercial-reel request is added.

## Genuine browser evidence

Unretouched Chrome/Playwright captures, at device scale 1:

- Passage: [Smile closing](../qa/phase3/passage-0.png), [spatial midpoint](../qa/phase3/passage-0.5.png), [frontal arrival](../qa/phase3/passage-1.png).
- Desktop: [introduction](../qa/phase3/desktop-introduction.png), [collection](../qa/phase3/six-browse.png), [product](../qa/phase3/six-product.png), [responsive studies](../qa/phase3/six-responsive.png), [build](../qa/phase3/six-build.png), [evidence](../qa/phase3/six-evidence.png), [closing](../qa/phase3/six7-closing.png).
- Static: [desktop reduced motion](../qa/phase3/desktop-reduced.png), [390px introduction](../qa/phase3/390-six-heading.png), [390px product](../qa/phase3/390-six-product.png), [320px introduction](../qa/phase3/320-six-heading.png).
- Failure: [blocked image requests](../qa/phase3/failed-images.png).

The [forward/reverse recording](../qa/phase3/smile-to-six7-forward-reverse.mp4) is a genuine Chrome DevTools screencast using real mouse-wheel input: 8.33 seconds, 1280×800, H.264 MP4, approximately 1.93MiB, silent. It uses 190 native browser frames encoded at 30fps with their captured timing; it is not a smoothness benchmark. No project screenshot was retouched and no original MP4 was edited. [Recording metadata](../qa/phase3/recording-metadata.json).

Generated evidence is ignored by Git and available in this local workspace; it is not a set of newly created project visuals.

## Changes in this phase

| Files | Purpose |
| --- | --- |
| `src/ProjectTransition.tsx`, `src/useProjectTransition.ts` | Reversible perspective passage, bounded study motion, cleanup and visibility/refresh behavior |
| `src/SixSevenStory.tsx`, `src/featuredProjects.ts`, `src/featured-projects.css` | Editorial showcase, approved image/source records, native gallery/disclosure and responsive/static composition |
| `src/main.tsx` | Mount SIX&7 after existing Smile content, add its skip/deep-link destinations, relocate the existing ending navigation |
| `public/media/six7/` | Six original, verified WebPs |
| `docs/asset-integrity.json`, `licenses/six7-captures.txt` | Checksums, provenance and factual boundaries |
| `qa/phase3-check.mjs`, `qa/phase3-performance.mjs`, `qa/phase3-record.mjs` | Focused regression, paired performance and genuine CDP recording harnesses |
| `qa/phase22-check.mjs` | Replace the obsolete “only one showcase” assertion with the exact approved `['smile-care','six-and-seven']` set; retain all palette, audio and lifecycle assertions |
| `package.json`, `README.md`, Phase 3A/B documents | QA commands and accurate local-review scope; no dependency or lockfile changes |

## Verification and performance

The production build passes with the pre-existing Three.js chunk-size warning. Existing regression suites pass 75 checks: browser 19, audio/environment 15, reduced-layout 12, video 10 and Phase 2.1 refinement 19. The focused Phase 3 suite passes 19 checks, for **94 checks total**, plus production smoke. The final near-view preloader and viewport-height refinements were rechecked with the focused suite, build, production smoke and isolated measurements. Protected source modules remain unchanged. All reports show zero uncaught browser errors.

Coverage includes actual DOM 3D matrices and projected dimensions, forward/reverse poses, sticky release, all six gallery choices, keyboard disclosure, independent Smile gallery state, genuine link targets, initial deep links, manual/system reduced motion, temporary layer-hint cleanup, resize, 320/390px mobile, 768px tablet, short-window static mode, 1000×700/1440×700/1920×700 cinematic fit, delayed/failed images and operation without WebGL. The existing reduced-layout suite confirms that all three normal-motion Smile chapter captures remain pixel-identical to its pre-fix references. The legacy palette test now verifies exactly the two authorized showcase IDs and still tests all four palette token sets for AA contrast.

Reports: [Phase 3](../qa/phase3/results.json), [browser](../qa/browser-results.json), [audio/environment](../qa/phase22/results.json), [reduced layout](../qa/reduced-motion-review/after-report.json), [video](../qa/video/results.json), [production smoke](../qa/production-results.json). The existing refinement report is local at `/private/tmp/og-phase3b-refinement/refinement-results.json`.

The [isolated production comparison](../qa/phase3/performance.json) uses three approved-build runs and three Phase 3B runs in Chrome 155, at 1440×1000 and device scale 1 on the same local machine. The old/new hero receives identical forward/reverse wheel input. The new passage and product study are measured separately; there was no corresponding passage in the baseline.

| Measurement | Approved Phase 2.2 | Phase 3B |
| --- | --- | --- |
| Hero idle / scroll p95 frame interval | 16.7–16.8ms | 16.7–16.8ms |
| New passage / product-study p95 | Not present | 16.7–16.8ms |
| Sampled main-thread long tasks | 0 | 0 |
| Three.js texture counter | 13 | 13 |
| Laptop video texture uploads during new passage | Not applicable | 0 |
| Additional Three.js frames while settled in SIX&7 | Not applicable | 0 |

With the final repository-label edit, aggregate production JavaScript gzip increases **3,808 bytes / 3.72KiB**, below the 12KiB target. CSS gzip increases **2,531 bytes / 2.47KiB**, below the 6KiB planning target. No dependency or lockfile changes. SIX&7's six WebPs total **192,184 bytes / 187.68KiB**, with zero initial-hero SIX&7 image requests in focused checks. Their combined decoded RGBA size is approximately **19.7MiB**, an estimate from source dimensions excluding compositor surfaces/copies. This estimate is not an OS/GPU memory measurement. No repeated long-task or frame-cadence regression was observed in these local samples.

Final checkpoint verification after the requested label edit: production build, 19 core browser checks, 19 Phase 3 checks, 15 audio/environment checks and production smoke all pass. Ten additional genuine Chrome cases verify the exact accessible link name, unchanged repository URL and new-tab protections, and no text clipping, overlap or page overflow at 320, 390, 768, 1000 and 1440px in normal and reduced motion. Desktop/mobile screenshots were inspected; no CSS change was needed. The GitHub destination resolves to the documented Shopify source revision. All 15 asset checksums pass; original GLB, MP4 and WAV remain byte-identical. Secret-pattern and staged-file audits found no credentials, environment files or generated QA artifacts.

## Remaining limitations and handoff

Native Safari 27 WebDriver was attempted and rejected the session because **Allow remote automation** is disabled. No preference was changed; [attempt record](../qa/phase3/safari-results.json). Safari visual acceptance and physical iOS/Android testing remain unverified. Mobile checks are Chrome touch/viewport emulation. Direct GPU execution time, compositor memory, native decoder CPU, thermals and power use were not measured; local 60Hz/DPR1 timing does not guarantee other hardware or high-DPR behavior.

The existing large Three.js bundle warning remains. The Shopify screenshots are dated historical preview evidence, and the storefront remains labeled password-protected. Source/photo rights are not expanded by this implementation. The basic no-JavaScript fallback retains the earlier Smile Care view; the interactive portfolio requires JavaScript.

The user approved the complete Phase 3B presentation and authorized this feature-branch checkpoint. The final requested edit changes the repository link to ‘GitHub Repository For Shopify Six&7’; its URL, styling and behavior are preserved. Phase 3C remains outside this checkpoint. Generated QA evidence stays local and is excluded from Git.
