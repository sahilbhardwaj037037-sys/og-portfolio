import { assetUrl } from './assetUrl';
import React, { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './fonts.css';
import './styles.css';
import './refinement.css';
import SmileCareStory from './SmileCareStory';
import type { SceneHandle } from './scene';
import HeroSound from './HeroSound';
import { useLivingEnvironment, type EnvironmentPaint } from './useLivingEnvironment';
import { projectThemeStyle } from './projectThemes';
import './environment.css';
import SixSevenStory from './SixSevenStory';
import EmberOakStory from './EmberOakStory';
import ClientScoutStory from './ClientScoutStory';
import AdditionalProjectsGallery from './AdditionalProjectsGallery';
import CommercialShowreel from './CommercialShowreel';
import PortfolioClosing, { PortfolioFooter } from './PortfolioClosing';
import SiteNavigation from './SiteNavigation';
import './text-cleanup.css';

gsap.registerPlugin(ScrollTrigger);
const Laptop = lazy(() => import('./scene'));
const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => <span aria-hidden="true">{diagonal ? '↗' : '↓'}</span>;
const shots = [
  { id: 'desktop', title: 'Homepage', file: assetUrl('/media/smile-desktop.png'), width: 1440, height: 757, alt: 'Genuine Smile Care Clinic desktop homepage with navigation and dental hero' },
  { id: 'mobile', title: 'Mobile', file: assetUrl('/media/smile-mobile.png'), width: 500, height: 701, alt: 'Genuine Smile Care Clinic mobile homepage' },
  { id: 'admin', title: 'Administration', file: assetUrl('/media/smile-admin.png'), width: 1440, height: 757, alt: 'Genuine custom Smile Care Clinic administration dashboard and settings' },
];

function App() {
  const root = useRef<HTMLDivElement>(null);
  const journey = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const entrance=useRef(1);
  const entranceTimeline=useRef<gsap.core.Timeline|null>(null);
  const poseEntrance=useRef<gsap.core.Tween|null>(null);
  const didEnter=useRef(false);
  const scene = useRef<SceneHandle | null>(null);
  const wake = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  const [failure, setFailure] = useState(new URLSearchParams(location.search).has('fallback'));
  const [systemReduce, setSystemReduce] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [manualReduce, setManualReduce] = useState(false);
  const reduce = systemReduce || manualReduce;
  const [shot, setShot] = useState(0);
  const [collectionProject, setCollectionProject] = useState(0);
  const [details, setDetails] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [interactiveMobile, setInteractiveMobile] = useState(false);
  const cinematic = useRef(false);
  const environment = useRef<EnvironmentPaint>(() => {});
  const soundPresence = useRef<(value: number, immediate?: boolean) => void>(() => {});
  useLivingEnvironment(root, stage, reduce, environment);

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => setSystemReduce(mq.matches);
    mq.addEventListener('change', onMotion);
    return () => mq.removeEventListener('change', onMotion);
  }, []);

  // Shared geometry: Three projects the display; DOM consumes that rectangle.
  const paintOverlay = () => {
    const el = overlay.current;
    if (!el || !stage.current) return;
    const p = progress.current;
    environment.current(p, cinematic.current);
    const soundT = gsap.utils.clamp(0, 1, (p - .12) / .24);
    soundPresence.current(cinematic.current ? 1 - soundT * soundT * (3 - 2 * soundT) : 1, cinematic.current && p >= .74);
    stage.current.style.setProperty('--depth-x', `${scene.current?.depthX||0}px`);
    const width = stage.current.clientWidth, height = stage.current.clientHeight;
    const active = cinematic.current;
    const t = gsap.utils.clamp(0, 1, (p - .85) / .15);
    const ease = t * t * (3 - 2 * t);
    const targetWidth = Math.min(width * .84, 1120);
    const finalRect = { x: (width - targetWidth) / 2, y: height * .57 - targetWidth / (1440 / 757) / 2, width: targetWidth, height: targetWidth / (1440 / 757) };
    const projected = scene.current?.rect;
    const from = projected ?? { x: finalRect.x, y: height * .57 - targetWidth / 1.538 / 2, width: targetWidth, height: targetWidth / 1.538 };
    const rect = {
      x: gsap.utils.interpolate(from.x, finalRect.x, ease), y: gsap.utils.interpolate(from.y, finalRect.y, ease),
      width: gsap.utils.interpolate(from.width, finalRect.width, ease), height: gsap.utils.interpolate(from.height, finalRect.height, ease),
    };
    const alpha = active ? gsap.utils.clamp(0, 1, (p - .74) / .1) : 0;
    Object.assign(el.style, { left: `${rect.x}px`, top: `${rect.y}px`, width: `${rect.width}px`, height: `${rect.height}px`, opacity: `${alpha}`, visibility: alpha > 0 ? 'visible' : 'hidden' });
    // Diagnostics contain geometry only; used by the browser audit, never UI copy.
    window.__og = { ...window.__og, progress: p, cinematic: active, overlay: rect, screen: projected, ready, failed: failure };
  };

  useLayoutEffect(() => {
    if (!root.current || !journey.current || !stage.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add({ all: 'all', desktop: '(min-width: 900px) and (min-height: 620px)', reduce: '(prefers-reduced-motion: reduce)' }, (context) => {
        cinematic.current = Boolean(context.conditions?.desktop) && !reduce && !context.conditions?.reduce;
        const active = cinematic.current;
        root.current!.classList.toggle('cinematic', active);
        progress.current = 0;
        const visual = { value: 0 };
        if (active) {
          const tl = gsap.timeline({ scrollTrigger: {
            trigger: journey.current, pin: stage.current, start: 'top top', end: () => `+=${innerHeight * 2.15}`,
            // Refresh this upstream pin before child case-study triggers measure flow.
            scrub: .22, invalidateOnRefresh: true, anticipatePin: 1, refreshPriority: 1,
            onRefresh: () => { wake.current(); paintOverlay(); },
          } });
          tl.to(visual, { value: 1, duration: 1, ease: 'none', onUpdate() {
            progress.current = visual.value;
            if(visual.value>.015){entranceTimeline.current?.progress(1).kill();poseEntrance.current?.progress(1).kill();entrance.current=1;}
            root.current!.style.setProperty('--journey', `${visual.value}`);
            stage.current!.style.setProperty('--paper', `${gsap.utils.clamp(0, 1, (visual.value - .82) / .16)}`);
            stage.current!.style.setProperty('--identity', `${1 - gsap.utils.clamp(0, 1, (visual.value - .12) / .24)}`);
            stage.current!.style.setProperty('--case', `${gsap.utils.clamp(0, 1, (visual.value - .88) / .12)}`);
            stage.current!.style.setProperty('--device', `${1 - gsap.utils.clamp(0, 1, (visual.value - .82) / .045)}`);
            const hideIdentity = visual.value > .37;
            stage.current!.querySelectorAll<HTMLElement>('.hero-copy, .hero-intent, .hero-footnote, .hero-sound').forEach(el => {el.inert = hideIdentity;});
            wake.current(); paintOverlay();
          } });
        } else {
          root.current!.style.setProperty('--journey', '0');
          stage.current!.querySelectorAll<HTMLElement>('.hero-copy, .hero-intent, .hero-footnote, .hero-sound').forEach(el => {el.inert = false;});
          stage.current!.style.setProperty('--paper', '0');
          stage.current!.style.setProperty('--identity', '1');
          stage.current!.style.setProperty('--case', '0');
          stage.current!.style.setProperty('--device', '1');
        }
        wake.current(); paintOverlay();
        return () => { cinematic.current = false; };
      });
      return () => mm.revert();
    }, root);
    const resize = () => { wake.current(); paintOverlay(); };
    window.addEventListener('resize', resize);
    document.fonts.ready.then(() => { ScrollTrigger.refresh(); wake.current(); });
    return () => { ctx.revert(); window.removeEventListener('resize', resize); };
  }, [reduce]);

  useLayoutEffect(()=>{
    if(reduce||didEnter.current||scrollY>20){gsap.set('.entrance-word',{yPercent:0});return;}
    didEnter.current=true;
    const ctx=gsap.context(()=>{
      entranceTimeline.current=gsap.timeline().fromTo('.entrance-word',{yPercent:110},{yPercent:0,duration:.85,stagger:.09,ease:'power3.out'});
    },root);
    return()=>{entranceTimeline.current?.progress(1);ctx.revert();};
  },[reduce]);
  useLayoutEffect(()=>{
    if(!ready||reduce||scrollY>20)return;
    entrance.current=0;
    poseEntrance.current=gsap.to(entrance,{current:1,duration:.85,ease:'power2.out',onUpdate:()=>wake.current()});
    return()=>{poseEntrance.current?.kill();entrance.current=1;};
  },[ready,reduce]);
  useEffect(() => { paintOverlay(); }, [ready, failure]);
  useEffect(() => { ScrollTrigger.refresh(); }, [details]);
  useEffect(() => {
    // Native fragment resolution can run before React and the upstream pin exist.
    // Correct the initial chapter/work destination once document geometry is ready.
    const hash = location.hash;
    if (!['#work', '#story-frontend', '#story-responsive', '#story-build', '#six-and-seven', '#six-title', '#six-browse', '#six-product', '#six-responsive', '#six-build', '#six-evidence', '#six7-closing', '#ember-and-oak', '#ember-title', '#ember-atmosphere', '#ember-experience', '#ember-responsive', '#ember-build', '#ember-evidence', '#ember-closing', '#clientscout-ai', '#scout-title', '#scout-workflow', '#scout-crm', '#scout-sources', '#scout-evidence', '#scout-build', '#scout-responsive', '#scout-gallery', '#clientscout-closing', '#additional-projects', '#collection-title', '#showreel', '#showreel-title', '#showreel-transcript', '#skills', '#about', '#contact'].includes(hash)) return;
    let mounted = true;
    document.fonts.ready.then(() => requestAnimationFrame(() => {
      if (!mounted || location.hash !== hash) return;
      ScrollTrigger.refresh();
      document.getElementById(hash === '#six-and-seven' ? 'six-title' : hash === '#ember-and-oak' ? 'ember-title' : hash === '#clientscout-ai' ? 'scout-title' : hash.slice(1))?.scrollIntoView({ block: 'start', behavior: 'instant' });
    }));
    return () => { mounted = false; };
  }, []);

  function skip(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const target = document.getElementById('work')!;
    target.scrollIntoView({ behavior: 'instant', block: 'start' });
    target.focus({ preventScroll: true });
    history.replaceState(null, '', '#work');
  }

  return <div ref={root} style={projectThemeStyle('smile-care')} className={`portfolio ${reduce ? 'reduced' : ''} ${failure ? 'scene-failed' : ''}`}>
    <a className="skip-link" href="#work" onClick={skip}>Skip to selected work</a>
    <header className="site-header">
      <div className="header-actions"><button className="motion-toggle" onClick={() => setManualReduce(!manualReduce)} disabled={systemReduce} title={systemReduce ? 'Reduced motion is enabled in your system settings' : undefined} aria-pressed={reduce}>{reduce ? 'Motion off' : 'Reduce motion'}<span className="toggle-dot" /></button><a className="header-work" href="#work" onClick={skip}>Selected work</a><SiteNavigation/></div>
    </header>
    <main>
      <section id="intro" ref={journey} className="journey" aria-labelledby="hero-heading">
        <div className="hero-stage" ref={stage}>
          <div className="studio-backdrop" aria-hidden="true"><div className="studio-light"/><div className="studio-atmosphere"/><div className="studio-grain"/></div>
          <div className="stage-paper" />
          <div className="hero-orbit orbit-one" aria-hidden="true" /><div className="hero-orbit orbit-two" aria-hidden="true" />
          <div className="hero-type hero-type-back" aria-hidden="true"><span className="entrance-word">BEYOND</span></div>
          <div className="hero-type hero-type-front" aria-hidden="true"><span className="entrance-word">THE INTERFACE<span className="type-period">.</span></span></div>
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> SAHIL BHARDWAJ <span className="copy-rule" /> WEB DEVELOPER</p>
            <h1 id="hero-heading" className="sr-only">Beyond the interface.</h1>
          </div>
          <div className="hero-intent"><a className="text-link hero-cta" href="#work" onClick={skip}>Explore selected work</a></div>
          <div className={`laptop-layer ${ready && !failure ? 'is-ready' : ''}`} aria-hidden="true">
            {!failure && <Suspense fallback={null}><Laptop entrance={entrance} progress={progress} cinematic={cinematic} handle={scene} wake={wake} onFrame={paintOverlay} onReady={() => setReady(true)} onFailure={reason => {window.__og = {...window.__og, failureReason:reason};setFailure(true);}} reduced={reduce} interactiveMobile={interactiveMobile} /></Suspense>}
          </div>
          <div className="device-fallback" aria-hidden="true"><img src={assetUrl('/media/laptop-poster-refined.png')} alt="" onError={e => { e.currentTarget.style.display = 'none'; }} /><div className="fallback-workspace"><span>SB / SELECTED WORKSPACE</span><strong>Beyond the<br />interface.</strong><small>01 — SMILE CARE CLINIC</small></div></div>
          {!ready && !failure && <p className="load-status" role="status">Preparing the studio<span>…</span></p>}
          {failure && <p className="load-status">Static studio view</p>}
          <button className="mobile-interaction" onClick={() => setInteractiveMobile(!interactiveMobile)} aria-pressed={interactiveMobile}>{interactiveMobile ? 'Pause movement' : 'Explore the laptop'} <Arrow diagonal /></button>
          <HeroSound presence={soundPresence}/>
          <div className="hero-footnote"><p>FRONTEND <span>/</span> WORDPRESS <span>/</span> SHOPIFY</p></div>
          <div className="handoff-heading" aria-hidden="true"><h2>Smile Care Clinic</h2></div>
          <div className="display-overlay" ref={overlay} aria-hidden="true"><img src={assetUrl('/media/smile-desktop.png')} alt="" /></div>
        </div>
      </section>
      <section id="work" className="project" data-project-theme="smile-care" tabIndex={-1} aria-labelledby="project-title">
        <div className="project-intro"><p className="eyebrow">SMILE CARE CLINIC</p><div><h2 id="project-title">A calmer interface.<br /><span>A custom foundation.</span></h2><p>A dental clinic concept that brings considered frontend design together with a custom WordPress plugin and native Gutenberg blocks.</p></div><div className="project-spec"><span className="sr-only">SMILE CARE CLINIC</span><p>WordPress · PHP<br />Gutenberg · JavaScript</p><span className="practice-label">Practice project</span></div></div>
        <SmileCareStory reduced={reduce}/>
        <div className="project-gallery">
          <div className="gallery-toolbar"><div className="window-dots" aria-hidden="true"><i /><i /><i /></div><span>SMILE CARE CLINIC / {shots[shot].title.toUpperCase()}</span><div className="gallery-tabs" role="group" aria-label="Project screenshots">{shots.map((item, i) => <button key={item.id} aria-pressed={shot === i} onClick={() => { setShot(i); setImageError(false); }}>{item.title}</button>)}</div></div>
          <div className={`gallery-image ${shots[shot].id === 'mobile' ? 'mobile-shot' : ''}`}>
            {!imageError ? <img key={shots[shot].id} src={shots[shot].file} alt={shots[shot].alt} width={shots[shot].width} height={shots[shot].height} loading="lazy" onError={() => setImageError(true)} /> : <p role="status">This screenshot could not load. Choose another view.</p>}
          </div>
          <p className="gallery-caption"><span>Interface content is fictional demonstration material.</span></p>
        </div>
        <div className="implementation"><div><h3>Designed as a website.<br />Built as a system.</h3><p>A portable plugin holds the custom blocks, styling, appointment-request workflow, and administration tools. The public demo simulates submissions without saving records or sending mail.</p><button className="detail-button" aria-expanded={details} aria-controls="implementation-details" onClick={() => setDetails(!details)}>{details ? 'Close implementation notes' : 'Explore the implementation'} <span aria-hidden="true">{details ? '−' : '+'}</span></button>
          {details && <div id="implementation-details" className="implementation-details"><div><span>PRESENTATION</span><h4>Six native Gutenberg blocks</h4><p>Custom card, treatment, dentist, testimonial, FAQ, and orbital-gallery blocks within the WordPress editor.</p></div><div><span>FUNCTIONALITY</span><h4>A custom PHP plugin</h4><p>Appointment requests, review moderation, newsletter and inquiry handlers, with custom database tables and administration views. Source reviewed; end-to-end delivery has not been tested in this prototype.</p></div><div><span>BOUNDARIES</span><h4>A practice project</h4><p>The clinic, doctors, testimonials and patient records are fictional. This is a portfolio demonstration, not a commissioned clinic or production patient service.</p></div></div>}
        </div></div>
      </section>
      <SixSevenStory reduced={reduce}/>
      <EmberOakStory reduced={reduce}/>
      <ClientScoutStory reduced={reduce}/>
      <AdditionalProjectsGallery reduced={reduce} onProjectChange={setCollectionProject}/>
      <CommercialShowreel reduced={reduce} selected={collectionProject}/>
      <PortfolioClosing/>
    </main>
    <PortfolioFooter/>
  </div>;
}

declare global { interface Window { __og?: Record<string, unknown>; } }
createRoot(document.getElementById('root')!).render(<App />);
