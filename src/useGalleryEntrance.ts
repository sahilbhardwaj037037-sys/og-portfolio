import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';

export function useGalleryEntrance(root: RefObject<HTMLElement | null>, reduced: boolean) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width:1000px) and (min-height:700px) and (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)', () => {
      if (reduced || !CSS.supports('overflow', 'clip') || !CSS.supports('transform-style', 'preserve-3d')) return;
      const source = el.querySelector<HTMLElement>('.collection-departure')!;
      const environment = el.querySelector<HTMLElement>('.collection-environment')!;
      const stage = el.querySelector<HTMLElement>('.collection-stage')!;
      const ctx = gsap.context(() => {
        el.dataset.entrance = 'depth';
        const pose = { p: 0 }, departure = { p: 0 };
        let departing = false;
        const ramp = (a: number, b: number, p = pose.p) => { const x = gsap.utils.clamp(0, 1, (p - a) / (b - a)); return x * x * (3 - 2 * x); };
        const paintDeparture = () => {
          const p = departure.p, leave = ramp(.08, .8, p);
          const opacity = departing ? ramp(0, .1, p) * (1 - ramp(.58, .84, p)) : 0;
          gsap.set(source, { xPercent: -50, yPercent: -50, x: -innerWidth * .85 * ramp(.4, .84, p), z: -420 * leave, rotationY: 7 * leave, scale: 1 - .16 * leave, opacity, visibility: opacity > 0 ? 'visible' : 'hidden', force3D: true });
          source.style.willChange = opacity > 0 ? 'transform,opacity' : 'auto';
        };
        // The outgoing image belongs to the approach, before the gallery is pinned.
        // Keep its lifecycle separate from the gallery's unchanged arrival animation.
        gsap.fromTo(departure, { p: 0 }, { p: 1, ease: 'none', onUpdate: paintDeparture, scrollTrigger: {
          id: 'clientscout-departure', trigger: el.querySelector('.collection-entrance'), start: 'top bottom', end: 'top top', scrub: .2, invalidateOnRefresh: true,
          onRefresh: self => { departing = self.isActive; paintDeparture(); },
          onUpdate: self => { departing = self.isActive; paintDeparture(); },
          onToggle: self => { departing = self.isActive; paintDeparture(); },
        } });
        paintDeparture();
        const paint = () => {
          const arrive = ramp(.35, .96), world = ramp(.08, .6);
          gsap.set(environment, { opacity: 1 - world });
          stage.style.setProperty('--arrival-z', `${-140 * (1 - arrive)}px`);
          // Diagnostic state changes only with owned motion, never a permanent loop.
          el.dataset.progress = pose.p.toFixed(4);
        };
        gsap.fromTo(pose, { p: 0 }, { p: 1, ease: 'none', onUpdate: paint, scrollTrigger: { id: 'clientscout-to-collection', trigger: el.querySelector('.collection-entrance'), start: 'top top', end: 'bottom bottom', scrub: .2, invalidateOnRefresh: true, onRefresh: paint } });
        paint();
      }, el);
      return () => { ctx.revert(); gsap.set(source, { clearProps: 'transform,translate,rotate,scale,opacity,visibility,willChange' }); gsap.set(environment, { clearProps: 'opacity' }); ['--arrival-z', '--entrance-ink', '--entrance-secondary'].forEach(p => stage.style.removeProperty(p)); delete el.dataset.entrance; delete el.dataset.progress; };
    });
    return () => mm.revert();
  }, [root, reduced]);
}
