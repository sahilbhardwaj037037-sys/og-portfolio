# Phase 3C — Ember & Oak approved checkpoint

Implemented locally on `feature/phase-3-cinematic-projects`, starting from approved Phase 3B commit `a338f69806eca49c0fd5070b325b8e651892976f`. Implementation authorized on 23 October 2026. The user has visually approved the implementation and authorized its feature-branch commit and push. No merge or deployment. ClientScout AI, the commercial reel and advanced mobile cinematic refinements remain outside this phase.

## Local preview

Open **http://127.0.0.1:5173/**. The existing dev server is preserved. If stopped, run `npm run dev` from `prototype`. Start at **http://127.0.0.1:5173/#six7-closing** and scroll onward to review the new passage. **http://127.0.0.1:5173/#ember-and-oak** opens the readable restaurant chapter directly.

## Implemented experience

The approved SIX&7 closing remains unchanged. A new appended sticky stage extends its editorial language with genuine storefront and product captures. Their Z retreats differ, while a shallow lateral shared-world movement reveals the genuine restaurant hero from depth. The environment warms from graphite to espresso; the incoming image resolves to zero rotation and depth. The same image continues in document flow as the sticky stage releases, with no endpoint image swap. Reverse scroll evaluates identical explicit progress poses.

This passage uses CSS perspective at 1600px, a preserve-3d world, native scrolling and the existing GSAP/ScrollTrigger infrastructure. CSS sticky owns the shell; only children transform. Normally two screenshot planes are visible, with three during the crossover. Near-view loading prepares transformed images before entry. Loading and failure surfaces preserve image geometry. Scoped cleanup explicitly removes scene-owned transforms and layer hints when either motion preference changes.

Seven readable beats follow: introduction, atmosphere/identity, menu experience, tablet/mobile adaptation, verified build details, an independent ten-image gallery, and a gallery-led closing. The registered espresso/cream/wood palette and native Georgia typography distinguish this chapter. The cream responsive composition uses a tablet/mobile pair rather than repeating SIX&7's three-phone study. Touch, smaller/short windows and reduced motion receive complete natural-height static layouts. No body content depends on scrolling through a cinematic frame.

The closing exposes `ember-closing` with `next: null`; no ClientScout placeholder, dead next-project link or future transition is rendered. The unchanged existing ending footer follows the newest completed chapter.

## Authenticity and preservation

The source is the fictional restaurant frontend at [Ember-Oak](https://github.com/sahilbhardwaj037037-sys/Ember-Oak), revision `bf30d00a95273e9177f06fef3da0b9415467de24`. Ten bounded originals are copied unchanged, totaling **605,383 bytes**. They match both their original Git blobs and SHA-256 records. All **25** current runtime assets match `docs/asset-integrity.json`.

The 1440×8333 full-page JPEG stays linked at the pinned source revision. It is not a runtime image, animated plane or downloaded texture. No separate restaurant photographs were extracted. [Provenance](../licenses/ember-oak-captures.txt) records the unresolved photo licensing and fictional-content boundaries without granting permissions or inventing a license.

Portfolio copy identifies a fictional restaurant website concept, HTML/CSS/vanilla JavaScript, responsive navigation, four menu categories and client-side request validation. Reservation delivery, table availability, bookings, restaurant operations and business results are not claimed. No operational form is embedded or submitted. The supplied live-demo and GitHub URLs are preserved exactly; full-page source access is a separate labeled link.

The original GLB, MP4, WAV, `scene.tsx`, `screenVideo.ts`, hero audio/environment modules, `SmileCareStory.tsx`, `refinement.css`, `SixSevenStory.tsx`, the first transition and its hook/styles, registered theme values and dependency lockfile remain unchanged. The Shopify repository label remains **GitHub Repository For Shopify Six&7**. No dependencies, fonts, WebGL canvases, videos or audio sources are added. No new permanent RAF loop or per-frame React state update is introduced.

## Changed files

| Files | Purpose |
| --- | --- |
| `src/EmberOakStory.tsx`, `src/EmberCapture.tsx` | Semantic chapters, genuine capture display, independent gallery, static fallbacks and verified links |
| `src/EmberOakTransition.tsx`, `src/useEmberOakMotion.ts` | Layered passage, near-view preparation, scoped reversible choreography and restrained studies |
| `src/ember-oak.css` | Project-scoped art direction, perspective hierarchy, static/mobile layouts and focus treatment |
| `src/featuredProjects.ts` | Append Ember's source/capture/exit records, preserving all SIX&7 metadata |
| `src/main.tsx` | Mount Ember after SIX&7 and support its initial chapter links |
| `public/media/ember-oak/*.jpg` | Ten original bounded runtime screenshots |
| `docs/asset-integrity.json`, `licenses/ember-oak-captures.txt` | Checksums and qualified provenance |
| `README.md`, `docs/PHASE-3C-REVIEW.md` | Scope, startup/review instructions, measured results and limitations |
| `qa/phase3c-check.mjs`, `qa/phase3c-performance.mjs`, `qa/phase3c-record.mjs` | Focused regressions, paired production profiling and genuine browser recording |
| `qa/phase3-check.mjs`, `qa/phase22-check.mjs` | Update only the obsolete no-Ember/two-project expectations; preserve existing behavior assertions |
| `package.json` | Add focused QA commands; dependencies and lockfile unchanged |

## Genuine review evidence

Generated files remain local and ignored under `qa/phase3c/`:

- [Desktop introduction](../qa/phase3c/ember-introduction.png), [atmosphere](../qa/phase3c/ember-atmosphere.png), [cream responsive composition](../qa/phase3c/ember-responsive.png), [closing](../qa/phase3c/ember-closing.png).
- [Transition midpoint](../qa/phase3c/passage-0.5.png), [frontal arrival](../qa/phase3c/passage-1.png), [desktop reduced motion](../qa/phase3c/desktop-reduced.png).
- [390px introduction](../qa/phase3c/390-no-preference-ember-introduction.png), [320px responsive composition](../qa/phase3c/320-no-preference-ember-responsive.png), [mobile reduced motion](../qa/phase3c/390-reduce-ember-introduction.png), [image-error fallback](../qa/phase3c/image-errors.png).
- [Forward/reverse transition recording](../qa/phase3c/six7-to-ember-forward-reverse.mp4): genuine Chrome CDP frames from real mouse-wheel input, 1280×800, H.264, **8.23 seconds**, **1,523,006 bytes**, silent. The 190 native frames are encoded at 30fps using captured timestamps. This is review evidence, not a smoothness benchmark. No screenshot contents or original laptop MP4 were edited.

These relative links require this local workspace; generated evidence is deliberately absent from future source-control checkpoints.

## Verification

The production TypeScript/Vite build passes with the existing Three.js large-chunk warning. Focused Ember tests pass **22 checks**, including actual depth matrices and different layer depths, lateral motion, reverse and midpoint reversals, frontal fit at 1000×700/1440×700/1920×700, natural sticky release, ten keyboard-selected captures, independent gallery state, source disclosure/links, initial deep link, resize mid-passage, system/manual reduced motion, removed stale transforms/layer hints, complete 320/390/768px and short-window layouts, delayed/failed images, no WebGL, zero initial-hero Ember requests and no full-page/commercial image transfers. No uncaught browser errors were recorded.

Existing browser **19**, audio/environment **15**, reduced-layout **12**, video **10**, SIX&7/first-passage **19**, and laptop refinement **19** checks pass. Together with the new focused checks, **116 checks pass**, plus production smoke. The refinement report is local at `/private/tmp/og-phase3c-checkpoint-refinement/refinement-results.json`. Smile Care's three normal-motion chapter captures remain pixel-identical to the original reduced-layout references. Production smoke passes without console/page errors. The demo returned HTTP 200, and the source repository HEAD matches the documented revision. Body/secondary/accent text on the cream responsive panel or espresso surface meets AA; the newly introduced cream-panel colors measure 5.88:1 and 6.99:1.

Reports: [focused](../qa/phase3c/results.json), [core](../qa/browser-results.json), [audio/environment](../qa/phase22/results.json), [reduced layout](../qa/reduced-motion-review/after-report.json), [video](../qa/video/results.json), [SIX&7](../qa/phase3/results.json), [production smoke](../qa/production-results.json).

## Performance

Approved Phase 3B production baseline is preserved locally at `/private/tmp/og-phase3c-approved-phase3b-dist`. Aggregate gzip uses the same Node zlib settings as the established QA harness:

| Production bundles | Phase 3B | Phase 3C | Added |
| --- | ---: | ---: | ---: |
| JavaScript | 385,585 B | 389,181 B | **3,596 B / 3.51 KiB** |
| CSS | 9,525 B | 11,679 B | **2,154 B / 2.10 KiB** |

Both additions are below the approved 12 KiB JS / 6 KiB CSS budgets. New images total 605,383 bytes; hero-first loading requests none of them. The incoming restaurant hero plus two outgoing commerce sources represent about **15.4 MiB decoded RGBA**, excluding other images, compositor surfaces, copies and DPR effects; this is an estimate rather than GPU residency measurement.

The [isolated production comparison](../qa/phase3c/performance.json) ran three approved Phase 3B samples and three Phase 3C samples sequentially in Chrome 155 at 1440×1000, DPR1, on the same machine. No other QA browser was running. Both builds receive identical hero, first-passage and SIX&7 study wheel input; the new passage/menu study are sampled additionally in Phase 3C.

| Measurement | Approved Phase 3B | Phase 3C |
| --- | --- | --- |
| Hero idle p95 frame interval | 16.7–16.8 ms | 16.7–16.8 ms |
| Hero forward/reverse scroll p95 | 16.8 ms | 16.7–16.8 ms |
| Existing Smile→SIX passage p95 | 16.8 ms | 16.7 ms |
| SIX&7 product study p95 | 16.7–16.8 ms | 16.7–16.8 ms |
| New Ember passage / menu-study p95 | Not present | 16.7–16.8 ms |
| Sampled main-thread long tasks | 0 | 0 |
| Three.js texture counter | 13 | 13 |
| Video uploads / Three.js renders during Ember passage | Not present | 0 / 0 |
| Additional Three.js renders while settled in a project | 0 | 0 |

The baseline hero-scroll sample had one maximum interval of 33.3 ms; Phase 3C samples maxed at 16.8 ms in this run. This does not establish that the new build improves performance; p95 cadence remained comparable in these local samples. The Three.js texture counter excludes CSS compositor surfaces. No sustained scroll-cadence regression was observed under this setup. Full raw distributions/counters remain in the linked local report.

Temporary production/baseline validation servers were stopped after verification; the existing development preview on port 5173 is preserved. These implementation measurements were taken before the approved checkpoint, with HEAD at `a338f69806eca49c0fd5070b325b8e651892976f`.

Final approved-checkpoint verification reran the production build, all 116 regression checks and production smoke successfully. All 25 runtime assets were checked against the staged manifest. The original GLB/MP4/WAV and 14 protected modules/styles/lockfile remain byte-identical to Phase 3B. The staged-file and credential-pattern audits found only the intended 27 source, production-asset, test and documentation files; generated evidence, local environment files and caches remain excluded.

## Known limitations

Native Safari WebDriver was attempted for this phase and refused a session because **Allow remote automation** is disabled. Settings were left unchanged; [actual response](../qa/phase3c/safari-results.json). Safari visual acceptance and physical iOS/Android testing remain unverified. Mobile/tablet results use Chrome touch/viewport emulation; advanced mobile cinematic behavior remains deferred.

Frame cadence and R3F counters do not directly measure GPU execution time, compositor memory, decode CPU, power or thermals. High-DPR and slower hardware may differ from the local setup. No operational reservation delivery is verified, and photography licensing records remain incomplete. The portfolio requires JavaScript; the inherited basic no-JavaScript fallback is unchanged.

The user approved the complete Phase 3C.2 localhost presentation and authorized the feature-branch checkpoint. ClientScout AI, the commercial showreel, a pull request, merge and deployment remain outside this checkpoint.
