import { useRef } from 'react';
export const destinations = [['work', 'Projects'], ['additional-projects', 'Additional Work'], ['showreel', 'Showreel'], ['skills', 'Skills'], ['about', 'About'], ['contact', 'Contact']] as const;
export default function SiteNavigation() {
  const dialog = useRef<HTMLDialogElement>(null), button = useRef<HTMLButtonElement>(null), destination = useRef<HTMLElement | null>(null);
  return <><button ref={button} className="site-menu-trigger" type="button" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>Menu <span aria-hidden="true">＋</span></button>
    <dialog ref={dialog} className="site-menu" aria-labelledby="site-menu-title" onKeyDown={e => {
      if (e.key !== 'Tab') return;
      const controls = e.currentTarget.querySelectorAll<HTMLElement>('button, a[href]');
      const first = controls[0], last = controls[controls.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }} onClose={() => { if (destination.current) { destination.current.focus({ preventScroll: true }); destination.current = null; } else if (document.activeElement === document.body) button.current?.focus(); }} onClick={e => { if (e.target === dialog.current) dialog.current.close(); }}>
      <div className="site-menu-top"><span id="site-menu-title">EXPLORE THE PORTFOLIO</span><button type="button" autoFocus aria-label="Close navigation" onClick={() => dialog.current?.close()}>Close ×</button></div>
      <nav aria-label="Main navigation">{destinations.map(([id, label], i) => <a key={id} href={'#' + id} onClick={e => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        const target = document.getElementById(id); if (!target) return;
        destination.current = target; dialog.current?.close();
        target.tabIndex = -1; target.scrollIntoView({ block: 'start', behavior: 'instant' }); target.focus({ preventScroll: true }); history.replaceState(null, '', '#' + id);
      }}><span>{String(i + 1).padStart(2, '0')}</span>{label}<span aria-hidden="true">↗</span></a>)}</nav>
    </dialog></>;
}
