# Phase 2.1 + Cinematic Video Integration

Source-control checkpoint prepared on October 22, 2026. The portfolio remains under development. This checkpoint preserves the user-approved website; it does not introduce Phase 2.2 work or a deployment.

## Repository boundary

The repository root is the existing local `prototype` directory. The remote is `https://github.com/sahilbhardwaj037037-sys/og-portfolio.git`, with `main` as the target branch. The remote was verified as empty before preparation. Existing HTTPS authentication was verified as the repository owner with push permission, without saving credentials into project files.

Git author: `Sahil Bhardwaj <315845768+sahilbhardwaj037037-sys@users.noreply.github.com>`, configured for this repository only with the user's approval. No global Git settings were changed.

## Preserved implementation

- BEYOND THE INTERFACE hero and the original laptop GLB.
- Cinematic screen video on mesh `tfTbkkzhxqpKRgC`, muted looping playback, visibility pauses, and static fallbacks.
- Runtime Apple-logo concealment and pointer interactions.
- GSAP choreography, forward/reverse scrolling, and reversible screen-to-DOM alignment.
- Smile Care case-study chapters, project gallery, responsive layouts, and reduced-motion/WebGL fallbacks.

All 19 website source, configuration, and runtime asset files were compared with their hashes recorded before checkpoint preparation. No website source, dependency, configuration, or runtime asset changes were made. Only source-control configuration and repository documentation were added or updated.

## Staged scope

| Group | Files |
| --- | --- |
| Root configuration and README | `.gitattributes`, `.gitignore`, `README.md`, `index.html`, `package.json`, `package-lock.json`, `tsconfig.json` |
| Application | All seven existing files under `src/` |
| Runtime assets | All eight files listed in `asset-integrity.json` |
| Regression scripts | `qa/browser-check.mjs`, `qa/video-check.mjs`, `qa/production-smoke.mjs` |
| Documentation | `docs/CHECKPOINT.md`, `docs/asset-integrity.json` |
| Font licenses | `licenses/Inter-OFL.txt`, `licenses/Space-Grotesk-OFL.txt` |

Total: 29 files. The application, runtime assets, package inputs, and regression scripts are the existing working implementation. The checkpoint introduces Git configuration, a public-facing README, and these two documentation files.

## Runtime asset handling

| Asset | Bytes | MiB | Handling |
| --- | --- | --- | --- |
| `public/media/sahil-screen-animation.mp4` | 23,462,114 | 22.375 | Original bytes, regular Git |
| `public/media/laptop-original.glb` | 10,847,304 | 10.345 | Original bytes, regular Git |

The MP4 is H.264 High Profile, 2750 × 1788, 30 fps, and 29.5 seconds long, with no audio. Its aspect ratio is approximately 1.53803132:1.

GitHub warns about regular Git files larger than 50 MiB and blocks files larger than 100 MiB. Both assets are below those thresholds; Git LFS is unnecessary for this checkpoint. Git LFS was not installed or configured. The `.gitattributes` file marks binary assets as binary without applying an LFS filter. See [GitHub's file-size documentation](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github).

All eight runtime assets, including the favicon, project screenshots, and fallback posters, are retained. [asset-integrity.json](asset-integrity.json) records file sizes and SHA-256 hashes. The original MP4 and GLB have not been re-encoded, overwritten, or deleted.

## Exclusions and audit

The staged checkpoint excludes `node_modules`, `dist`, build metadata, caches, OS/editor files, temporary files, environment files, credentials, and private tooling state. Generated QA screenshots, results, and recordings remain local. The historical poster-generation utility is excluded because it writes a runtime asset. Existing regression scripts are included unchanged.

Historical Phase 2 and video-integration reports remain local because their evidence links reference ignored or external files. Earlier planning/discovery directories, baseline snapshots, and unrelated repositories are outside this repository root and are not staged.

The staged file contents were scanned for private keys, common GitHub/AWS/Google/Slack token formats, credential assignments, and authenticated URLs. No matches were found. Ignore rules were checked against representative secret paths and against the required MP4/GLB paths. This is a targeted local scan, not a claim of a comprehensive external security audit.

## Verification

Verification uses the existing application and tests without changing the website or weakening assertions. Browser suites target the local production build on port 5174.

| Check | Result |
| --- | --- |
| TypeScript + Vite production build | Passed; existing Three.js chunk-size warning remains |
| Main browser regressions | Passed, 19 checks on the isolated rerun |
| Phase 2.1 refinement regressions | Passed, 19 checks, including preserved baseline camera geometry and ten viewports |
| Video lifecycle and performance suite | Passed, 10 checks and six paired static/video performance runs |
| Production browser smoke test | Passed, no browser errors |
| Staged whitespace check | Passed |
| Original runtime/source integrity | Passed, all 19 files unchanged |
| Staged secret-pattern scan | No findings |

The first main-suite run passed its feature checks but failed its final console assertion on Chrome `ERR_NETWORK_IO_SUSPENDED`. The unchanged suite then passed all 19 checks with no console errors on an isolated rerun. No assertions or website behavior were changed.

The Phase 2.1 historical regression harness lives outside this repository and compares against the preserved original build; it was run during preparation. The three regression/smoke scripts in `qa/` remain available in a fresh clone. Generated machine-readable reports remain local under `qa/` or the temporary checkpoint QA directory.

Browser verification uses installed Chrome on macOS with the Apple M5/ANGLE Metal renderer. Mobile checks are viewport/touch emulation; physical devices and Safari are not verified. Document hiding and denied autoplay/codec support are simulated through the existing test harness. Performance results describe this local machine rather than field performance. The latest video runs delivered approximately 30 texture uploads per second while visible, zero sampled dropped frames, and 16.7–16.8 ms p95 scroll intervals, with uploads stopping after the handoff.

## Approval boundary

The first commit and push require explicit approval of the staged summary and proposed commands. This document records preparation; it does not claim that a commit, push, or deployment has occurred.
