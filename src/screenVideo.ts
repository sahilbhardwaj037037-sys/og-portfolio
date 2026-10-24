import { assetUrl } from './assetUrl';
import * as THREE from 'three';

// Owns media scheduling separately from the protected camera/DOM choreography.
export function createScreenVideo(canvas: HTMLCanvasElement, invalidate: () => void, changed: () => void) {
  const video = document.createElement('video');
  video.muted = video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'none';
  const texture = new THREE.VideoTexture(video);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.flipY = false; // The supplied GLB uses top-left UVs, like the existing canvas map.
  texture.generateMipmaps = false;
  texture.minFilter = texture.magFilter = THREE.LinearFilter;
  const state = { ready: false, failed: '', uploadedFrames: 0, presentedFrames: 0, processingMs: 0, maxProcessingMs: 0 };
  texture.onUpdate = () => { state.uploadedFrames++; };
  let reduced = true, progress = 0, inView = false, loaded = false, pending = false, disposed = false;
  let frameId = 0, timer = 0;
  const desired = () => !disposed && !reduced && inView && !document.hidden && progress < .3 && !state.failed;
  const publish = () => {
    const quality = video.getVideoPlaybackQuality?.();
    window.__og = { ...window.__og, video: { ...state, paused: video.paused, time: video.currentTime,
      width: video.videoWidth, height: video.videoHeight, duration: video.duration || 0,
      droppedFrames: quality?.droppedVideoFrames || 0, totalFrames: quality?.totalVideoFrames || 0,
      inView, reduced, hidden: document.hidden, textureVersion: texture.version } };
  };
  const frame = (_now: number, metadata: VideoFrameCallbackMetadata) => {
    if (disposed) return;
    if (video.readyState >= video.HAVE_CURRENT_DATA && !state.ready) { state.ready = true; changed(); }
    state.presentedFrames++;
    const ms = (metadata.processingDuration || 0) * 1000;
    state.processingMs += ms; state.maxProcessingMs = Math.max(state.maxProcessingMs, ms);
    publish();
    if (desired()) invalidate();
    frameId = video.requestVideoFrameCallback(frame);
  };
  const fail = (reason: string) => { state.failed = reason; video.pause(); changed(); invalidate(); publish(); };
  const sync = () => {
    if (desired()) {
      if (!loaded) {
        if (!video.canPlayType('video/mp4; codecs="avc1.640032"')) { fail('unsupported-codec'); return; }
        loaded = true; video.src = assetUrl('/media/sahil-screen-animation.mp4'); video.load();
      }
      if (video.paused && !pending) {
        pending = true;
        video.play().then(() => { if (!desired()) video.pause(); }).catch(error => {
          if (!disposed && desired() && error.name !== 'AbortError') fail(error.name === 'NotAllowedError' ? 'autoplay-blocked' : 'playback-error');
        }).finally(() => { pending = false; publish(); });
      }
    } else if (!video.paused) video.pause();
    publish();
  };
  const onError = () => fail('media-error');
  video.addEventListener('error', onError);
  // A presented frame, not metadata/canplay, gates the shader; no uninitialized black texture.
  if (typeof video.requestVideoFrameCallback === 'function') frameId = video.requestVideoFrameCallback(frame);
  else timer = window.setInterval(() => {
    if (desired() && video.readyState >= video.HAVE_CURRENT_DATA) {
      if (!state.ready) { state.ready = true; changed(); }
      invalidate();
    }
  }, 1000 / 30);
  const stage = canvas.closest('.hero-stage') || canvas;
  const observer = new IntersectionObserver(entries => {
    // Edge contact has isIntersecting=true with zero visible area.
    inView = entries[0].isIntersecting && entries[0].intersectionRatio > 0;
    sync(); invalidate();
  }, { threshold: [0, .001] });
  observer.observe(stage);
  document.addEventListener('visibilitychange', sync);
  return { video, texture, state,
    update(p: number, reduce: boolean) { progress = p; reduced = reduce; sync(); },
    dispose() {
      disposed = true; observer.disconnect(); document.removeEventListener('visibilitychange', sync);
      video.removeEventListener('error', onError);
      if (frameId) video.cancelVideoFrameCallback(frameId);
      clearInterval(timer); video.pause(); texture.dispose(); video.removeAttribute('src'); video.load();
    },
  };
}
