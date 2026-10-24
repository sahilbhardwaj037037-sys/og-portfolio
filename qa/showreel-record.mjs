import { chromium } from 'playwright-core';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const out='qa/phase52',frames=`${out}/recording-frames`;fs.mkdirSync(frames,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-background-networking','--no-first-run']});
try{
 const page=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1});await page.goto(process.env.OG_QA_URL||'http://127.0.0.1:5183',{waitUntil:'networkidle'});await page.waitForFunction(()=>window.__og?.modelReady);
 const top=await page.locator('.showreel-entrance').evaluate(el=>el.getBoundingClientRect().top+scrollY);await page.evaluate(top=>scrollTo(0,top-100),top);await page.waitForTimeout(900);
 const session=await page.context().newCDPSession(page);const entries=[];
 session.on('Page.screencastFrame',frame=>{const name=`frame-${String(entries.length).padStart(5,'0')}.jpg`;fs.writeFileSync(`${frames}/${name}`,Buffer.from(frame.data,'base64'));entries.push({name,time:frame.metadata.timestamp});void session.send('Page.screencastFrameAck',{sessionId:frame.sessionId});});
 await session.send('Page.startScreencast',{format:'jpeg',quality:85,maxWidth:1280,maxHeight:800,everyNthFrame:2});await page.waitForTimeout(400);
 for(let i=0;i<24;i++){await page.mouse.wheel(0,20);await page.waitForTimeout(50)}await page.waitForTimeout(650);
 await page.getByRole('button',{name:'Play commercial film, 41 seconds, with sound'}).click();await page.waitForFunction(()=>document.querySelector('#showreel video').currentTime>.1);await page.waitForTimeout(3000);
 await page.locator('#showreel video').focus();await page.keyboard.press('Space');await page.waitForTimeout(650);
 for(let i=0;i<24;i++){await page.mouse.wheel(0,-20);await page.waitForTimeout(50)}await page.waitForTimeout(500);
 await session.send('Page.stopScreencast');await page.waitForTimeout(200);
 const list=entries.map((e,i)=>`file '${e.name}'\nduration ${i<entries.length-1?Math.max(.016,entries[i+1].time-e.time):.1}`).join('\n')+`\nfile '${entries.at(-1).name}'\n`;
 fs.writeFileSync(`${frames}/frames.txt`,list);fs.writeFileSync(`${out}/recording-metadata.json`,JSON.stringify({method:'Silent, unretouched Chrome DevTools screencast. Genuine entrance/reverse wheel, trusted play and native keyboard pause. Film playback is visible; no captured audio. Capturing affects cadence; not a benchmark.',frames:entries.length,seconds:entries.at(-1).time-entries[0].time,viewport:[1280,800]},null,2));
 execFileSync('/opt/homebrew/bin/ffmpeg',['-y','-hide_banner','-loglevel','error','-f','concat','-safe','0','-i',`${frames}/frames.txt`,'-vf','fps=30,format=yuv420p','-c:v','libx264','-crf','20','-movflags','+faststart',`${out}/screening-entrance-and-playback.mp4`]);console.log('Recorded',entries.length,'genuine browser frames to',`${out}/screening-entrance-and-playback.mp4`);
}finally{await browser.close();}
