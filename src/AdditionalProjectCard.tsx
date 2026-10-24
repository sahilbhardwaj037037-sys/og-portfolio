import { assetUrl } from './assetUrl';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { AdditionalProject } from './additionalProjects';

export default function AdditionalProjectCard({ project, index }: { project: AdditionalProject; index: number }) {
  const figure = useRef<HTMLElement>(null);
  const [load, setLoad] = useState(false), [failed, setFailed] = useState(false), [attempt, setAttempt] = useState(0), [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setLoad(true); observer.disconnect(); }
    }, { rootMargin: '900px 100px' });
    if (figure.current) observer.observe(figure.current);
    return () => observer.disconnect();
  }, []);
  return <li className="collection-slot" data-card={project.id} style={{ '--card-accent': project.accent } as CSSProperties}>
    <article aria-labelledby={`collection-${project.id}`}>
      <div className="collection-card-rail"><span>{project.category}</span></div>
      <figure ref={figure} className="collection-image" data-drag-surface>
        <div className="collection-image-plane">
          {failed ? <div className="collection-image-error" role="status"><strong>{project.name}</strong><span>Screenshot unavailable. Project details and links remain below.</span><button type="button" onClick={() => { setReady(false); setFailed(false); setAttempt(n => n + 1); }}>Retry {project.name} screenshot</button></div> : <>{!ready && <div className="collection-image-loading">{project.name}<span>ORIGINAL WEBSITE CAPTURE</span></div>}{load && <img key={attempt} src={assetUrl(`/media/additional-projects/${project.id}.webp`)} width="1440" height="1000" alt={project.alt} decoding="async" draggable={false} style={{ opacity: ready ? 1 : 0 }} onLoad={e => { void e.currentTarget.decode().then(() => setReady(true)).catch(() => setFailed(true)); }} onError={() => setFailed(true)}/>}</>}
        </div>
        <figcaption className="sr-only">Desktop capture, full original framing. {project.note}</figcaption>
      </figure>
      <div className="collection-card-copy"><div><h3 id={`collection-${project.id}`}>{project.name}</h3><p>{project.description}</p></div><ul className="collection-technologies" aria-label={`${project.name} technologies`}>{project.technologies.map(t => <li key={t}>{t}</li>)}</ul></div>
      <div className="collection-card-bottom"><p>{project.note}</p><div className="collection-links"><a href={project.repository} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} GitHub Repository`}>GitHub Repository <span aria-hidden="true">↗</span></a>{project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} Live Website`}>Live Website <span aria-hidden="true">↗</span></a>}</div></div>
    </article>
  </li>;
}
