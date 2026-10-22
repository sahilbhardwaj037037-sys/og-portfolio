# Phase 2.2 — Living Environment & Hero Soundscape

Implementation and review record, October 22, 2026. Branch: `feature/phase-2.2-living-environment`. Parent checkpoint: `4b0992cc3c8b0d74a6337d8cb7d6e4b9fff6822d`. The user visually approved the complete phase, including the [reduced-motion layout correction](REDUCED-MOTION-REVIEW.md), and authorized this feature-branch GitHub checkpoint. No merge, deployment, or Phase 3 work is included.

## Preview

The existing local development preview serves this branch at **http://127.0.0.1:5173/**. To start it from `prototype/`, run `npm run dev`. For a separate review/test server use `npm run dev -- --port 5183`, then open **http://127.0.0.1:5183/**. Sound is off on every fresh load; enable it with the speaker button.

Move horizontally across the hero to adjust the light/dark balance, leave the hero to return to 50/50, scroll into Smile Care, and reverse. Enable sound, scroll out and back, then toggle it off. Touch layouts and reduced motion retain a static composition.

## Implemented environment

The original hero typography, placement, laptop camera poses, pointer response, and GSAP pin/scroll timing are retained. A warm ivory studio field meets deep graphite through a feathered, softly illuminated boundary. A small static grain tile adds surface texture. The starting balance is 50/50, with ivory on the left. Horizontal pointer movement uses an adjustable 30–70% range and 450 ms easing; pointer departure returns to center. Settings are centralized in `studioSettings` in `src/useLivingEnvironment.ts`.

The background translates a prepainted layer rather than continuously rebuilding a gradient or adding another WebGL scene. Headline ink adapts across the field. The foreground desktop headline stays pale over the graphite laptop; mobile lettering uses the paired ink treatment. Small identity text has a quiet ivory backing, and the sound/scroll controls have stable dark surfaces. No per-frame React state is used for cursor movement. Easing settles when idle and stops offscreen/hidden. Touch and reduced-motion modes disable boundary movement.

The existing `--paper` opacity drives the reversible transition into Smile Care's ivory palette. Its timing and the 3D-to-DOM geometry are unchanged.

## Supplied music and loop handling

The exact user-selected file is `public/media/hero-ambient.wav`:

| Property | Verified value |
| --- | --- |
| Encoding | WAV / signed 24-bit little-endian PCM |
| Duration | 30.000 seconds, 1,440,000 frames |
| Sample rate / channels | 48,000 Hz / stereo |
| File size | 8,640,044 bytes (8.24 MiB) |
| SHA-256 | `3750340764638bf43f6583f46980faca68453d79da336632da43b8a0f7132716` |

The original endpoints do not form a clean hard join: the sample step is approximately 0.01293 left / 0.01139 right, and the first/last 100 ms RMS levels are 0.3315 / 0.0442. This indicates a risk of a click or level jump; waveform analysis does not establish a subjective listening result.

Playback applies a complementary raised-cosine 600 ms overlap to the decoded buffer in memory. This produces an approximately 29.4-second repeating cycle, without altering, trimming, replacing, or re-encoding the original WAV. The browser may resample the decoded buffer to its audio context rate. Two offline-rendered cycles were compared: the added boundary step and difference between repeated cycles were both zero. The join follows adjacent source samples rather than an abrupt end-to-start splice. Musical phrasing and preferred listening volume remain part of human review.

The speaker button creates/resumes Web Audio only from an explicit gesture and lazily fetches the original file. The maximum playback gain is 0.16, with 600 ms user fades and 120 ms smoothing for scroll-driven gain changes. Audio follows the existing identity departure (hero progress 0.12–0.36), then suspends, well before the DOM handoff at 0.74–0.84. A separate hard eligibility gate guarantees zero gain/suspension at the DOM handoff or when the hero has no visible area, including fast skip-to-work navigation. On mobile, presence also fades with the last visible half of the hero. Scroll progress controls presence/volume only; there is no beat analysis, visualizer, or synchronization to the MP4. Reverse scrolling resumes only a previously enabled soundtrack. Explicit OFF remains off; reloading starts off again.

When the document is hidden, gain automation is cleared, gain is set immediately to zero, and the audio context suspends. Offscreen mobile intersection uses nonzero visible area, including viewport-edge contact. The single looping source and decoded buffer are retained while suspended, then disposed on unmount. Fetch/decode/policy errors leave a silent, persistent, accessible Retry control; an in-flight load cannot erase the error state.

## Provenance and verified terms

Source: **Google Flow Music**, supplied and approved by the user. The file contains no embedded provenance/license metadata. [licenses/hero-ambient.txt](../licenses/hero-ambient.txt) records the source, checksum, and verification limits.

Flow Music's [Terms link](https://flowmusic.app/terms) redirects to [Google's general Terms of Service](https://policies.google.com/terms). Google's [Flow Music announcement](https://blog.google/innovation-and-ai/models-and-research/google-labs/believe-flow-music-partnership/) states that Google does not claim ownership of original content generated with Flow Music. The general terms require respecting third-party rights and following applicable service-specific terms. These public statements do not establish a blanket royalty-free/Creative Commons license or verify the user's generation account, plan, prompt, or export history. No such license or clearance is invented here.

## Project themes

`src/projectThemes.ts` contains typed background, surface, ink, secondary, accent, and border tokens. `projectThemeStyle()` scopes them to the relevant section instead of switching the whole website theme.

| Project | Palette | Scope |
| --- | --- | --- |
| Smile Care | Warm ivory, charcoal, muted terracotta | Applied to the existing showcase and handoff |
| SIX&7 | Graphite, off-white, editorial red | Registered only |
| Ember & Oak | Espresso, warm wood, cream | Registered only |
| ClientScout AI | Creamy white, cold coffee, slate | Registered only |

All four background/text token pairs pass AA: primary text contrast is at least 11.57:1, secondary at least 5.78:1, and accent at least 5.13:1. Only one project section exists. No remaining showcase has been invented or built. Theme token checks are separate from visual inspection of headline compositing over the laptop.

## Genuine browser captures

These local evidence files are genuine Chrome screenshots, with no retouching:

- [Default studio with the video naturally at 10 seconds](../qa/phase22/desktop-review.png)
- [Original fresh-load capture](../qa/phase22/desktop-default.png)
- [More graphite](../qa/phase22/desktop-graphite.png) / [more ivory](../qa/phase22/desktop-ivory.png)
- [Sound enabled](../qa/phase22/desktop-sound-on.png) / [keyboard activation](../qa/phase22/desktop-keyboard-sound.png)
- [Smile Care handoff](../qa/phase22/desktop-handoff.png) / [reverse return](../qa/phase22/desktop-reverse.png)
- [390px mobile](../qa/phase22/mobile-390.png) / [320px mobile](../qa/phase22/mobile-320.png)
- [Reduced motion](../qa/phase22/reduced-motion.png)

Generated captures/results remain ignored by Git and are available in this local workspace for review.

## Verification

- TypeScript + Vite production build passes; the existing large Three.js chunk warning remains.
- Existing main browser suite: 19 checks passed.
- Existing Phase 2.1 refinement suite: 19 checks passed, including comparison with the preserved checkpoint camera geometry and ten responsive viewports.
- New focused Phase 2.2 suite: 15 checks passed, covering default silence/no audio fetch, pointer limits/reset/settling, actual audio gain fades/suspension, reverse scroll intent, visibility, rendered loop cycles, palette contrast, resize, 390/320px mobile behavior, reduced motion, failed loading, and denied playback.
- Production smoke: passed on the final build with no browser errors. A separate real Space-key activation/deactivation check also passed on the existing local preview, including default silence and post-disable suspension.
- Video regressions: all 10 checks passed after correcting the native-loop harness; all nine paired performance runs completed successfully.

The historical video loop harness failed during validation and also failed on the untouched Phase 2.1 build. It used a fixed delay after seeking and checked the live HTMLMediaElement readiness instead of presented-frame metadata. The harness now waits for seek readiness, validates source-resolution frames through `requestVideoFrameCallback` metadata, and checks a bounded frame-presentation gap at the native wrap. The passing run measured 50.3 ms between the last and first presented frames at full source resolution. The application video implementation and media are unchanged. Readiness samples are retained for inspection in the local QA directory.

Safari 27 and `safaridriver` were found. A real WebDriver session was attempted; Safari rejected it because Allow remote automation is disabled in Safari's Developer settings. No preferences were changed. Native Safari and physical iOS/Android testing remain unverified. Chrome mobile tests use touch/viewport emulation. Document visibility and policy failures use explicit test-harness simulation.

Reports: [focused checks](../qa/phase22/results.json), [main regressions](../qa/browser-results.json), [video regressions](../qa/video/results.json), [paired performance](../qa/phase22/performance.json), [audio analysis](../qa/phase22/audio-inspection.json), [Safari attempt](../qa/phase22/safari-results.json). The historical refinement report remains local at `/private/tmp/og-phase22-refinement/refinement-results.json`.

## Performance comparison

The paired test compares the preserved production Phase 2.1 build with Phase 2.2 silent and Phase 2.2 sound enabled, in three runs each. Each isolated context measures idle hero playback, identical real pointer movement, and forward/reverse wheel input. No concurrent browser suite runs during measurement. Audio activation timing, requests, video uploads/drops, environment writes, rendering counts, long tasks, and frame intervals are recorded.

All nine final production-build runs completed with no console/page errors:

| Measured across three runs each | Phase 2.1 | Phase 2.2 silent | Phase 2.2 sound |
| --- | --- | --- | --- |
| Idle / pointer / scroll p95 frame intervals | 16.7–16.8 ms | 16.7–16.8 ms | 16.7–16.8 ms |
| Long tasks during sampled interactions | 0 | 0 | 0 |
| Dropped video frames across all sampled interactions | 3 | 3 | 0 |
| Video uploads per approximately 2s idle sample | 60–61 | 60 | 60 |
| Three.js GPU textures | 13 | 13 | 13 |
| Idle environment writes | N/A | 0 | 0 |
| Soundtrack requests before opt-in | 0 | 0 | 0 |

The optional soundtrack reached decoded/prepared readiness in 110–239 ms on local loopback; this includes loading and preparation, not isolated native decoder CPU time. No frame-cadence regression was observed on this machine. This does not mean that CSS compositing and audio processing have zero cost. The new main JS bundle is about 7.4 kB larger uncompressed / 2.8 kB larger gzip, and CSS about 4.6 kB larger uncompressed / 1.2 kB gzip. No new runtime dependencies or Three.js textures are introduced. Three.js resource counts do not include browser compositor surfaces or native audio/decoder allocations. The decoded loop occupies approximately 9.89 MiB at 44.1 kHz or 10.77 MiB at 48 kHz, excluding temporary decode buffers; the source is fetched only after opt-in. Direct GPU execution time, OS power use, physical-device thermals, and native audio-thread CPU time are not measured.

## Files changed

- `src/main.tsx`: attaches the independent backdrop, environment/presence hooks, speaker control, and scoped Smile Care tokens.
- `src/environment.css`: studio layers, adaptive headline ink, contrast treatments, speaker styles, responsive/reduced-motion behavior, and token application.
- `src/useLivingEnvironment.ts`: adjustable pointer range, eased DOM updates, visibility and cleanup.
- `src/HeroSound.tsx`: accessible toggle, status/error feedback, and hero intersection.
- `src/heroAudio.ts`: lazy loading, in-memory loop softening, gain ramps, pause/resume/error handling, and disposal.
- `src/projectThemes.ts`: all four typed theme registrations.
- `public/media/hero-ambient.wav`: the user-supplied original, unchanged.
- `licenses/hero-ambient.txt`: source and verified usage-term notes.
- `.gitattributes`: marks WAV as binary.
- `docs/asset-integrity.json`: adds the supplied audio checksum without changing previous entries.
- `package.json`: adds focused QA/performance commands; dependencies are unchanged.
- `qa/phase22-check.mjs`, `qa/phase22-performance.mjs`: focused behavior and paired performance harnesses.
- `qa/video-check.mjs`: corrects the legacy native-loop measurement described above.
- `README.md` and this report: current branch status, preview, features, reproduction, evidence, and limitations.

The original GLB, cinematic MP4, `src/scene.tsx`, `src/screenVideo.ts`, and `src/SmileCareStory.tsx` remain byte-identical to `main`. The approved local and GitHub `main` refs were both rechecked and remain `4b0992c`. The approved checkpoint also includes `src/refinement.css`, `qa/reduced-layout-check.mjs`, and `docs/REDUCED-MOTION-REVIEW.md` for the static desktop layout correction. Generated review captures remain local and ignored; links to them in these reports require the original workspace or a fresh QA run.

Temporary QA servers were stopped at handoff. The user's pre-existing development preview on port 5173 was preserved and continues serving the current local branch.
