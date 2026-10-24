import { useEffect, useRef } from 'react';
import { emberImage, scoutImage } from './featuredProjects';
import { useClientScoutPassage } from './useClientScoutMotion';
import ClientScoutCapture from './ClientScoutCapture';

export default function ClientScoutTransition({ reduced }: { reduced: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useClientScoutPassage(root, reduced);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      el.querySelectorAll<HTMLImageElement>('img').forEach(image => { image.loading = 'eager'; });
      observer.disconnect();
    }, { rootMargin: `${Math.round(innerHeight * 1.8)}px 0px` });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={root} className="scout-passage" aria-label="From restaurant atmosphere to an evidence-driven workspace">
    <div className="scout-stage">
      <div className="scout-cream" aria-hidden="true"/><div className="scout-registration" aria-hidden="true"/>
      <div className="scout-camera"><div className="scout-world">
        <div className="scout-passage-plane scout-departing" aria-hidden="true"><img src={emberImage(1)} alt="" width="1440" height="923" loading="lazy"/></div>
        <div className="scout-passage-plane scout-detail-plane" aria-hidden="true"><img src={scoutImage(3)} alt="" width="1440" height="1000" loading="lazy" onError={event => { event.currentTarget.style.visibility = 'hidden'; }}/></div>
        <div className="scout-passage-plane scout-arriving"><ClientScoutCapture index={0} reveal windowed/></div>
      </div></div>
      <div className="scout-arrival-caption" aria-hidden="true"><strong>Evidence, before the next step.</strong><span>IN DEVELOPMENT / LOCAL APPLICATION</span></div>
    </div>
  </div>;
}
