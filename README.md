# OG Portfolio

**Under development · Phase 4.2 visually approved**

A cinematic web developer portfolio by Sahil Bhardwaj, built around **BEYOND THE INTERFACE.** The Obsidian / Atelier direction pairs a graphite 3D laptop with an immersive typographic hero, then follows the screen into a warm ivory presentation of selected work.

This branch extends the approved Phase 2.2 checkpoint with Phase 3B: a reversible CSS 3D passage from Smile Care into a complete SIX&7 Shopify practice-project showcase. See [the Phase 3B review](docs/PHASE-3B-REVIEW.md), [approved discovery plan](docs/PHASE-3A-DISCOVERY-PLAN.md), [Phase 2.2 review](docs/PHASE-2.2-REVIEW.md) and [reduced-motion correction](docs/REDUCED-MOTION-REVIEW.md). Phase 3B has been visually approved and committed. Phase 3C adds the visually approved Ember & Oak concept; see [the Phase 3C review](docs/PHASE-3C-REVIEW.md). Phase 3D adds the visually approved ClientScout AI showcase; see [the Phase 3D review](docs/PHASE-3D-REVIEW.md). The commercial reel is not implemented. This repository contains source code and runtime assets, with no deployment configured.

## Implemented experience

- **Additional projects:** a short ClientScout screenshot departure introduces four native swipe/drag cards: ApexFit, Aroma / Noctis, AETHER and ApexForm. Real captures, qualified concept copy and explicit GitHub links; only ApexFit has a public Live Website action. Reduced motion presents a complete static grid. See [the Phase 4.2 review](docs/PHASE-4.2-REVIEW.md).
- **Living studio:** a warm ivory / graphite environment starts at 50/50, follows horizontal pointer movement with restrained easing, and stays static on touch or reduced-motion devices.
- **Hero soundscape:** the supplied Google Flow Music WAV is silent by default, loaded only after explicit activation, faded with hero presence, and suspended when hidden or offscreen. Runtime loop softening preserves the original file.
- **Project themes:** reusable palettes register four featured projects; all four approved project identities have implemented showcases.
- **Spatial project passage:** two genuine screenshot planes lift, turn and travel through CSS perspective space. Native scroll and GSAP own the reversible poses; a sticky stage releases naturally into the next chapter.
- **SIX&7 Shopify:** graphite editorial typography, real collection/product evidence, three responsive captures, implementation notes and an independent six-image gallery. Images are dated Shopify Draft-preview captures; the storefront link is explicitly password-protected. This is separate from the Next.js SIX&7 project.
- **Ember & Oak:** a layered CSS 3D retreat introduces a warm espresso/cream restaurant-concept chapter, ten unchanged original captures, responsive tablet/mobile evidence and an independent accessible gallery. The reservation interface is evidence only; booking and form delivery are unverified.
- **ClientScout AI:** a hinged photographic exit resolves into a cream/slate software workspace. Eleven genuine development captures, explicit committed/local/unverified/deferred status, responsive evidence and an independent accessible gallery. Synthetic demonstration records are labeled; no public live demo or backend/provider connection is invented.
- **Hero:** BEYOND / THE INTERFACE typography, developer identity, entrance animation, and restrained depth response.
- **Original 3D laptop:** supplied GLB, studio lighting, pointer interaction, and Apple-logo concealment applied at runtime. The original model file remains unchanged.
- **Cinematic screen:** the supplied 29.5-second video plays on the original display mesh through Three.js `VideoTexture`, with matching UV orientation, sRGB color handling, and native source resolution.
- **Playback lifecycle:** muted inline autoplay and looping while the hero is visible; playback pauses offscreen, in hidden documents, and after the video fades into the case study.
- **Reversible choreography:** GSAP coordinates camera movement, a smooth video-to-Smile-Care crossfade, and the existing 3D-to-DOM screenshot handoff. Reverse scrolling reconstructs the transition.
- **Smile Care case study:** Frontend → Responsive → Behind the Build, real project screenshots, independent Homepage/Mobile/Administration gallery controls, and implementation notes.
- **Responsive behavior:** desktop cinematic scrolling; inline tablet/mobile presentation with optional laptop interaction.
- **Fallbacks and access:** system and in-page reduced-motion controls, static video fallback, sanitized WebGL fallback, keyboard navigation, skip-to-work links, and a basic no-JavaScript project view.

Smile Care is presented as a WordPress practice project. The portfolio uses local screenshots rather than embedding or contacting the original application.

## Technology stack

| Area | Tools |
| --- | --- |
| Application | React 19, TypeScript |
| Build | Vite 7, npm lockfile |
| 3D rendering | Three.js, React Three Fiber, GLTFLoader |
| Motion | GSAP, ScrollTrigger |
| Screen playback | HTML video, Three.js VideoTexture, shader crossfade |
| Styling | CSS, locally bundled Inter and Space Grotesk variable fonts |
| Browser verification | Playwright Core, installed Google Chrome |

## Run locally

Use Node.js 22.12+ or a compatible newer LTS release. This checkpoint was verified with Node.js 24.19.0 and npm 11.17.0.

```sh
git clone https://github.com/sahilbhardwaj037037-sys/og-portfolio.git
cd og-portfolio
npm ci
npm run dev
```

Open **http://127.0.0.1:5173/**. No environment variables or API keys are required. To use the Phase 2.2 review URL, run `npm run dev -- --port 5183` and open http://127.0.0.1:5183/. The default server binds to loopback on your computer.

To build and inspect the production output locally:

```sh
npm run build
npm run preview
```

Open **http://127.0.0.1:5174/**. These commands build and preview the site; they do not deploy it.

## Verify the checkpoint

Start `npm run preview` after building, then use a second terminal:

```sh
OG_QA_URL=http://127.0.0.1:5174 npm run qa
OG_QA_URL=http://127.0.0.1:5174 npm run qa:video
OG_QA_URL=http://127.0.0.1:5183 npm run qa:phase22
node qa/production-smoke.mjs
OG_QA_URL=http://127.0.0.1:5183 node qa/reduced-layout-check.mjs
OG_QA_URL=http://127.0.0.1:5183 npm run qa:phase3
OG_QA_URL=http://127.0.0.1:5183 npm run qa:phase3c
OG_QA_URL=http://127.0.0.1:5183 npm run qa:phase3d
```

The focused Phase 2.2 suite expects a running development preview on port 5183 (`npm run dev -- --port 5183`) because it also checks the exported loop/theme functions. The existing scripts expect Google Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. Playwright Core is installed by `npm ci`; it does not download a browser. Other operating systems need a matching installed-browser path in the QA launch configuration.

The main regression suite checks the original laptop, logo concealment, pointer interaction, forward/reverse scrolling, screen/DOM alignment, resizing, responsive controls, motion settings, and WebGL/static fallbacks. The video suite checks playback, looping, visibility, fallbacks, reversible blending, texture uploads, and paired performance measurements. The smoke test targets port 5174.

For a quick visual review, move the pointer over the desktop hero, scroll forward into Smile Care, scroll backward into the laptop, and resize during the handoff. Try the motion toggle and `/?fallback`. On mobile, scroll the inline hero out of view and return to it.

QA screenshots, recordings, and machine-specific generated results remain local and are ignored by Git. The historical `qa/initial-check.mjs` utility is excluded because it writes a fallback poster; it is not part of the regression commands above. See [checkpoint verification and asset handling](docs/CHECKPOINT.md) for the reviewed checkpoint record.

## Project structure

```text
src/
  main.tsx             Page structure, gallery, and hero scroll timeline
  scene.tsx            Original laptop, screen material, camera, and logo concealment
  screenVideo.ts       Video lifecycle, visibility, playback, and cleanup
  useLivingEnvironment.ts  Pointer-driven studio boundary
  HeroSound.tsx        Accessible sound toggle and hero presence
  heroAudio.ts         Lazy audio loading, runtime looping, fades, and suspension
  projectThemes.ts     Typed palettes and scoped theme tokens
  environment.css      Living studio, contrast treatments, and theme styling
  SmileCareStory.tsx   Case-study scroll presentation
  *.css                Typography, layout, and responsive styling
public/
  media/               Original GLB, cinematic MP4, project images, and fallback posters
qa/                    Browser regression and video verification scripts
docs/                  Checkpoint verification and runtime asset checksums
licenses/              Bundled font license notices
```

This repository root corresponds to the local `prototype` directory. Discovery repositories, earlier phase planning, preserved baseline builds, and historical QA recordings live outside this source checkpoint.

## Completed phases

| Phase | Completed work |
| --- | --- |
| Phase 0 | Project discovery and source-asset collection |
| Phase 1 | Creative direction, storyboard, and technical architecture |
| Phase 2 | Original 3D laptop, concealed logo, reversible screen handoff, Smile Care prototype, and fallbacks |
| Phase 2.1 | BEYOND THE INTERFACE refinement, immersive hero composition, screen hierarchy, and deeper Smile Care presentation |
| Cinematic video integration | Original-mesh video playback, smooth screenshot handoff, visibility management, and static fallback behavior |

## Planned roadmap

- **Phase 2.2 — completed and visually approved:** living environment, hero soundscape, project-theme foundations, and balanced reduced-motion storytelling. Recorded on `feature/phase-2.2-living-environment`; merging and deployment remain separate decisions.
- **Phase 3B — completed and visually approved:** Smile Care → SIX&7 CSS 3D passage and complete SIX&7 chapter. Later phases require separate approval. The Phase 4 reel position remains after the ClientScout showcase; no reel player or media loading is added.
- **Phase 3C — completed and visually approved:** SIX&7 → Ember & Oak layered passage and complete restaurant-concept showcase. Included in the feature-branch checkpoint; no commercial reel, merge or deployment is included.
- **Phase 3D — completed and visually approved:** Ember & Oak → ClientScout AI hinge/alignment passage and complete fourth-project showcase. Included in the feature-branch checkpoint; no pull request, merge, deployment or next-section work is included.
- **Phase 4.2 — completed and visually approved:** cinematic additional-project gallery and final website-link correction, authorized for this feature-branch checkpoint. No commercial showreel, Skills/About/Contact, merge or deployment included.
- Expand the approved portfolio story with the remaining selected projects, showreel, skills presentation, archive, and closing contact experience.
- Complete physical-device and cross-browser testing, accessibility review, and production asset-delivery optimization.
- Plan production release and hosting separately. No release date or deployment is implied by this checkpoint.

## Assets and repository policy

The cinematic MP4 is **22.38 MiB** and the original GLB is **10.34 MiB**. The hero soundtrack is an additional unchanged 8.24 MiB WAV. All three are regular Git assets; Git LFS is not required for their current sizes. Their checksums are recorded in [asset-integrity.json](docs/asset-integrity.json). Project screenshots and fallback posters are included so a fresh clone can run the complete current prototype.

Dependencies, generated builds, caches, temporary files, local tooling state, secrets, and generated QA evidence are excluded. Keep future media changes deliberate: replacing large binaries repeatedly grows Git history.

Font notices are retained in `licenses/`. Soundtrack provenance and verified terms links are recorded in [licenses/hero-ambient.txt](licenses/hero-ambient.txt); no blanket music license is asserted. This checkpoint does not grant a new license to the portfolio source or supplied project/model/video assets. Third-party assets remain subject to their respective terms.

The six SIX&7 WebPs total 192,184 bytes and are unchanged from the approved source captures. Their dates, source revision and reuse boundaries are recorded in [licenses/six7-captures.txt](licenses/six7-captures.txt); their checksums are included in the asset manifest. Generated Phase 3 screenshots, recordings and performance output remain ignored under `qa/phase3/`.

The ten bounded Ember & Oak JPEGs total 605,383 bytes and are unchanged from the inspected source revision. The 1440×8333 full-page image is linked in the source repository rather than loaded by the portfolio. [Capture provenance](licenses/ember-oak-captures.txt) records the fictional-content and unresolved photography-licensing boundaries. Generated Phase 3C evidence remains local under ignored `qa/phase3c/`.

The eleven ClientScout AI JPEGs total 1,213,244 bytes, unchanged from the approved source captures. They are October 20 development snapshots of a working tree containing pending 5.2 changes, with synthetic records and providers disabled—not clean-checkout 5.1 or deployment proof. [Provenance](licenses/clientscout-captures.txt) and [per-image inventory](docs/phase3d-asset-inventory.json) record these boundaries. Research/Settings reserves and older PNGs are excluded. Generated Phase 3D evidence remains ignored under `qa/phase3d/`.

The four additional-project screenshots are separate WebP delivery derivatives preserving the approved originals and full framing. See [provenance](docs/phase42-capture-provenance.json) and [capture boundaries](licenses/additional-project-captures.txt). Run `npm run qa:gallery`, `npm run qa:gallery:accessibility` and `npm run qa:assets` with a local preview running; paired `npm run qa:gallery:performance` requires the preserved Phase 3D baseline on port 5180 and production on 5174. Generated evidence remains local under ignored `qa/phase42/`.
