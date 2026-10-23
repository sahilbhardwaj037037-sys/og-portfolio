import { useState } from 'react';
import { clientScout, scoutImage } from './featuredProjects';

export default function ClientScoutCapture({ index, className = '', reveal = false, windowed = false }: { index: number; className?: string; reveal?: boolean; windowed?: boolean }) {
  const image = clientScout.images[index];
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [attempt, setAttempt] = useState(0);
  return <figure className={`scout-capture ${className}`} data-window={windowed || undefined}>
    <div className="scout-image-mat" style={{ aspectRatio: `${image.width}/${image.height}` }}>
      {failed ? <div className="scout-image-error" role="status"><strong>Capture unavailable.</strong><span>The project story and source remain available.</span><button type="button" aria-label={`Retry ${image.label} capture`} onClick={() => { setReady(false); setFailed(false); setAttempt(value => value + 1); }}>Retry capture ↗</button></div> : <>
        {reveal && !ready && <div className="scout-image-loading"><strong>ClientScout AI</strong><span>PREPARING THE ORIGINAL CAPTURE</span></div>}
        <img key={attempt} src={scoutImage(index)} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" style={reveal ? { opacity: ready ? 1 : 0 } : undefined} onLoad={event => { if (reveal) void event.currentTarget.decode().then(() => setReady(true)).catch(() => setFailed(true)); }} onError={() => setFailed(true)}/>
      </>}
    </div>
    <figcaption><span className="scout-full-label">{image.label}</span>{windowed && <span className="scout-window-label">Dashboard / upper-viewport excerpt · full original in gallery</span>}<span className="scout-capture-date">20 OCT 2026 / SYNTHETIC DATA</span></figcaption>
  </figure>;
}
