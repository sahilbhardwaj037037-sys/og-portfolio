import { chromium } from 'playwright-core';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-background-networking','--no-first-run','--disable-sync']});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
await page.addInitScript(()=>{window.__vitals={lcp:0,cls:0};new PerformanceObserver(l=>{for(const e of l.getEntries())window.__vitals.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.__vitals.cls+=e.value;}).observe({type:'layout-shift',buffered:true});});
try{
 await page.goto('http://127.0.0.1:5174/',{waitUntil:'networkidle'});await page.waitForFunction(()=>window.__og?.modelReady);await page.waitForTimeout(300);
 const result=await page.evaluate(()=>({diagnostics:window.__og,vitals:window.__vitals,resources:performance.getEntriesByType('resource').map(e=>({file:e.name.split('/').pop(),encodedBytes:e.encodedBodySize,duration:e.duration})),overflow:document.documentElement.scrollWidth>innerWidth}));
 assert.equal(result.diagnostics.logoHidden,true);assert.equal(result.overflow,false);assert.equal(errors.length,0);
 await page.screenshot({path:'qa/production-desktop.png'});
 fs.writeFileSync('qa/production-results.json',JSON.stringify({browser:browser.version(),result,errors},null,2));
 console.log(JSON.stringify({browser:browser.version(),readyAtMs:result.diagnostics.sceneReadyAtMs,gpu:result.diagnostics.renderer,vitals:result.vitals,errors}));
}finally{await browser.close();}
