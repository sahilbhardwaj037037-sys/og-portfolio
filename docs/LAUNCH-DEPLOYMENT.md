# Vercel launch guide

The completed portfolio is launch-ready and has not yet been publicly deployed. This guide supersedes the earlier Netlify recommendation. `netlify.toml` is retained as historical hosting configuration; Vercel uses `vercel.json`.

No Vercel project has been created or linked by this preparation, and no deployment command has been run.

## Build configuration

| Setting | Required value |
| --- | --- |
| Application root | GitHub repository root (`.`), not `prototype/` |
| Framework | Vite |
| Node.js | 24.x |
| Install | `npm ci` |
| Build | `npm run build` |
| Output | `dist` |
| Release branch | `feature/phase-3-cinematic-projects` |

`vercel.json` declares the framework, commands, output and static asset cache headers. Hashed `/assets/*` files are immutable for one year; stable `/media/*` URLs use a one-hour cache. HTML uses platform defaults. `.vercelignore` excludes local QA evidence, documentation, environment files and generated tooling/build directories from CLI source uploads. Git ignores `.vercel/` account/project linkage.

This is a static frontend with no server, database, API keys or Vercel Functions. All navigation uses document fragments such as `/#contact`; there are no History API page routes. Refreshing a fragment requests `/`, so no catch-all rewrite is needed. In particular, missing MP4, GLB or image URLs should return 404 rather than `index.html`. See [Vercel's Vite guide](https://vercel.com/docs/frameworks/frontend/vite).

## Production hostname and metadata

`VITE_SITE_URL` is intentionally blank in `.env.example`. The actual production hostname has not been supplied or verified. Do not derive one from the repository name or a preview URL.

After selecting the Vercel project and confirming its assigned production domain or the owner's custom domain, set **Production → `VITE_SITE_URL`** to its complete HTTPS base URL ending in `/`. It is public build-time configuration, not a credential. It controls:

- The canonical link and `og:url`.
- Absolute Open Graph/Twitter image URLs.
- The robots sitemap reference and a sitemap containing the single document URL.

The site remains usable without this value, but final production metadata requires it. Environment changes require a new build/deployment. Preview deployments must not replace the confirmed production hostname in production metadata. Keep the root Vite base `/` for this Vercel deployment.

## Media and size readiness

Measured production output: **54,106,844 bytes across 52 files**, including all **43 checksum-verified runtime assets**. Documentation screenshots are outside `public` and are not copied into `dist`.

| Asset | Bytes | Delivery |
| --- | ---: | --- |
| Laptop-screen animation | 23,462,114 | Static MP4; unchanged 29.5-second original |
| Original laptop model | 10,847,304 | Static GLB |
| Optional hero soundtrack | 8,640,044 | Static WAV; loaded on visitor activation |
| Commercial showreel | 5,747,083 | Static MP4; 41 seconds, 1920×1080, H.264/AAC |

The commercial is byte-identical to the approved original, with SHA-256 `a7efe982dec837b957ba342b68a850a79a651c442d8a2b286e1b30ecaccf8b15`. It uses native inline playback, `preload="none"`, an on-demand source, a poster and a transcript. No recompression or external video host is required for size compliance.

[Vercel's documented limits](https://vercel.com/docs/limits#static-file-uploads) allow CLI source uploads of 100 MB on Hobby and 1 GB on Pro. The tracked source is approximately 54 MB with curated documentation images; the 54.11 MB output is also below 100 MB. These are CLI source-upload limits, not a per-request Function payload limit. Media is served as static files, without passing through Functions. Traffic and transfer usage still depend on the selected account and visitor behavior. [Node.js 24 is supported](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

## Exact publishing sequence — only after deployment approval

The manual CLI path avoids accidentally deploying `main` through a new Git import. None of these release commands has been executed during preparation.

1. In this checkout, confirm a clean working tree on `feature/phase-3-cinematic-projects` and the final pushed commit. Run `npm ci`, `npm run build` and `npm run qa:assets`.
2. Run `npx vercel login`, then `npx vercel link` from the repository root. Select the intended account and link/create the correct project. Linking alone does not publish the application. Do not run the deployment command yet.
3. In the linked project's Vercel settings, confirm Vite, repository root, `npm ci`, `npm run build`, `dist` and Node.js 24.x. Confirm the intended production domain; configure the owner's custom domain if applicable.
4. Run `npx vercel env add VITE_SITE_URL production` and enter the confirmed complete HTTPS base URL. Alternatively set it in the project's Environment Variables settings. Do not use an invented hostname.
5. When the owner authorizes public publication, run **`npx vercel --prod`** from the clean release checkout. This uploads source and performs the configured production build with the Production environment. It is the step that deploys the site.
6. Verify the returned production deployment and its actual public hostname. Check the root and fragment refreshes for Projects, Additional Work, Showreel, Skills, About and Contact. Test navigation, mobile swiping, reduced motion, film playback/seeking and the hero sound/film handoff.
7. Check media MIME types and MP4 `Range` responses on the actual host; confirm missing media returns 404. Verify canonical/OG URLs, the social image, `robots.txt` and `sitemap.xml` reference the confirmed hostname.
8. Only after public verification, add the real production URL to the README and GitHub repository website field. If Git-based deployments are enabled later, explicitly choose `feature/phase-3-cinematic-projects` as the production branch; future pushes can then trigger deployments. No merge into `main` is required.

## Contact, scope and release-time checks

Email uses `mailto:bysahilworks@gmail.com`; no fake form or server mail delivery is claimed. Professional profiles retain the exact approved URLs and `target="_blank" rel="noopener noreferrer"` in the application. The final automated check returned HTTP 403 for both Upwork and Fiverr; verify those exact approved destinations in a normal browser before release. Their public profile contents are not claimed as verified. GitHub, the project repositories and ApexFit returned HTTP 200; SIX&7 redirected to its password page. Mailto activation is checked locally without sending an email.

ApexFit is the only public project “Live Website” action. SIX&7 remains explicitly password-protected; no password is entered or bypassed. Other projects expose source links and retain their practice/concept/development disclosures.

The pending release inputs are the owner's Vercel account/project and confirmed production hostname. Public CDN delivery, DNS, metadata and account-specific quotas can only be fully verified after deployment approval. Local Chrome and touch-emulation checks do not certify physical iOS/Safari. Asset provenance and reuse boundaries remain documented in `licenses/`; no new rights are asserted.
