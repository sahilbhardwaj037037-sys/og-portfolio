import { useState } from 'react';
import { emberOak, emberImage } from './featuredProjects';

export function EmberCapture({ index, className = '', reveal = false }: { index: number; className?: string; reveal?: boolean }) {
  const image = emberOak.images[index];
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  return <figure className={`ember-capture ${className}`}>
    <div className="ember-image-mat" style={{ aspectRatio: `${image.width}/${image.height}` }}>
      {failed ? <div className="ember-image-error" role="status">This capture is unavailable.<span>Project notes and source links remain available.</span></div> : <>
        {reveal && !ready && <div className="ember-image-loading">Ember & Oak<span>PREPARING THE ORIGINAL CAPTURE</span></div>}
        <img src={emberImage(index)} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" style={reveal ? { opacity: ready ? 1 : 0 } : undefined} onLoad={event => { if (reveal) void event.currentTarget.decode().then(() => setReady(true)).catch(() => setFailed(true)); }} onError={() => setFailed(true)}/>
      </>}
    </div>
    <figcaption><span>{image.label}</span><span>ORIGINAL PROJECT CAPTURE</span></figcaption>
  </figure>;
}
