import { chromium } from 'playwright-core';
import fs from 'node:fs';
import assert from 'node:assert/strict';

const origin=process.env.OG_QA_URL||'http://127.0.0.1:5173';
const phase=process.argv.includes('--before')?'before':'after';
const out='qa/reduced-motion-review';
fs.mkdirSync(out,{recursive:true});
const hasBaseline=fs.existsSync(`${out}/before-normal-frontend.png`);
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-background-networking','--no-first-run','--disable-sync']});
const report={phase,origin,browser:browser.version(),checks:[],layouts:[],errors:[]};
const check=(name)=>{report.checks.push(name);console.log('PASS',name);};
const settle=p=>p.waitForTimeout(700);
async function open(width,height,reducedMotion='reduce'){
 const context=await browser.newContext({viewport:{width,height},reducedMotion,deviceScaleFactor:1});
 const p=await context.newPage();p.on('pageerror',e=>report.errors.push(e.message));
 await p.goto(origin,{waitUntil:'networkidle'});
 await p.waitForFunction(()=>window.__og?.modelReady);await p.evaluate(()=>document.fonts.ready);await settle(p);
 return {context,p};
}
async function at(p,id='frontend'){
 await p.locator('#story-'+id).evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-110,behavior:'instant'}));
 await settle(p);
 await p.locator('#story-'+id+' .chapter-image img').evaluate(async img=>{await img.decode();});
}
async function layout(p){return p.evaluate(()=>{
 const rect=el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};};
 return {viewport:[innerWidth,innerHeight],depth:document.querySelector('.case-story').classList.contains('has-depth'),overflow:document.documentElement.scrollWidth>innerWidth,
 story:rect(document.querySelector('.case-story')),chapters:[...document.querySelectorAll('.story-chapter')].map(el=>({id:el.id,...rect(el),heading:rect(el.querySelector('h3')),paragraphs:[...el.querySelectorAll(':scope > p:not(.eyebrow)')].map(rect),figure:rect(el.querySelector('figure')),image:rect(el.querySelector('figure img')),transform:getComputedStyle(el.querySelector('h3')).transform})),
 gallery:rect(document.querySelector('.project-gallery'))};
 });}
async function shot(p,name){await p.screenshot({path:`${out}/${phase}-${name}.png`});}
try{
 for(const [width,height] of [[1440,1000],[1000,700],[390,844],[320,844],[768,1024],[1440,650]]){
  const {context,p}=await open(width,height);await at(p);
  const l=await layout(p);report.layouts.push(l);await shot(p,`${width}x${height}`);
  assert.equal(l.depth,false);assert.equal(l.overflow,false);
  for(const ch of l.chapters){assert.equal(ch.transform,'none');assert.ok(ch.image.width>200);}
  if(phase==='after'){
   assert.ok(Math.abs(l.chapters[0].x-l.story.x)<1);
   assert.ok(Math.abs(l.chapters[0].width-l.story.width)<1,'Static chapters must use the available story width');
   for(const ch of l.chapters){let bottom=ch.heading.y+ch.heading.height;for(const text of ch.paragraphs){assert.ok(text.y>=bottom,'Chapter copy must not overlap');bottom=text.y+text.height;}}
   if(width>=1000&&height>=700){
    for(const ch of l.chapters){assert.ok(ch.heading.x<width/2);assert.ok(ch.figure.x>ch.heading.x+ch.heading.width);assert.ok(ch.figure.x+ch.figure.width<=l.story.x+l.story.width+1);}
   }
   if(width===1440&&height===1000){
    await p.locator('.case-story').screenshot({path:`${out}/after-desktop-complete-story.png`});
    for(const id of ['responsive','build']){await at(p,id);await shot(p,`desktop-${id}`);}
   }
  }
  check(`${width}×${height}: static content, no overflow${phase==='after'?', full-width reflow':''}`);
  await context.close();
 }
 const {context,p}=await open(1440,1000,'no-preference');
 for(const id of ['frontend','responsive','build']){await at(p,id);await shot(p,`normal-${id}`);}
 assert.equal((await layout(p)).depth,true);
 if(phase==='after'&&hasBaseline){
  for(const id of ['frontend','responsive','build'])assert.ok(fs.readFileSync(`${out}/before-normal-${id}.png`).equals(fs.readFileSync(`${out}/after-normal-${id}.png`)),`Normal ${id} screenshot changed`);
  check('All three normal-motion desktop chapter screenshots remain pixel-identical');
 }
 await p.getByRole('button',{name:'Reduce motion',exact:true}).click();await at(p);
 let l=await layout(p);assert.equal(l.depth,false);
 if(phase==='after')assert.ok(Math.abs(l.chapters[0].width-l.story.width)<1);
 await shot(p,'manual-reduced');check('Manual motion toggle switches to static story');
 if(phase==='after'){
  await p.setViewportSize({width:390,height:844});await at(p);assert.equal((await layout(p)).overflow,false);
  await p.setViewportSize({width:1440,height:1000});await at(p);assert.equal((await layout(p)).depth,false);
  await p.getByRole('button',{name:'Motion off',exact:true}).click();await at(p);assert.equal((await layout(p)).depth,true);
  check('Manual reduced mode survives mobile/desktop resize; normal depth restores');
  await p.emulateMedia({reducedMotion:'reduce'});await at(p);assert.equal((await layout(p)).depth,false);
  assert.equal(await p.getByRole('button',{name:'Motion off',exact:true}).isDisabled(),true);
  await p.emulateMedia({reducedMotion:'no-preference'});await at(p);assert.equal((await layout(p)).depth,true);
  check('Live system preference changes remove and restore choreography correctly');
  await p.emulateMedia({reducedMotion:'reduce'});await settle(p);
  for(const id of ['build','responsive','frontend']){await at(p,id);const ch=await p.locator('#story-'+id+' h3').boundingBox();assert.ok(ch.y>=0&&ch.y<1000);}
  check('Forward/reverse navigation keeps each reduced-motion chapter readable');
 }
 await context.close();assert.deepEqual(report.errors,[]);check('No JavaScript errors');
}finally{fs.writeFileSync(`${out}/${phase}-report.json`,JSON.stringify(report,null,2));await browser.close();}
