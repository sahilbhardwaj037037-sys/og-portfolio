import { useRef, useState } from 'react';
import { emberOak } from './featuredProjects';
import { EmberCapture } from './EmberCapture';
import { projectThemeStyle } from './projectThemes';
import { useEmberStudies } from './useEmberOakMotion';
import EmberOakTransition from './EmberOakTransition';
import './ember-oak.css';

export default function EmberOakStory({ reduced }: { reduced: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(0);
  useEmberStudies(root, reduced);
  return <section id="ember-and-oak" ref={root} className="ember-project" style={projectThemeStyle('ember-and-oak')} data-project-theme="ember-and-oak" aria-labelledby="ember-title" tabIndex={-1}>
    <EmberOakTransition reduced={reduced}/>
    <div className="ember-content">
      <header className="ember-introduction">
        <div className="ember-rail"><span>SELECTED WORK / 03</span><span>FICTIONAL RESTAURANT WEBSITE CONCEPT</span></div>
        <p className="ember-kicker">A DIGITAL SENSE OF PLACE</p>
        <h2 id="ember-title" tabIndex={-1}>Ember <em>&</em> Oak</h2>
        <div className="ember-intro-bottom"><p>A place,<br/><em>before a visit.</em></p><div><p>A restaurant concept told through atmosphere, considered typography and a clear path to exploration. A warm invitation, built for the browser.</p><span>HTML / CSS / VANILLA JAVASCRIPT</span></div></div>
      </header>

      <article id="ember-atmosphere" className="ember-chapter ember-atmosphere" aria-labelledby="ember-atmosphere-title">
        <div className="ember-chapter-top"><span className="ember-number">I.</span><p className="ember-kicker">THE ATMOSPHERE</p></div>
        <div className="ember-atmosphere-heading"><h3 id="ember-atmosphere-title">Let the setting<br/><em>tell the story.</em></h3><p>The original site pairs charcoal surfaces and ember accents with serif typography and photographic storytelling. Here, espresso and cream frame the genuine work.</p></div>
        <div data-ember-study><EmberCapture index={1} className="ember-study-plane"/></div>
        <div className="ember-identity-note"><span>WARMTH / SPACE / CHARACTER</span><p>Website imagery shown as captured. The restaurant, its story and its reviews are fictional concept content.</p></div>
      </article>

      <article id="ember-experience" className="ember-chapter ember-experience" aria-labelledby="ember-experience-title">
        <div className="ember-experience-copy"><span className="ember-number">II.</span><p className="ember-kicker">THE WEBSITE EXPERIENCE</p><h3 id="ember-experience-title">An invitation<br/><em>to explore.</em></h3><p>Four menu categories give the concept a simple browsing structure. Native buttons and JavaScript switch the visible menu; the dishes and prices are illustrative.</p><div className="ember-menu-index" aria-label="Source website menu categories"><span>Starters</span><span>Mains</span><span>Desserts</span><span>Drinks</span></div></div>
        <div className="ember-menu-study" data-ember-study><EmberCapture index={2} className="ember-study-plane"/><EmberCapture index={6} className="ember-menu-mobile ember-study-plane"/></div>
      </article>

      <article id="ember-responsive" className="ember-chapter ember-responsive" aria-labelledby="ember-responsive-title">
        <div className="ember-responsive-copy"><span className="ember-number">III.</span><p className="ember-kicker">ACROSS SCREENS</p><h3 id="ember-responsive-title">The same welcome.<br/><em>Room to adapt.</em></h3><p>Responsive grids, a collapsible navigation and stacked calls to action reshape the experience for tablet and mobile. These are the original 768px and 390px views.</p></div>
        <div className="ember-responsive-images"><EmberCapture index={4} className="ember-tablet"/><EmberCapture index={5} className="ember-phone"/></div>
        <p className="ember-small-note">Explore navigation, request-form and compact 320px captures in the closer look below.</p>
      </article>

      <article id="ember-build" className="ember-chapter ember-build" aria-labelledby="ember-build-title">
        <div><span className="ember-number">IV.</span><p className="ember-kicker">BEHIND THE BUILD</p><h3 id="ember-build-title">A native foundation.<br/><em>A considered interface.</em></h3></div>
        <div className="ember-build-grid"><div><h4>Structure & rhythm</h4><p>Semantic HTML, CSS Grid and flexible layouts establish the page. Georgia-led headings bring the restaurant concept its editorial character.</p></div><div><h4>Small, purposeful interactions</h4><p>Vanilla JavaScript handles menu selection, responsive navigation and client-side reservation-request validation.</p></div><div><h4>A request, not a booking</h4><p>The source form points to Formspree. Delivery, table availability and booking confirmation have not been verified. No restaurant operations or business results are claimed.</p></div></div>
        <div className="ember-request-study"><EmberCapture index={3}/><p>Interface evidence only.<br/>No operational reservation form is embedded here.</p></div>
        <details className="ember-source-notes"><summary>About this concept & its imagery <span aria-hidden="true">+</span></summary><p>Ember & Oak is a fictional restaurant website concept, not a commissioned restaurant service. Menu prices, reviews and contact details are demonstration content. The source has no verified booking backend or form-delivery result.</p><p>These screenshots are unchanged from the inspected repository revision. Photography source and licensing records are incomplete; this showcase does not assert new image permissions. A complete original page capture is linked in the closer look.</p></details>
      </article>

      <div id="ember-evidence" className="ember-chapter ember-evidence">
        <div className="ember-evidence-heading"><div><p className="ember-kicker">A TECHNICAL CLOSER LOOK</p><h3>The work,<br/><em>at your own pace.</em></h3></div><p>Ten genuine views.<br/>Desktop, tablet and mobile.</p></div>
        <div className="ember-evidence-controls" role="group" aria-label="Ember & Oak project screenshots">{emberOak.images.map((image, index) => <button key={image.id} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{image.label}</button>)}</div>
        <div className={`ember-evidence-image ${selected >= 4 ? 'ember-evidence-portrait' : ''}`}><EmberCapture key={selected} index={selected}/></div>
        <a className="ember-full-capture" href={emberOak.fullCapture} target="_blank" rel="noopener noreferrer">View original full-page capture in the source repository <span aria-hidden="true">↗</span></a>
      </div>

      <div id={emberOak.exit.id} className="ember-closing ember-chapter" data-exit-project="ember-and-oak">
        <p className="ember-kicker">EMBER & OAK / A RESTAURANT WEBSITE CONCEPT</p>
        <div className="ember-closing-composition"><div><span className="ember-closing-mark" aria-hidden="true">E<span>&</span>O</span><h3>Crafted for<br/><em>the feeling.</em></h3></div><EmberCapture index={1}/></div>
        <div className="ember-closing-links"><p>A fictional place.<br/>A genuine frontend project.</p><div><a href={emberOak.demo} target="_blank" rel="noopener noreferrer">View Live Demo <span aria-hidden="true">↗</span></a><a href={emberOak.repository} target="_blank" rel="noopener noreferrer">GitHub Repository <span aria-hidden="true">↗</span></a></div></div>
      </div>
    </div>
  </section>;
}
