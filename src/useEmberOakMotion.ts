import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const eligible = '(min-width:1000px) and (min-height:700px) and (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)';
const ramp = (a: number, b: number, p: number) => {
  const x = gsap.utils.clamp(0, 1, (p - a) / (b - a));
  return x * x * (3 - 2 * x);
};

export function useEmberPassage(root: RefObject<HTMLElement | null>, reduced: boolean) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(eligible, () => {
      if (reduced || !CSS.supports('transform-style', 'preserve-3d') || !CSS.supports('overflow', 'clip')) return;
      const ctx = gsap.context(() => {
        el.dataset.motion = 'depth';
        const world = el.querySelector<HTMLElement>('.ember-world')!;
        const editorial = el.querySelector<HTMLElement>('.ember-commerce-editorial')!;
        const product = el.querySelector<HTMLElement>('.ember-commerce-product')!;
        const incoming = el.querySelector<HTMLElement>('.ember-arriving')!;
        const warmth = el.querySelector<HTMLElement>('.ember-warmth')!;
        const caption = el.querySelector<HTMLElement>('.ember-arrival-caption')!;
        const pose = { p: 0 };
        const paint = () => {
          const p = pose.p, retreat = ramp(.02, .7, p), clear = ramp(.24, .82, p), enter = ramp(.2, .96, p), arc = Math.sin(p * Math.PI);
          const x = -innerWidth * .1 * arc, z1 = -280 * retreat, z2 = -120 - 520 * retreat, zi = -720 * (1 - enter);
          gsap.set(world, { x, z: -70 * arc, rotationY: -3 * arc, force3D: true });
          gsap.set(editorial, { xPercent: -50, yPercent: -50, x: innerWidth * (-.12 + 1.65 * clear), y: -24 * retreat, z: z1, rotationY: 7 * retreat, rotationX: 3 * retreat, force3D: true });
          gsap.set(product, { xPercent: -50, yPercent: -50, x: innerWidth * (.25 + 1.5 * clear), y: 60 - 35 * retreat, z: z2, rotationY: -8 + 12 * retreat, force3D: true });
          gsap.set(incoming, { xPercent: -50, yPercent: -50, x: -innerWidth * .38 * (1 - enter), y: 40 * (1 - enter), z: zi, rotationY: -12 * (1 - enter), opacity: ramp(.12, .3, p), force3D: true });
          gsap.set(warmth, { opacity: ramp(.1, .8, p) });
          gsap.set(caption, { opacity: ramp(.8, .99, p), y: 12 * (1 - ramp(.8, .99, p)) });
          window.__og = { ...window.__og, emberPassage: { depth: true, progress: p, editorialZ: z1, productZ: z2, incomingZ: zi, incomingRotationY: -12 * (1 - enter), worldX: x } };
        };
        gsap.fromTo(pose, { p: 0 }, { p: 1, ease: 'none', onUpdate: paint, scrollTrigger: {
          id: 'six7-to-ember', trigger: el, start: 'top top', end: 'bottom bottom', scrub: .2, invalidateOnRefresh: true, onRefresh: paint,
          onToggle: self => [world, editorial, product, incoming].forEach(plane => { plane.style.willChange = self.isActive ? 'transform' : 'auto'; }),
        } });
        paint();
      }, el);
      return () => {
        ctx.revert();
        // Scrub callbacks paint outside the initial context recording. Clear all
        // properties owned by this scene after killing it, including live toggles.
        gsap.set(el.querySelectorAll('.ember-world,.ember-passage-plane,.ember-warmth,.ember-arrival-caption'), { clearProps: 'transform,translate,rotate,scale,opacity,willChange' });
        delete el.dataset.motion;
        window.__og = { ...window.__og, emberPassage: { depth: false, progress: 0 } };
      };
    });
    if (!el.dataset.motion) window.__og = { ...window.__og, emberPassage: { depth: false, progress: 0 } };
    return () => mm.revert();
  }, [root, reduced]);
}

export function useEmberStudies(root: RefObject<HTMLElement | null>, reduced: boolean) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const refresh = () => ScrollTrigger.refresh();
    el.addEventListener('toggle', refresh, true);
    const mm = gsap.matchMedia();
    mm.add(eligible, () => {
      if (reduced || !CSS.supports('overflow', 'clip')) return;
      const ctx = gsap.context(() => {
        el.querySelectorAll<HTMLElement>('[data-ember-study]').forEach(group => {
          const planes = group.querySelectorAll<HTMLElement>('.ember-study-plane');
          const tl = gsap.timeline({ scrollTrigger: { trigger: group, start: 'top 90%', end: 'top 25%', scrub: .2,
            onToggle: self => planes.forEach(plane => { plane.style.willChange = self.isActive ? 'transform' : 'auto'; }),
          } });
          planes.forEach((plane, i) => tl.fromTo(plane, { y: i ? 24 : 35, rotationX: i ? -2 : 3, transformPerspective: 1800 }, { y: 0, rotationX: 0, ease: 'none' }, 0));
        });
      }, el);
      return () => { ctx.revert(); el.querySelectorAll<HTMLElement>('.ember-study-plane').forEach(plane => plane.style.removeProperty('will-change')); };
    });
    return () => { el.removeEventListener('toggle', refresh, true); mm.revert(); };
  }, [root, reduced]);
}
