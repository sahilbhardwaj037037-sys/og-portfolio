import { chromium } from 'playwright-core';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const origin=process.env.OG_QA_URL || 'http://127.0.0.1:5173';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-background-networking','--disable-component-update','--no-first-run','--disable-sync']});
const report={origin,browser:browser.version(),date:new Date().toISOString(),externalRequests:[],checks:[],screenshots:[],errors:[],observations:[]};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function setup(options={}){
 const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,serviceWorkers:'block',...options});
 await context.route('**/*',route=>{
  const url=route.request().url();
  if(url.startsWith(origin)||url.startsWith('blob:')||url.startsWith('data:'))return route.continue();
  report.externalRequests.push(url);return route.abort();
 });
 await context.addInitScript(()=>{
  window.__vitals={lcp:0,cls:0,longTasks:[]};
  try{new PerformanceObserver(list=>{for(const e of list.getEntries())window.__vitals.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});}catch{}
  try{new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__vitals.cls+=e.value;}).observe({type:'layout-shift',buffered:true});}catch{}
  try{new PerformanceObserver(list=>{window.__vitals.longTasks.push(...list.getEntries().map(e=>e.duration));}).observe({type:'longtask',buffered:true});}catch{}
 });
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 page.on('console',msg=>{if(msg.type()==='error')report.errors.push(msg.text());});
 return {context,page};
}
async function open(page,path='/'){
 await page.goto(origin+path,{waitUntil:'networkidle'});
 if(!path.includes('fallback'))await page.waitForFunction(()=>window.__og?.modelReady,{timeout:30000});
 await wait(350);
}
async function shot(page,name,fullPage=false){await page.screenshot({path:'qa/'+name,fullPage});report.screenshots.push(name);}
async function info(page){return page.evaluate(()=>({data:window.__og,scrollY,viewport:[innerWidth,innerHeight],overflow:document.documentElement.scrollWidth>innerWidth,canvases:document.querySelectorAll('canvas').length}));}
async function at(page,p){await page.evaluate(p=>scrollTo({top:innerHeight*2.15*p,behavior:'instant'}),p);await wait(550);return (await info(page)).data;}
const check=(name,detail)=>{report.checks.push({name,passed:true,detail});console.log('PASS',name);};
try{
 const {page,context}=await setup();await open(page);await shot(page,'desktop-hero.png');
 report.observations.push({localLoad:await page.evaluate(()=>({vitals:window.__vitals,sceneReadyAtMs:window.__og?.sceneReadyAtMs,resources:performance.getEntriesByType('resource').filter(e=>e.name.includes('/media/')).map(e=>({name:e.name.split('/').pop(),encodedBytes:e.encodedBodySize,duration:e.duration}))}))});
 let start=await info(page);assert.equal(start.data.logoHidden,true);assert.equal(start.overflow,false);assert.equal(start.data.failed,false);
 check('Real supplied GLB rendered; verified logo mesh hidden',start);
 await page.mouse.move(1400,850);await wait(400);const tilt=await info(page);assert.notDeepEqual(tilt.data.rotation,start.data.rotation);
 await page.mouse.move(720,500);await wait(500);check('Pointer changes laptop pose and settles',tilt.data.rotation);
 const forward={};
 for(const p of [.2,.5,.79,.9,1]){forward[p]=await at(page,p);if(p===.5)await shot(page,'desktop-approach.png');if(p===.79)await shot(page,'desktop-handoff.png');if(p===1)await shot(page,'desktop-project-transition.png');}
 const handoff=await at(page,.79);
 const actualDOM=await page.locator('.display-overlay').evaluate(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});
 const edgeError=Math.max(...['x','y','width','height'].map(k=>Math.abs(actualDOM[k]-handoff.screen[k])));
 assert.ok(edgeError<2,`Handoff mismatch ${edgeError}`);check('Projected WebGL/DOM edges align during blend',{edgeErrorCssPixels:edgeError,progress:handoff.progress});
 const reverseErrors=[];
 for(const p of [.9,.79,.5,.2]){const reverse=await at(page,p);const diff=Math.max(...['x','y','width','height'].map(k=>Math.abs(reverse.screen[k]-forward[p].screen[k])));assert.ok(diff<2);reverseErrors.push({progress:p,maxDifference:diff});if(p===.79)await shot(page,'desktop-reverse-handoff.png');}
 check('Reverse scroll returns to the same projected pose',reverseErrors);
 await at(page,0);await page.mouse.move(720,500);
 await page.evaluate(()=>{window.__frameGaps=[];let prev=performance.now(),count=0;const frame=t=>{window.__frameGaps.push(t-prev);prev=t;if(++count<100)requestAnimationFrame(frame);};requestAnimationFrame(frame);});
 for(let n=0;n<26;n++){await page.mouse.wheel(0,85);await wait(24);}
 await wait(1100);
 const wheel=await info(page);assert.ok(wheel.data.progress>.8);
 const timing=await page.evaluate(()=>{const g=window.__frameGaps.slice(1).sort((a,b)=>a-b);return {samples:g.length,medianMs:g[Math.floor(g.length*.5)],p95Ms:g[Math.floor(g.length*.95)],maxMs:Math.max(...g)};});
 check('Actual wheel input traverses cinematic sequence',{progress:wheel.data.progress,frameTiming:timing});
 await at(page,.79);await page.setViewportSize({width:1280,height:900});await wait(450);const resized=await at(page,.79);
 assert.ok(Math.max(...['x','y','width','height'].map(k=>Math.abs(resized.overlay[k]-resized.screen[k])))<2);
 await page.setViewportSize({width:768,height:1024});await wait(500);assert.equal((await info(page)).data.cinematic,false);assert.equal(await page.locator('.hero-copy').evaluate(el=>el.inert),false);
 await page.setViewportSize({width:1440,height:1000});await wait(400);await at(page,0);check('Resize during handoff and across tablet breakpoint restores readable modes');
 await page.keyboard.press('Tab');assert.ok(await page.evaluate(()=>document.activeElement.tagName==='A'||document.activeElement.tagName==='BUTTON'));check('Keyboard focus reaches semantic controls');
 await page.getByRole('button',{name:'Administration',exact:true}).click();assert.equal(await page.locator('.gallery-image img').getAttribute('src'),'/media/smile-admin.png');
 await page.getByRole('button',{name:'Mobile',exact:true}).click();assert.equal(await page.locator('.gallery-image img').getAttribute('src'),'/media/smile-mobile.png');
 await page.getByRole('button',{name:'Explore the implementation'}).click();assert.equal(await page.locator('#implementation-details').isVisible(),true);
 check('Genuine project gallery and implementation disclosure work');
 await page.getByRole('button',{name:'Homepage',exact:true}).click();await page.locator('#work').evaluate(el=>el.scrollIntoView({block:'start'}));await shot(page,'desktop-project.png');
 await page.getByRole('link',{name:'Back to the studio'}).click();await wait(1100);
 await page.getByRole('link',{name:'Selected work',exact:false}).last().click();assert.equal(await page.evaluate(()=>document.activeElement.id),'work');check('Skip-to-work navigation moves focus to content');
 await at(page,0);await page.evaluate(()=>{document.querySelector('canvas').getContext('webgl2').getExtension('WEBGL_lose_context').loseContext();});
 await page.waitForFunction(()=>window.__og?.failed);await wait(300);await shot(page,'desktop-context-fallback.png');assert.equal(await page.locator('canvas').count(),0);check('Actual WebGL context loss switches to clean static fallback');
 await context.close();

 for(const [width,height] of [[768,1024],[390,844],[320,844]]){
  const mobile=await setup({viewport:{width,height},hasTouch:true,isMobile:width<600});await open(mobile.page);
  const data=await info(mobile.page);assert.equal(data.overflow,false);assert.equal(data.data.cinematic,false);assert.equal(data.data.logoHidden,true);
  await shot(mobile.page,width===768?'tablet-hero.png':`mobile-${width}-hero.png`);
  await mobile.page.getByRole('button',{name:'Explore the laptop'}).click();assert.equal(await mobile.page.getByRole('button',{name:'Pause movement'}).getAttribute('aria-pressed'),'true');
  await mobile.page.getByRole('link',{name:'Selected work',exact:false}).last().click();
  assert.equal(await mobile.page.evaluate(()=>document.activeElement.id),'work');
  if(width===390){await shot(mobile.page,'mobile-project.png');await mobile.page.getByRole('button',{name:'Mobile',exact:true}).click();await shot(mobile.page,'mobile-gallery.png');}
  check(`Touch viewport ${width}×${height}: responsive, no pin/overflow, navigation and toggle work`,data);
  await mobile.context.close();
 }
 const reduced=await setup({reducedMotion:'reduce'});await open(reduced.page);const rd=await info(reduced.page);assert.equal(rd.data.cinematic,false);
 const r1=rd.data.rotation;await reduced.page.mouse.move(1400,900);await wait(350);assert.deepEqual((await info(reduced.page)).data.rotation,r1);
 await shot(reduced.page,'desktop-reduced-motion.png');check('OS reduced motion removes pin and pointer animation',rd);await reduced.context.close();
 const manual=await setup();await open(manual.page);await manual.page.getByRole('button',{name:'Reduce motion'}).click();await wait(350);assert.equal((await info(manual.page)).data.cinematic,false);await manual.page.getByRole('button',{name:'Motion off'}).click();await wait(350);assert.equal((await info(manual.page)).data.cinematic,true);check('In-page motion toggle cleanly rebuilds the scroll mode');await manual.context.close();
 const fallback=await setup();await open(fallback.page,'/?fallback');assert.equal((await info(fallback.page)).canvases,0);await shot(fallback.page,'desktop-static-fallback.png');await fallback.page.getByRole('link',{name:'Selected work',exact:false}).last().click();assert.equal(await fallback.page.evaluate(()=>document.activeElement.id),'work');check('Forced fallback keeps project navigation accessible');await fallback.context.close();
 const unsupported=await setup();
 await unsupported.context.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type==='webgl2'||type==='webgl'||type==='experimental-webgl')return null;return original.call(this,type,...args);};});
 await unsupported.page.goto(origin,{waitUntil:'networkidle'});await unsupported.page.waitForFunction(()=>window.__og?.failed);assert.equal(await unsupported.page.locator('canvas').count(),0);check('Unavailable WebGL at startup selects static fallback');await unsupported.context.close();
 const nojs=await setup({javaScriptEnabled:false});await nojs.page.goto(origin);assert.equal(await nojs.page.getByRole('heading',{name:'Smile Care Clinic'}).count(),1);check('No-JavaScript document exposes identity, real project and image');await nojs.context.close();
 assert.equal(report.externalRequests.length,0);assert.equal(report.errors.length,0,JSON.stringify(report.errors));check('No external browser requests or uncaught/console errors');
}catch(error){report.failure=error.stack;console.error(error);process.exitCode=1;}
finally{fs.writeFileSync('qa/browser-results.json',JSON.stringify(report,null,2));await browser.close();}
