import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';

export const studioSettings = { minimum: .30, maximum: .70, duration: .45 };
export type EnvironmentPaint = (progress: number, cinematic: boolean) => void;

export function useLivingEnvironment(root: RefObject<HTMLDivElement | null>, stage: RefObject<HTMLDivElement | null>, reduced: boolean, update: RefObject<EnvironmentPaint>) {
  useLayoutEffect(() => {
    if (!root.current || !stage.current) return;
    const el = root.current, hero = stage.current;
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const pose = { boundary: .5 };
    let pointer = .5, progress = 0, cinematic = false, visible = true, writes = 0;
    const paint = () => {
      el.style.setProperty('--studio-boundary', `${pose.boundary * 100}%`);
      el.style.setProperty('--studio-shift', `${(pose.boundary - .5) * 100}vw`);
      window.__og = { ...window.__og, environment: { boundary: pose.boundary, writes: ++writes, reactive: fine.matches && !reduced, theme: 'smile-care' } };
    };
    const ease = gsap.quickTo(pose, 'boundary', { duration: studioSettings.duration, ease: 'power3.out', onUpdate: paint });
    const target = () => {
      const t = gsap.utils.clamp(0, 1, (progress - .12) / .24);
      const weight = cinematic ? 1 - t * t * (3 - 2 * t) : 1;
      return .5 + (pointer - .5) * weight;
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches || reduced || !visible || document.hidden || event.pointerType === 'touch') return;
      pointer = gsap.utils.mapRange(0, innerWidth, studioSettings.minimum, studioSettings.maximum, gsap.utils.clamp(0, innerWidth, event.clientX));
      ease(target());
    };
    const reset = () => { pointer = .5; ease(.5); };
    const visibility = () => {
      if (document.hidden) { ease.tween.pause(); pointer = .5; pose.boundary = .5; paint(); }
      else reset();
    };
    const motion = () => { ease.tween.pause(); pointer = .5; pose.boundary = .5; paint(); };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting && entries[0].intersectionRatio > 0; if (!visible) motion(); }, { threshold: [0, .001] });
    observer.observe(hero);
    update.current = (p, active) => {
      if (progress === p && cinematic === active) return;
      progress = p; cinematic = active;
      if (!reduced && fine.matches && visible && !document.hidden) ease(target());
    };
    hero.addEventListener('pointermove', move, { passive: true });
    hero.addEventListener('pointerleave', reset);
    window.addEventListener('blur', reset);
    window.addEventListener('resize', motion);
    fine.addEventListener('change', motion);
    document.addEventListener('visibilitychange', visibility);
    paint();
    return () => {
      ease.tween.kill(); observer.disconnect(); update.current = () => {};
      hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', reset);
      window.removeEventListener('blur', reset); window.removeEventListener('resize', motion);
      fine.removeEventListener('change', motion); document.removeEventListener('visibilitychange', visibility);
    };
  }, [root, stage, reduced, update]);
}
