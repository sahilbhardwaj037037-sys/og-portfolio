import { useEffect, useRef } from 'react';
import { additionalProjects } from './additionalProjects';
import AdditionalProjectCard from './AdditionalProjectCard';
import GalleryEntrance from './GalleryEntrance';
import { useGalleryEntrance } from './useGalleryEntrance';
import { useProjectCarousel } from './useProjectCarousel';
import './additional-projects.css';

export default function AdditionalProjectsGallery({ reduced, onProjectChange }: { reduced: boolean; onProjectChange?: (index: number) => void }) {
  const root = useRef<HTMLElement>(null), viewport = useRef<HTMLDivElement>(null);
  const { active, go } = useProjectCarousel(viewport, reduced);
  useEffect(() => { onProjectChange?.(active); }, [active, onProjectChange]);
  useGalleryEntrance(root, reduced);
  return <section ref={root} id="additional-projects" className={`collection ${reduced ? 'collection-static' : ''}`} aria-labelledby="collection-title" tabIndex={-1}>
    <div className="collection-entrance"><div className="collection-stage">
      <div className="collection-environment" aria-hidden="true"/>
      <header className="collection-header"><div className="collection-eyebrow"><span>ADDITIONAL PROJECTS</span></div><div className="collection-heading"><h2 id="collection-title">Further work.<br/><em>Different worlds.</em></h2><p>A collection of focused website studies.<br/>Different identities. A shared attention to detail.</p></div></header>
      <div ref={viewport} className="collection-viewport" tabIndex={reduced ? undefined : 0} role="region" aria-label="Additional projects gallery" aria-describedby={reduced ? undefined : 'collection-instructions'}><ol className="collection-track">{additionalProjects.map((project, index) => <AdditionalProjectCard key={project.id} project={project} index={index}/>)}</ol></div>
      <GalleryEntrance/>
      {!reduced && <div className="collection-navigation"><p id="collection-instructions">SWIPE / DRAG<span className="sr-only">Arrow keys when the gallery is focused</span></p><div className="collection-picker" role="group" aria-label="Choose an additional project">{additionalProjects.map((p, i) => <button type="button" key={p.id} onClick={() => go(i)} aria-label={`Show ${p.name}`} aria-current={active === i ? 'true' : undefined}>{String(i + 1).padStart(2, '0')}</button>)}</div><div className="collection-arrows"><button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous additional project">←</button><button type="button" onClick={() => go(active + 1)} disabled={active === additionalProjects.length - 1} aria-label="Next additional project">→</button></div></div>}
      <p className="collection-status sr-only" role="status" aria-live="polite" aria-atomic="true">{reduced ? 'Four additional website studies' : `Project ${active + 1} of 4 — ${additionalProjects[active].name}`}</p>
    </div></div>
    <div className="collection-end"><p>Different briefs.<br/><em>The same care.</em></p><a href="#collection-title">Return to the collection <span aria-hidden="true">↑</span></a></div>
  </section>;
}
