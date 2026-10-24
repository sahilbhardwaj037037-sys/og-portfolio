import { useEffect, useRef } from 'react';
import { sixImage } from './featuredProjects';
import { useEmberPassage } from './useEmberOakMotion';
import { EmberCapture } from './EmberCapture';

export default function EmberOakTransition({ reduced }: { reduced: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useEmberPassage(root, reduced);
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
  return <div className="ember-passage" ref={root} aria-label="From editorial commerce to restaurant atmosphere">
    <div className="ember-stage">
      <div className="ember-warmth" aria-hidden="true"/>
      <div className="ember-camera"><div className="ember-world">
        <div className="ember-passage-plane ember-commerce-editorial" aria-hidden="true"><img src={sixImage(0)} alt="" width="1440" height="900" loading="lazy"/></div>
        <div className="ember-passage-plane ember-commerce-product" aria-hidden="true"><img src={sixImage(2)} alt="" width="1440" height="1000" loading="lazy"/></div>
        <div className="ember-passage-plane ember-arriving"><EmberCapture index={0} reveal/></div>
      </div></div>
      <div className="ember-arrival-caption" aria-hidden="true"><strong>From motion, to atmosphere.</strong><span>RESTAURANT WEBSITE CONCEPT</span></div>
    </div>
  </div>;
}
