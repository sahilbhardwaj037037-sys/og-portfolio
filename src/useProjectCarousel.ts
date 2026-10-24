import { useLayoutEffect, useRef, useState, type RefObject } from 'react';

export function useProjectCarousel(viewport: RefObject<HTMLDivElement | null>, reduced: boolean) {
  const [active, setActive] = useState(0);
  const selected = useRef(0), command = useRef<(index: number) => void>(() => {});
  useLayoutEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>('.collection-slot'));
    const fine = matchMedia('(hover:hover) and (pointer:fine)');
    let frame = 0, timer = 0, resizeFrame = 0, suppressClick = false, clickTimer = 0;
    let gesture: { id: number; x: number; y: number; left: number; dragging: boolean } | null = null;
    const centers = () => cards.map(c => c.offsetLeft + c.offsetWidth / 2 - el.clientWidth / 2);
    const nearest = () => centers().reduce((best, x, i, a) => Math.abs(x - el.scrollLeft) < Math.abs(a[best] - el.scrollLeft) ? i : best, 0);
    const paint = () => {
      frame = 0;
      const positions = centers(), index = nearest();
      cards.forEach((card, i) => {
        const d = Math.max(-1, Math.min(1, (positions[i] - el.scrollLeft) / card.offsetWidth));
        // The nearest two screenshots carry depth; typography/scroll slots stay frontal.
        card.style.setProperty('--card-turn', !reduced && fine.matches ? `${d * -6}deg` : '0deg');
        card.style.setProperty('--card-z', !reduced && fine.matches ? `${Math.abs(d) * -45}px` : '0px');
      });
      el.dataset.nearest = String(index);
    };
    const settle = () => { if (gesture?.dragging) return; selected.current = nearest(); setActive(selected.current); paint(); };
    const queue = () => { if (!frame) frame = requestAnimationFrame(paint); clearTimeout(timer); timer = window.setTimeout(settle, 160); };
    const go = (index: number, instant = false) => {
      if (reduced) return;
      const i = Math.max(0, Math.min(cards.length - 1, index));
      el.scrollTo({ left: centers()[i], behavior: instant ? 'auto' : 'smooth' });
      queue();
    };
    command.current = go;
    const snap = () => go(nearest());
    const finish = (event?: PointerEvent, cancel = false) => {
      if (!gesture || (event && gesture.id !== event.pointerId)) return;
      const old = gesture; gesture = null;
      delete el.dataset.dragging;
      if (el.hasPointerCapture(old.id)) el.releasePointerCapture(old.id);
      if (old.dragging) {
        suppressClick = true; clearTimeout(clickTimer); clickTimer = window.setTimeout(() => { suppressClick = false; }, 0);
        if (!cancel) snap();
      }
    };
    const down = (e: PointerEvent) => {
      if (reduced || e.pointerType !== 'mouse' || e.button !== 0 || !(e.target instanceof Element) || !e.target.closest('[data-drag-surface]') || e.target.closest('a,button,input,summary')) return;
      suppressClick = false;
      gesture = { id: e.pointerId, x: e.clientX, y: e.clientY, left: el.scrollLeft, dragging: false };
    };
    const move = (e: PointerEvent) => {
      if (!gesture || gesture.id !== e.pointerId) return;
      const dx = e.clientX - gesture.x, dy = e.clientY - gesture.y;
      if (!gesture.dragging) {
        if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { gesture = null; return; }
        if (Math.abs(dx) < 8) return;
        gesture.dragging = true; el.dataset.dragging = 'true'; el.setPointerCapture(e.pointerId);
      }
      e.preventDefault(); el.scrollLeft = gesture.left - dx; queue();
    };
    const up = (e: PointerEvent) => finish(e);
    const cancel = (e: PointerEvent) => finish(e, true);
    const blur = () => finish(undefined, true);
    const click = (e: MouseEvent) => { if (suppressClick) { e.preventDefault(); e.stopPropagation(); suppressClick = false; } };
    const key = (e: KeyboardEvent) => {
      if (reduced || e.target !== el || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault(); go(e.key === 'Home' ? 0 : e.key === 'End' ? cards.length - 1 : nearest() + (e.key === 'ArrowRight' ? 1 : -1));
    };
    const focus = (e: FocusEvent) => { const index = cards.findIndex(c => c.contains(e.target as Node)); if (index >= 0) go(index, true); };
    const resize = new ResizeObserver(() => {
      finish(undefined, true); cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => { go(selected.current, true); paint(); });
    });
    el.addEventListener('scroll', queue, { passive: true }); el.addEventListener('scrollend', settle);
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', cancel); el.addEventListener('lostpointercapture', cancel); window.addEventListener('blur', blur);
    el.addEventListener('click', click, true); el.addEventListener('keydown', key); el.addEventListener('focusin', focus);
    fine.addEventListener('change', paint); resize.observe(el); go(selected.current, true); paint();
    return () => {
      finish(undefined, true); resize.disconnect(); clearTimeout(timer); clearTimeout(clickTimer); cancelAnimationFrame(frame); cancelAnimationFrame(resizeFrame);
      el.removeEventListener('scroll', queue); el.removeEventListener('scrollend', settle); el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', cancel); el.removeEventListener('lostpointercapture', cancel); window.removeEventListener('blur', blur); el.removeEventListener('click', click, true); el.removeEventListener('keydown', key); el.removeEventListener('focusin', focus); fine.removeEventListener('change', paint);
      cards.forEach(c => { c.style.removeProperty('--card-turn'); c.style.removeProperty('--card-z'); });
      command.current = () => {};
    };
  }, [viewport, reduced]);
  return { active, go: (index: number) => command.current(index) };
}
