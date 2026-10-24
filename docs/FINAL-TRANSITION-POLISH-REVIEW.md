# Final transition polish — local visual review

Preview: **http://127.0.0.1:5183/**. Jump to [gallery](http://127.0.0.1:5183/#additional-projects) or [screening room](http://127.0.0.1:5183/#showreel), then scroll both directions through each handoff. For Ember → ClientScout, scroll up through ClientScout to its opening passage.

Work remains local on `feature/phase-3-cinematic-projects`. No staging, commit, push, merge, pull request or deployment. The approved Phase 5.2 implementation is preserved alongside this polish.

## Diagnosis and correction

The two reference screenshots were described in the request but no image attachments were available to inspect. The before captures below are genuine reproductions in the application, captured before editing at 1440×1000. They reproduce the described ClientScout overlay on “Further work. Different worlds.” and Aroma overlay on “The work, in motion.” They are not copies of the missing references.

Both outgoing planes were visible at normalized timeline progress **0**, even when their ScrollTrigger was inactive before entrance. Their absolutely positioned decorative layers live inside the sticky stages, putting decoration above the actual cards/player. That allowed a normal-looking ready composition, including direct fragment entry, to remain covered. The gallery plane also had no opacity exit fade. At the true progress-1 endpoints both original timelines already hid their outgoing planes; the reproduced failure was their resting entry state and insufficient ownership of the active passage, rather than an incorrect final z-index.

The smallest correction changes the lifecycle in the two entrance hooks:

- Planes have zero opacity and hidden visibility outside an active handoff. ScrollTrigger activity gates the decoration independently of the lagging scrubbed pose, including refresh and rapid forward/reverse exits.
- Inside the handoff, existing depth, position, scale and rotation paths are preserved. Smoothstep opacity fades start from zero; the ClientScout plane also fades out before progress .84. The existing Aroma exit fade finishes at .64. Visibility follows the resulting opacity.
- Both ready and fully settled states are clear. Reverse scroll reconstructs the same midpoint and fades back to zero at the previous boundary. Early player focus/play retains the existing stabilization behavior.
- No z-index, perspective, sticky positioning, gallery/card structure, screenshots, copy, links, audio, playback or section order changes were required. Gallery/showreel scroll boundaries remain 58vh/40vh.

Ember → ClientScout keeps its existing normalized GSAP timeline and all poses. Its desktop sticky shell increases from **220svh to 232svh**, giving **132vh rather than 120vh** of transition travel: a modest 10% longer span, with no new hold or animation. Static/touch/reduced-motion layouts are unchanged.

Only these three source files differ from the immediately preceding Phase 5.2 implementation: `src/useGalleryEntrance.ts`, `src/useShowreelEntrance.ts`, `src/clientscout.css`. The other **35 source files are byte-identical**. [Source preservation audit](../qa/final-polish/preservation-results.json).

## Genuine before/after evidence

All images are unedited browser screenshots from the actual application. Both pairs use the same viewport, section-relative scroll position and Aroma selection. The pictured miniature Aroma website within the film's authentic poster is part of the approved film image; the separate outgoing gallery plane is what is removed.

| Composition at resting entry | Before correction | After correction | Fully settled after correction |
| --- | --- | --- | --- |
| Additional gallery | [ClientScout covering cards](../qa/final-polish/before/gallery-0.png) | [Real gallery unobstructed](../qa/final-polish/after/gallery-0.png) | [Gallery endpoint](../qa/final-polish/after/gallery-1.png) |
| Screening room | [Aroma covering player](../qa/final-polish/before/showreel-0.png) | [Poster/player unobstructed](../qa/final-polish/after/showreel-0.png) | [Screening endpoint](../qa/final-polish/after/showreel-1.png) |

| Transition | Before entrance | Forward midpoint | Settled destination | Reverse midpoint | Restored previous |
| --- | --- | --- | --- | --- | --- |
| ClientScout → gallery | [Image](../qa/final-polish/after/gallery-before.png) | [Image](../qa/final-polish/after/gallery-0.5.png) | [Image](../qa/final-polish/after/gallery-1.png) | [Image](../qa/final-polish/after/gallery-reverse-midpoint.png) | [Image](../qa/final-polish/after/gallery-restored-previous.png) |
| Gallery → screening room | [Image](../qa/final-polish/after/showreel-before.png) | [Image](../qa/final-polish/after/showreel-0.5.png) | [Image](../qa/final-polish/after/showreel-1.png) | [Image](../qa/final-polish/after/showreel-reverse-midpoint.png) | [Image](../qa/final-polish/after/showreel-restored-previous.png) |
| Ember → ClientScout | [Image](../qa/final-polish/after/ember-clientscout-before.png) | [Image](../qa/final-polish/after/ember-clientscout-midpoint.png) | [Image](../qa/final-polish/after/ember-clientscout-settled.png) | [Image](../qa/final-polish/after/ember-clientscout-reverse-midpoint.png) | [Image](../qa/final-polish/after/ember-clientscout-restored-previous.png) |

## Verification

- Production TypeScript/Vite build passes. The existing large Three.js chunk advisory remains.
- **16 targeted transition checks pass**: five-state traversal, clear resting entries, deterministic reverse matrices/opacity, continuous fade samples, repeated fast forward/reverse exits while scrub catches up, no premature reverse reappearance, three desktop sizes, direct fragments/reload, mobile and reduced motion. [Results](../qa/final-polish/after/results.json); reproducible script: `node qa/final-transition-check.mjs` against production preview 5174.
- Actual GSAP ScrollTrigger refresh tested at start, active midpoint and endpoint for both handoffs: **all six states pass**, retaining visible cinematic midpoints and clear endpoints. [Runtime boundaries and states](../qa/final-polish/refresh-results.json).
- All **42 runtime asset sizes and SHA-256 checksums pass**. No image, audio, model or video asset changed for this polish.
- **All 193 existing regression checks pass**: core hero/navigation 19, laptop video 10, SIX&7 19, Ember 22, ClientScout 27, Smile/reduced layout 12, gallery 24, gallery accessibility 11, audio/environment 15, showreel 27, film lifecycle 7. Together with the 16 new transition checks, **209 checks pass**. All four featured projects, four gallery cards, approved links, interactions, audio ownership and native playback remain intact. [Run log index](../qa/final-polish/regression-results.json).
- **Production smoke passes with zero browser errors**. Scene ready 870.3ms, local LCP 144ms, CLS 0.0000634 in this single local sample; these are not field-performance measurements. [Smoke results](../qa/production-results.json).
- HEAD remains `b8a28928275e8cedecbf0f9dc82ad8da9d2ce9a8`; no staged files. `git diff --check` passes. The working tree intentionally retains the approved, uncommitted Phase 5.2 changes plus this correction.

Verification uses local Chrome 155, including touch emulation. It does not establish real-device Safari/iOS behavior; the prior Phase 5.2 review records that browser limitation. Awaiting final visual approval; no later implementation is included.
