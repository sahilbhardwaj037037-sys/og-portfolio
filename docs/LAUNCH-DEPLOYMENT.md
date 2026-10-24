# Launch preparation — local only

The app is a static Vite/React document with native fragment navigation. It needs no backend, database, contact service or new dependency. No site was registered, published or deployed during this sprint. Git remains on `feature/phase-3-cinematic-projects` with all earlier uncommitted work preserved.

## Recommended hosting

**Netlify CLI manual deployment** is the recommended release path for this checkout: publish the built `dist` folder after explicit approval, without first committing or pushing. The output is about 54.1 MB and contains the unchanged 23.46 MB laptop video and 10.85 MB model. Netlify's [upload guidance](https://docs.netlify.com/manage/projects/add-new-project/#faq-for-using-the-drag-and-drop-publisher) recommends CLI deployment for larger projects; the browser dropzone works best below 50 MB and can stall on individual files above 10 MB. Keep the approved assets intact and use the CLI.

The included `netlify.toml` declares Node 24, `npm run build`, `dist` and cache headers. The CLI is a deployment tool, not an added application dependency; it has not been installed or authenticated during this sprint.
Nothing automatically connects this repository to Netlify. Do not push, enable automatic builds or upload a release until the owner approves.

## Release steps after approval

1. After approval, authenticate with Netlify, create/select the intended project without connecting automatic Git builds, and record its assigned HTTPS hostname/custom domain.
2. Set `VITE_SITE_URL` to that full public base URL, ending in `/`, and build. Example syntax: `VITE_SITE_URL="https://YOUR_APPROVED_HOST/" npm run build`. This is a placeholder, not a claimed live site. Run `npm run qa:assets`; retain the complete `dist` including media, assets, favicon, social image, robots and generated sitemap.
3. Once public deployment is explicitly approved, run `netlify deploy --dir=dist --no-build --prod` from this checkout with the correct selected Netlify project. This uploads the prebuilt output and applies the prepared config without committing or pushing. These flags are documented in the [CLI deploy reference](https://cli.netlify.com/commands/deploy/). No such command has been executed here.
4. Verify the public root and `#contact`, `#skills`, `#showreel` and `#additional-projects` fragments; test native film playback, audio handoff and actual email-app/profile link activation. Confirm MIME types, MP4 byte-range delivery, canonical/OG image URLs, robots and sitemap on the real host.

The build plugin emits the canonical URL, `og:url`, absolute OG/Twitter image URL and a **one-URL sitemap** only when `VITE_SITE_URL` is set. Until the actual hostname is known, the local build deliberately omits an invented canonical/sitemap and uses a local social-image path. Fragment IDs are not separate sitemap pages. No social account handles are fabricated.

## Asset base and routing

Default deployment is at the domain root. Every runtime media URL uses the small `assetUrl` helper and Vite's `BASE_URL`. For a subfolder host, use `npm run build -- --base=/YOUR_FOLDER/` and set `VITE_SITE_URL` to the same complete public subfolder URL. Vite documents this under [public base paths](https://vite.dev/guide/build#public-base-path).

A real production build mounted at `/portfolio/` was exercised locally, including WebGL, images, fonts, hero sound, commercial playback, Contact fragment refresh, canonical metadata, robots and sitemap. [Deployment checks](../qa/launch/deployment-results.json).

There are no History API page routes to rewrite: all navigation stays within one document using `#section` fragments. Do not add a catch-all rewrite that returns HTML for missing model/image/video files. Normal missing-file 404s are preserved; refresh at an existing fragment requests the document root correctly.

Hashed `/assets/*` files receive immutable caching in the supplied Netlify config. Stable-name `/media/*` files use a one-hour cache. All original media files are unchanged.

## Contact and public links

Owner-approved email: `mailto:bysahilworks@gmail.com`. This invokes the visitor's configured mail application; there is no server mail handler or fake form. No test message was sent and mailbox delivery is not claimed as tested.

- **Hire Me on Upwork** → exact approved profile `https://www.upwork.com/freelancers/~015b6e376493c182fd`.
- **View Fiverr Services** → exact approved short link `https://www.fiverr.com/s/jyyw1vG`, verified redirect to the `bysahilwork` website-development service.
- **Explore My GitHub** → `https://github.com/sahilbhardwaj037037-sys`.

All external profile links use `target="_blank" rel="noopener noreferrer"`. HTTP verification results are recorded in [external links](../qa/launch/external-links.json). Upwork returned a Cloudflare challenge to automated requests, so the intended profile's public contents still need a normal-browser manual check. The owner-approved URL is preserved; a challenge is not evidence of a broken profile.

ApexFit remains the only public **Live Website** project action. Its URL and the existing repositories returned HTTP 200. SIX&7 redirects to `/password` and is explicitly labeled password-protected; no password was entered or bypassed. No other project received a new live action.

## Approval and platform limits

No code commit, push, pull request, merge or deployment has been performed. The final public hostname, release authorization and the Upwork normal-browser check remain release-time decisions. Local Chrome/touch-emulation evidence does not certify Safari/iOS; earlier review documented disabled Safari remote automation.
