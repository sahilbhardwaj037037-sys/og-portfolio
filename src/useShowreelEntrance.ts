import { useCallback, useLayoutEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';

export function useShowreelEntrance(root: RefObject<HTMLElement | null>, reduced: boolean) {
  const engage = useRef<() => void>(() => {});
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width:1000px) and (min-height:700px) and (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)', () => {
      if (reduced || !CSS.supports('transform-style', 'preserve-3d') || !CSS.supports('overflow', 'clip')) return;
      const screen = el.querySelector<HTMLElement>('.showreel-screen')!;
      const echo = el.querySelector<HTMLElement>('.showreel-echo')!;
      const room = el.querySelector<HTMLElement>('.showreel-light')!;
      const video = el.querySelector('video')!;
      const pose = { p: 0 };
      let engaged = !video.paused || screen.contains(document.activeElement), visible = false;
      const ramp = (a: number, b: number) => { const t = gsap.utils.clamp(0, 1, (pose.p - a) / (b - a)); return t * t * (3 - 2 * t); };
      const paint = () => {
        const arrive = engaged ? 1 : ramp(.2, .95), leave = ramp(0, .7);
        // Keep the quotation inside its active handoff, including during scrub catch-up.
        const opacity = visible && !engaged ? ramp(0, .08) * (1 - ramp(.18, .64)) : 0;
        gsap.set(screen, { z: -180 * (1 - arrive), rotationX: 2 * (1 - arrive), y: 18 * (1 - arrive), force3D: true });
        gsap.set(echo, { xPercent: -50, yPercent: -50, z: -160 * leave, rotationY: -3 * leave, y: -innerHeight * .38 * leave, opacity, visibility: opacity > 0 ? 'visible' : 'hidden', force3D: true });
        gsap.set(room, { opacity: 1 - ramp(0, .8) });
        screen.style.willChange = visible && !engaged ? 'transform' : 'auto';
        echo.style.willChange = opacity > 0 ? 'transform,opacity' : 'auto';
        el.dataset.progress = pose.p.toFixed(4);
        el.dataset.stabilized = String(engaged);
      };
      const ctx = gsap.context(() => {
        el.dataset.entrance = 'depth';
        gsap.fromTo(pose, { p: 0 }, { p: 1, ease: 'none', onUpdate: paint, scrollTrigger: {
          id: 'gallery-to-showreel', trigger: el.querySelector('.showreel-entrance'), start: 'top top', end: 'bottom bottom', scrub: .2, invalidateOnRefresh: true,
          onRefresh: self => { visible = self.isActive; paint(); },
          onUpdate: self => { visible = self.isActive; paint(); }, onToggle: self => {
            visible = self.isActive;
            if (!visible && video.paused && !el.contains(document.activeElement)) engaged = false;
            paint();
          },
        } });
        paint();
      }, el);
      engage.current = () => { engaged = true; paint(); };
      return () => {
        engage.current = () => {}; ctx.revert();
        gsap.set([screen, echo, room], { clearProps: 'transform,translate,rotate,scale,opacity,visibility,willChange' });
        delete el.dataset.entrance; delete el.dataset.progress; delete el.dataset.stabilized;
      };
    });
    return () => mm.revert();
  }, [root, reduced]);
  return useCallback(() => engage.current(), []);
}
