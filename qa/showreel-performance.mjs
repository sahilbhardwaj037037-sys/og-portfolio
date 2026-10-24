import {chromium} from 'playwright-core';import fs from 'node:fs';import {gzipSync} from 'node:zlib';import assert from 'node:assert/strict';
const out='qa/phase52',baseline='/private/tmp/og-phase52-approved-phase42-dist';
const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-background-networking']});const report={date:new Date().toISOString(),browser:b.version(),runs:[],errors:[]};
const payload=dir=>Object.fromEntries(['js','css'].map(ext=>[ext,fs.readdirSync(dir+'/assets').filter(n=>n.endsWith('.'+ext)).reduce((n,f)=>n+gzipSync(fs.readFileSync(dir+'/assets/'+f)).length,0)]));
report.payload={baseline:payload(baseline),phase52:payload('dist')};report.payload.added=Object.fromEntries(['js','css'].map(k=>[k,report.payload.phase52[k]-report.payload.baseline[k]]));report.media={film:fs.statSync('public/media/showreel/commercial-1080p.mp4').size,poster:fs.statSync('public/media/showreel/poster.webp').size};
async function sample(p,action){await p.evaluate(()=>{window.__sample={running:true,gaps:[],last:performance.now(),start:performance.now()};function tick(t){const s=window.__sample;if(!s.running)return;s.gaps.push(t-s.last);s.last=t;requestAnimationFrame(tick)}requestAnimationFrame(tick)});await action();return p.evaluate(()=>{const s=window.__sample;s.running=false;const gaps=s.gaps.slice(2).sort((a,b)=>a-b);return{frames:gaps.length,medianMs:gaps[Math.floor(gaps.length*.5)],p95Ms:gaps[Math.floor(gaps.length*.95)],maxMs:Math.max(...gaps),longTasks:window.__tasks.filter(t=>t.start>=s.start),canvasCount:document.querySelectorAll('canvas').length,filmLoaded:!!document.querySelector('#showreel video')?.getAttribute('src')}})}
try{
 for(let run=1;run<=3;run++)for(const [label,url]of [['approved','http://127.0.0.1:5180'],['phase52','http://127.0.0.1:5174']]){
  const p=await b.newPage({viewport:{width:1440,height:1000}});p.on('pageerror',e=>report.errors.push(e.message));await p.addInitScript(()=>{window.__tasks=[];new PerformanceObserver(l=>l.getEntries().forEach(e=>window.__tasks.push({start:e.startTime,duration:e.duration}))).observe({type:'longtask',buffered:true})});await p.goto(url,{waitUntil:'networkidle'});await p.waitForFunction(()=>window.__og?.modelReady);await p.waitForTimeout(700);
  const hero=await sample(p,()=>p.waitForTimeout(2000));const initialFilmRequests=await p.evaluate(()=>performance.getEntriesByType('resource').filter(e=>e.name.includes('/showreel/')).map(e=>e.name));
  await p.locator('.collection-entrance').evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY));await p.waitForTimeout(700);
  const collection=await sample(p,async()=>{for(const dir of [1,-1])for(let i=0;i<24;i++){await p.mouse.wheel(0,dir*24);await p.waitForTimeout(22)}await p.waitForTimeout(600)});
  const r={run,label,hero,collection,initialFilmRequests};
  if(label==='phase52'){
   await p.locator('.showreel-entrance').evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY));await p.waitForTimeout(700);
   r.entrance=await sample(p,async()=>{for(const dir of [1,-1])for(let i=0;i<20;i++){await p.mouse.wheel(0,dir*20);await p.waitForTimeout(22)}await p.waitForTimeout(600)});
   await p.locator('.showreel-entrance').evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY+e.offsetHeight-innerHeight));await p.waitForTimeout(700);await p.getByRole('button',{name:'Play commercial film, 41 seconds, with sound'}).click();await p.waitForFunction(()=>document.querySelector('#showreel video').currentTime>.2);
   r.playback=await sample(p,()=>p.waitForTimeout(3000));r.video=await p.locator('#showreel video').evaluate(v=>({quality:v.getVideoPlaybackQuality().toJSON?.()||{dropped:v.getVideoPlaybackQuality().droppedVideoFrames,total:v.getVideoPlaybackQuality().totalVideoFrames},audioDecodedBytes:v.webkitAudioDecodedByteCount}));
  }
  report.runs.push(r);console.log('SAMPLE',run,label,JSON.stringify(r));await p.close();
 }
 assert.ok(report.payload.added.js<=6144);assert.ok(report.payload.added.css<=2048);assert.ok(report.media.poster<=163840);assert.ok(report.runs.every(r=>r.initialFilmRequests.length===0));assert.deepEqual(report.errors,[]);
 report.cadenceTargetMet=report.runs.filter(r=>r.label==='phase52').every(r=>r.entrance.p95Ms<=20&&!r.entrance.longTasks.some(t=>t.duration>50));console.log('PAYLOAD',JSON.stringify(report.payload),'entrance cadence target',report.cadenceTargetMet);
}catch(e){report.failure=e.stack;console.error(e);process.exitCode=1}finally{fs.writeFileSync(out+'/performance.json',JSON.stringify(report,null,2));await b.close()}
