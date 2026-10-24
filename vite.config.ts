import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const configured = env.VITE_SITE_URL?.trim();
  const site = configured ? new URL(configured.endsWith('/') ? configured : configured + '/') : null;
  if (site && (!['https:', 'http:'].includes(site.protocol) || site.username || site.password || site.search || site.hash)) throw new Error('VITE_SITE_URL must be the public site base URL without credentials, query or fragment.');
  let base = '/';
  return {
    base: '/',
    plugins: [{
      name: 'portfolio-launch-metadata',
      configResolved(config) { base = config.base; },
      transformIndexHtml() {
        const image = site ? new URL('social-preview.png', site).href : base + 'social-preview.png';
        return [
          { tag: 'meta', attrs: { property: 'og:image', content: image } },
          { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
          ...(site ? [{ tag: 'link', attrs: { rel: 'canonical', href: site.href } }, { tag: 'meta', attrs: { property: 'og:url', content: site.href } }] : []),
        ];
      },
      generateBundle() {
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: 'User-agent: *\nAllow: /\n' + (site ? '\nSitemap: ' + new URL('sitemap.xml', site).href + '\n' : '') });
        // This is one document with fragment navigation; fragments are not sitemap pages.
        if (site) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + site.href.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;') + '</loc></url></urlset>\n' });
      },
    }],
  };
});
