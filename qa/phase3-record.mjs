import { chromium } from 'playwright-core';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const out='qa/phase3',frames=`${out}/recording-frames`;fs.mkdirSync(frames,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-background-networking','--no-first-run']});
try{
 const page=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1});await page.goto(process.env.OG_QA_URL||'http://127.0.0.1:5173',{waitUntil:'networkidle'});await page.waitForFunction(()=>window.__og?.modelReady);
 const top=await page.locator('.project-passage').evaluate(el=>el.getBoundingClientRect().top+scrollY);await page.evaluate(top=>scrollTo(0,top-100),top);await page.waitForTimeout(1000);await page.locator('.passage-incoming img').evaluate(img=>Promise.race([img.decode(),new Promise((_,reject)=>setTimeout(()=>reject(new Error('Capture decode timed out')),10000))]));
 const session=await page.context().newCDPSession(page);const entries=[];
 session.on('Page.screencastFrame',frame=>{const name=`frame-${String(entries.length).padStart(5,'0')}.jpg`;fs.writeFileSync(`${frames}/${name}`,Buffer.from(frame.data,'base64'));entries.push({name,time:frame.metadata.timestamp});void session.send('Page.screencastFrameAck',{sessionId:frame.sessionId});});
 await session.send('Page.startScreencast',{format:'jpeg',quality:85,maxWidth:1280,maxHeight:800,everyNthFrame:2});await page.waitForTimeout(500);
 for(const direction of [1,-1]){for(let i=0;i<45;i++){await page.mouse.wheel(0,direction*24);await page.waitForTimeout(55)}await page.waitForTimeout(900)}
 await session.send('Page.stopScreencast');await page.waitForTimeout(200);
 const list=entries.map((e,i)=>`file '${e.name}'\nduration ${i<entries.length-1?Math.max(.016,entries[i+1].time-e.time):.1}`).join('\n')+`\nfile '${entries.at(-1).name}'\n`;
 fs.writeFileSync(`${frames}/frames.txt`,list);fs.writeFileSync(`${out}/recording-metadata.json`,JSON.stringify({method:'Unretouched Chrome DevTools screencast, genuine forward/reverse mouse-wheel input. Capturing affects frame cadence; not a performance benchmark.',frames:entries.length,seconds:entries.at(-1).time-entries[0].time,viewport:[1280,800]},null,2));
 execFileSync('/opt/homebrew/bin/ffmpeg',['-y','-hide_banner','-loglevel','error','-f','concat','-safe','0','-i',`${frames}/frames.txt`,'-vf','fps=30,format=yuv420p','-c:v','libx264','-crf','20','-movflags','+faststart',`${out}/smile-to-six7-forward-reverse.mp4`]);console.log('Recorded',entries.length,'genuine browser frames to',`${out}/smile-to-six7-forward-reverse.mp4`);
}finally{await browser.close();}
