# Fast-track portfolio launch — local review

**Preview: http://127.0.0.1:5183/**. Jump to [Skills](http://127.0.0.1:5183/#skills), [About](http://127.0.0.1:5183/#about) or [Contact](http://127.0.0.1:5183/#contact). Start/restart with `npm run dev -- --port 5183` from `prototype`.

The remaining portfolio sections are implemented locally after the approved commercial film. All prior uncommitted Phase 5.2 work and transition corrections are preserved. No commit, push, merge, pull request, hosting registration or deployment was performed. Branch: `feature/phase-3-cinematic-projects`; HEAD remains `b8a28928275e8cedecbf0f9dc82ad8da9d2ce9a8`; nothing is staged.

## Completed experience

- **Skills / Expertise:** an editorial four-row layout covering frontend foundations, WordPress/Shopify, responsive interaction and Python/FastAPI/Git workflows. Each group links to existing project evidence. No percentage bars, ratings or invented expertise.
- **About:** concise freelance-facing copy, responsive two-column typography and an SB monogram. No invented employment, professional years, testimonials, client commissions or unapproved portrait.
- **Contact:** approved email as the primary action, followed by the exact Upwork, Fiverr and GitHub URLs and requested labels. No fake form, server mail endpoint, credentials or new service dependency.
- **Navigation and footer:** a native modal menu reaches Projects, Additional Work, Showreel, Skills, About and Contact. Escape restores focus, Tab/Shift+Tab cycle correctly, and selecting a destination moves focus into the section. The footer provides all six destinations, a return link and copyright. It is a proper contentinfo landmark outside the main document landmark.
- **Launch essentials:** descriptive title/description, author metadata, Open Graph/Twitter tags, a 1200×630 owned typographic social PNG, retained favicon, generated robots, optional canonical/sitemap from the actual release origin, base-aware runtime assets, responsive layouts, reduced-motion support and visible keyboard focus.

The new sections use the existing fonts, restrained hover feedback and ivory/sage/charcoal palette. They add no timeline, permanent animation loop, player or dependency. Approved project layouts, screenshot order/content and cinematic paths were not redesigned.

## Verified contact inventory

| Action | Exact approved destination | Verification |
| --- | --- | --- |
| Email | `mailto:bysahilworks@gmail.com` | Correct URI; real link activation tested with OS handoff intercepted. No email sent; mailbox delivery is not claimed as tested. |
| Hire Me on Upwork | `https://www.upwork.com/freelancers/~015b6e376493c182fd` | Exact owner-approved URL retained. HTTP and Chrome inspection return Cloudflare 403, so public profile contents require a normal-browser manual check. |
| View Fiverr Services | `https://www.fiverr.com/s/jyyw1vG` | HTTP 200 after redirect to the `bysahilwork` website-development service. |
| Explore My GitHub | `https://github.com/sahilbhardwaj037037-sys` | HTTP 200; profile title identifies Sahil Bhardwaj. |

External profiles open in new tabs with `rel="noopener noreferrer"`. No extra contact detail was inferred. [HTTP evidence](../qa/launch/external-links.json), [Upwork Chrome result](../qa/launch/upwork-browser-results.json).

All existing repositories/capture links and ApexFit returned HTTP 200. ApexFit is still the sole public **Live Website** project action. SIX&7 returns its password page and retains the explicit password-protected label. No password was entered and no other project gained a live action.

## Preservation and deployment preparation

The sprint began by saving the current source, Git status/diff and a production baseline under ignored `qa/launch/before` and `/private/tmp/og-launch-baseline-dist`. Existing work was not reset or overwritten.

- **29 prior source files remain byte-identical**, including every transition hook, affected transition style, hero-sound component and media-audio coordinator.
- Eight existing files have only imports/public-media wrappers to respect Vite's deployment base. The previous audio, video, GLB, screenshot and project logic is otherwise byte-identical. `main.tsx` additionally integrates the new sections, navigation, footer and initial fragment IDs.
- All **42 approved runtime assets remain byte-identical** to the preserved production baseline. The new social image is **49,173 bytes**. All **43** runtime files match source SHA-256/size records and the production copies. Prior asset provenance records remain intact; no new third-party rights are asserted.
- Dependencies, development dependencies and the lockfile are unchanged.

[Preservation audit](../qa/launch/preservation-results.json), [main integration diff](../qa/launch/main-integration.diff).

Netlify CLI manual deployment is recommended for the roughly 54.1 MB output and its large approved media. Configuration is prepared in `netlify.toml`; local Netlify state is ignored. No CLI installation/authentication or public operation occurred. See [deployment steps and official references](LAUNCH-DEPLOYMENT.md).

The build is one document using fragment navigation, with no History API routes requiring a catch-all rewrite. Root deployment and an isolated `/portfolio/` build were verified. Runtime URLs, fonts, images, WebGL, hero sound, native commercial playback and Contact refresh work under that prefix. A configured `VITE_SITE_URL` emits the correct canonical, absolute social-image URLs, robots Sitemap reference and a one-root-URL sitemap. The local release build omits an invented hostname until the actual one is assigned.

## QA evidence

- Production TypeScript/Vite build passes. The inherited Three.js chunk-size advisory remains; no new warning/error was introduced.
- Focused transition verification passed before implementation. The latest Ember → ClientScout timing and both outgoing-plane lifecycle corrections remain unchanged.
- **16 launch checks pass:** section order, existing featured/gallery counts, verified capability content, exact contact actions/security, every internal anchor, menu/focus behavior, metadata/resources, zero unsolicited commercial playback, 320/390/768/short desktop/reduced layouts and direct fragment entry. [Results](../qa/launch/results.json).
- **8 new accessibility checks pass:** all checked text has a minimum **5.45:1** contrast (rounded), dark light-section focus outlines ≥3:1, two-way modal focus cycling, Contact-to-footer traversal, intercepted real mail-link activation, non-overlapping 320/390/desktop header controls, complete section captures and manual Motion off disabling new hover feedback. [Results](../qa/launch/accessibility-results.json).
- **7 deployment checks pass:** actual model/audio/film under `/portfolio/`, metadata/sitemap origin, correct resource paths, fragment refresh and real missing-file 404. [Results](../qa/launch/deployment-results.json).
- **209 existing regression/transition checks pass**, including all 193 portfolio/film checks and the 16 final-transition checks. Combined with the 16 launch, 9 accessibility and 7 deployment checks, **241 checks pass**. Existing source/style motion is unchanged. [Regression run](../qa/launch/regression-results.json), [final-build reruns](../qa/launch/final-results.json).
- **Final production smoke passes with zero errors**: scene ready **853.5ms**, local LCP **156ms**, CLS **0.0000998**. [Smoke results](../qa/production-results.json). All 43 runtime checksums pass against the final production files.

## Performance

Three sequential preserved-Phase-5.2 / launch pairs ran after the regression browsers closed: Chrome 155, Apple M5/ANGLE Metal, 1440×1000 DPR1. The baseline uses a local static server on 5180 and launch uses production preview 5174. Payload figures use reproducible Node gzip; they do not claim wire-level compression. HTTP/range-transfer differences between these local servers are not interpreted as a network-speed improvement.

| Compressed asset group | Preserved Phase 5.2 | Completed launch build | Added |
| --- | ---: | ---: | ---: |
| JavaScript | 400,465 B | 402,358 B | **1,893 B / 1.85 KiB** |
| CSS | 17,151 B | 18,588 B | **1,437 B / 1.40 KiB** |
| Owned social PNG | — | 49,173 B | **48.02 KiB**, metadata image rather than an initial page image |

| Pair | Baseline hero / gallery p95 | Launch hero / gallery p95 | New sections / playback p95 | Dropped film frames |
| --- | --- | --- | --- | --- |
| 1 | 16.7 / 16.7ms | 16.7 / 16.7ms | 16.7 / 16.8ms | 0 of 87 |
| 2 | 16.7 / 16.7ms | 16.8 / 16.8ms | 16.7 / 16.7ms | 0 of 87 |
| 3 | 16.8 / 16.7ms | 16.7 / 16.7ms | 16.8 / 16.7ms | 0 of 87 |

No long tasks were observed in these sampled intervals. A 390×844 Chrome mobile-emulation sample reports **16.7ms p95** for new-section scrolling, no overflow and no sampled long task. Initial commercial-resource transfers remain **zero** in every desktop pair; the original single canvas remains. Each playback sample reports decoded AAC audio. These are rAF-cadence/local playback samples, not a claim of 60fps source video or full-film drop-free playback. The retained commercial is 30fps.

The original 10.85 MB GLB and 23.46 MB laptop video remain bandwidth-heavy assets; their contents, loading behavior and approved experience are preserved. The sprint adds **3.25 KiB total gzipped JS/CSS**, with no observed new cadence regression. Internet/CDN and physical-device timing still require the eventual deployed host; the local timings do not certify field Core Web Vitals. [Raw performance and complete 14-link inventory](../qa/launch/performance.json).

To reproduce the paired profile locally, serve `/private/tmp/og-launch-baseline-dist` on port 5180, start production preview on 5174, then run `npm run qa:launch:performance`. The preserved baseline is a local QA artifact and is not published. If that directory is absent on another machine, the script measures the current build without the baseline pair.

## Final screenshots

All captures are genuine application screenshots. Generated QA evidence remains local and ignored.

| Section | Desktop, complete section | Mobile, complete section |
| --- | --- | --- |
| Skills | [1440px](../qa/launch/1440-skills-full.png) | [390px](../qa/launch/390-skills-full.png) |
| About | [1440px](../qa/launch/1440-about-full.png) | [390px](../qa/launch/390-about-full.png) |
| Contact | [1440px](../qa/launch/1440-contact-full.png) | [390px](../qa/launch/390-contact-full.png) |

[Desktop Contact + footer](../qa/launch/desktop-contact.png), [desktop navigation](../qa/launch/desktop-menu.png), [320px navigation](../qa/launch/320-no-preference-menu.png), [320px header](../qa/launch/320-header.png), [desktop hero](../qa/launch/desktop-hero.png), [Smile](../qa/launch/desktop-work.png), [SIX&7](../qa/launch/desktop-six-title.png), [Ember](../qa/launch/desktop-ember-title.png), [ClientScout](../qa/launch/desktop-scout-title.png), [additional work](../qa/launch/desktop-additional-projects.png), [showreel](../qa/launch/desktop-showreel.png).

## Remaining release checks

No implementation blocker has been identified in the passing local launch/deployment checks. Public release still needs owner approval, final hostname selection and rebuilding with that actual `VITE_SITE_URL`. Upwork's automated verification block needs a normal-browser manual check; it is not represented as a verified public profile response. Native email-app setup and mailbox delivery depend on the visitor/provider and were not exercised by sending mail.

Chrome 155 and Chrome touch emulation were used. Safari remote automation remains disabled, as recorded in the earlier review; real iPhone/iPad and assistive-technology certification are not claimed. Performance observations are local samples, not field Core Web Vitals or internet/CDN measurements. Await final review; no publication action is authorized yet.
