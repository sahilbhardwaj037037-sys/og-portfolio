import { useEffect, useRef, useState, type RefObject } from 'react';
import { createHeroAudio, type AudioStatus } from './heroAudio';
import { subscribeFilmAudio } from './mediaAudioCoordinator';

export default function HeroSound({ presence }: { presence: RefObject<(value: number, immediate?: boolean) => void> }) {
  const [status, setStatus] = useState<AudioStatus>('off');
  const controller = useRef<ReturnType<typeof createHeroAudio> | null>(null);
  useEffect(() => {
    controller.current = createHeroAudio(setStatus);
    const unsubscribe = subscribeFilmAudio(value => controller.current?.setSuppressed(value));
    presence.current = value => controller.current?.update(value);
    // The first timeline paint may precede this passive effect.
    const p = Number(window.__og?.progress || 0);
    const active = !!window.__og?.cinematic;
    const stage = document.querySelector('.hero-stage')!;
    let visibleArea = 0;
    const paint = () => {
      const current = Number(window.__og?.progress ?? p);
      const cinematic = Boolean(window.__og?.cinematic ?? active);
      const t = Math.max(0, Math.min(1, (current - .12) / .24));
      controller.current?.update(visibleArea * (cinematic ? 1 - t * t * (3 - 2 * t) : 1), visibleArea === 0 || (cinematic && current >= .74));
    };
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      // Begin the mobile fade while the last half of the hero is leaving.
      visibleArea = entry.isIntersecting ? Math.min(1, entry.intersectionRatio * 2) : 0;
      paint();
    }, { threshold: [0, .001, ...Array.from({ length: 20 }, (_, i) => (i + 1) / 20)] });
    // Both timeline and intersection must agree before audio is eligible.
    presence.current = (value, immediate) => controller.current?.update(visibleArea * value, immediate || visibleArea === 0);
    observer.observe(stage);
    return () => { unsubscribe(); observer.disconnect(); presence.current = () => {}; controller.current?.dispose(); controller.current = null; };
  }, [presence]);
  const enabled = status === 'on' || status === 'paused' || status === 'loading';
  const label = status === 'error' ? 'Retry hero sound' : enabled ? 'Disable hero sound' : 'Enable hero sound';
  return <div className="hero-sound">
    <button className="sound-toggle" type="button" aria-label={label} aria-pressed={enabled} onClick={() => controller.current?.toggle()}>
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M10 5 5 9H2v6h3l5 4V5Z" />{enabled ? <><path d="M14 8a6 6 0 0 1 0 8"/><path d="M17 5a10 10 0 0 1 0 14"/></> : <path d="m15 9 6 6m0-6-6 6"/>}</svg>
      <span>{status === 'loading' ? 'Loading sound' : status === 'error' ? 'Retry sound' : enabled ? 'Sound on' : 'Sound off'}</span>
      <i aria-hidden="true" />
    </button>
    <span className="sr-only" role="status">{status === 'error' ? 'Sound could not start. Activate the button to retry.' : status === 'paused' ? 'Hero sound is enabled and paused outside the hero.' : ''}</span>
  </div>;
}
