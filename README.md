# OG Portfolio

**Under development · Phase 2.1 + Cinematic Video Integration**

A cinematic web developer portfolio by Sahil Bhardwaj, built around **BEYOND THE INTERFACE.** The Obsidian / Atelier direction pairs a graphite 3D laptop with an immersive typographic hero, then follows the screen into a warm ivory presentation of selected work.

This checkpoint contains the approved Phase 2.1 prototype and completed laptop video integration. The first implemented case study is Smile Care Clinic. The broader portfolio remains in development; Phase 2.2 and Phase 3 have not started. This repository contains source code and runtime assets, with no deployment configured as part of this checkpoint.

## Implemented experience

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

Open **http://127.0.0.1:5173/**. No environment variables or API keys are required. The default server binds to loopback on your computer.

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
node qa/production-smoke.mjs
```

The existing scripts expect Google Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. Playwright Core is installed by `npm ci`; it does not download a browser. Other operating systems need a matching installed-browser path in the QA launch configuration.

The main regression suite checks the original laptop, logo concealment, pointer interaction, forward/reverse scrolling, screen/DOM alignment, resizing, responsive controls, motion settings, and WebGL/static fallbacks. The video suite checks playback, looping, visibility, fallbacks, reversible blending, texture uploads, and paired performance measurements. The smoke test targets port 5174.

For a quick visual review, move the pointer over the desktop hero, scroll forward into Smile Care, scroll backward into the laptop, and resize during the handoff. Try the motion toggle and `/?fallback`. On mobile, scroll the inline hero out of view and return to it.

QA screenshots, recordings, and machine-specific generated results remain local and are ignored by Git. The historical `qa/initial-check.mjs` utility is excluded because it writes a fallback poster; it is not part of the regression commands above. See [checkpoint verification and asset handling](docs/CHECKPOINT.md) for the reviewed checkpoint record.

## Project structure

```text
src/
  main.tsx             Page structure, gallery, and hero scroll timeline
  scene.tsx            Original laptop, screen material, camera, and logo concealment
  screenVideo.ts       Video lifecycle, visibility, playback, and cleanup
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

- **Phase 2.2 — pending separate approval:** define the next refinement scope after reviewing this checkpoint. No Phase 2.2 implementation is included.
- Expand the approved portfolio story with the remaining selected projects, showreel, skills presentation, archive, and closing contact experience.
- Complete physical-device and cross-browser testing, accessibility review, and production asset-delivery optimization.
- Plan production release and hosting separately. No release date or deployment is implied by this checkpoint.

## Assets and repository policy

The cinematic MP4 is **22.38 MiB** and the original GLB is **10.34 MiB**. Both are included unchanged as regular Git files; Git LFS is not required for their current sizes. Their checksums are recorded in [asset-integrity.json](docs/asset-integrity.json). Project screenshots and fallback posters are included so a fresh clone can run the complete current prototype.

Dependencies, generated builds, caches, temporary files, local tooling state, secrets, and generated QA evidence are excluded. Keep future media changes deliberate: replacing large binaries repeatedly grows Git history.

Font notices are retained in `licenses/`. This checkpoint does not grant a new license to the portfolio source or supplied project/model/video assets. Third-party assets remain subject to their respective terms.
