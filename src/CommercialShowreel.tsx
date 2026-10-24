import { assetUrl } from './assetUrl';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { additionalProjects } from './additionalProjects';
import { acquireFilmAudio } from './mediaAudioCoordinator';
import { useShowreelEntrance } from './useShowreelEntrance';
import './showreel.css';

type Status = 'idle' | 'loading' | 'playing' | 'paused' | 'ended' | 'error';
const film = assetUrl('/media/showreel/commercial-1080p.mp4');

export default function CommercialShowreel({ reduced, selected }: { reduced: boolean; selected: number }) {
  const root = useRef<HTMLElement>(null), video = useRef<HTMLVideoElement>(null);
  const owner = useRef<(() => void) | null>(null), attempt = useRef(0);
  const visible = useRef(false), relayoutUntil = useRef(0);
  const [near, setNear] = useState(false), [started, setStarted] = useState(false), [status, setStatus] = useState<Status>('idle');
  const stabilize = useShowreelEntrance(root, reduced);
  const project = additionalProjects[selected] || additionalProjects[0];
  const acquire = () => { if (!owner.current) owner.current = acquireFilmAudio(); };
  const release = () => { owner.current?.(); owner.current = null; };

  // Upstream cinematic spacers change with motion preferences. Preserve the
  // viewing anchor of an already playing film across that one layout change.
  useLayoutEffect(() => {
    const media = video.current;
    if (!media || media.paused || !visible.current) return;
    relayoutUntil.current = performance.now() + 600;
    const timer = window.setTimeout(() => {
      if (media.paused || document.fullscreenElement || document.pictureInPictureElement) return;
      const r = media.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= innerHeight) media.scrollIntoView({ block: 'center', behavior: 'instant' });
    }, 100);
    return () => clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    const el = root.current!, media = video.current!;
    let offscreenTimer = 0;
    const detached = () => document.fullscreenElement === media || media.matches(':fullscreen') || document.pictureInPictureElement === media || !!(media as HTMLVideoElement & { webkitDisplayingFullscreen?: boolean }).webkitDisplayingFullscreen;
    const pause = () => { ++attempt.current; media.pause(); release(); };
    const nearObserver = new IntersectionObserver(entries => { if (entries[0].isIntersecting) { setNear(true); nearObserver.disconnect(); } }, { rootMargin: '600px 0px' });
    nearObserver.observe(el);
    const visibleObserver = new IntersectionObserver(entries => {
      clearTimeout(offscreenTimer);
      if (performance.now() >= relayoutUntil.current) visible.current = entries[0].intersectionRatio > 0;
      if (entries[0].intersectionRatio === 0) offscreenTimer = window.setTimeout(() => {
        const r = media.getBoundingClientRect();
        if (!detached() && performance.now() >= relayoutUntil.current && (r.bottom <= 0 || r.top >= innerHeight)) pause();
      }, Math.max(250, relayoutUntil.current - performance.now() + 250));
    }, { threshold: [0, .001] });
    visibleObserver.observe(media);
    const visibility = () => { if (document.hidden && document.pictureInPictureElement !== media) pause(); };
    const modeExit = () => { const r = media.getBoundingClientRect(); if (!detached() && (r.bottom <= 0 || r.top >= innerHeight)) pause(); };
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('fullscreenchange', modeExit);
    media.addEventListener('leavepictureinpicture', modeExit);
    media.addEventListener('webkitendfullscreen', modeExit);
    return () => {
      nearObserver.disconnect(); visibleObserver.disconnect(); clearTimeout(offscreenTimer);
      document.removeEventListener('visibilitychange', visibility); document.removeEventListener('fullscreenchange', modeExit);
      media.removeEventListener('leavepictureinpicture', modeExit); media.removeEventListener('webkitendfullscreen', modeExit);
      pause(); media.removeAttribute('src'); media.load();
    };
  }, []);

  const play = () => {
    const media = video.current!;
    const request = ++attempt.current;
    stabilize(); acquire(); setStatus('loading'); setStarted(true);
    if (!media.getAttribute('src') || media.error) { media.src = film; media.load(); }
    if (media.ended) media.currentTime = 0;
    media.focus({ preventScroll: true });
    // Preserve trusted user activation: no fetch/animation/metadata await before play().
    void media.play().catch(() => { if (request === attempt.current) { release(); setStatus('error'); } });
  };
  const message = status === 'loading' ? 'Loading film…' : status === 'playing' ? 'Now playing' : status === 'paused' ? 'Paused — resume with the video controls.' : status === 'ended' ? 'Film complete.' : status === 'error' ? 'The film could not load. Try again or read the transcript.' : '41 seconds. Play when you’re ready.';

  return <section ref={root} id="showreel" className="showreel" aria-labelledby="showreel-title" tabIndex={-1} data-state={status}>
    <div className="showreel-entrance"><div className="showreel-stage">
      <div className="showreel-light" aria-hidden="true"/>
      <header className="showreel-heading"><div className="showreel-rail"><span>THE SCREENING ROOM</span><span>COMMERCIAL FILM / 00:41</span></div><div className="showreel-title-row"><h2 id="showreel-title">The work,<br/><em>in motion.</em></h2><p>An introduction to my web design<br/>and development practice.</p></div></header>
      <div className="showreel-camera">
        {!reduced && <figure className="showreel-echo" aria-hidden="true">{near && <img src={assetUrl(`/media/additional-projects/${project.id}.webp`)} width="1440" height="1000" alt=""/>}<figcaption>{project.name} / FROM THE COLLECTION</figcaption></figure>}
        <div className="showreel-screen" onFocusCapture={stabilize}>
          <video ref={video} controls playsInline preload="none" width="1920" height="1080" poster={near ? assetUrl('/media/showreel/poster.webp') : undefined} aria-label="Sahil Bhardwaj commercial portfolio film" aria-describedby="showreel-description"
            onPlay={() => { if (video.current?.paused) return; stabilize(); acquire(); setStarted(true); setStatus('loading'); }}
            onPlaying={() => { if (!video.current?.paused) { acquire(); setStatus('playing'); } }}
            onWaiting={() => { if (!video.current?.paused) setStatus('loading'); }}
            onPause={() => { if (!video.current?.paused) return; ++attempt.current; release(); if (!video.current?.ended) setStatus(s => s === 'error' ? s : started ? 'paused' : s); }}
            onEnded={() => { if (!video.current?.ended) return; ++attempt.current; release(); setStatus('ended'); }}
            onError={() => { if (!video.current?.error) return; ++attempt.current; release(); setStatus('error'); }}>
            Your browser does not support this video. The film transcript is available below.
          </video>
          {!started && <div className="showreel-invitation"><button type="button" onClick={play} aria-label="Play commercial film, 41 seconds, with sound"><span className="showreel-play-icon" aria-hidden="true">▶</span><span>Play film <small>41 SECONDS / SOUND ON</small></span></button></div>}
        </div>
      </div>
      <div className="showreel-caption"><p id="showreel-description">An original portfolio film.<span>English captions are part of the film. A readable transcript follows.</span></p><div className="showreel-feedback"><p role="status" aria-live="polite">{message}</p>{(status === 'ended' || status === 'error') && <button type="button" onClick={play}>{status === 'ended' ? 'Replay film' : 'Retry film'} <span aria-hidden="true">↗</span></button>}</div></div>
    </div></div>
    <details className="showreel-transcript" id="showreel-transcript"><summary>Read the film transcript <span aria-hidden="true">+</span></summary><div>
      <p>First impressions matter, and for your business, that impression often starts with your website.</p>
      <p>Hey, I’m Sahil. I build modern professional websites using custom web development, WordPress, and Shopify. But don’t just take my word for it. Here’s a glimpse of what I’ve created.</p>
      <p>You can explore these projects and more in my portfolio. From eye-catching landing pages, to complete business websites and online stores, I focus on responsive design, thoughtful details, and smooth user experiences.</p>
      <p>Every project starts with an idea. Let’s turn yours into something worth showing off. Have questions? Send me a message, and let’s discuss your project.</p>
      <p className="showreel-visual-note">Visual context: historical portfolio and practice-project captures accompany the narration. The WordPress Twenty Twenty-Five image is labeled as a theme reference; Shopify views include theme-editor previews.</p>
    </div></details>
    <div className="showreel-outro"><span>A DIFFERENT MEDIUM. THE SAME INTENTION.</span><p>Made to be seen.<br/><em>Built to be felt.</em></p><a href="#showreel-title">Back to the film <span aria-hidden="true">↑</span></a></div>
  </section>;
}
