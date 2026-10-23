import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
const out='qa/phase3d';fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-background-networking','--no-first-run','--disable-sync']});
const report={browser:browser.version(),runs:[],errors:[],date:new Date().toISOString()};
async function sample(p,action){
 await p.evaluate(()=>{window.__phase3Sample={gaps:[],running:true,start:performance.now()};let last=performance.now();const tick=now=>{const r=window.__phase3Sample;r.gaps.push(now-last);last=now;if(r.running)requestAnimationFrame(tick)};requestAnimationFrame(tick)});
 const before=await p.evaluate(()=>window.__og);await action();
 return p.evaluate(before=>{const r=window.__phase3Sample;r.running=false;const gaps=r.gaps.slice(1).sort((a,b)=>a-b);return {seconds:(performance.now()-r.start)/1000,samples:gaps.length,medianMs:gaps[Math.floor(gaps.length*.5)],p95Ms:gaps[Math.floor(gaps.length*.95)],maxMs:Math.max(...gaps),longTasks:window.__longTasks.filter(t=>t.start>=r.start),videoUploads:window.__og.video.uploadedFrames-before.video.uploadedFrames,sceneRenders:window.__og.renderedFrames-before.renderedFrames,textures:window.__og.textures,canvasCount:document.querySelectorAll('canvas').length}},before);
}
const wheel=async(p,count,step)=>{for(const dir of [1,-1])for(let i=0;i<count;i++){await p.mouse.wheel(0,step*dir);await p.waitForTimeout(20)}await p.waitForTimeout(600)};
try{
 for(let run=1;run<=3;run++)for(const [label,url]of [['approved','http://127.0.0.1:5180'],['phase3d','http://127.0.0.1:5174']]){
  const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});
  await context.addInitScript(()=>{window.__longTasks=[];new PerformanceObserver(l=>window.__longTasks.push(...l.getEntries().map(e=>({start:e.startTime,duration:e.duration})))).observe({type:'longtask',buffered:true})});
  const p=await context.newPage();p.on('pageerror',e=>report.errors.push(e.message));await p.goto(url,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.__og?.modelReady);await p.waitForTimeout(1500);
  const idle=await sample(p,()=>p.waitForTimeout(2000));const heroScroll=await sample(p,()=>wheel(p,42,48));
  let passage,study,quiet,ember,emberStudy,scout,scoutStudy;
  {
   await p.locator('.project-passage').evaluate(el=>scrollTo(0,el.getBoundingClientRect().top+scrollY));await p.waitForTimeout(900);
   passage=await sample(p,()=>wheel(p,36,34));
   await p.locator('#six-product').evaluate(el=>el.scrollIntoView());await p.waitForTimeout(650);
   study=await sample(p,()=>wheel(p,20,22));quiet=await sample(p,()=>p.waitForTimeout(1400));
  }
  {
   await p.locator('.ember-passage').evaluate(el=>scrollTo(0,el.getBoundingClientRect().top+scrollY));await p.waitForTimeout(1000);
   ember=await sample(p,()=>wheel(p,36,34));
   await p.locator('#ember-experience').evaluate(el=>el.scrollIntoView());await p.waitForTimeout(700);
   emberStudy=await sample(p,()=>wheel(p,20,22));quiet=await sample(p,()=>p.waitForTimeout(1400));
  }
  if(label==='phase3d'){
   await p.locator('.scout-passage').evaluate(el=>scrollTo(0,el.getBoundingClientRect().top+scrollY));await p.waitForTimeout(1200);
   scout=await sample(p,()=>wheel(p,36,34));
   await p.locator('#scout-sources').evaluate(el=>el.scrollIntoView());await p.waitForTimeout(700);
   scoutStudy=await sample(p,()=>wheel(p,20,22));quiet=await sample(p,()=>p.waitForTimeout(1400));
  }
  report.runs.push({run,label,idle,heroScroll,passage,study,quiet,ember,emberStudy,scout,scoutStudy});console.log(label,run,JSON.stringify({idle:idle.p95Ms,hero:heroScroll.p95Ms,passage:passage?.p95Ms,study:study?.p95Ms,ember:ember?.p95Ms,emberStudy:emberStudy?.p95Ms,scout:scout?.p95Ms,scoutStudy:scoutStudy?.p95Ms,offscreenVideoUploads:scout?.videoUploads,idleProjectRenders:quiet?.sceneRenders}));await context.close();
 }
 const size=dir=>Object.fromEntries(['js','css'].map(ext=>[ext,fs.readdirSync(path.join(dir,'assets')).filter(f=>f.endsWith('.'+ext)).reduce((n,f)=>n+gzipSync(fs.readFileSync(path.join(dir,'assets',f))).length,0)]));
 report.bundles={approved:size('/private/tmp/og-phase3d-approved-phase3c-dist'),phase3d:size('dist')};
 if(report.errors.length)throw new Error(JSON.stringify(report.errors));
}catch(e){report.failure=e.stack;console.error(e);process.exitCode=1}finally{fs.writeFileSync(`${out}/performance.json`,JSON.stringify(report,null,2));await browser.close();}
