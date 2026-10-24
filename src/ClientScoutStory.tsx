import { useRef, useState } from 'react';
import { clientScout, scoutImage } from './featuredProjects';
import { projectThemeStyle } from './projectThemes';
import ClientScoutCapture from './ClientScoutCapture';
import ClientScoutTransition from './ClientScoutTransition';
import { useClientScoutStudies } from './useClientScoutMotion';
import './clientscout.css';

export default function ClientScoutStory({ reduced }: { reduced: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(0);
  useClientScoutStudies(root, reduced);
  return <section id="clientscout-ai" ref={root} className="scout-project" style={projectThemeStyle('clientscout-ai')} data-project-theme="clientscout-ai" aria-labelledby="scout-title" tabIndex={-1}>
    <ClientScoutTransition reduced={reduced}/>
    <div className="scout-content">
      <header className="scout-introduction">
        <div className="scout-rail"><span>SOFTWARE / LEAD DISCOVERY & CRM</span><span className="scout-development">IN DEVELOPMENT</span></div>
        <h2 id="scout-title" tabIndex={-1}>ClientScout <span>AI</span></h2>
        <div className="scout-intro-grid"><h3>From a lead,<br/>to a considered<br/><em>next step.</em></h3><div><p>An AI-assisted lead discovery and CRM application under active development. A local workspace for collecting leads, reviewing evidence and preparing a deliberate next step.</p><dl className="scout-snapshot"><div><dt>ENVIRONMENT</dt><dd>Local · single user</dd></div><div><dt>CAPTURED</dt><dd>20 October 2026</dd></div><div><dt>RECORDS</dt><dd>Synthetic demonstration data</dd></div></dl></div></div>
        <p className="scout-disclosure">These genuine development snapshots include pending local 5.2 changes. They are not clean-checkout 5.1 screenshots or evidence of a production deployment. Providers were disabled for capture.</p>
      </header>

      <article id="scout-workflow" className="scout-chapter scout-workflow" aria-labelledby="scout-workflow-title">
        <div className="scout-heading-row"><h3 id="scout-workflow-title">One workspace.<br/><em>Distinct decisions.</em></h3><p>Prospecting can span supplied records, website observations and draft messages. ClientScout brings that context together while keeping the source, the evidence and the unknowns separate.</p></div>
        <ol className="scout-workflow-list"><li><span>01</span><h4>Collect the context.</h4><p>Add supplied URLs or CSV records. Keep attributed source discoveries separate.</p></li><li><span>02</span><h4>Inspect the evidence.</h4><p>Request permitted checks. Missing observations stay unknown, rather than becoming invented findings.</p></li><li><span>03</span><h4>Choose the next step.</h4><p>Review a lead, record a status or prepare a draft. Human review remains part of the workflow.</p></li></ol>
      </article>

      <article id="scout-crm" className="scout-chapter scout-crm" aria-labelledby="scout-crm-title">
        <div className="scout-heading-row"><h3 id="scout-crm-title">Keep the lead.<br/><em>Keep the context.</em></h3><p>Search, filter and maintain saved leads, statuses and notes. A detail view brings the supplied record and its evidence entry points together.</p></div>
        <div className="scout-crm-images"><ClientScoutCapture index={2}/><div><div data-scout-study><ClientScoutCapture index={3} className="scout-study-plane"/></div><p className="scout-editorial-note">The names are fictional. The interface is real.<span>“Contacted” and “Won” are user-recorded demo statuses, not verified business outcomes or automatic communications.</span></p></div></div>
      </article>

      <article id="scout-sources" className="scout-chapter scout-sources" aria-labelledby="scout-sources-title">
        <div className="scout-heading-row"><h3 id="scout-sources-title">Your records.<br/><em>Explicit source searches.</em></h3><p>Importing supplied data and requesting discovery are separate actions. Neither is represented here as an autonomous prospecting service.</p></div>
        <div className="scout-source-studies" data-scout-study><div><span className="scout-study-label">SUPPLIED RECORDS</span><ClientScoutCapture index={4} className="scout-study-plane"/><p>URL normalization and deduplication; bounded UTF-8 CSV imports. The source accepts up to 1 MiB and 500 rows.</p></div><div><span className="scout-study-label">CONTROLLED DISCOVERY</span><ClientScoutCapture index={5} className="scout-study-plane"/><p>Explicitly started, bounded OpenStreetMap/Overpass searches. This capture shows the source disabled and preserves its attribution.</p></div></div>
        <p className="scout-small-note">These are the original component captures, not full-window screenshots. No successful source search is illustrated.</p>
      </article>

      <article id="scout-evidence" className="scout-chapter scout-evidence" aria-labelledby="scout-evidence-title">
        <div className="scout-heading-row"><h3 id="scout-evidence-title">Make room<br/><em>for “unknown.”</em></h3><p>Permission precedes an audit. Assessments distinguish observed evidence from missing information. No completed audit, verified contact or generated AI result has been added to these captures.</p></div>
        <div className="scout-evidence-studies"><div><ClientScoutCapture index={6}/><p className="scout-editorial-note">A clear boundary,<br/>before the request.<span>The actual audit interface shows permission controls and an empty history. It does not demonstrate successful live-provider acceptance.</span></p></div><ClientScoutCapture index={7}/></div>
      </article>

      <article id="scout-build" className="scout-chapter scout-build" aria-labelledby="scout-build-title">
        <h3 id="scout-build-title">A visible interface.<br/><em>A persistent foundation.</em></h3>
        <ol className="scout-architecture" aria-label="Verified application architecture"><li><span>INTERFACE</span><strong>React / TypeScript</strong><p>Vite · typed services · navigation</p></li><li><span>APPLICATION</span><strong>FastAPI / Pydantic</strong><p>Explicit requests · bounded managers</p></li><li><span>PERSISTENCE</span><strong>SQLAlchemy / SQLite</strong><p>Explicit Alembic migrations</p></li></ol>
        <div className="scout-status-heading"><h4>Built, pending, unverified.</h4><p>The source state matters as much as the screen.</p></div>
        <dl className="scout-status"><div><dt>Committed 5.1</dt><dd>Lead management, imports, explicit audit/discovery workflows, evidence assessments, reviewed-draft preparation and the durable offline research foundation.</dd></div><div><dt>Pending local 5.2</dt><dd>Supervised-discovery preparation, approval, dispatch and result handling. This work is uncommitted; it is not released through the published development branch.</dd></div><div><dt>Live acceptance unverified</dt><dd>Provider availability, supervised external execution and current end-to-end external AI delivery. Source code and mocked tests do not establish live acceptance.</dd></div><div><dt>Planned or deferred</dt><dd>Autonomous scheduling, notifications, automatic outreach, cloud sync and a production multi-user service are not operational.</dd></div></dl>
        <details className="scout-source-notes"><summary>Source, snapshots & application boundaries <span aria-hidden="true">+</span></summary><p>The inspected development revision is <code>8ceb244</code> on <code>feature/checkpoint-5</code>. Its committed application is the 5.1 foundation; repository main is older. The October 20 captures came from a local working tree containing pending 5.2 changes and a separate synthetic database.</p><p>Optional backend-only Gemini writing and reviewed-draft preparation exist in source. No Proposal Studio output is visually demonstrated here. No ClientScout backend, provider workflow, real lead database or user profile is connected to this portfolio.</p><p>No public live demo was verified. The screenshot provenance documents no new license grant; underlying source/provider obligations remain applicable.</p></details>
      </article>

      <article id="scout-responsive" className="scout-chapter scout-responsive" aria-labelledby="scout-responsive-title"><div className="scout-responsive-heading"><h3 id="scout-responsive-title">Same context.<br/><em>A different frame.</em></h3><p>Actual tablet, mobile opening and navigation captures. They show these responsive views, not complete mobile acceptance of every application workflow.</p></div><div className="scout-responsive-images"><ClientScoutCapture index={8}/><ClientScoutCapture index={9}/><ClientScoutCapture index={10}/></div></article>

      <div id="scout-gallery" className="scout-chapter scout-gallery"><div className="scout-heading-row"><div><h3>Inspect the<br/><em>real workspace.</em></h3></div><p>Eleven genuine views. Full originals, including the complete dashboard and assessment.</p></div><div className="scout-gallery-controls" role="group" aria-label="ClientScout AI project screenshots">{clientScout.images.map((image, index) => <button key={image.file} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{image.label}</button>)}</div><div className={`scout-gallery-image ${selected >= 8 ? 'scout-gallery-portrait' : ''}`}><ClientScoutCapture key={selected} index={selected}/></div><div className="scout-gallery-footer"><p>Development snapshot / {clientScout.captured}<br/>Synthetic records · providers disabled · UI preserved as captured</p><a href={scoutImage(selected)} target="_blank" rel="noopener noreferrer">Open full {clientScout.images[selected].label.toLowerCase()} capture <span aria-hidden="true">↗</span></a></div></div>

      <div id={clientScout.exit.id} className="scout-chapter scout-closing" data-exit-project="clientscout-ai"><div className="scout-closing-heading"><span className="scout-development">ACTIVE DEVELOPMENT</span></div><h3>A clearer view.<br/><em>A deliberate next step.</em></h3><div className="scout-closing-bottom"><p>Local application.<br/>No verified public live demo.</p><div><a href={clientScout.repository} target="_blank" rel="noopener noreferrer">GitHub Repository for ClientScout AI <span aria-hidden="true">↗</span></a><a href={clientScout.development} target="_blank" rel="noopener noreferrer">Current Development Source <span aria-hidden="true">↗</span></a></div></div></div>
    </div>
  </section>;
}
