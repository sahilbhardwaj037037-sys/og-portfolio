import { assetUrl } from './assetUrl';
// The source WAV stays untouched. Only the decoded playback buffer is softened.
export function createAmbientLoop(context: BaseAudioContext, original: AudioBuffer, overlapSeconds = .6) {
  const overlap = Math.min(Math.round(original.sampleRate * overlapSeconds), Math.floor(original.length / 4));
  const length = original.length - overlap;
  const loop = context.createBuffer(original.numberOfChannels, length, original.sampleRate);
  let maximumJoinStep = 0;
  for (let channel = 0; channel < original.numberOfChannels; channel++) {
    const input = original.getChannelData(channel), output = loop.getChannelData(channel);
    output.set(input.subarray(overlap));
    for (let i = 0; i < overlap; i++) {
      // Complementary raised-cosine weights avoid adding a gain peak at the join.
      const weight = (1 - Math.cos(Math.PI * i / (overlap - 1))) / 2;
      output[length - overlap + i] = input[original.length - overlap + i] * (1 - weight) + input[i] * weight;
    }
    maximumJoinStep = Math.max(maximumJoinStep, Math.abs(output[0] - output[length - 1]));
  }
  return { buffer: loop, overlapSeconds: overlap / original.sampleRate, maximumJoinStep };
}

export type AudioStatus = 'off' | 'loading' | 'on' | 'paused' | 'error';
export function createHeroAudio(notify: (status: AudioStatus) => void) {
  let context: AudioContext | null = null, gain: GainNode | null = null, source: AudioBufferSourceNode | null = null;
  let buffer: AudioBuffer | null = null, loading: Promise<void> | null = null;
  let enabled = false, presence = 0, disposed = false, failed = false, timer = 0, targetGain = 0;
  let meterTimer = 0, overlapSeconds = 0, maximumJoinStep = 0;
  let suppressed = false, syncEpoch = 0;
  const abort = new AbortController();
  const publish = () => {
    window.__og = { ...window.__og, sound: { enabled, presence, state: context?.state || 'uninitialized', loaded: !!buffer,
      targetGain, gain: gain?.gain.value || 0, loopDuration: buffer?.duration || 0, overlapSeconds, maximumJoinStep, sourceNodes: source ? 1 : 0, suppressed } };
  };
  const setStatus = (status: AudioStatus) => { if (!disposed) { notify(status); publish(); } };
  const fail = () => {
    if (disposed) return;
    enabled = false; failed = true; targetGain = 0;
    if (context && gain) { gain.gain.cancelScheduledValues(0); gain.gain.value = 0; void context.suspend().catch(() => {}); }
    setStatus('error');
  };
  const silence = (immediate = false) => {
    clearTimeout(timer); targetGain = 0;
    if (!context || !gain) { publish(); return; }
    const now = context.currentTime;
    if (immediate) {
      // Clear the timeline before suspension: a scheduled zero may otherwise
      // wait for an audio render quantum and retain an old gain on resume.
      gain.gain.cancelScheduledValues(0); gain.gain.value = 0;
      void context.suspend().catch(fail);
    }
    else {
      gain.gain.cancelScheduledValues(now); gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0, now + .6);
      timer = window.setTimeout(() => { if (targetGain === 0) void context?.suspend().then(publish).catch(fail); }, 650);
    }
    publish();
  };
  const sync = async () => {
    const epoch = ++syncEpoch;
    if (disposed) return;
    if (suppressed || !enabled || !presence || document.hidden || !buffer || !context || !gain) {
      silence(suppressed || document.hidden);
      if (enabled && buffer) setStatus('paused');
      return;
    }
    clearTimeout(timer);
    try {
      await context.resume();
      if (epoch !== syncEpoch) return;
      if (disposed || suppressed || !enabled || !presence || document.hidden) { silence(suppressed || document.hidden); return; }
      if (!source) { source = context.createBufferSource(); source.buffer = buffer; source.loop = true; source.connect(gain); source.start(); }
      const next = .16 * presence;
      if (Math.abs(next - targetGain) > .0001) {
        const duration = targetGain === 0 ? .6 : .12;
        targetGain = next;
        const now = context.currentTime;
        gain.gain.cancelScheduledValues(now); gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.linearRampToValueAtTime(next, now + duration);
        clearTimeout(meterTimer); meterTimer = window.setTimeout(publish, 650);
      }
      setStatus('on');
    } catch { fail(); }
  };
  const visibility = () => { if (document.hidden) { silence(true); if (enabled && buffer) setStatus('paused'); } else void sync(); };
  document.addEventListener('visibilitychange', visibility);
  publish();
  return {
    setSuppressed(value: boolean) {
      if (suppressed === value || disposed) return;
      suppressed = value; ++syncEpoch;
      if (value) { silence(true); if (enabled && buffer) setStatus('paused'); }
      else void sync();
    },
    // Called synchronously by a real button gesture before any fetch/await.
    toggle() {
      enabled = !enabled; failed = false; ++syncEpoch;
      if (!enabled) { silence(); setStatus('off'); return; }
      try {
        if (!context) { context = new AudioContext(); context.onstatechange = publish; gain = context.createGain(); gain.gain.value = 0; gain.connect(context.destination); }
        if (!suppressed) void context.resume().catch(fail);
        if (buffer) { void sync(); return; }
        setStatus('loading');
        if (!loading) loading = (async () => {
          const response = await fetch(assetUrl('/media/hero-ambient.wav'), { signal: abort.signal });
          if (!response.ok) throw new Error('Audio unavailable');
          const original = await context!.decodeAudioData(await response.arrayBuffer());
          if (disposed) return;
          const prepared = createAmbientLoop(context!, original);
          buffer = prepared.buffer; overlapSeconds = prepared.overlapSeconds; maximumJoinStep = prepared.maximumJoinStep;
        })().finally(() => { loading = null; });
        void loading.then(() => { if (enabled) void sync(); else { silence(true); if (!failed) setStatus('off'); } }).catch(fail);
      } catch { fail(); }
    },
    update(value: number, immediate = false) {
      const next = Math.max(0, Math.min(1, value));
      if (immediate && next === 0) {
        if (presence !== 0 || targetGain !== 0 || context?.state === 'running') {
          presence = 0; silence(true); if (enabled && buffer) setStatus('paused');
        }
        return;
      }
      if (presence !== next) { presence = next; void sync(); }
    },
    dispose() {
      disposed = true; enabled = false; ++syncEpoch; clearTimeout(timer); clearTimeout(meterTimer); abort.abort();
      document.removeEventListener('visibilitychange', visibility);
      if(context)context.onstatechange = null;
      source?.stop(); source?.disconnect(); gain?.disconnect(); void context?.close(); buffer = null;
    },
  };
}
