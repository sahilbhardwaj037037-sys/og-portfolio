# Phase 5.2 — Cinematic commercial showreel local review

Implemented locally from approved checkpoint `b8a28928275e8cedecbf0f9dc82ad8da9d2ce9a8` on `feature/phase-3-cinematic-projects`, following the approved Phase 5.1 report, six-panel storyboard and verified video inventory. Awaiting visual approval. No commit, push, pull request, merge, deployment or Skills/About/Contact implementation is included.

## Local preview and review route

**http://127.0.0.1:5183/#showreel** — direct screening-room preview.

**http://127.0.0.1:5183/#additional-projects** — browse the complete collection, choose another card, then scroll past its unchanged closing into the new entrance. The source quotation follows the last settled selection.

Start/restart from `prototype` with `npm run dev -- --port 5183`. The pre-existing server on 5173 is preserved. The local Vite preview on 5183 remains available for review; temporary production/baseline servers are stopped after verification.

## Experience

The complete four-card gallery and its closing remain in place. A separate screening-room sibling precedes the original footer. Its charcoal field darkens while one noninteractive quotation of the selected card recedes; a genuine 16:9 poster/video plane approaches from shallow depth and settles frontally. Warm rules, ivory type and “The work, in motion.” introduce the film. No gallery links or interactive controls are duplicated into moving geometry.

Fine-pointer desktop ≥1000×700 with normal motion gets a **140svh CSS sticky shell: only 40vh extra travel**. One scoped GSAP ScrollTrigger paints reversible poses; there is no new GSAP pin spacer, WebGL canvas, player dependency or permanent animation loop. At 700px/ultrawide endpoints the complete heading, screen and feedback fit. The same video node releases into document flow. Reverse scroll changes decoration only; it never seeks or starts playback.

Touch/tablet, short windows and both reduced-motion controls receive a complete static presentation with no depth quotation or cinematic spacer. Early player focus/activation stabilizes the frame. Changing motion preferences during playback clears motion without replacing the video or resetting time. Because earlier cinematic spacers also change height, an already visible playing film retains its viewing anchor if that layout change would otherwise move it completely offscreen. Normal play/pause does not force document scrolling.

The film starts only from the clearly named **Play film** action, which indicates sound. Before that gesture, no MP4 source is attached; initial hero navigation transfers neither poster nor commercial. Near-view observation loads only the authentic poster. Source attachment and `play()` happen synchronously inside the trusted gesture.

After activation, browser-native controls own play/pause, seeking, mute/volume and fullscreen. Playing, buffering, paused, ended and error states come from media events. Stale queued events cannot release ownership for a newer playback session. Ended playback keeps the final frame and offers explicit replay; there is no loop, auto-replay or watch-to-unlock behavior. Failures offer an explicit retry and a usable transcript. Feedback space is reserved, including on phones, so error text/actions do not shift the player or following transcript.

## Audio behavior

The film uses ordinary media-element audio. One small shared ownership contract suppresses the existing hero controller; it creates no new global AudioContext or alternate audio engine.

- Acquiring film playback immediately cancels hero gain ramps and sets hero gain to zero, retaining its user-enabled intent. Suppression applies even while the film is muted, protecting later unmute.
- Existing hero gates remain: opt-in, hero visibility, document visibility and the original fade/presence logic. Late asynchronous AudioContext resumes cannot restore gain while suppressed.
- Film pause, completion, error, cancelled load and disposal release ownership. Music does not start in the showreel, because the hero is absent. It can return only when a previously opted-in visitor returns to an eligible visible hero.
- A film fully outside the viewport pauses after approximately 250ms and retains time. Returning does not auto-resume it. A hidden document pauses inline playback and requires explicit resume on return.
- Deliberate native fullscreen/Picture-in-Picture is exempt from geometric offscreen pausing. Exiting those modes checks actual visibility. Picture-in-Picture behavior remains a platform-specific verification limit noted below.

The original WAV, its level/envelope/loop preparation and the MacBook's separate muted video remain unchanged.

## Film, poster and transcript provenance

Approved original source:

`/Users/sahilbhardwaj/Documents/Og_portfolio/SSahil_Web_Development_Commercial_1080p.mp4`

Delivery copy:

`public/media/showreel/commercial-1080p.mp4`

Both are **5,747,083 bytes**, SHA-256 **`a7efe982dec837b957ba342b68a850a79a651c442d8a2b286e1b30ecaccf8b15`**. The delivery is byte-identical, without remuxing, recompression, trimming or edits. It is **41.000 seconds**, 1920×1080 at 30fps, H.264 High Level 4.0 with stereo AAC-LC at 48kHz. It already has progressive-start MP4 structure.

The separate MacBook source remains `public/media/sahil-screen-animation.mp4`, 29.500 seconds, 2750×1788, with no audio; it was not replaced or modified.

`public/media/showreel/poster.webp` is a genuine frame at **1.000s**, decoded with FFmpeg, proportionally resized with Pillow/Lanczos to **1280×720**, then WebP quality 88/method 6: **34,386 bytes**. Full framing, no retouching, substitute imagery or invented UI. The local FFmpeg build lacks a WebP encoder, so Pillow performed the still-image encoding. The film itself was untouched.

The film already has burned-in English word-highlight captions. The **readable transcript** follows the existing `agency_promo_final/narration.txt`, corroborated against local speech recognition of this exact MP4 during Phase 5.1. Punctuation is normalized for reading; no dialogue is invented. A separately labeled visual-context paragraph identifies historical project imagery, the Twenty Twenty-Five theme reference and Shopify editor previews. No additional caption overlay duplicates the burned-in captions.

See [provenance](../licenses/commercial-showreel-provenance.txt) and [runtime hashes](asset-integrity.json). Historical practice captures do not imply public deployment, completed client work or commercial integrations. Existing project qualifications and approved URLs remain intact.

## Changed files

| Files | Purpose |
| --- | --- |
| `src/CommercialShowreel.tsx` | Native media, loading/error/replay states, transcript, near-view poster, lifecycle and audio ownership |
| `src/useShowreelEntrance.ts`, `src/showreel.css` | Separate reversible CSS 3D entrance, frontal endpoint, interaction stabilization and static layouts |
| `src/mediaAudioCoordinator.ts`, `src/heroAudio.ts`, `src/HeroSound.tsx` | Single ownership contract, original hero suppression and asynchronous guards |
| `src/AdditionalProjectsGallery.tsx` | Optional settled-selection callback only; existing card DOM/copy/styles/order and carousel hook retained |
| `src/main.tsx` | New sibling mount, selected-card state and showreel fragment destinations |
| `public/media/showreel/*`, `licenses/commercial-showreel-provenance.txt`, `docs/asset-integrity.json` | Verified film copy, authentic poster, provenance and two added runtime records |
| `qa/showreel-check.mjs`, `qa/showreel-lifecycle-check.mjs` | Native media, ownership/races, geometry/reverse, responsive, loading/error and accessibility checks |
| `qa/showreel-performance.mjs`, `qa/showreel-record.mjs` | Paired production measurements and genuine silent browser recording |
| `qa/phase4-gallery-check.mjs`, `qa/phase4-gallery-accessibility.mjs` | Update only the expected collection successor/Tab destination to the implemented showreel; retain original checks |
| `package.json`, `README.md`, this report | QA commands, preview and review documentation |

No dependency or lockfile changes. `scene.tsx`, `screenVideo.ts`, featured-project stories/transitions, project links/data, gallery screenshot assets, gallery CSS and carousel behavior retain their approved source bytes. No original project repository was modified. Source edits are confined to this portfolio checkout; a temporary paired-baseline build copy lives under `/private/tmp`. Generated screenshots/reports/recording remain ignored under `qa/phase52/`.

## Verification

**Production build, all 193 behavioral/regression checks, production smoke and all 42 runtime size/SHA-256 checks pass.**

The 193 checks comprise the 159 existing regressions (core 19, video 10, SIX&7 19, Ember 22, ClientScout 27, Smile reduced-layout 12, gallery 24, gallery accessibility 11, audio/environment 15), plus **27 focused showreel checks and 7 lifecycle/race checks**. Reports contain no failures or uncaught JavaScript errors. Original hero/camera tests pass, and Smile Care's three normal-motion reference captures remain pixel-identical. The full existing sequence used the production preview on 5174; audio/theme helper imports and the isolated AudioContext-race check use Vite on 5183.

Focused coverage includes real CSS matrices/reversal, selected-card quotation, 40vh entrance travel, 700px/ultrawide fitting, zero initial media transfers, gesture-only playback, native keyboard Space, real seeking/volume/mute properties, actual fullscreen, ended/replay, exclusive hero gain, delayed AudioContext resume, rapid pause/play queues, pending load cancellation, hidden/visible handling, offscreen retention, motion changes while playing, 320/390/768/short-window/static layouts, transcript/Tab exit, delayed/failed film, failed poster, rejected play and explicit retry. A real Range GET returns **206**, **`video/mp4`**, **`Content-Range: bytes 0-1023/5747083`** and 1,024 bytes.

Three additional final geometry cases confirm **zero pixel displacement** of the following transcript between idle and error states at 1440px, 390px and 320px, while retaining the 16:9 frame and no horizontal overflow.

All original **40 manifest records remain unchanged**; all **42** production copies match their source bytes. All **17** probed candidate videos retain their Phase 5.1 SHA-256. Of the original 121 tracked files, **112 remain byte-identical** and the other nine match the explicitly scoped integration/audio/QA/documentation edits. HEAD remains the approved checkpoint; nothing is staged. [Preservation results](../qa/phase52/preservation-results.json).

Final production smoke in Chrome 155: scene ready **846.4ms**, local LCP **140ms**, CLS **0.0000634**, zero errors. Single local timing observations are not field-performance claims. [Smoke results](../qa/production-results.json).

Results: [showreel 27](../qa/phase52/results.json), [lifecycle 7](../qa/phase52/lifecycle-results.json), [final geometry](../qa/phase52/final-layout-results.json), [core](../qa/browser-results.json), [video](../qa/video/results.json), [SIX&7](../qa/phase3/results.json), [Ember](../qa/phase3c/results.json), [ClientScout](../qa/phase3d/results.json), [Smile layout](../qa/reduced-motion-review/after-report.json), [collection](../qa/phase42/results.json), [collection accessibility](../qa/phase42/accessibility-results.json), [audio/environment](../qa/phase22/results.json).

## Measured payload and performance

Three sequential approved-Phase-4.2 / Phase-5.2 pairs ran after regression browsers closed: same Chrome 155, Apple M5/ANGLE Metal, 1440×1000 DPR1, same local host. Shared hero and collection actions are paired; the additional film entrance/playback is measured separately because the baseline has no film section. [Raw performance report](../qa/phase52/performance.json).

| Payload | Approved Phase 4.2 | Phase 5.2 | Added / budget |
| --- | ---: | ---: | ---: |
| Aggregate JS, Node gzip | 397,659 B | 400,408 B | **2,749 B / 2.68 KiB**, ≤6 KiB |
| CSS, Node gzip | 16,022 B | 17,147 B | **1,125 B / 1.10 KiB**, ≤2 KiB |
| Authentic poster | — | 34,386 B | **33.58 KiB**, ≤160 KiB |
| Commercial MP4, separate on-demand delivery | — | 5,747,083 B | **5.48 MiB**, exact approved copy |
| Dependencies / fonts / canvases | Existing | Unchanged | **Zero added**; one original canvas |

Gzip figures are reproducible compressed asset sizes, not a claim that the local static servers negotiated gzip on the wire. The transcript is included in the JS measurement. There is no extra caption download.

| Sample | Baseline hero / collection p95 | Phase 5.2 hero / collection p95 | New entrance p95 / max | Film playback p95 / dropped frames |
| --- | --- | --- | --- | --- |
| 1 | 16.8 / 16.8ms | 16.8 / 16.7ms | 16.7 / 16.8ms | 16.8ms / 0 of 102 |
| 2 | 16.7 / 16.7ms | 16.8 / 16.8ms | 16.7 / 16.8ms | 16.8ms / 0 of 102 |
| 3 | 16.8 / 16.8ms | 16.7 / 16.7ms | 16.7 / 16.8ms | 16.8ms / 0 of 102 |

No long tasks were observed in these sampled intervals. All three new entrances meet the ≤20ms p95 target. Initial commercial-resource requests are **zero** in every pair; the entrance still has no attached film source. Each 3-second playback sample reports decoded AAC audio, zero dropped frames and one total canvas. These are local rAF-cadence samples, not the source-film frame rate (which remains 30fps), full-device power/GPU measurements or cross-browser certification. No measured new cadence regression remains unresolved.

## Visual evidence

- [Desktop poster](../qa/phase52/final-1440-poster.png), [390px poster](../qa/phase52/final-390-poster.png), [320px poster](../qa/phase52/final-320-poster.png).
- [Entrance start](../qa/phase52/entrance-0.png), [midpoint](../qa/phase52/entrance-0.5.png), [settled frame](../qa/phase52/entrance-1.png).
- [Desktop ended](../qa/phase52/desktop-ended.png), [loading](../qa/phase52/loading.png), [error with retry](../qa/phase52/error.png), [320px reserved error layout](../qa/phase52/final-320-error.png).
- [320px readable transcript](../qa/phase52/final-320-transcript.png), [static tablet](../qa/phase52/768-1024-no-preference.png), [reduced desktop](../qa/phase52/1440-1000-reduce.png).
- [Entrance and playback recording](../qa/phase52/screening-entrance-and-playback.mp4): **8.40 seconds encoded** (8.27s captured timeline), 1280×800, 147 genuine CDP frames, encoded to a silent QA recording. It shows forward entrance, trusted play, native keyboard pause and reverse movement. No captured audio; the original film is not edited. Capture timing is not a performance benchmark. [Recording metadata](../qa/phase52/recording-metadata.json).

## Known limitations and review boundaries

- Safari WebDriver refused a session because **Allow remote automation is disabled**. Settings were preserved. [Recorded refusal](../qa/phase52/safari-results.json). macOS Safari, real iPhone/iPad, native PiP and hardware volume behavior remain unverified; Chrome touch emulation does not certify those platforms.
- Native control appearance and inline volume behavior vary by OS/browser. The suite checks real playback/time, decoded AAC audio, native keyboard Space, seeking/volume/mute media properties and an actual browser fullscreen transition from a trusted click; it does not claim a manual review of every OS control surface.
- Automated audio verification checks decoded audio and zero hero gain/suppression, including delayed resume races. It is not a real-time human listening or screen-reader/VoiceOver certification.
- Small burned-in captions and pictured UI remain small on phones; the readable transcript and native fullscreen option address access without changing the original film. There is no selectable CC track in this phase.
- The inherited >500kB Three.js scene warning remains. No unrelated bundle refactoring or final mobile cinematic optimization is included.
- The React portfolio still requires JavaScript; the existing basic no-JavaScript document is preserved. Native video controls provide the supported in-page playback UI once explicitly loaded.

Stop for visual approval. No Git checkpoint or later section is authorized in this phase.
