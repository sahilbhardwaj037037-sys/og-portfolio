import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const origin=process.env.OG_QA_URL||'http://127.0.0.1:5173',out='qa/phase3';
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--disable-background-networking','--no-first-run','--disable-sync']});
const report={origin,browser:browser.version(),checks:[],errors:[],poses:[]};
const pass=(name,detail)=>{report.checks.push({name,detail});console.log('PASS',name)};
const settle=p=>p.waitForTimeout(650);
async function create(options={},block=false,path='/'){
 const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,...options});
 if(block)await context.route('**/media/six7/**',r=>r.abort());
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto(origin+path,{waitUntil:'networkidle'});if(!path.includes('fallback'))await page.waitForFunction(()=>window.__og?.modelReady);await settle(page);
 return {context,page};
}
async function at(page,p){
 await page.locator('.project-passage').evaluate((el,p)=>scrollTo(0,el.getBoundingClientRect().top+scrollY+(el.offsetHeight-innerHeight)*p),p);await settle(page);
 return page.evaluate(()=>window.__og.passage);
}
async function section(page,id){await page.locator(id).evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));await settle(page);}
const shot=(page,name)=>page.screenshot({path:`${out}/${name}.png`});
async function fit(page){assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);}
try{
 const {context,page}=await create();
 assert.equal(await page.locator('canvas').count(),1);assert.equal(await page.locator('[data-project-theme="ember-and-oak"],[data-project-theme="clientscout-ai"]').count(),0);
 const initial=await page.evaluate(()=>performance.getEntriesByType('resource').filter(e=>e.name.includes('/media/six7/')).map(e=>e.name));assert.equal(initial.length,0);pass('Hero starts without SIX&7 image transfers; one original canvas and no future showcases');
 const forward={};
 for(const p of [0,.25,.5,.75,1]){forward[p]=await at(page,p);report.poses.push(forward[p]);await shot(page,`passage-${p}`);}
 assert.equal(forward[.5].depth,true);assert.ok(forward[.5].incomingZ< -100&&forward[.5].outgoingZ< -100);assert.ok(Math.abs(forward[1].incomingZ)<.01);assert.ok(Math.abs(forward[1].incomingRotationY)<.01);
 assert.equal(await page.locator('.passage-world').evaluate(el=>getComputedStyle(el).transformStyle),'preserve-3d');
 await at(page,.5);const projection=await page.locator('.passage-incoming').evaluate(el=>{const m=new DOMMatrix(getComputedStyle(el).transform);return {z:m.m43,rotationTerm:m.m13,width:el.getBoundingClientRect().width,layoutWidth:el.offsetWidth,perspective:getComputedStyle(document.querySelector('.passage-camera')).perspective}});assert.ok(projection.z< -100&&Math.abs(projection.rotationTerm)>.05);assert.equal(projection.perspective,'1600px');assert.ok(Math.abs(projection.width-projection.layoutWidth)>30);
 pass('Actual perspective world uses depth and rotation, arriving at a frontal composition',report.poses);
 for(const p of [.75,.5,.25,0]){const d=await at(page,p);for(const key of ['incomingZ','outgoingZ','incomingRotationY'])assert.ok(Math.abs(d[key]-forward[p][key])<.05);}
 pass('Reverse traversal returns to the same spatial poses');
 for(const [width,height]of [[1000,700],[1440,700],[1920,700]]){
  await page.setViewportSize({width,height});await settle(page);await at(page,1);
  const bounds=await page.evaluate(()=>{const r=s=>document.querySelector(s).getBoundingClientRect().toJSON();return {image:r('.passage-incoming img'),plane:r('.passage-incoming'),rail:r('.passage-registration'),arrival:r('.passage-arrival')}});
  assert.ok(bounds.image.y>=bounds.rail.bottom+4&&bounds.plane.bottom<=bounds.arrival.y-8,JSON.stringify({width,height,bounds}));await fit(page);
 }
 await page.setViewportSize({width:1440,height:1000});await settle(page);pass('Short desktop and ultrawide stages keep the full frontal image clear of labels');
 await at(page,1);const first=await page.locator('.passage-incoming img').boundingBox();await page.mouse.wheel(0,80);await settle(page);const second=await page.locator('.passage-incoming img').boundingBox();assert.ok(Math.abs(second.y-first.y+80)<2);pass('Sticky release continues in document flow without a figure swap',{first,second});
 await section(page,'.six-heading');await shot(page,'desktop-introduction');
 for(const id of ['#six-browse','#six-product','#six-responsive','#six-build','#six-evidence','#six7-closing']){await section(page,id);await fit(page);await shot(page,id.slice(1));}
 for(const name of ['Storefront','Collection','Product','Mobile home','Mobile collection','Mobile product']){
  await page.getByRole('button',{name,exact:true}).click();await page.locator('.six-evidence-image img').evaluate(img=>img.decode());assert.equal(await page.getByRole('button',{name,exact:true}).getAttribute('aria-pressed'),'true');
 }
 await page.getByRole('button',{name:'Administration',exact:true}).click();assert.equal(await page.locator('.gallery-image img').getAttribute('src'),'/media/smile-admin.png');
 pass('All six genuine evidence views work independently of the original Smile gallery');
 await section(page,'#six-build');await page.locator('.six-boundaries summary').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.six-boundaries').getAttribute('open'),'');
 const source=page.getByRole('link',{name:'GitHub Repository For Shopify Six&7'});assert.equal(await source.getAttribute('href'),'https://github.com/sahilbhardwaj037037-sys/six7-shopify-store');assert.equal(await page.getByRole('link',{name:'Password-protected storefront'}).getAttribute('href'),'https://sixseven-practice.myshopify.com/');
 pass('Keyboard disclosure and genuine, accurately labeled source/store links work');
 await at(page,.5);await page.setViewportSize({width:1280,height:800});await settle(page);await at(page,.5);await fit(page);assert.equal((await page.evaluate(()=>window.__og.passage)).depth,true);
 await page.setViewportSize({width:768,height:1024});await settle(page);assert.equal(await page.locator('.project-passage').getAttribute('data-motion'),null);
 await page.setViewportSize({width:1440,height:1000});await settle(page);assert.equal(await page.locator('.project-passage').getAttribute('data-motion'),'depth');pass('Resize across desktop and static breakpoints restores the appropriate mode');
 await page.emulateMedia({reducedMotion:'reduce'});await settle(page);await section(page,'.six-heading');await shot(page,'desktop-reduced');assert.equal(await page.locator('.project-passage').getAttribute('data-motion'),null);assert.equal(await page.locator('.six-depth-plane').first().evaluate(el=>getComputedStyle(el).transform),'none');assert.ok(await page.locator('.passage-plane,.passage-world,.six-depth-plane').evaluateAll(nodes=>nodes.every(el=>el.style.willChange!=='transform')));await fit(page);
 await page.emulateMedia({reducedMotion:'no-preference'});await settle(page);assert.equal(await page.locator('.project-passage').getAttribute('data-motion'),'depth');pass('Live reduced-motion changes remove all new depth choreography and restore it');
 await page.getByRole('button',{name:'Reduce motion',exact:true}).click();await section(page,'.six-heading');assert.equal(await page.locator('.project-passage').getAttribute('data-motion'),null);await fit(page);await page.getByRole('button',{name:'Motion off',exact:true}).click();await settle(page);assert.equal(await page.locator('.project-passage').getAttribute('data-motion'),'depth');pass('The existing manual motion control also switches the new showcase cleanly');
 await context.close();
 for(const [width,height] of [[390,844],[320,844],[768,1024],[1440,650]]){
  const item=await create({viewport:{width,height},hasTouch:width<1000,isMobile:width<600});
  assert.equal(await item.page.locator('.project-passage').getAttribute('data-motion'),null);
  for(const id of ['.six-heading','#six-product','#six-responsive','#six-evidence','#six7-closing']){await section(item.page,id);await fit(item.page);if(width===390||width===320)await shot(item.page,`${width}-${id.replace(/[.#]/g,'')}`);}
  pass(`Static ${width}×${height}: complete content without overflow or a cinematic spacer`);await item.context.close();
 }
 const deep=await create({},false,'/#six-and-seven');const heading=await deep.page.locator('#six-title').boundingBox();assert.ok(heading.y>=-1&&heading.y<1000,JSON.stringify(heading));pass('Initial project deep link lands on the canonical readable heading');await deep.context.close();
 const failed=await create({},true);await at(failed.page,.7);assert.equal(await failed.page.locator('.passage-image-fallback').count(),1);await section(failed.page,'#six-browse');assert.ok(await failed.page.getByRole('status').count()>0);await fit(failed.page);await shot(failed.page,'failed-images');pass('Failed image transfers leave labeled fallback panels and project content readable');await failed.context.close();
 const slow=await create();await slow.page.route('**/media/six7/desktop-home-hero.webp',async r=>{await new Promise(resolve=>setTimeout(resolve,2500));await r.continue();});await at(slow.page,1);const pending=await slow.page.locator('.passage-incoming').boundingBox();assert.equal(await slow.page.locator('.passage-loading').count(),1);await slow.page.waitForFunction(()=>document.querySelector('.passage-source img')?.style.opacity==='1');await settle(slow.page);const decoded=await slow.page.locator('.passage-incoming').boundingBox();assert.ok(Math.abs(decoded.height-pending.height)<1);pass('Delayed decoding uses a labeled loading surface without changing plane geometry');await slow.context.close();
 const fallback=await create({},false,'/?fallback=1');await section(fallback.page,'.six-heading');assert.equal(await fallback.page.locator('canvas').count(),0);await fit(fallback.page);assert.equal(await fallback.page.locator('#six-title').isVisible(),true);pass('The new showcase remains readable without WebGL');await fallback.context.close();
 assert.deepEqual(report.errors,[]);pass('No uncaught JavaScript errors');
}catch(e){report.failure=e.stack;console.error(e);process.exitCode=1}finally{fs.writeFileSync(`${out}/results.json`,JSON.stringify(report,null,2));await browser.close();}
