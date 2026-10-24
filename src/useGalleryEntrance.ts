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
      let visible = false;
      const ctx = gsap.context(() => {
        el.dataset.entrance = 'depth';
        const pose = { p: 0 };
        const ramp = (a: number, b: number) => { const x = gsap.utils.clamp(0, 1, (pose.p - a) / (b - a)); return x * x * (3 - 2 * x); };
        const paint = () => {
          const leave = ramp(.08, .8), arrive = ramp(.35, .96), world = ramp(.08, .6);
          gsap.set(source, { xPercent: -50, yPercent: -50, x: -innerWidth * .85 * ramp(.4, .84), z: -420 * leave, rotationY: 7 * leave, scale: 1 - .16 * leave, visibility: pose.p > .86 ? 'hidden' : 'visible', force3D: true });
          gsap.set(environment, { opacity: 1 - world });
          stage.style.setProperty('--arrival-z', `${-140 * (1 - arrive)}px`);
          source.style.willChange = visible && pose.p < .86 ? 'transform' : 'auto';
          // Diagnostic state changes only with owned motion, never a permanent loop.
          el.dataset.progress = pose.p.toFixed(4);
        };
        gsap.fromTo(pose, { p: 0 }, { p: 1, ease: 'none', onUpdate: paint, scrollTrigger: { id: 'clientscout-to-collection', trigger: el.querySelector('.collection-entrance'), start: 'top top', end: 'bottom bottom', scrub: .2, invalidateOnRefresh: true, onRefresh: paint, onToggle: self => { visible = self.isActive; paint(); } } });
        paint();
      }, el);
      return () => { ctx.revert(); gsap.set(source, { clearProps: 'transform,translate,rotate,scale,visibility,willChange' }); gsap.set(environment, { clearProps: 'opacity' }); ['--arrival-z', '--entrance-ink', '--entrance-secondary'].forEach(p => stage.style.removeProperty(p)); delete el.dataset.entrance; delete el.dataset.progress; };
    });
    return () => mm.revert();
  }, [root, reduced]);
}
