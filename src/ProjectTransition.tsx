import { assetUrl } from './assetUrl';
import { useEffect, useRef, useState } from 'react';
import { sixImage } from './featuredProjects';
import { useProjectTransition } from './useProjectTransition';

export default function ProjectTransition({ reduced }: { reduced: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useProjectTransition(root, reduced);
  useEffect(() => {
    const image = root.current?.querySelector<HTMLImageElement>('.passage-source img');
    if (!image || !root.current) return;
    // A transformed plane can be horizontally outside native lazy-load bounds.
    // Prepare it near the vertical passage, without fetching it during the hero.
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      image.loading = 'eager';
      observer.disconnect();
    }, { rootMargin: `${Math.round(innerHeight * 1.8)}px 0px` });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={root} className="project-passage" aria-hidden="true">
    <div className="passage-stage">
      <div className="passage-graphite" />
      <div className="passage-camera"><div className="passage-world">
        <div className="passage-plane passage-outgoing"><img src={assetUrl('/media/smile-desktop.png')} alt="" width="1440" height="757" loading="lazy"/><span>SMILE CARE CLINIC</span></div>
        <div className="passage-plane passage-incoming">
          {failed ? <div className="passage-image-fallback">SIX&7<span>Storefront capture unavailable. Project evidence follows below.</span></div> : <div className="passage-source">
            {!loaded && <span className="passage-loading">SIX&7<small>LOADING THE ORIGINAL CAPTURE</small></span>}
            <img src={sixImage(0)} alt="" width="1440" height="900" loading="lazy" style={{ opacity: loaded ? 1 : 0 }} onLoad={event => { void event.currentTarget.decode().then(() => setLoaded(true)).catch(() => setFailed(true)); }} onError={() => setFailed(true)}/>
          </div>}
          <span>SIX&7</span>
        </div>
      </div></div>
      <div className="passage-arrival"><strong>Commerce, edited.</strong><span>SHOPIFY / DAWN / LIQUID</span></div>
    </div>
  </div>;
}
