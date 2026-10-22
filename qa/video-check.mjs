import { chromium } from 'playwright-core';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const origin=process.env.OG_QA_URL||'http://127.0.0.1:5173',out='qa/video';
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-background-networking','--disable-component-update','--no-first-run','--disable-sync']});
const report={date:new Date().toISOString(),browser:browser.version(),origin,checks:[],errors:[],performance:[],media:[]};
const pass=(name,detail)=>{report.checks.push({name,detail});console.log('PASS',name)};
async function create(options={},mode='normal'){
 const context=await browser.newContext({viewport:{width:1440,height:900},...options});
 await context.addInitScript(mode=>{
  const create=document.createElement.bind(document);
  document.createElement=function(tag,...args){const el=create(tag,...args);if(tag==='video')window.__screenVideo=el;return el};
  if(mode==='unsupported')HTMLMediaElement.prototype.canPlayType=()=>'';
  if(mode==='blocked')HTMLMediaElement.prototype.play=()=>Promise.reject(new DOMException('QA autoplay policy','NotAllowedError'));
  window.__longTasks=[];try{new PerformanceObserver(l=>window.__longTasks.push(...l.getEntries().map(e=>({start:e.startTime,ms:e.duration})))).observe({type:'longtask',buffered:true})}catch{}
 },mode);
 const page=await context.newPage();
 page.on('pageerror',e=>report.errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text())});
 await page.goto(origin,{waitUntil:'networkidle'});await page.waitForFunction(()=>window.__og?.modelReady);
 return {context,page};
}
const data=p=>p.evaluate(()=>window.__og);
const pause=(p,t=650)=>p.waitForTimeout(t);
async function at(p,t){await p.evaluate(t=>scrollTo({top:innerHeight*2.15*t,behavior:'instant'}),t);await pause(p);return data(p)}
const shot=(p,name)=>p.screenshot({path:`${out}/${name}.png`});
async function metrics(p,action){
 await p.evaluate(()=>{const sample=window.__sample={start:performance.now(),gaps:[],run:true};let last=performance.now();const tick=t=>{sample.gaps.push(t-last);last=t;if(sample.run)requestAnimationFrame(tick)};requestAnimationFrame(tick)});
 const before=await data(p);await action();
 const after=await data(p);
 const timing=await p.evaluate(()=>{const s=window.__sample;s.run=false;const a=s.gaps.slice(1).sort((a,b)=>a-b);return {seconds:(performance.now()-s.start)/1000,samples:a.length,medianMs:a[Math.floor(a.length*.5)],p95Ms:a[Math.floor(a.length*.95)],maxMs:Math.max(...a),longTasks:window.__longTasks.filter(x=>x.start>=s.start)}});
 return {timing,renderedFrames:after.renderedFrames-before.renderedFrames,textureUploads:after.video.uploadedFrames-before.video.uploadedFrames,presentedFrames:after.video.presentedFrames-before.video.presentedFrames,decodeProcessingMs:after.video.processingMs-before.video.processingMs,droppedFrames:after.video.droppedFrames-before.video.droppedFrames,textures:after.textures,renderer:after.renderer};
}
try{
 if(!process.env.OG_VIDEO_PERF_ONLY){
 const {context,page}=await create();
 const cdp=await context.newCDPSession(page);await cdp.send('Media.enable');cdp.on('Media.playerPropertiesChanged',e=>report.media.push(e));
 await page.waitForFunction(()=>window.__og?.videoBlend===1);await pause(page,1200);
 let d=await data(page);assert.equal(d.video.width,2750);assert.equal(d.video.height,1788);assert.equal(d.video.duration,29.5);assert.equal(d.logoHidden,true);assert.ok(!d.video.paused);
 const first=d.video.time;await shot(page,'desktop-playing-1');await pause(page,1800);d=await data(page);assert.ok(d.video.time>first+1);await shot(page,'desktop-playing-2');
 pass('Native video plays muted, inline, looped at source resolution on the original concealed-logo model',{data:d,attributes:await page.evaluate(()=>({muted:__screenVideo.muted,inline:__screenVideo.playsInline,loop:__screenVideo.loop}))});
 // Source frame comparison makes orientation/aspect inspection reproducible.
 await page.evaluate(()=>{__screenVideo.pause();__screenVideo.currentTime=10});await page.waitForFunction(()=>Math.abs(__screenVideo.currentTime-10)<.02&&!__screenVideo.seeking);await pause(page,400);await shot(page,'desktop-video-orientation');
 const raw=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=__screenVideo.videoWidth;c.height=__screenVideo.videoHeight;c.getContext('2d').drawImage(__screenVideo,0,0);return c.toDataURL('image/png').split(',')[1]});fs.writeFileSync(`${out}/source-frame.png`,Buffer.from(raw,'base64'));
 // Pause cannot be forced while hero is active: controller resumes on next render.
 await page.evaluate(()=>__screenVideo.play());
 const forward={};
 for(const t of [0,.08,.14,.22,.3,.5,.79,.84]){const v=await at(page,t);forward[t]=v;assert.ok(v.videoBlend>=0&&v.videoBlend<=1);if([.14,.22,.3,.79].includes(t))await shot(page,`forward-${t}`)}
 assert.equal(forward[.3].videoBlend,0);assert.equal(forward[.3].video.paused,true);
 assert.ok(forward[.14].videoBlend>forward[.22].videoBlend);
 const beforePause=await data(page);await pause(page,700);const afterPause=await data(page);assert.equal(afterPause.video.uploadedFrames,beforePause.video.uploadedFrames);
 const reverse=[];
 for(const t of [.79,.5,.3,.22,.14,.08,0]){const v=await at(page,t);const edge=Math.max(...['x','y','width','height'].map(k=>Math.abs(v.screen[k]-forward[t].screen[k])));assert.ok(edge<.05);reverse.push({progress:t,edge,blend:v.videoBlend,paused:v.video.paused})}
 assert.equal((await data(page)).videoBlend,1);assert.equal((await data(page)).video.paused,false);await shot(page,'reverse-returned-video');
 pass('Reversible continuous video-to-screenshot blend, unchanged camera geometry, zero video uploads after handoff',{forward:Object.fromEntries(Object.entries(forward).map(([p,v])=>[p,{blend:v.videoBlend,paused:v.video.paused}])),reverse});
 // Real offscreen intersection on the inline/touch layout.
 await page.setViewportSize({width:390,height:844});await at(page,0);await page.waitForFunction(()=>window.__og.video.inView&&!window.__og.video.paused);await shot(page,'mobile-playing');
 await page.locator('#work').evaluate(e=>e.scrollIntoView());await pause(page);d=await data(page);assert.equal(d.video.inView,false);assert.equal(d.video.paused,true);const off=d.video.time;await pause(page,700);assert.equal((await data(page)).video.time,off);
 await page.evaluate(()=>scrollTo(0,0));await pause(page);assert.equal((await data(page)).video.paused,false);
 pass('390px inline hero pauses offscreen and resumes on return');
 // Visibility handler tested explicitly; this does not claim a physical background-tab test.
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'))});await pause(page,300);assert.equal((await data(page)).video.paused,true);
 await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'))});await pause(page,400);assert.equal((await data(page)).video.paused,false);pass('Document visibility handler pauses/resumes (hidden property simulation)');
 await page.setViewportSize({width:1440,height:900});await at(page,.79);await page.setViewportSize({width:1280,height:800});d=await at(page,.79);assert.ok(Math.max(...['x','y','width','height'].map(k=>Math.abs(d.overlay[k]-d.screen[k])))<.05);await at(page,0);assert.equal((await data(page)).video.paused,false);pass('Resize during handoff and tablet/desktop crossings preserve alignment and playback');
 // Observe the native loop across its actual endpoint and retain genuine screenshots.
 await page.evaluate(()=>{window.__loopTimes=[];const v=__screenVideo;const tick=()=>{window.__loopTimes.push({time:v.currentTime,ready:v.readyState,now:performance.now()});if(window.__loopTimes.length<150)v.requestVideoFrameCallback(tick)};v.requestVideoFrameCallback(tick);v.currentTime=v.duration-1.3});
 await pause(page,2400);const loop=await page.evaluate(()=>window.__loopTimes);const wrapped=loop.findIndex((x,i)=>i>0&&x.time<loop[i-1].time-1);assert.ok(wrapped>0);assert.ok(loop.every(x=>x.ready>=2));pass('Native loop crosses 29.5s endpoint without an unready texture',{samples:loop.length,before:loop[wrapped-1],after:loop[wrapped],presentedGapMs:loop[wrapped].now-loop[wrapped-1].now});
 await context.close();
 for(const mode of ['unsupported','blocked','reduced']){
  const item=await create(mode==='reduced'?{reducedMotion:'reduce'}:{},mode);await pause(item.page,900);const v=await data(item.page);assert.equal(v.videoBlend,0);assert.equal(v.video.paused,true);assert.equal(v.failed,false);if(mode==='reduced')assert.equal(v.video.width,0);else assert.equal(v.video.failed,mode==='blocked'?'autoplay-blocked':'unsupported-codec');await shot(item.page,`fallback-${mode}`);pass(`${mode}: static canvas fallback retains 3D scene`,v.video);await item.context.close();
 }
 }
 // Identical camera/input, with unsupported-codec fallback as the static control.
 for(let run=1;run<=3;run++)for(const mode of ['unsupported','normal']){
  const item=await create({},mode);await pause(item.page,1400);
  const idle=await metrics(item.page,()=>pause(item.page,2000));
  const scroll=await metrics(item.page,async()=>{for(const dir of [1,-1])for(let i=0;i<42;i++){await item.page.mouse.wheel(0,48*dir);await pause(item.page,20)}await pause(item.page,400)});
  report.performance.push({run,mode,idle,scroll});console.log('PERF',run,mode,JSON.stringify({idle:idle.timing,scroll:scroll.timing,uploads:idle.textureUploads}));await item.context.close();
 }
 assert.equal(report.errors.length,0,JSON.stringify(report.errors));pass('No console or uncaught browser errors');
}catch(error){report.failure=error.stack;console.error(error);process.exitCode=1}
finally{fs.writeFileSync(`${out}/${process.env.OG_VIDEO_PERF_ONLY?'performance':'results'}.json`,JSON.stringify(report,null,2));await browser.close()}
