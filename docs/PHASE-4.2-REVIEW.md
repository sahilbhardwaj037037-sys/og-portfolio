# Phase 4.2 — Additional Projects Gallery local review

Implemented locally from approved Phase 3D checkpoint `3a58981712c4985844ea935f20f0f1b637463d0c` on `feature/phase-3-cinematic-projects`. The user approved the complete Phase 4.1 proposal, exact four-card order and separate WebP delivery derivatives. Phase 4.2 is visually approved. The final website-link correction and feature-branch commit/push are authorized. No pull request, merge, deployment or Phase 5 implementation is included.

## Local preview

**http://127.0.0.1:5183/#clientscout-closing** — read the complete unchanged closing, then scroll into the new entrance. **http://127.0.0.1:5183/#additional-projects** — open the collection directly. From `prototype`, start with `npm run dev -- --port 5183` if needed. The pre-existing preview on 5173 is not replaced or stopped.

## Experience and scope

Exactly four additional cards follow the entire ClientScout section and precede the existing footer: **ApexFit → Aroma / Noctis → AETHER → ApexForm**. Names, descriptions, technology labels and status copy retain approved discovery content. Only ApexFit exposes a public **Live Website** action. Aroma / Noctis, AETHER and ApexForm expose GitHub only. Ember & Oak also retains only its repository action. Smile Care has no verified public website URL, so no website action is added. SIX&7 retains its explicitly labeled **Password-protected storefront** link; anonymous access redirects to `/password` and is not claimed to be public. Each concept's relevant limitations are visible beside its links.

The new section has its own charcoal/warm-metal collection tokens and uses existing fonts. A decorative, unchanged ClientScout lead-detail image recedes in CSS perspective while the real gallery screenshot approaches from depth. The ClientScout closing links and content are not transformed or duplicated. Source geometry clears the frame before retirement. The original four project chapters and existing transitions remain intact; only the Ember & Oak live action is removed.

Normal-motion fine-pointer desktop at ≥1000×700 receives a 158svh sticky entrance: **58vh additional native travel**, no new GSAP pin or scroll controller. The same real carousel/card DOM releases into ordinary flow; no first-card image swap occurs. Reverse scrolling reconstructs the same poses and preserves a later selected card. Screenshot mats have restrained depth while all card text and links stay frontal. Two mats normally change horizontal poses; farther cards keep constant shallow poses. No new continuous render loop or canvas exists.

A visual QA correction uses a split image/text composition for short desktop windows (700–850px tall), keeping the entire screenshot and all controls in the visible endpoint. Standard desktops use the larger stacked screenshot composition. Entrance illumination warms the charcoal field; text stays consistently light against a dark surface throughout. This avoids the low-contrast middle state that a synchronized ivory/graphite text inversion would create. The genuine cream ClientScout interface provides the continuity from the previous project.

Touch/tablet/short-window layouts use native horizontal swipe cards without a sticky scene or empty cinematic spacer. Both the system preference and existing manual Reduce Motion button produce a complete static grid/list, with carousel controls removed, full images retained and motion styles cleared. No new featured-project theme, excluded candidate, commercial film, Skills/About/Contact section or empty future-section placeholder is mounted.

## Interaction and accessibility

Native `scrollLeft` and CSS proximity snapping own horizontal position. Arrow buttons, four labeled project pickers and viewport-scoped Left/Right/Home/End commands target native card centers. Active status updates only after settled selection. No timed advance or circular clones. Focus stays on invoked controls; focusing a card link reveals that card, and Tab leaves the section normally.

Mouse drag begins only on screenshot space after horizontal intent exceeds 8px. Links, buttons and selectable copy are excluded. Snap is suspended only during accepted drag, then restored; pointer cancellation, capture loss, resize and blur clean up. A drag suppresses only its immediate generated click, leaving later link activation intact. Touch and trackpad retain native horizontal/vertical pan and zoom; vertical wheel input is never remapped or blocked. Controls retain 44px targets, with an extra row at 320px rather than clipped targets.

Image loading is near-view and observer-driven, with fixed native aspect ratio, a labeled waiting surface, decoded readiness and accessible error/retry panels. Neither loading nor errors remove the semantic project description or source links. All screenshot contents retain full framing; no fabricated UI, stock replacement, generated screenshot, product video or iframe is used.

## Assets and provenance

The four derivatives retain the original **1440×1000** dimensions; Pillow WebP quality 88/method 6 reduces delivery size without cropping, recoloring or retouching. Original masters remain unchanged in the discovery directory. Exact source and derivative records: [capture provenance](phase42-capture-provenance.json), [license/provenance boundaries](../licenses/additional-project-captures.txt), [runtime manifest](asset-integrity.json).

| Image | Bytes |
| --- | ---: |
| ApexFit | 66,720 |
| Aroma / Noctis | 30,658 |
| AETHER | 40,104 |
| ApexForm | 93,780 |
| **Total** | **231,262 B / 225.84 KiB** |

No blanket reuse rights are asserted. Source photography, marks and screenshot contents retain their applicable obligations. The ClientScout quotation retains the existing synthetic-data capture provenance. No original project repository was installed into, started, repaired or modified.

## Changed files

| Files | Purpose |
| --- | --- |
| `src/AdditionalProjectsGallery.tsx`, `src/AdditionalProjectCard.tsx`, `src/additionalProjects.ts` | Semantic collection, exact four-card data, source/live links, image readiness/error handling |
| `src/GalleryEntrance.tsx`, `src/useGalleryEntrance.ts` | Decorative source quotation, reversible desktop entrance and scoped cleanup |
| `src/useProjectCarousel.ts` | Native scrolling, mouse intent/capture, controls, settled index and focus handling |
| `src/additional-projects.css` | Collection identity, screenshot depth, short-window split, swipe/static layouts and focus/target treatment |
| `src/main.tsx` | New sibling mount and two initial deep-link destinations only |
| `public/media/additional-projects/*.webp` | Four approved delivery derivatives |
| `docs/asset-integrity.json`, `docs/phase42-capture-provenance.json`, `licenses/additional-project-captures.txt` | Original/derivative integrity and truthful provenance |
| `qa/phase4-gallery-check.mjs`, `qa/phase4-gallery-accessibility.mjs` | Focused geometry, controls, native input, responsive/reduced/fallback and accessibility checks |
| `qa/phase4-gallery-performance.mjs`, `qa/phase4-gallery-record.mjs`, `qa/asset-integrity-check.mjs` | Paired production measurements, genuine browser recording and reproducible runtime SHA-256 checks |
| `package.json`, `README.md`, this report | QA commands, preview instructions and local-review status; dependencies and lockfile unchanged |

The Ember regression now asserts that its live action is absent while preserving the repository checks. Gallery URL expectations enforce the final allowlist, and the keyboard exit check uses the remaining ApexForm repository link. All four `[data-project-theme]` sections remain four. Hero/scene/audio/video modules and previous transition/style files remain byte-identical to the approved checkpoint. Featured metadata and Ember markup change only to remove its live URL/action. Generated QA reports/screenshots/recordings remain ignored under `qa/phase42/`.

## Verification and measurements

**Prior visual-review verification:** production build, 178 checks, 40 runtime asset checksums and production smoke passed. The 178 checks comprise all 143 existing regressions (core 19, audio/environment 15, Smile reduced-layout 12, video 10, SIX&7 19, Ember 22, ClientScout 27, original laptop refinement 19), plus 24 focused collection checks and 11 accessibility/fallback checks. The final link correction updates link assertions as described above.

The full existing suite ran against the integrated production build; audio/theme helper imports used Vite on 5183. Following the final collection-only lighting/caption polish, the production build, all collection/accessibility checks, asset checks and production smoke were rerun. An early keyboard assertion waited less than the browser's native long-distance smooth-scroll duration; actual focus/scroll-position inspection confirmed correct behavior and the check now waits for settled state. No unresolved failures or uncaught browser errors remain in final reports.

Focused coverage includes real CSS matrices/reverse poses, source-plane clearance, 58vh travel, 700px/ultrawide framing, same-card release, native mouse dragging/capture, post-drag links, horizontal/vertical wheel behavior, scoped keyboard controls, later-card retention through reversal, exact URLs/qualifications, system/manual reduced motion, touch-event swipe emulation, 320/390/768/short-window layouts, 44px targets, focus reveal/escape, resize during drag, DPR2, image errors/retry and delayed decoding, deep links and WebGL fallback. An additional six intermediate-height browser inspections at 860–950px also fit, recorded in [geometry results](../qa/phase42/intermediate-geometry.json). Smile Care's three normal-motion reference captures remain pixel-identical.

Prior visual-review production smoke in Chrome 155: scene ready 849.1ms, local LCP 148ms, CLS 0.0000634 and zero errors. These single local-run timings are not field performance claims. Original GLB/MP4/WAV and the four screenshot masters retain their hashes. The final correction additionally changes Ember live-link metadata/markup and its regression assertion; no original project repository was written to.

Reports: [collection 24](../qa/phase42/results.json), [accessibility 11](../qa/phase42/accessibility-results.json), [production smoke](../qa/production-results.json), [core](../qa/browser-results.json), [audio/environment](../qa/phase22/results.json), [Smile layout](../qa/reduced-motion-review/after-report.json), [video](../qa/video/results.json), [SIX&7](../qa/phase3/results.json), [Ember](../qa/phase3c/results.json), [ClientScout](../qa/phase3d/results.json). The original laptop report is local at `/private/tmp/og-phase42-refinement/refinement-results.json`.

### Measured budget comparison

| Resource | Approved Phase 3D | Phase 4.2 | Added / target |
| --- | ---: | ---: | ---: |
| Aggregate JS, Node gzip | 394,086 B | 397,682 B | **3,596 B / 3.51 KiB**, target ≤8 KiB |
| CSS, Node gzip | 13,979 B | 16,022 B | **2,043 B / 2.00 KiB**, target ≤4 KiB |
| Gallery WebPs | None | 231,262 B | **225.84 KiB**, target ≤1 MiB |
| Dependencies / fonts / audio / video / canvases | Existing | Unchanged | **Zero added** |

The production build retains the inherited >500kB Three.js chunk warning. There are zero initial-hero requests for additional-project images. Images load near the section and through native card visibility; lazy loading does not establish a hard decoded-memory ceiling.

[Performance results](../qa/phase42/performance.json) contain three approved Phase 3D / Phase 4.2 pairs, sampled sequentially after regression browsers closed. Same Chrome 155, Apple M5/ANGLE Metal, 1440×1000 DPR1; identical hero and all three existing passages/studies, plus the new entrance and horizontal browsing. The preserved baseline is `/private/tmp/og-phase42-approved-phase3d-dist`.

| Sample | Approved Phase 3D | Phase 4.2 |
| --- | --- | --- |
| Hero / existing passages and studies p95 | 16.7–16.8ms | 16.7–16.8ms |
| New entrance p95 | Not present | 16.7ms in all three runs |
| Native horizontal browsing p95 | Not present | 16.7–16.8ms |
| Maximum interval | 16.8ms | 33.2–33.3ms in horizontal samples; entrance ≤16.8ms |
| Sampled main-thread long tasks | 0 | 0 |
| New entrance/horizontal LayoutCount and LayoutDuration | Not present | 0 / 0 |
| Offscreen hero video uploads / settled scene renders | 0 / 0 in project views | 0 / 0 in gallery views |
| Existing Three.js texture counter | 13 | 13 |

Each horizontal sample had a ~33ms maximum interval; the p95 and absence of long tasks indicate no sustained cadence regression in these local samples, not perfect delivery of every frame. CDP cumulative script/style durations were ~48–51ms / 88–94ms over each ~2.33s entrance sample and ~27–29ms / 55–63ms over each ~3.29s horizontal sample. These totals include browser/QA bookkeeping and do not directly quantify GPU composition or decode cost. The unchanged Three.js counter excludes CSS image/compositor layers.

### Genuine review evidence

- [Desktop ApexFit](../qa/phase42/desktop-apexfit.png), [Aroma](../qa/phase42/desktop-aroma.png), [AETHER](../qa/phase42/desktop-aether.png), [ApexForm](../qa/phase42/desktop-apexform.png).
- [Entrance start](../qa/phase42/entrance-0.png), [crossover](../qa/phase42/entrance-0.5.png), [frontal endpoint](../qa/phase42/entrance-1.png), [900px laptop window](../qa/phase42/desktop-900.png).
- [390px overview](../qa/phase42/390-overview.png), [390px complete card/controls](../qa/phase42/390-complete-card.png), [320px overview](../qa/phase42/320-overview.png), [320px complete card](../qa/phase42/320-complete-card.png).
- [Desktop reduced motion](../qa/phase42/desktop-reduced.png), [complete 320px reduced presentation](../qa/phase42/320-reduced-full.png), [DPR2 desktop](../qa/phase42/desktop-dpr2.png), [image-error surface](../qa/phase42/image-errors.png).
- [Entrance / arrows / drag / reverse recording](../qa/phase42/collection-entrance-and-interaction.mp4): **7.13 seconds**, 1280×800 silent H.264, **1,130,799 bytes**, encoded from 126 genuine Chrome CDP frames using capture timestamps. No screenshot UI or source MP4 was edited. Recording affects cadence and is not a performance benchmark.

These links reference ignored local QA evidence and require this workspace; they are not production delivery assets.

## Known limits and review boundary

Aroma's external touch demo still fails; its repository is deliberately unmodified and the gallery has no Aroma live link. ApexForm's external menu/form limits and AETHER/ApexFit concept/integration boundaries are not repaired by a portfolio card. Deployment/source parity is not implied for the AETHER live capture.

Touch input and viewport checks use Chrome emulation. Physical iOS/Android, hardware trackpad and native Safari acceptance must be reported separately from synthetic input. A fresh Safari WebDriver attempt again refused a session because **Allow remote automation** is disabled; [actual response](../qa/phase42/safari-results.json). Browser settings were preserved. Frame samples, CDP main-thread timing and pixel estimates do not directly measure GPU execution, resident compositor memory, decode CPU or device thermal/power use. Browsers may retain all decoded screenshots; four 1440×1000 images represent ~21.97 MiB RGBA, plus ~5.49 MiB for the reused source quotation, excluding copies/surfaces and existing projects.

The interactive portfolio, including this gallery, requires JavaScript; the inherited basic no-JavaScript document remains unchanged. Temporary servers started for final verification are stopped after checks. The pre-existing preview on 5173 is preserved. The approved changes are prepared for the authorized feature-branch commit and push.

Stop for the user's visual review. No Git checkpoint, commercial showreel or later portfolio section is included.


## Final correction verification — 24 October 2026

The user visually approved Phase 4.2 and authorized this feature-branch commit/push. The final correction removes AETHER, ApexForm and Ember & Oak live actions without changing captures, order, descriptions, animations or gallery styling.

Final website inventory:

- ApexFit: `https://sahilbhardwaj037037-sys.github.io/ApexFit/`, labeled **Live Website**; HTTP 200 and the expected ApexFit title verified.
- SIX&7: `https://sixseven-practice.myshopify.com/`, labeled **Password-protected storefront**; HTTP 200 after redirect to `/password`, with a password form. No password was supplied or bypassed; public storefront access is not claimed.
- Smile Care: no verified public website URL in the project metadata or README; no website action.
- Aroma / Noctis, AETHER, ApexForm, Ember & Oak and ClientScout AI: repository links retained, no website actions. All eight project repository URLs returned HTTP 200.

Final production build and smoke pass. All **159** checks pass: core 19, video 10, SIX&7 19, Ember 22, ClientScout 27, Smile reduced-layout 12, gallery 24, gallery accessibility 11, audio/environment 15. The audio/environment suite uses Vite for its source helper imports; the other eight suites and smoke run against the production preview on 5174. All reports contain zero errors/failures. The earlier 19-check laptop refinement run is historical evidence and is not counted in this final rerun.

All 40 runtime asset size/SHA-256 checks pass; all 40 production copies match source bytes; all prior manifest records remain intact. The four screenshot masters and four derivatives match provenance SHA-256. Original hero, scene, audio, project transitions and existing styles retain their source bytes. All four featured projects and all four additional cards remain intact. Smile Care's three normal-motion reference captures remain pixel-identical.

Final card inspections at 1440px, 390px and 320px confirm expected link counts, visible nonempty actions, repository-only Ember closing and no document overflow. Desktop AETHER and mobile ApexForm screenshots were also visually inspected. Generated evidence remains ignored under `qa/phase42/`.

Final smoke: Chrome 155, scene ready 845.5ms, LCP 132ms, CLS 0.0000634, zero errors. These are local observations. The inherited Three.js chunk-size warning remains. No pull request, main merge, deployment or Phase 5 work is included.
