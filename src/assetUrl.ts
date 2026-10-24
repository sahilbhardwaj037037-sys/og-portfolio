/** Public assets follow Vite's configured deployment base, including subfolder hosting. */
export const assetUrl = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '');
