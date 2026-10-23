import { chromium } from 'playwright-core';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const origin=process.env.OG_QA_URL||'http://127.0.0.1:5183',out='qa/phase22';
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-background-networking','--no-first-run','--disable-sync']});
const report={origin,date:new Date().toISOString(),browser:browser.version(),checks:[],errors:[]};
const pass=(name,detail)=>{report.checks.push({name,detail});console.log('PASS',name)};
async function create(options={},failure=''){
 const context=await browser.newContext({viewport:{width:1440,height:1000},...options});
 await context.addInitScript(failure=>{
  window.__audioContexts=[];window.__audioGains=[];window.__audioSources=[];
  const Original=window.AudioContext;
  window.AudioContext=class extends Original {
   constructor(...args){super(...args);window.__audioContexts.push(this)}
   createGain(){const gain=super.createGain();window.__audioGains.push(gain);return gain}
   createBufferSource(){const source=super.createBufferSource();window.__audioSources.push(source);return source}
   resume(){if(failure==='blocked')return Promise.reject(new DOMException('QA policy','NotAllowedError'));return super.resume()}
  };
  if(failure==='network'){const original=window.fetch;window.fetch=(url,...args)=>String(url).includes('hero-ambient.wav')?Promise.reject(new TypeError('QA offline')):original(url,...args)}
 },failure);
 const page=await context.newPage();const audioRequests=[];
 page.on('request',r=>{if(r.url().endsWith('/hero-ambient.wav'))audioRequests.push(r.url())});
 page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text())});
 await page.goto(origin,{waitUntil:'networkidle'});await page.waitForFunction(()=>window.__og?.modelReady);await page.waitForTimeout(1100);
 return {context,page,audioRequests};
}
const data=p=>p.evaluate(()=>window.__og);
const pause=(p,n=700)=>p.waitForTimeout(n);
const shot=(p,name)=>p.screenshot({path:`${out}/${name}.png`});
async function at(p,n){await p.evaluate(n=>scrollTo({top:innerHeight*2.15*n,behavior:'instant'}),n);await pause(p);return data(p)}
const audio=p=>p.evaluate(()=>({context:window.__audioContexts[0]?.state,count:window.__audioContexts.length,gain:window.__audioGains[0]?.gain.value,sourceCount:window.__audioSources.length,diagnostics:window.__og.sound}));
try{
 const {context,page,audioRequests}=await create();
 assert.equal(audioRequests.length,0);assert.equal((await audio(page)).count,0);assert.equal((await data(page)).environment.boundary,.5);await shot(page,'desktop-default');
 pass('Fresh load is 50/50 and silent, with zero audio fetches or AudioContexts');
 await page.mouse.move(5,450);await pause(page);assert.ok((await data(page)).environment.boundary<.31);await shot(page,'desktop-graphite');
 await page.mouse.move(1435,450);await pause(page);assert.ok((await data(page)).environment.boundary>.69);await shot(page,'desktop-ivory');
 await page.locator('.hero-stage').dispatchEvent('pointerleave');await pause(page);assert.equal((await data(page)).environment.boundary,.5);
 const settled=(await data(page)).environment.writes;await pause(page,800);assert.equal((await data(page)).environment.writes,settled);pass('Pointer adjusts both directions, resets to 50/50, and environment updates settle');
 await page.getByRole('button',{name:'Enable hero sound'}).click();await page.waitForFunction(()=>window.__og.sound.loaded);await pause(page,900);
 let sound=await audio(page);assert.ok(sound.gain>.15&&sound.gain<=.161);assert.equal(sound.context,'running');assert.equal(sound.sourceCount,1);assert.equal(audioRequests.length,1);await shot(page,'desktop-sound-on');pass('Explicit speaker activation lazily loads the exact WAV, fades to restrained gain, and starts one looping source',sound);
 await page.getByRole('button',{name:'Disable hero sound'}).click();await pause(page,100);sound=await audio(page);assert.ok(sound.gain>0&&sound.gain<.16);await pause(page,650);assert.equal((await audio(page)).context,'suspended');assert.equal((await audio(page)).gain,0);pass('Switching off fades before suspension');
 await page.getByRole('button',{name:'Enable hero sound'}).click();await pause(page,850);assert.equal((await audio(page)).sourceCount,1);
 const forward={};for(const t of [.2,.4,.79]){forward[t]=await at(page,t);if(t===.79)await shot(page,'desktop-handoff')}
 await pause(page,650);sound=await audio(page);assert.equal(sound.gain,0);assert.equal(sound.context,'suspended');assert.equal(sound.diagnostics.enabled,true);assert.equal(await page.locator('.hero-sound').evaluate(e=>e.inert),true);
 for(const t of [.79,.4,.2]){const reverse=await at(page,t);const error=Math.max(...['x','y','width','height'].map(k=>Math.abs(reverse.screen[k]-forward[t].screen[k])));assert.ok(error<.05)}
 await at(page,0);await pause(page,700);assert.equal((await audio(page)).context,'running');await shot(page,'desktop-reverse');pass('Sound fades before Smile Care, retains intent on reverse, and protected camera/DOM geometry reverses exactly');
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'))});await pause(page,200);assert.equal((await audio(page)).context,'suspended');assert.equal((await audio(page)).gain,0);
 await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'))});await pause(page,800);assert.equal((await audio(page)).context,'running');pass('Visibility handler immediately silences/suspends and resumes prior enabled intent (simulated hidden state)');
 await page.getByRole('button',{name:'Disable hero sound'}).click();await pause(page);
 const loop=await page.evaluate(async()=>{
  const {createAmbientLoop}=await import('/src/heroAudio.ts');
  const offline=new OfflineAudioContext(2,48000,48000);
  const original=await offline.decodeAudioData(await (await fetch('/media/hero-ambient.wav')).arrayBuffer());
  const prepared=createAmbientLoop(offline,original);
  const renderer=new OfflineAudioContext(2,prepared.buffer.length*2,48000);const source=renderer.createBufferSource();source.buffer=prepared.buffer;source.loop=true;source.connect(renderer.destination);source.start();const rendered=await renderer.startRendering();
  const overlap=Math.round(original.sampleRate*prepared.overlapSeconds),length=prepared.buffer.length;
  let addedJump=0,cycleDifference=0;
  for(let channel=0;channel<2;channel++){
   const input=original.getChannelData(channel),output=rendered.getChannelData(channel);
   addedJump=Math.max(addedJump,Math.abs((output[length]-output[length-1])-(input[overlap]-input[overlap-1])));
   for(let i=0;i<length;i+=479)cycleDifference=Math.max(cycleDifference,Math.abs(output[i]-output[i+length]));
  }
  return {sourceDuration:original.duration,playbackDuration:prepared.buffer.duration,overlap:prepared.overlapSeconds,maximumJoinStep:prepared.maximumJoinStep,addedJump,cycleDifference};
 });assert.equal(loop.sourceDuration,30);assert.equal(loop.playbackDuration,29.4);assert.ok(loop.addedJump<1e-7&&loop.cycleDifference<1e-7);pass('Two offline-rendered loop cycles have no inserted gap or added boundary discontinuity; original 30s WAV is only read',loop);
 const themes=await page.evaluate(async()=>{
  const {projectThemes}=await import('/src/projectThemes.ts');
  const lum=c=>{const v=c.slice(1).match(/../g).map(n=>parseInt(n,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return v[0]*.2126+v[1]*.7152+v[2]*.0722};
  const contrast=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
  return Object.entries(projectThemes).map(([id,t])=>({id,body:contrast(t.ink,t.background),secondary:contrast(t.secondary,t.background),accent:contrast(t.accent,t.background)}));
 });assert.equal(themes.length,4);assert.ok(themes.every(t=>t.body>=4.5&&t.secondary>=4.5&&t.accent>=4.5));assert.deepEqual(await page.locator('[data-project-theme]').evaluateAll(nodes=>nodes.map(node=>node.dataset.projectTheme)),['smile-care','six-and-seven','ember-and-oak','clientscout-ai']);pass('All four registered project palettes meet AA text-token contrast; all four approved showcases are built',themes);
 await page.setViewportSize({width:1280,height:800});await at(page,.79);let d=await data(page);assert.ok(Math.max(...['x','y','width','height'].map(k=>Math.abs(d.screen[k]-d.overlay[k])))<.05);await at(page,0);pass('Resize preserves protected screen/DOM alignment');await context.close();
 for(const width of [390,320]){
  const item=await create({viewport:{width,height:844},isMobile:true,hasTouch:true});assert.equal((await data(item.page)).environment.reactive,false);await item.page.mouse.move(width-2,400);await pause(item.page);assert.equal((await data(item.page)).environment.boundary,.5);assert.equal(await item.page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await shot(item.page,`mobile-${width}`);
  await item.page.getByRole('button',{name:'Enable hero sound'}).click();await item.page.waitForFunction(()=>window.__og.sound.loaded);await pause(item.page,800);await item.page.locator('#work').evaluate(e=>e.scrollIntoView());await pause(item.page,120);assert.equal((await audio(item.page)).context,'suspended');assert.equal((await audio(item.page)).gain,0);await item.page.evaluate(()=>scrollTo(0,0));await pause(item.page,900);assert.equal((await audio(item.page)).context,'running');pass(`Touch ${width}px: static composition, no overflow, explicit audio and offscreen/return behavior`);await item.context.close();
 }
 const reduced=await create({reducedMotion:'reduce'});await reduced.page.mouse.move(1400,450);await pause(reduced.page);assert.equal((await data(reduced.page)).environment.boundary,.5);assert.equal((await data(reduced.page)).environment.reactive,false);assert.equal(reduced.audioRequests.length,0);await shot(reduced.page,'reduced-motion');await reduced.context.close();pass('Reduced motion keeps a static 50/50 studio and sound off');
 for(const failure of ['network','blocked']){const item=await create({},failure);await item.page.getByRole('button',{name:'Enable hero sound'}).click();await item.page.waitForFunction(()=>document.querySelector('.sound-toggle').getAttribute('aria-label')==='Retry hero sound');await pause(item.page,1100);assert.equal(await item.page.getByRole('button',{name:'Retry hero sound'}).count(),1);assert.equal((await audio(item.page)).diagnostics.enabled,false);assert.equal((await audio(item.page)).gain,0);pass(`${failure} audio failure remains silent and exposes a persistent accessible retry`);await item.context.close()}
 assert.equal(report.errors.length,0,JSON.stringify(report.errors));pass('No console or uncaught browser errors');
}catch(error){report.failure=error.stack;console.error(error);process.exitCode=1}
finally{fs.writeFileSync(`${out}/results.json`,JSON.stringify(report,null,2));await browser.close()}
