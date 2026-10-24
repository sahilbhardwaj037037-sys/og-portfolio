import { contact } from './contact';
import { destinations } from './SiteNavigation';
import './portfolio-closing.css';
const expertise = [
  { number: '01', title: 'Frontend foundations', description: 'Custom interfaces with a clear structure and room to grow.', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript'], evidence: '#scout-title', label: 'Explore ClientScout AI' },
  { number: '02', title: 'Content & commerce', description: 'WordPress websites and Shopify themes shaped around the content.', skills: ['WordPress', 'Gutenberg', 'PHP', 'Shopify', 'Liquid'], evidence: '#six-title', label: 'Explore SIX&7 Shopify' },
  { number: '03', title: 'Responsive experiences', description: 'Layouts, motion and interactions that work across screen sizes.', skills: ['Responsive design', 'CSS animation', 'GSAP', 'Interactive interfaces'], evidence: '#ember-title', label: 'Explore Ember & Oak' },
  { number: '04', title: 'Behind the interface', description: 'Application workflows and version-controlled development.', skills: ['Python', 'FastAPI', 'Git', 'GitHub'], evidence: '#scout-build', label: 'Explore the application build' },
];
export default function PortfolioClosing() {
  return <>
    <section id="skills" className="expertise closing-section" aria-labelledby="skills-title" tabIndex={-1}>
      <div className="closing-kicker"><span>EXPERTISE / THE TOOLKIT</span><span>DESIGN INTO DEVELOPMENT</span></div>
      <div className="expertise-intro"><h2 id="skills-title">Built with intent.<br/><em>Made to work.</em></h2><p>The right tools for the website you need.<br/>From a considered first impression to the details that make it usable.</p></div>
      <div className="expertise-list">{expertise.map(item => <article key={item.number} className="expertise-row"><span className="expertise-number">{item.number}</span><div><h3>{item.title}</h3><p>{item.description}</p><a href={item.evidence}>{item.label} <span aria-hidden="true">↗</span></a></div><ul aria-label={item.title + ' capabilities'}>{item.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
    </section>
    <section id="about" className="about-section closing-section" aria-labelledby="about-title" tabIndex={-1}>
      <div className="closing-kicker"><span>ABOUT / SAHIL BHARDWAJ</span><span>THE PERSON BEHIND THE BUILD</span></div>
      <div className="about-layout"><div className="about-monogram" aria-hidden="true">SB<span>/</span><small>THOUGHTFUL BY DESIGN.<br/>CONSIDERED IN CODE.</small></div><div className="about-copy"><h2 id="about-title">Care in the details.<br/><em>Clarity in the build.</em></h2><p className="about-lead">I’m Sahil, a web developer focused on custom websites and interactive experiences.</p><p>I build modern frontends, develop and customize WordPress websites, and shape Shopify themes. My focus is straightforward: a website that looks considered, works across devices and makes its next step clear.</p><p>My portfolio brings together website concepts, a Shopify theme and a React application with a Python/FastAPI backend. The case studies show the interfaces, implementation and scope behind each build.</p><a className="closing-text-link" href="#contact">Let’s talk about your website <span aria-hidden="true">↗</span></a></div></div>
    </section>
    <section id="contact" className="contact-section closing-section" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="closing-kicker"><span>CONTACT / START A CONVERSATION</span><span>YOUR NEXT WEBSITE</span></div>
      <h2 id="contact-title">Have a website in mind?<br/><em>Let’s make it work.</em></h2>
      <div className="contact-bottom"><p>A custom website, a WordPress build or a Shopify update.<br/>Share what you’re working towards and what you need.</p><div className="contact-links">
        {contact.email && <a className="contact-primary" href={'mailto:' + contact.email}>{contact.email} <span aria-hidden="true">↗</span></a>}
        {contact.upwork && <a href={contact.upwork} target="_blank" rel="noopener noreferrer">Hire Me on Upwork <span aria-hidden="true">↗</span></a>}
        {contact.fiverr && <a href={contact.fiverr} target="_blank" rel="noopener noreferrer">View Fiverr Services <span aria-hidden="true">↗</span></a>}
        <a href={contact.github} target="_blank" rel="noopener noreferrer">Explore My GitHub <span aria-hidden="true">↗</span></a>
      </div></div>
    </section>
  </>;
}
export function PortfolioFooter() {
  return <footer className="site-footer"><div className="footer-top"><a className="signature" href="#intro" aria-label="Sahil Bhardwaj, back to introduction">SB<span>/</span></a><nav aria-label="Footer navigation">{destinations.map(([id, label]) => <a key={id} href={'#' + id}>{label}</a>)}</nav></div><div className="footer-bottom"><p>© {new Date().getFullYear()} Sahil Bhardwaj</p><span>DESIGNED WITH INTENT. BUILT WITH CARE.</span><a href="#intro">Back to the studio ↑</a></div></footer>;
}
