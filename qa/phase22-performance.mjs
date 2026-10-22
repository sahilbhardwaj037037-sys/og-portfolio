import {chromium} from 'playwright-core';
import fs from 'node:fs';
const output='qa/phase22';fs.mkdirSync(output,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-background-networking','--no-first-run','--disable-sync']});
const report={date:new Date().toISOString(),browser:browser.version(),runs:[],errors:[]};
async function sample(page,action){
 await page.evaluate(()=>{const run=window.__sample={gaps:[],start:performance.now(),running:true};let last=performance.now();function tick(now){run.gaps.push(now-last);last=now;if(run.running)requestAnimationFrame(tick)}requestAnimationFrame(tick)});
 const before=await page.evaluate(()=>window.__og);await action();
 return page.evaluate(before=>{const sample=window.__sample;sample.running=false;const gaps=sample.gaps.slice(1).sort((a,b)=>a-b),data=window.__og;return {seconds:(performance.now()-sample.start)/1000,samples:gaps.length,medianMs:gaps[Math.floor(gaps.length*.5)],p95Ms:gaps[Math.floor(gaps.length*.95)],maxMs:Math.max(...gaps),longTasks:window.__longTasks.filter(x=>x.start>=sample.start),sceneRenders:data.renderedFrames-before.renderedFrames,videoUploads:data.video.uploadedFrames-before.video.uploadedFrames,droppedVideoFrames:data.video.droppedFrames-before.video.droppedFrames,environmentWrites:(data.environment?.writes||0)-(before.environment?.writes||0),textures:data.textures,geometries:data.geometries,drawCalls:data.drawCalls,renderer:data.renderer}},before);
}
try{
 for(let run=1;run<=3;run++)for(const [label,origin,sound]of [['phase21','http://127.0.0.1:5180',false],['phase22-silent','http://127.0.0.1:5174',false],['phase22-sound','http://127.0.0.1:5174',true]]){
  const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});
  await context.addInitScript(()=>{window.__longTasks=[];try{new PerformanceObserver(l=>window.__longTasks.push(...l.getEntries().map(e=>({start:e.startTime,ms:e.duration})))).observe({type:'longtask',buffered:true})}catch{}});
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text())});
  await page.goto(origin,{waitUntil:'networkidle'});await page.waitForFunction(()=>window.__og?.modelReady);await page.waitForTimeout(1300);
  let activationMs=0;
  if(sound){const start=Date.now();await page.getByRole('button',{name:'Enable hero sound'}).click();await page.waitForFunction(()=>window.__og.sound.loaded);activationMs=Date.now()-start;await page.waitForTimeout(850)}
  await page.mouse.move(720,500);await page.waitForTimeout(750);
  const idle=await sample(page,()=>page.waitForTimeout(2000));
  const pointer=await sample(page,async()=>{for(let i=0;i<50;i++){await page.mouse.move(60+(i%2?1:0)*1320,420);await page.waitForTimeout(16)}await page.waitForTimeout(650)});
  const scroll=await sample(page,async()=>{for(const direction of [1,-1])for(let i=0;i<42;i++){await page.mouse.wheel(0,48*direction);await page.waitForTimeout(20)}await page.waitForTimeout(600)});
  const resources=await page.evaluate(()=>performance.getEntriesByType('resource').filter(e=>e.name.endsWith('/hero-ambient.wav')).map(e=>({bytes:e.encodedBodySize,durationMs:e.duration})));
  report.runs.push({run,label,activationMs,audioResources:resources,idle,pointer,scroll});console.log('PERF',run,label,JSON.stringify({idle:idle.p95Ms,pointer:pointer.p95Ms,scroll:scroll.p95Ms,uploads:idle.videoUploads,longTasks:idle.longTasks.length+pointer.longTasks.length+scroll.longTasks.length}));
  await context.close();
 }
 if(report.errors.length)throw new Error(JSON.stringify(report.errors));
}catch(error){report.failure=error.stack;console.error(error);process.exitCode=1}
finally{fs.writeFileSync(`${output}/performance.json`,JSON.stringify(report,null,2));await browser.close()}
