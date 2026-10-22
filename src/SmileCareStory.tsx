import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const chapters = [
  { id:'frontend', number:'01', title:<>A quieter kind<br/>of first impression.</>, label:'FRONTEND DESIGN', description:'An editorial homepage, warm neutrals, and a clear visual path from services to consultation requests.', image:'/media/smile-desktop.png', alt:'Genuine desktop homepage of the Smile Care practice project', note:'Homepage / actual project capture' },
  { id:'responsive', number:'02', title:<>The same care.<br/>A different canvas.</>, label:'RESPONSIVE EXPERIENCE', description:'The real mobile presentation becomes a separate layer. The identity stays familiar while navigation, type, and content adapt to a narrower screen.', image:'/media/smile-mobile.png', alt:'Genuine mobile homepage showing the responsive Smile Care design', note:'Mobile / actual project capture' },
  { id:'build', number:'03', title:<>Beyond the surface.<br/>Into the system.</>, label:'BEHIND THE BUILD', description:'A custom PHP plugin brings six native Gutenberg blocks, appointment-request handlers, and administration tools into WordPress.', image:'/media/smile-admin.png', alt:'Genuine Smile Care WordPress administration settings and demo safeguards', note:'Administration / actual project capture' },
];
const clamp=gsap.utils.clamp(0,1);
const ramp=(a:number,b:number,p:number)=>{const v=clamp((p-a)/(b-a));return v*v*(3-2*v);};

export default function SmileCareStory({reduced}:{reduced:boolean}){
  const root=useRef<HTMLDivElement>(null);
  useLayoutEffect(()=>{
    if(!root.current)return;
    const ctx=gsap.context(()=>{
      const mm=gsap.matchMedia();
      mm.add('(min-width: 1000px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)',()=>{
        if(reduced)return;
        const el=root.current!;
        el.classList.add('has-depth');
        const desktop=el.querySelector('.story-desktop') as HTMLElement;
        const phone=el.querySelector('.story-phone') as HTMLElement;
        const admin=el.querySelector('.story-admin') as HTMLElement;
        const progressLine=el.querySelector('.story-progress-fill') as HTMLElement;
        const poses={p:0};
        const paint=()=>{
          const p=poses.p,enter=ramp(.12,.34,p),leave=ramp(.59,.76,p),build=ramp(.63,.82,p);
          const d={x:-22*enter,y:-18*p,rotateY:-4+7*enter,rotateX:2*(1-enter),opacity:1-ramp(.9,1,build)};
          const m={x:64*(1-enter)-16*leave,y:60*(1-enter)-30*leave,rotateZ:6-8*enter,opacity:enter*(1-leave)};
          // An opaque reveal keeps two screenshots' text from ghosting together.
          const a={x:28*(1-build),y:36*(1-build),rotateY:-5*(1-build),rotateX:2*(1-build),opacity:build>0?1:0,clipPath:`inset(${(1-build)*100}% 0% 0% 0%)`};
          gsap.set(desktop,{...d,transformPerspective:1600,force3D:true});
          gsap.set(phone,{...m,force3D:true});gsap.set(admin,{...a,transformPerspective:1600,force3D:true});
          gsap.set(progressLine,{scaleY:p,transformOrigin:'top'});
          el.dataset.chapter=p<.3?'frontend':p<.66?'responsive':'build';
          window.__og={...window.__og,story:{progress:p,chapter:el.dataset.chapter,desktop:d,phone:m,admin:a}};
        };
        // An explicit start survives refresh after the parent inserts its pin spacer.
        // A .to() tween can otherwise recapture a transient end value as its start.
        gsap.fromTo(poses,{p:0},{p:1,ease:'none',onUpdate:paint,scrollTrigger:{trigger:el,start:'top 35%',end:'bottom 85%',scrub:.2,invalidateOnRefresh:true}});
        paint();
        el.querySelectorAll('.story-chapter h3').forEach(heading=>gsap.fromTo(heading,{y:24},{y:0,ease:'none',scrollTrigger:{trigger:heading,start:'top 90%',end:'top 55%',scrub:true}}));
        return()=>{el.classList.remove('has-depth');window.__og={...window.__og,story:{static:true}};};
      });
      return()=>mm.revert();
    },root);
    return()=>ctx.revert();
  },[reduced]);

  return <div className="case-story" ref={root} aria-label="Smile Care project story">
    <div className="story-media" aria-hidden="true">
      <div className="story-media-label"><span>SMILE CARE CLINIC</span><span>DESIGN → DEVELOPMENT</span></div>
      <div className="story-desktop story-window"><div className="story-window-bar"><i/><i/><i/><span>Homepage / project capture</span></div><img src="/media/smile-desktop.png" alt="" width="1440" height="757" loading="lazy"/></div>
      <div className="story-phone"><div className="phone-frame"><img src="/media/smile-mobile.png" alt="" width="500" height="701" loading="lazy"/></div><span>MOBILE / SAME IDENTITY</span></div>
      <div className="story-admin story-window"><div className="story-window-bar"><i/><i/><i/><span>WordPress / custom plugin</span></div><img src="/media/smile-admin.png" alt="" width="1440" height="757" loading="lazy"/><div className="admin-annotation"><span className="annotation-dot"/> DEMO MODE — PUBLIC SUBMISSIONS ARE NOT SAVED</div></div>
      <div className="story-media-footer"><span>GENUINE CAPTURES · PRACTICE PROJECT</span><span>01 — 03</span></div>
    </div>
    <div className="story-progress" aria-hidden="true"><div className="story-progress-fill"/></div>
    <div className="story-chapters">{chapters.map(chapter=><article className="story-chapter" id={`story-${chapter.id}`} key={chapter.id} tabIndex={-1}>
      <p className="eyebrow"><span>{chapter.number}</span> {chapter.label}</p>
      <h3>{chapter.title}</h3><p>{chapter.description}</p>
      {chapter.id==='build'&&<p className="story-safeguard">Public demo submissions are simulated: no saved records or outgoing mail. This is a practice project.</p>}
      <figure className={`chapter-image chapter-image-${chapter.id}`}><img src={chapter.image} alt={chapter.alt} width={chapter.id==='responsive'?500:1440} height={chapter.id==='responsive'?701:757} loading="lazy"/><figcaption>{chapter.note}</figcaption></figure>
    </article>)}</div>
  </div>;
}
