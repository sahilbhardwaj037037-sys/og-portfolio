import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const eligible = '(min-width:1000px) and (min-height:700px) and (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)';
const ramp = (a: number, b: number, p: number) => {
  const x = gsap.utils.clamp(0, 1, (p - a) / (b - a));
  return x * x * (3 - 2 * x);
};

export function useClientScoutPassage(root: RefObject<HTMLElement | null>, reduced: boolean) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(eligible, () => {
      if (reduced || !CSS.supports('transform-style', 'preserve-3d') || !CSS.supports('overflow', 'clip')) return;
      const ctx = gsap.context(() => {
        el.dataset.motion = 'depth';
        const world = el.querySelector<HTMLElement>('.scout-world')!;
        const outgoing = el.querySelector<HTMLElement>('.scout-departing')!;
        const incoming = el.querySelector<HTMLElement>('.scout-arriving')!;
        const detail = el.querySelector<HTMLElement>('.scout-detail-plane')!;
        const cream = el.querySelector<HTMLElement>('.scout-cream')!;
        const registration = el.querySelector<HTMLElement>('.scout-registration')!;
        const caption = el.querySelector<HTMLElement>('.scout-arrival-caption')!;
        const pose = { p: 0 };
        let active = false;
        const paint = () => {
          const p = pose.p, leave = ramp(.02, .72, p), clear = ramp(.22, .76, p), enter = ramp(.2, .96, p), align = ramp(.53, .86, p);
          const zi = -500 * (1 - enter), zd = -340 + 180 * align;
          const supporting = p > .4 && p < .86;
          gsap.set(world, { z: -45 * Math.sin(p * Math.PI), force3D: true });
          gsap.set(outgoing, { xPercent: -50, yPercent: -50, y: -innerHeight * 1.35 * clear, z: -360 * leave, rotationX: -14 * leave, rotationY: 8 * leave, transformOrigin: '50% 0%', visibility: p > .78 ? 'hidden' : 'visible', force3D: true });
          gsap.set(incoming, { xPercent: -50, yPercent: -50, y: innerHeight * .68 * (1 - enter), z: zi, rotationX: 12 * (1 - enter), rotationY: -3 * (1 - enter), opacity: ramp(.12, .27, p), force3D: true });
          // Detail aligns behind the opaque dashboard before it is retired.
          gsap.set(detail, { xPercent: -50, yPercent: -50, x: innerWidth * .34 * (1 - align), y: -45 * (1 - align), z: zd, rotationY: -9 * (1 - align), opacity: ramp(.4, .5, p), visibility: p < .4 || p > .86 ? 'hidden' : 'visible', force3D: true });
          gsap.set(cream, { opacity: ramp(.08, .76, p) });
          gsap.set(registration, { opacity: ramp(.16, .6, p) });
          gsap.set(caption, { opacity: ramp(.82, .99, p), y: 10 * (1 - ramp(.82, .99, p)) });
          world.style.willChange = active ? 'transform' : 'auto';
          outgoing.style.willChange = active && p < .78 ? 'transform' : 'auto';
          incoming.style.willChange = active && p > .12 ? 'transform' : 'auto';
          detail.style.willChange = active && supporting ? 'transform' : 'auto';
          window.__og = { ...window.__og, scoutPassage: { depth: true, progress: p, outgoingZ: -360 * leave, outgoingRotationX: -14 * leave, incomingZ: zi, incomingRotationX: 12 * (1 - enter), detailZ: zd, supporting } };
        };
        gsap.fromTo(pose, { p: 0 }, { p: 1, ease: 'none', onUpdate: paint, scrollTrigger: {
          id: 'ember-to-clientscout', trigger: el, start: 'top top', end: 'bottom bottom', scrub: .2, invalidateOnRefresh: true, onRefresh: paint,
          onToggle: self => { active = self.isActive; paint(); },
        } });
        paint();
      }, el);
      return () => {
        ctx.revert();
        gsap.set(el.querySelectorAll('.scout-world,.scout-passage-plane,.scout-cream,.scout-registration,.scout-arrival-caption'), { clearProps: 'transform,translate,rotate,scale,opacity,visibility,willChange,transformOrigin' });
        delete el.dataset.motion;
        window.__og = { ...window.__og, scoutPassage: { depth: false, progress: 0 } };
      };
    });
    if (!el.dataset.motion) window.__og = { ...window.__og, scoutPassage: { depth: false, progress: 0 } };
    return () => mm.revert();
  }, [root, reduced]);
}

export function useClientScoutStudies(root: RefObject<HTMLElement | null>, reduced: boolean) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const refresh = () => ScrollTrigger.refresh();
    el.addEventListener('toggle', refresh, true);
    const mm = gsap.matchMedia();
    mm.add(eligible, () => {
      if (reduced || !CSS.supports('overflow', 'clip')) return;
      const ctx = gsap.context(() => {
        el.querySelectorAll<HTMLElement>('[data-scout-study]').forEach(group => {
          const planes = group.querySelectorAll<HTMLElement>('.scout-study-plane');
          const timeline = gsap.timeline({ scrollTrigger: { trigger: group, start: 'top 90%', end: 'top 30%', scrub: .2,
            onToggle: self => planes.forEach(plane => { plane.style.willChange = self.isActive ? 'transform' : 'auto'; }),
          } });
          planes.forEach((plane, i) => timeline.fromTo(plane, { y: i ? 18 : 28, rotationX: 2, transformPerspective: 1800 }, { y: 0, rotationX: 0, ease: 'none' }, 0));
        });
      }, el);
      return () => { ctx.revert(); gsap.set(el.querySelectorAll('.scout-study-plane'), { clearProps: 'transform,translate,rotate,scale,willChange' }); };
    });
    return () => { el.removeEventListener('toggle', refresh, true); mm.revert(); };
  }, [root, reduced]);
}
