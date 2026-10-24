import { chromium } from 'playwright-core';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const out='qa/phase42',frames=`${out}/recording-frames`;fs.mkdirSync(frames,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-background-networking','--no-first-run']});
try{
 const page=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1});await page.goto(process.env.OG_QA_URL||'http://127.0.0.1:5183',{waitUntil:'networkidle'});await page.waitForFunction(()=>window.__og?.modelReady);
 const top=await page.locator('.collection-entrance').evaluate(el=>el.getBoundingClientRect().top+scrollY);await page.evaluate(top=>scrollTo(0,top-100),top);await page.waitForTimeout(1000);await page.locator('[data-card=apexfit] img').evaluate(img=>Promise.race([img.decode(),new Promise((_,reject)=>setTimeout(()=>reject(new Error('Capture decode timed out')),10000))]));
 const session=await page.context().newCDPSession(page);const entries=[];
 session.on('Page.screencastFrame',frame=>{const name=`frame-${String(entries.length).padStart(5,'0')}.jpg`;fs.writeFileSync(`${frames}/${name}`,Buffer.from(frame.data,'base64'));entries.push({name,time:frame.metadata.timestamp});void session.send('Page.screencastFrameAck',{sessionId:frame.sessionId});});
 await session.send('Page.startScreencast',{format:'jpeg',quality:85,maxWidth:1280,maxHeight:800,everyNthFrame:2});await page.waitForTimeout(500);
 for(let i=0;i<24;i++){await page.mouse.wheel(0,26);await page.waitForTimeout(45)}await page.waitForTimeout(800);
 await page.getByRole('button',{name:'Next additional project',exact:true}).click();await page.waitForTimeout(900);await page.getByRole('button',{name:'Next additional project',exact:true}).click();await page.waitForTimeout(900);
 const image=await page.locator('[data-card=aether] .collection-image').boundingBox();await page.mouse.move(image.x+image.width-20,image.y+image.height/2);await page.mouse.down();await page.mouse.move(12,image.y+image.height/2,{steps:18});await page.mouse.up();await page.waitForTimeout(1000);
 for(let i=0;i<24;i++){await page.mouse.wheel(0,-26);await page.waitForTimeout(45)}await page.waitForTimeout(800);
 await session.send('Page.stopScreencast');await page.waitForTimeout(200);
 const list=entries.map((e,i)=>`file '${e.name}'\nduration ${i<entries.length-1?Math.max(.016,entries[i+1].time-e.time):.1}`).join('\n')+`\nfile '${entries.at(-1).name}'\n`;
 fs.writeFileSync(`${frames}/frames.txt`,list);fs.writeFileSync(`${out}/recording-metadata.json`,JSON.stringify({method:'Unretouched Chrome DevTools screencast, genuine forward/reverse vertical wheel, arrow controls and mouse dragging. Capturing affects frame cadence; not a performance benchmark.',frames:entries.length,seconds:entries.at(-1).time-entries[0].time,viewport:[1280,800]},null,2));
 execFileSync('/opt/homebrew/bin/ffmpeg',['-y','-hide_banner','-loglevel','error','-f','concat','-safe','0','-i',`${frames}/frames.txt`,'-vf','fps=30,format=yuv420p','-c:v','libx264','-crf','20','-movflags','+faststart',`${out}/collection-entrance-and-interaction.mp4`]);console.log('Recorded',entries.length,'genuine browser frames to',`${out}/collection-entrance-and-interaction.mp4`);
}finally{await browser.close();}
