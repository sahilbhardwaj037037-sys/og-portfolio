# Reduced-motion layout review

The empty left area was an incomplete desktop reflow. Disabling the animated story correctly hid its sticky screenshots, but retained the two-column grid, right-column chapter assignment, and `78svh` chapter minimum height. The evidence/gallery below had its own full-width layout, which explains the visible inconsistency.

## Local correction

Only the static desktop story now uses full-width rows: chapter copy on the left, its genuine screenshot on the right, with natural heights and quiet separators. The portrait capture remains proportionate and capped at 300px. Text, captions, safeguard information, project content, and evidence/gallery remain intact. No animation or new showcase was introduced.

The rules are restricted to `.case-story:not(.has-depth)` at the existing desktop depth breakpoint (at least 1000×700). The normal `.has-depth` presentation, GSAP timelines, hero, sound, video, GLB, UV mapping, logo concealment, and reversible handoff are untouched. Mobile/tablet/short-window styles retain their existing stacked composition.

At 1440×1000, each static chapter previously occupied only 387.5px of a 1226.9px story area, starting at x=945.9px. It now spans the full 1226.9px from x=106.5px. The desktop screenshot grows from 387.5px to 713.1px without stretching. The complete story height drops from 2546.7px to 1594.4px by removing scroll-choreography spacing.

## Genuine browser evidence

Captured directly with Chrome/Playwright, at device scale 1, without retouching. Before/after viewport captures use the same chapter anchor and viewport size.

| View | Before | After |
| --- | --- | --- |
| Desktop 1440×1000 | [Before](../qa/reduced-motion-review/before-1440x1000.png) | [After](../qa/reduced-motion-review/after-1440x1000.png) |
| Desktop breakpoint 1000×700 | [Before](../qa/reduced-motion-review/before-1000x700.png) | [After](../qa/reduced-motion-review/after-1000x700.png) |
| Mobile 390×844 | [Before](../qa/reduced-motion-review/before-390x844.png) | [After](../qa/reduced-motion-review/after-390x844.png) |
| Mobile 320×844 | [Before](../qa/reduced-motion-review/before-320x844.png) | [After](../qa/reduced-motion-review/after-320x844.png) |

[Complete corrected static story](../qa/reduced-motion-review/after-desktop-complete-story.png) · [Responsive chapter](../qa/reduced-motion-review/after-desktop-responsive.png) · [Build chapter and evidence](../qa/reduced-motion-review/after-desktop-build.png) · [Manual motion toggle](../qa/reduced-motion-review/after-manual-reduced.png)

The three normal-motion desktop chapter screenshots are byte-for-byte identical before and after. Reduced-motion captures at 390×844, 320×844, 768×1024, and 1440×650 are also byte-for-byte identical, confirming the existing stacked layouts were preserved.

## Verification

Focused checks: 12 passed in Chrome 155. Covers six viewports, no horizontal overflow or overlapping chapter copy, full-width static rows, hidden decorative/sticky presentation, static headings, normal-motion screenshot comparison, manual toggle, resize while reduced, live system preference changes, motion restoration, reverse navigation, and absence of JavaScript errors.

Run `node qa/reduced-layout-check.mjs` from `prototype` with the dev preview running. It compares normal-motion captures when the local pre-change evidence exists; fresh checkouts still run the layout and interaction assertions. `--before` records a baseline and is intended for use before making a layout change. Generated evidence remains ignored by Git.

The TypeScript/Vite production build passes. The existing large Three.js chunk warning remains. All 63 existing regression checks pass: main browser suite 19, audio/environment 15, video 10, and Phase 2.1 refinement 19. The refinement suite includes ten responsive viewports, protected checkpoint camera geometry, manual gallery independence, reverse poses, and reduced-motion evidence. Each suite reports zero browser errors. Its local report is `/private/tmp/og-reduced-review-refinement/refinement-results.json`.

The main suite's normal-motion wheel sample measured 16.7ms median / 16.8ms p95 across 99 frame intervals. Handoff edge error was 0.0077 CSS pixels, with reverse-pose differences at most 0.00012px. These are local samples, not a guarantee across devices. The correction adds no JavaScript, event handlers, frame updates, texture uploads, or media. It only changes static desktop layout rules; no new rendering workload runs on scroll. The three original runtime media checksums still match the Phase 2.2 inspection.

The video suite also completed six performance runs (three static controls and three normal-video runs). Normal-video idle and scroll p95 frame intervals were 16.7–16.8ms, with 60 video texture uploads per approximately two-second idle sample and no sampled long tasks. This is consistent with the approved Phase 2.2 measurements; it is not a new paired benchmark of the CSS change.

The existing production smoke check also passes on the final build, with no browser errors or horizontal overflow. Temporary validation servers were stopped; the user's existing dev preview remains running.

Reports: [focused checks](../qa/reduced-motion-review/after-report.json), [before measurements](../qa/reduced-motion-review/before-report.json), [main regressions](../qa/browser-results.json), [audio/environment regressions](../qa/phase22/results.json), [video regressions and measurements](../qa/video/results.json).

Native Safari and physical-device testing are not verified; mobile checks use browser emulation. Safari automation remains unavailable because its Allow Remote Automation setting is disabled; no browser preferences were changed.

## Scope and review

This follow-up changes only `src/refinement.css`, adds `qa/reduced-layout-check.mjs`, and adds this report. Earlier approved Phase 2.2 working-tree changes remain in place. Original runtime assets retain their previously recorded SHA-256 values.

Preview: <http://127.0.0.1:5173/>. Startup: `cd prototype && npm run dev` (reuse the existing preview if it is already running). Enable Reduce Motion using the system preference or the hero's motion button, then scroll to Smile Care.

The user visually approved this correction together with the complete Phase 2.2 implementation and authorized the feature-branch checkpoint. No merge, deployment, or Phase 3 work is included. Generated evidence remains local and ignored; screenshot links require the original workspace or a fresh QA run.
