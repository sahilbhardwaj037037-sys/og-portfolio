Historical Phase 3D.1 discovery record. The user subsequently approved the eleven core captures, labeled dashboard excerpt and architecture for local Phase 3D.2 implementation. Original findings and approval-gate language below describe that planning snapshot. See [the implementation review](PHASE-3D-REVIEW.md).

# Phase 3D.1 — ClientScout AI discovery and cinematic implementation proposal

23 October 2026. Discovery/planning only. No portfolio application code or ClientScout source has been modified. No ClientScout service, database, migration, provider, browser session or capture environment was started. No `.env`, private profile, customer database or credentials were opened. The plan, inventories and inspection contact sheets live outside the prototype repository in `discovery/phase-3d/`.

## 1. Approved portfolio checkpoint and architecture

- Root: `/Users/sahilbhardwaj/Documents/Og_portfolio/prototype`.
- Branch: `feature/phase-3-cinematic-projects`.
- Clean local HEAD and verified origin feature branch: `5a6646f246705a94471fc3bbdf4484e29ae66491`.
- Local/origin `main`: `4b0992cc3c8b0d74a6337d8cb7d6e4b9fff6822d`; unchanged.
- Fresh TypeScript/Vite production build passes, with the existing large Three.js chunk warning. Output names match the approved checkpoint: `index-BWfyHkZp.js`, `scene-DGrqOebT.js`, `index-D26ynKbI.css`. Aggregate Node-gzip baseline: JS **389,181 bytes**, CSS **11,679 bytes**.
- All **25** existing runtime assets match their checksums. The original GLB, screen MP4 and ambient WAV are preserved.

Reviewed the Phase 3A discovery, Phase 3B/3C records, SmileCareStory, SIX&7 and Ember chapters, project metadata, main mounting/deep-link/footer ownership, both CSS perspective passages and scoped GSAP hooks. The hero retains its single demand-rendered WebGL canvas and independent audio/video lifecycle. Smile Care retains its own scroll story. Smile→SIX sends a plane left; SIX→Ember separates commerce layers through a lateral depth passage. Ember ends at `ember-closing` with `next: null`. The fourth chapter should append after that complete closing and before the unchanged footer.

Existing passage architecture is a CSS sticky shell, perspective camera element, preserve-3d world and leaf screenshot planes. ScrollTrigger owns explicit normalized poses with approximately 0.2s scrub; CSS owns the shell. The latest hook also explicitly clears scene transforms/layer hints after context cleanup, fixing live reduced-motion residue. Reuse this ownership/readiness/cleanup pattern without refactoring the approved timelines.

The prior checkpoint passed 116 regressions and production smoke. Those are historical accepted results; only the production build and integrity checks were rerun for this planning-only task. No new motion has been implemented or benchmarked.

## 2. Actual ClientScout repository and state

Repository: https://github.com/sahilbhardwaj037037-sys/clientscout-ai

Existing local working copy: `/Users/sahilbhardwaj/Documents/clientscout-ai`.

Verified local and remote `feature/checkpoint-5`: **`8ceb24402d5518fc532fc5b32d848edbc9040538`**. This is a documentation/screenshot update on top of the committed 5.1 foundation `5e68093be14505b46dd8c871918650b6fc131335`. Default `main` remains **`ba50d79bcd5713d83368648fa01a47d4b4d20a73`**, the earlier Checkpoint 4 implementation. A generic repository link opens that older default; provide a clearly labeled current-development-source link as well.

The local copy contains **15 tracked modifications and 14 untracked files**, relating to pending 5.2A/5.2B supervised discovery and its tests/docs. Its exact status and changed-file hashes are saved in `source-readonly-baseline.json`; no changes were staged or touched. Individual source evidence references and committed/working hashes are in `source-evidence.json`.

| Status | Verified scope | Presentation boundary |
| --- | --- | --- |
| Implemented and committed | Lead CRUD/search/filter/pagination, editable statuses/notes, URL normalization/deduplication and bounded CSV imports; dashboard totals; explicit audit/discovery workflows; evidence/identity assessments; local templates, optional Gemini requests and human-reviewed draft preparation; themes/navigation; 5.1 durable offline research foundation | Describe as source-implemented local application features, not demonstrated live-provider or production acceptance |
| Implemented locally, uncommitted | Research discovery prepare/approve/dispatch/revoke/cancel/result paths; separate approval UI, source-evidence classification, save receipts and migration 0008 | Label pending local 5.2 development; not published by the source link and not an accepted live service |
| Experimental / acceptance outstanding | External provider availability and supervised execution, current end-to-end Gemini output, real active-process interruption/recovery timing | No claim of successful provider runs, AI factual correctness or autonomous execution from mocked tests or screenshots |
| Deferred / not operational | Scheduled autonomous research, notifications, automatic outreach, cloud sync and production multi-user service; broader E2E/security/accessibility/performance acceptance and CSV export remain unclaimed | Omit delivered-feature claims, release dates, completion percentages and business outcomes |

The committed API declares version **0.5.1**, expects Alembic revision **0007_research_foundation**, and connects only offline research checks. Local source declares **0.5.2**, expects **0008_research_discovery**, and registers the additional supervised-discovery routes. The actual user database was not opened; schema state is therefore not independently asserted. Do not migrate a user's checkout to make a screenshot match.

Verified stack from package/source/migrations: React 19, TypeScript, Vite, React Router, application CSS/Tailwind integration and Lucide; FastAPI/Pydantic, SQLAlchemy, explicit Alembic migrations and SQLite. Managers coordinate bounded tasks and persistence. Backend-only optional adapters include Overpass, Wikidata, PageSpeed and Gemini. Availability of an adapter is distinct from successful live acceptance. No portfolio runtime connection to these services is proposed.

Specific source checks include `backend/app/api/leads.py` and `models/lead.py`; `services/imports.py` (UTF-8, 1 MiB, 500-row limit); `api/audits.py` and `auditing/runner.py`; `api/discovery.py` and `discovery/manager.py`; `intelligence/scoring.py`, `drafts.py`, `human_writer.py`; and `research/manager.py` plus corresponding frontend pages/components. The scoring source leaves missing observations unknown, requires qualifying identity/evidence for qualified scores, and does not claim sales predictions. A user-set Won/Contacted status is not a business outcome or automatic communication.

Source project test counts in its README describe a previous isolated audit including uncommitted 5.2 tests. They were not rerun here and must not be presented as the coverage of a clean published 5.1 checkout.

## 3. Screenshot provenance, freshness and safety

Found **21 committed screenshots**: thirteen newer portfolio JPEGs and eight older checkpoint PNGs. Every file was decoded for actual dimensions, SHA-256 hashed and compared byte-for-byte with its blob at `8ceb244`. The inventory records original absolute path, repository-relative path, pinned URL, file size, SHA-256, Git blob, last path commit, represented state, feature, source-UI match, privacy review and animation suitability.

**Important distinction:** the thirteen JPEGs were committed in `8ceb244`, but the README documents them as genuine renders of the **local working tree including pending 5.2**, dated **20 October 2026**. They are not clean-checkout 5.1 screenshots. Their visible labels and controls match inspected current code, including the local Research heading and 0.5.2 Settings version. The exact full capture-time working-tree hash was not supplied, and current runtime behavior was not independently relaunched. Use visible, dated **Development snapshot · synthetic demonstration records** captions rather than “latest production UI.”

The source README documents a separate temporary SQLite database with eight fictional Demo businesses on reserved `.example` domains, disabled providers, blocked outbound requests and no copied real lead/profile/contact data. All thirteen JPEGs were inspected individually at native-source resolution (viewer may downscale tall images), plus contact sheets. Visible names/domains are synthetic; contact fields are empty, sources are disabled, audit history is empty, and evidence/priority remain unknown. No credentials, private notes, real customer records or personal contacts were observed. Settings shows a temporary loopback API address, not a public deployment or credential. Automated OCR was unavailable; this is a documented visual/provenance review, not a guarantee or privacy certification.

Eight historical PNGs are inventoried but excluded: they represent earlier UI, some contain older/unavailable affordances, and their data/capture setup was not freshly cleared. Do not substitute their tall audit reports as current successful evidence.

### All thirteen newer captures

All filenames below are in the source repository's `docs/screenshots/`. Full checksums and individual assessments are in `asset-inventory.json`.

| File | Dimensions | Bytes | Proposed role |
| --- | --- | ---: | --- |
| portfolio-assessment-desktop.jpg | 1440 × 2257 | 243,690 | Core: unknown-state assessment, full static view |
| portfolio-audit-desktop.jpg | 1440 × 1127 | 100,285 | Core: permission/input + empty history, not completed audit results |
| portfolio-dashboard-desktop-dark.jpg | 1440 × 1758 | 183,995 | Core: genuine theme comparison/gallery |
| portfolio-dashboard-desktop-light.jpg | 1440 × 1758 | 181,137 | Core: introduction/workspace; labeled viewport excerpt for passage, full original in gallery |
| portfolio-dashboard-mobile.jpg | 390 × 844 | 42,320 | Core: mobile opening |
| portfolio-dashboard-tablet.jpg | 768 × 1024 | 88,753 | Core: tablet presentation |
| portfolio-discovery-desktop.jpg | 1128 × 529 | 71,671 | Core: original component capture, disabled source and attribution |
| portfolio-import-desktop.jpg | 1128 × 367 | 37,319 | Core: original component capture, import constraints |
| portfolio-lead-detail-desktop.jpg | 1440 × 1000 | 91,347 | Core: bounded detail view and supporting depth plane |
| portfolio-leads-desktop.jpg | 1440 × 1667 | 149,004 | Core: CRM/search/filter evidence, normal-flow full view |
| portfolio-navigation-mobile.jpg | 390 × 844 | 23,723 | Core: mobile navigation |
| portfolio-research-desktop.jpg | 1440 × 1412 | 147,357 | Reserve: local 5.2 copy; omit from core story |
| portfolio-settings-desktop.jpg | 1440 × 1124 | 123,762 | Reserve: mixed 5.1/0.5.2 labels and temporary endpoint; omit from core story |

Thirteen JPEGs total **1,484,363 bytes**. Recommended core set: **eleven unchanged originals, 1,213,244 bytes / 1.16 MiB**. Keep Research and Settings as documented reserves, not runtime assets in the initial proposal. The discovery/import files are genuine original component crops, not full-window captures; label them accordingly. Do not draw fake browser chrome around them or imply results they do not show.

### Missing evidence and when to ask for captures

**No mandatory new screenshots are needed for the proposed core scope.** Existing evidence supports a credible development-stage application showcase. Do not launch the app merely to reproduce it.

There is no current portfolio capture of Proposal Studio with a reviewed draft, no completed audit/evidence-results capture in the newer set, and no selected 5.2 research approval/result sequence. These are not silently filled using mockups or historical captures. Keep draft capabilities a qualified source-backed implementation note rather than a visually demonstrated chapter; limit the audit narrative to controls, permission and unknown states.

If the user wants any of those extended demonstrations, stop that extension and request only the relevant sanitized actual screens: (1) Proposal Studio with a fictional/manual-review draft and no private profile/recipient; (2) a real permitted demonstration-site audit with its actual caveats; or (3) the exact local 5.2 preparation/approval/results state labeled uncommitted. Do not ask for live provider calls, credentials or private database exports. Additional mobile workflow screens are optional; existing 390px opening/navigation and 768px dashboard do not establish complete mobile acceptance of every source-app page.

Fresh capture would require the matching frontend/backend checkout, an independently created temporary database with the correct migrations, providers disabled, synthetic records and nonconflicting loopback ports (the portfolio already occupies 5173). The original `.env`, database, profile and migration state must remain untouched. Before launching or seeding anything, request the user's assistance/approval for the exact capture setup. No authentication bypass, provider activation or source-app modification is authorized here.

## 4. Creative direction and distinct transition

Use the already registered ClientScout palette: creamy background `#efe9de`, surface `#e2d9cc`, coffee ink `#302b28`, secondary `#5f5852`, slate accent `#526468`, border `#cfc4b5`. Retain existing Inter/Space Grotesk fonts, with a precise modern type hierarchy rather than Ember's serif atmosphere. Restrained registration lines and a low-contrast static technical grid belong only around the presentation frame, never over the genuine UI or throughout the site.

Working editorial idea: **“From a lead, to a considered next step.”** This explains intent, not customer outcomes. Make **IN DEVELOPMENT / LOCAL SINGLE-USER APPLICATION** visible near the title. Captions disclose synthetic data and disabled providers. Do not animate record totals, scores or status changes. No generated AI imagery, faux activity, floating badge swarm, simulated typing or added audio.

### Storyboard — hinge, align, resolve

Preserve the complete Ember closing. Append a new exit stage beginning with the same genuine restaurant-gallery image; do not take ownership of the existing closing figure or alter its approved transforms. The new movement is primarily a shallow hinge/vertical alignment, rather than Smile's leftward departure or SIX→Ember's lateral pass-through.

| Progress | Composition | Spatial behavior |
| --- | --- | --- |
| 0–22% | One photographic plane closes the warm environment; a faint cream registration frame becomes visible behind it | Gallery retreats roughly 100–200px in Z with an upper-edge X hinge and slight Y rotation; framing stays aligned rather than panning sideways |
| 22–55% | Restaurant image tilts toward the upper/side edge, opening a structured viewing aperture | Gallery recedes toward roughly −360px; cream/coffee/slate replaces espresso on background siblings. Dashboard rises from slightly below at Z around −500px with a modest X tilt |
| 55–80% | Authentic workspace becomes dominant; a genuine lead-detail plane briefly establishes hierarchy behind it | Two planes normally, three only in this crossover; supporting detail remains farther back and is then occluded by the frontal dashboard, rather than drifting as a random card |
| 80–100% | Dashboard resolves to a sharp, level product frame; heading and scope label follow in normal reading order | Incoming X/Y rotation and Z resolve to zero. Same stage releases naturally into document flow; no duplicate-image endpoint swap |

Proposed tuning: perspective 1600–1800px, approximately 120svh scroll travel, 0.2s scrub, rotations mostly within 12–14°. These are prototype targets, not implemented poses. Explicit progress functions produce identical reverse states. Reversed scrubbing must re-expose the supporting plane through geometry, without opacity snaps or image substitution.

The dashboard source is 1440×1758. A decorative passage frame may show a clearly labeled **upper-viewport excerpt**, with natural image scale/aspect and no retouching; the full untouched capture must be available in normal flow/gallery. Do not squeeze the full tall dashboard into a landscape aspect ratio. This excerpt/framing choice is part of the requested implementation approval. If declined, use the bounded full lead-detail capture as the passage face and introduce the full dashboard immediately afterward, without fabricating a new capture.

## 5. Complete proposed chapter sequence

1. **Introduction / The workspace.** Dashboard-led reveal, ClientScout AI title, explicit active-development/local-use label and snapshot caption. Explain the workspace's purpose without inventing measured benefits.
2. **The problem / A deliberate workflow.** Concise editorial explanation of collecting supplied records, reviewing permitted evidence and deciding a next step. A small code-native workflow diagram is explanatory portfolio content, never a screenshot substitute or proof of autonomous execution.
3. **Leads and CRM.** Genuine saved-lead list and bounded detail view; verified search/filter/status/notes/persistence behavior. Preserve the fictional labels and explain that Won/Contacted are editable demo states.
4. **Import and discovery.** Original CSV and disabled-discovery component captures. Distinguish supplied-record import from explicitly started source search; retain OSM attribution and disabled/provider-state text. No fabricated search results or automatic harvesting animation.
5. **Evidence before assessment.** Actual audit permission/empty-history interface paired with real unknown-state assessment. Explain source observations versus absent evidence. No illustrated successful audits, invented metrics, contacts or AI output. Tall assessment stays static/full-height in ordinary flow or gallery.
6. **Behind the build and current status.** React/TypeScript/Vite → FastAPI/Pydantic → SQLAlchemy/SQLite, explicit Alembic migrations, separately controlled provider adapters. Clearly separate committed 5.1, pending local 5.2 and deferred autonomous capabilities. Mention source-backed reviewed-draft functionality without presenting an unverified visual demo or publicly operational AI pipeline.
7. **Across screens / closer look.** Polished tablet/mobile/navigation studies; an independent eleven-image accessible gallery, including genuine light/dark states. Screenshot evidence is not a claim that every source workflow has passed mobile QA. Provide full originals at readable natural ratios.
8. **Closing / the fourth featured project.** Stable workspace-led ending, GitHub repository/current-development-source links and explicit no-verified-public-demo text. Expose a dormant `clientscout-closing` / `next: null` boundary for the later film. Mount no reel player, poster, preload, empty reel spacer or Phase 4 content.

## 6. Component and animation architecture

Create a self-contained fourth project sibling after `EmberOakStory`; move the unchanged portfolio footer after it. Reuse current section-scoped theme tokens. Existing hero/SIX/Ember/Smile controllers and source files do not need modification.

The new scene owns its own `gsap.context`/`matchMedia` scope, stable sticky shell, perspective frame, preserve-3d world and at most three screenshot planes. Shared-world opacity/filter/paint-containment must not flatten the scene; blend background siblings and use leaf/image visibility only when occluded or safely outside view. No new canvas, scroll library, wheel interception, snapping, provider request or continuous render loop. No React state updates per cursor/scroll frame.

Use explicit image dimensions and reserved aspect ratios. Near-view IntersectionObserver preparation must account for transformed/offscreen planes and wait for decoded readiness, while showing a labeled loading/error surface without changing stage height. Promote only active/visible scene layers and remove all owned transforms/promotions after context teardown, including live preference changes. Refresh geometry after fonts, viewport changes and disclosures, outside a scroll update. Reuse the same DOM arrival frame into normal flow to eliminate endpoint swaps.

Decorative duplicates are hidden from assistive technology and contain no controls. Meaningful canonical figures carry descriptive alt/captions; the evidence selector keeps local state separate from the three existing galleries. Any viewport excerpt is clearly captioned, with the full original independently accessible.

## 7. Exact proposed files after approval

| File | Proposed change |
| --- | --- |
| `src/ClientScoutStory.tsx` | Fourth semantic project chapter, current-status boundaries, independent gallery and verified source links |
| `src/ClientScoutCapture.tsx` | Sized genuine image/loading/error presentation and explicit excerpt/full-view labeling |
| `src/ClientScoutTransition.tsx` | New hinge/alignment perspective stage; no change to existing transitions |
| `src/useClientScoutMotion.ts` | Reversible poses, eligibility, scoped cleanup, restrained short-image studies and diagnostics |
| `src/clientscout.css` | Cream/coffee/slate project-local styling, precise framing and complete static/responsive layouts |
| `src/featuredProjects.ts` | Append source/capture/state metadata and dormant final exit; preserve existing project records |
| `src/main.tsx` | Mount fourth sibling, add supported `#clientscout-ai`/chapter deep links, retain existing footer after it |
| `public/media/clientscout/` | Eleven selected unchanged originals only, copied after approval |
| `licenses/clientscout-captures.txt` | Snapshot origin, synthetic-data setup, local-versus-committed state, attribution and no invented license grant |
| `docs/asset-integrity.json` | Append eleven new checksums; retain all existing hashes |
| `docs/PHASE-3D-REVIEW.md`, `README.md` | Accurate implemented/local-review scope and actual measurements/limitations |
| `qa/phase3d-check.mjs`, `qa/phase3d-performance.mjs`, `qa/phase3d-record.mjs` | Focused tests, paired production comparison against Phase 3C and genuine browser recording |
| `qa/phase22-check.mjs` | Update exact mounted-project expectation from three to four; retain audio/environment assertions |
| `qa/phase3-check.mjs`, `qa/phase3c-check.mjs` | Replace obsolete no-ClientScout assertion with approved final-project/reel-boundary assertions; preserve earlier motion/geometry tests |
| `package.json` | Add QA commands only; no dependency or lockfile changes |
| `docs/PHASE-3D-DISCOVERY-PLAN.md`, `docs/phase3d-asset-inventory.json` | Copy approved discovery findings/selected provenance into checkpoint documentation during implementation |

No changes proposed to `scene.tsx`, `screenVideo.ts`, original GLB/MP4/WAV, hero audio/environment, `SmileCareStory.tsx`, `refinement.css`, `SixSevenStory.tsx`, `EmberOakStory.tsx`, either existing transition/hook/styles, or `projectThemes.ts`. No ClientScout source, database or dependency file may be changed for portfolio integration.

## 8. Responsive and accessibility strategy

Cinematic eligibility follows existing desktop rules: at least 1000×700, fine pointer/hover, normal system/manual motion, supported CSS perspective/overflow handling. Touch/coarse pointer, tablet, smaller/short windows and either reduced-motion control use complete static, natural-height compositions with no perspective transforms or cinematic spacer.

Desktop static rows balance copy and actual images. Mobile stacks title, copy, full figure and caption; do not keep empty evidence columns or require horizontal panning to read portfolio copy. Native screenshot detail may need an accessible full-image view; keep a full-size source/image link rather than shrinking dense UI beyond usefulness. All captions/controls must wrap at 320px. Preserve logical H2/H3 structure, alt text, visible focus, ≥44px targets and keyboard-operable selector/disclosures. Project deep links land at canonical readable headings. Test live motion changes while mid-stage and during resize, clear residue, and preserve reading position as closely as the existing document structure permits.

Use AA text contrast on stable cream/coffee surfaces and opaque label backing during palette blends. Grid/registration strokes are decorative and low contrast; do not place them behind small app text. Disable any screenshot pan, tilt or smooth navigation under reduced motion. Advanced mobile cinematic work remains deferred.

## 9. Measurable performance targets

| Resource/behavior | Phase 3D target relative to approved Phase 3C |
| --- | --- |
| New dependencies / canvas / fonts / audio / video | Zero |
| Additional aggregate JS / CSS | ≤12 KiB / ≤6 KiB gzip, measured with the same Node zlib settings |
| Selected image transfer | 1,213,244 bytes original JPEGs; no initial-hero ClientScout requests; lazy/near-view loading |
| Animated screenshot planes | Normally two visible, maximum three briefly during the crossing |
| Active passage source decode estimate | About 20.22 MiB RGBA for Ember gallery + dashboard + lead detail; excludes compositor copies/DPR/other chapters |
| Active animation image allowance | Aim below 40 MiB source RGBA; never promote the historical 4194/4981px audits or tall assessment as moving layers |
| Scroll cadence | Target p95 ≤20ms on the same local 60Hz setup; investigate sustained >10% regression and repeated >50ms long tasks |
| Geometry and stability | Endpoint/release error ≤1 CSS px, no transition-caused layout shift, no page overflow or decode-driven stage resize |
| Settled/offscreen work | No permanent new RAF; zero hero video uploads/3D frames while settled in the last chapter; hero music remains hero-only |

The eleven selected originals sum to about **61.92 MiB decoded RGBA** if all retained concurrently, not 1.16 MiB of graphics memory. Keep only the active gallery image mounted, lazy-load below-fold figures, use bounded visible planes and allow the browser to release unused decodes. Do not claim a hard GPU residency cap from file size or Three.js counters. Prefer unchanged originals initially; any later WebP/AVIF derivative proposal must preserve source content and originals, and report transfer savings separately from unchanged pixel decode cost.

The approved Phase 3C paired samples recorded 16.7–16.8ms p95 and zero sampled long tasks at 1440×1000/DPR1. Those are historical observations, not Phase 3D predictions. After implementation run three paired baseline/new production samples sequentially without concurrent QA; compare identical hero/old-passage inputs, then measure the new passage and readable UI studies separately. Report frame distributions, long tasks, image requests/transfers, decode estimates, texture/frame counters, bundle deltas and any directly available CPU/GPU profiling limits. Physical-device/high-DPR behavior may differ.

## 10. Regression and genuine visual QA

After implementation: production build, production smoke, existing core browser/audio/video/reduced-layout/SIX&7/Ember/refinement suites, plus focused fourth-project tests. Existing expectations change only for the intentionally approved project count/final boundary, not to weaken protected assertions.

New coverage: actual 3D matrices/foreshortening, entry/mid/exit bounds, distinct hinge/depth paths, ≤3 visible screenshot planes, forward/reverse and midpoint reversal, fast skips, natural sticky release without image swap, image decode/error states, no overflow, gallery independence, exact captions and synthetic/development labels, repo/current-source link correctness, no invented live-demo URL, no source-app/backend/provider requests and no commercial-film loading. Preserve earlier normal-motion reference captures and manual/system reduced-motion behavior.

Viewport matrix: 320/390 mobile, 768 tablet, 1000/1280/1440 desktop, wide/short 1920×700 and landscape windows, coarse-pointer/touch variants, DPR1 with an additional high-DPR sample if available. Exercise focus order, Enter/Space gallery controls, disclosures, active image failure/retry, deep links, resize and live motion toggles. Verify source originals/hashes, photo/OSM attributions and no numbers represented as outcomes.

Capture genuine desktop/mobile/reduced-motion screenshots and a short real-wheel forward/reverse recording. Keep generated QA files ignored. Attempt native Safari where available without changing preferences; prior Safari automation was disabled. If unavailable, state that Safari/physical iOS/Android remain unverified; Chrome emulation is not physical-device proof. Provide localhost startup instructions and stop for visual review after local Phase 3D.2.

## 11. Source links, risks and approval boundary

Verified repository root: https://github.com/sahilbhardwaj037037-sys/clientscout-ai

Current published development source: https://github.com/sahilbhardwaj037037-sys/clientscout-ai/tree/feature/checkpoint-5

Pinned inspection reference: https://github.com/sahilbhardwaj037037-sys/clientscout-ai/tree/8ceb24402d5518fc532fc5b32d848edbc9040538

Public GitHub metadata has no homepage URL, Pages disabled and no declared license. README states no verified public deployment and the inspected tracked tree has no deployment workflow. This does not prove that no external host could exist; no public live demo is verified or proposed. Use a client-friendly **GitHub Repository** link and a separate **Current Development Source** link, with explicit local-development/no-public-demo text. Do not invent a Preview App or publicly hosted SaaS URL.

Main risks: confusing screenshot commit with capture-time source state; accidentally promoting pending 5.2 or mocked provider results as delivered; using demo statuses as commercial metrics; oversized decoded images; CSS 3D flattening/Safari clipping; stale transforms on live reduced motion; disclosure/image-driven refresh shifts; and dense UI becoming unreadable at small display sizes. Mitigations are the qualified captions/selection, source-state table, full original access, bounded moving planes and explicit cleanup/geometry tests above.

No license grant is inferred from public GitHub availability. The source README contains no declared project license; third-party icons and optional provider/source obligations remain applicable. Preserve visible source attribution and document provenance without asserting blanket screenshot/code reuse rights.

Approval requested for **Phase 3D.2 locally only**: the eleven core dated captures, explicit synthetic/development labeling, the hinge/alignment storyboard including its labeled dashboard viewport excerpt, the proposed narrative and technical/test budgets. Research/Settings reserves and missing Proposal Studio/completed-results demonstrations remain outside the proposed core. If those are requested later, obtain the exact sanitized authentic captures before extending their visual story.

No application implementation, ClientScout modifications, commit, push, merge, deployment or Phase 4 work has been performed. Await explicit implementation approval.
