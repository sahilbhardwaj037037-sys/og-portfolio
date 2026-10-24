// One session-level ownership contract. Media elements keep their native audio path.
const owners = new Set<symbol>();
const listeners = new Set<(suppressed: boolean) => void>();
const publish = () => listeners.forEach(listener => listener(owners.size > 0));

export function acquireFilmAudio() {
  const token = Symbol('commercial-film');
  owners.add(token); publish();
  return () => { if (owners.delete(token)) publish(); };
}

export function subscribeFilmAudio(listener: (suppressed: boolean) => void) {
  listeners.add(listener); listener(owners.size > 0);
  return () => { listeners.delete(listener); };
}
