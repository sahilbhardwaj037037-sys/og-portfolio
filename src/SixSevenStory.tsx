import { useRef, useState } from 'react';
import { sixSeven, sixImage } from './featuredProjects';
import { projectThemeStyle } from './projectThemes';
import { useSixSevenDepth } from './useProjectTransition';
import ProjectTransition from './ProjectTransition';
import './featured-projects.css';

function Capture({ index, className = '' }: { index: number; className?: string }) {
  const image = sixSeven.images[index];
  const [failed, setFailed] = useState(false);
  return <figure className={`six-capture ${className}`}>
    {failed ? <div className="six-image-fallback" role="status" style={{ aspectRatio: `${image.width}/${image.height}` }}>Capture unavailable. Project notes and source remain below.</div> : <img src={sixImage(index)} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" onError={() => setFailed(true)}/>}
    <figcaption><span>{image.label}</span><span className="sr-only">17 OCT 2026</span></figcaption>
  </figure>;
}

export default function SixSevenStory({ reduced }: { reduced: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(0);
  useSixSevenDepth(root, reduced);
  return <section id="six-and-seven" ref={root} className="six-project" style={projectThemeStyle('six-and-seven')} data-project-theme="six-and-seven" aria-labelledby="six-title" tabIndex={-1}>
    <ProjectTransition reduced={reduced}/>
    <div className="six-content">
      <header className="six-heading">
        <div className="six-rail"><span className="six-practice">PRACTICE PROJECT</span></div>
        <div className="six-masthead"><h2 id="six-title" tabIndex={-1}>SIX&7<span aria-hidden="true">/</span></h2><p>EVERYDAY.<br/>IN MOTION.</p></div>
        <div className="six-intro"><h3>Commerce, with<br/>a point of view.</h3><div><p>An editorial footwear storefront, shaped around a merchant-editable Shopify theme. A custom visual language, built on Dawn’s native commerce foundation.</p><p className="six-stack">LIQUID <span>/</span> DAWN 16 <span>/</span> ONLINE STORE 2.0</p></div></div>
      </header>

      <article id="six-browse" className="six-browse six-chapter" aria-labelledby="six-browse-title">
        <div className="six-chapter-heading"><h3 id="six-browse-title">A clear path.<br/>A considered lineup.</h3><p>Custom collection presentation gives the catalog its own rhythm, while Shopify supplies the product records, sorting and filtering.</p></div>
        <div className="six-wide-study" data-six-depth><Capture index={1} className="six-depth-plane"/></div>
        <p className="six-margin-note"><span>Availability and prices reflect the captured preview, not a current offer.</span></p>
      </article>

      <article id="six-product" className="six-product six-chapter" aria-labelledby="six-product-title">
        <div className="six-product-copy"><h3 id="six-product-title">Room for<br/>the product.</h3><p>A quieter frame around imagery, size choices and product information. Custom styling and reusable information rows extend the native Dawn product experience.</p><span className="six-rule"/></div>
        <div className="six-product-study" data-six-depth><Capture index={2} className="six-product-desktop six-depth-plane"/><Capture index={5} className="six-product-mobile six-depth-plane"/></div>
      </article>

      <article id="six-responsive" className="six-responsive six-chapter" aria-labelledby="six-responsive-title">
        <div className="six-responsive-heading"><h3 id="six-responsive-title">Same identity.<br/>Different proportions.</h3><p>Three genuine 390px captures: the opening, the collection and the product. Typography and product grids adapt to the smaller canvas.</p></div>
        <div className="six-mobile-studies"><Capture index={3}/><Capture index={4}/><Capture index={5}/></div>

      </article>

      <article id="six-build" className="six-build six-chapter" aria-labelledby="six-build-title">
        <h3 id="six-build-title">Behind the composition.<br/>A native foundation.</h3>
        <div className="six-build-grid"><div><span>PRESENTATION</span><h4>A custom visual language</h4><p>Liquid sections, shared CSS and vanilla JavaScript shape the editorial hero, category stories, header and storefront details.</p></div><div><span>MERCHANT CONTROL</span><h4>Sections, blocks, settings</h4><p>Online Store 2.0 schemas expose hero media, copy, categories and presentation settings through Shopify’s theme editor.</p></div><div><span>COMMERCE FOUNDATION</span><h4>Built on Shopify Dawn</h4><p>Shopify and Dawn provide native commerce behavior. Payment processing, fulfillment and present store publication are outside this portfolio’s verified scope.</p></div></div>
        <details className="six-boundaries"><summary>Project scope & capture notes <span aria-hidden="true">+</span></summary><p>This is the <strong>six7-shopify-store</strong> practice project, separate from the SIX&7 Next.js application. These genuine screenshots were captured on {sixSeven.captured} and documented on 20 October. The desktop hero shows the approved Draft preview. No public checkout, sales results or client commission is claimed.</p><p>The anonymous store entry was password-protected during discovery. The repository contains theme source; it does not reproduce Shopify’s store data or runtime locally.</p><p>Mobile and internal-page captures are from the earlier Cream Motion Lab preview. They predate the final homepage motion refinement.</p></details>
      </article>

      <div id="six-evidence" className="six-evidence six-chapter">
        <div className="six-evidence-heading"><div><h3>Take a closer look.</h3></div></div>
        <div className="six-evidence-controls" role="group" aria-label="SIX&7 project screenshots">{sixSeven.images.map((image, index) => <button key={image.id} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{image.label}</button>)}</div>
        <div className={`six-evidence-image ${selected > 2 ? 'six-evidence-mobile' : ''}`}><Capture key={selected} index={selected}/></div>
      </div>

      <div id={sixSeven.exit.id} className="six-closing six-chapter" data-exit-project="six-and-seven">
        <div className="six-closing-composition" data-six-depth><h3>Made to move.<br/><span>Built to edit.</span></h3><Capture index={0} className="six-closing-image six-depth-plane"/></div>
        <div className="six-closing-links"><p>A practice in editorial commerce.<br/>A foundation for merchant control.</p><div><a href={sixSeven.repository} target="_blank" rel="noopener noreferrer">GitHub Repository For Shopify Six&7 <span aria-hidden="true">↗</span></a><a href={sixSeven.storefront} target="_blank" rel="noopener noreferrer">Password-protected storefront <span aria-hidden="true">↗</span></a></div></div>
      </div>
    </div>
  </section>;
}
