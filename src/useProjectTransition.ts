import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ramp = (a: number, b: number, p: number) => {
  const x = gsap.utils.clamp(0, 1, (p - a) / (b - a));
  return x * x * (3 - 2 * x);
};

export function useProjectTransition(root: RefObject<HTMLElement | null>, reduced: boolean) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width:1000px) and (min-height:700px) and (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)', () => {
      if (reduced || !CSS.supports('transform-style', 'preserve-3d') || !CSS.supports('overflow', 'clip')) return;
      const ctx = gsap.context(() => {
        el.dataset.motion = 'depth';
        const outgoing = el.querySelector<HTMLElement>('.passage-outgoing')!;
        const incoming = el.querySelector<HTMLElement>('.passage-incoming')!;
        const world = el.querySelector<HTMLElement>('.passage-world')!;
        const backdrop = el.querySelector<HTMLElement>('.passage-graphite')!;
        const arrival = el.querySelector<HTMLElement>('.passage-arrival')!;
        const pose = { p: 0 };
        const paint = () => {
          const p = pose.p, leave = ramp(.04, .85, p), enter = ramp(.08, .94, p);
          gsap.set(world, { z: -90 * Math.sin(p * Math.PI), force3D: true });
          gsap.set(outgoing, { xPercent: -50, yPercent: -50, x: -innerWidth * .97 * leave * leave, y: -32 * leave, z: -360 * leave, rotationY: -14 * leave, rotationX: 4 * leave, visibility: p > .98 ? 'hidden' : 'visible', force3D: true });
          gsap.set(incoming, { xPercent: -50, yPercent: -50, x: innerWidth * 1.05 * (1 - enter) ** 1.6, y: 38 * (1 - enter), z: -420 * (1 - enter), rotationY: 14 * (1 - enter), force3D: true });
          gsap.set(backdrop, { opacity: ramp(.06, .76, p) });
          gsap.set(arrival, { opacity: ramp(.76, .98, p), y: 16 * (1 - ramp(.76, .98, p)) });
          window.__og = { ...window.__og, passage: { progress: p, depth: true, outgoingZ: -360 * leave, incomingZ: -420 * (1 - enter), incomingRotationY: 14 * (1 - enter) } };
        };
        // CSS sticky owns the shell. Only its children move; no new pin spacer.
        gsap.fromTo(pose, { p: 0 }, { p: 1, ease: 'none', onUpdate: paint, scrollTrigger: {
          id: 'smile-to-six7', trigger: el, start: 'top top', end: 'bottom bottom', scrub: .2, invalidateOnRefresh: true,
          onRefresh: paint,
          onToggle: self => {
            for (const plane of [world, incoming, outgoing]) plane.style.willChange = self.isActive ? 'transform' : 'auto';
          },
        } });
        paint();
      }, el);
      return () => {
        ctx.revert();
        el.querySelectorAll<HTMLElement>('.passage-world,.passage-plane').forEach(plane => plane.style.removeProperty('will-change'));
        delete el.dataset.motion;
        window.__og = { ...window.__og, passage: { depth: false, progress: 0 } };
      };
    });
    // Static is the default even when the media query never matches.
    if (!el.dataset.motion) window.__og = { ...window.__og, passage: { depth: false, progress: 0 } };
    return () => mm.revert();
  }, [root, reduced]);
}

export function useSixSevenDepth(root: RefObject<HTMLElement | null>, reduced: boolean) {
  useLayoutEffect(() => {
    if (!root.current) return;
    const refresh = () => ScrollTrigger.refresh();
    const node = root.current;
    node.addEventListener('toggle', refresh, true);
    const mm = gsap.matchMedia();
    mm.add('(min-width:1000px) and (min-height:700px) and (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)', () => {
      if (reduced || !CSS.supports('overflow', 'clip')) return;
      const ctx = gsap.context(() => {
        root.current!.querySelectorAll<HTMLElement>('[data-six-depth]').forEach(group => {
          const planes = group.querySelectorAll<HTMLElement>('.six-depth-plane');
          const tl = gsap.timeline({ scrollTrigger: { trigger: group, start: 'top 90%', end: 'top 30%', scrub: .2, invalidateOnRefresh: true,
            onToggle: self => planes.forEach(plane => { plane.style.willChange = self.isActive ? 'transform' : 'auto'; }),
          } });
          planes.forEach((plane, i) => tl.fromTo(plane,
            { y: i ? 30 : 50, rotationX: i ? 0 : 3, rotationY: i ? 5 : -4, transformPerspective: 1600 },
            { y: 0, rotationX: 0, rotationY: 0, ease: 'none' }, 0));
        });
      }, root);
      return () => {
        ctx.revert();
        root.current?.querySelectorAll<HTMLElement>('.six-depth-plane').forEach(plane => plane.style.removeProperty('will-change'));
      };
    });
    return () => { node.removeEventListener('toggle', refresh, true); mm.revert(); };
  }, [root, reduced]);
}
