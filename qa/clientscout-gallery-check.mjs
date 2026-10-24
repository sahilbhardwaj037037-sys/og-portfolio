import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const origin = process.env.OG_QA_URL || 'http://127.0.0.1:5183';
const out = 'qa/clientscout-overlap';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const report = { checks: [], errors: [] };
const pass = name => { report.checks.push(name); console.log('PASS', name); };
const read = page => page.evaluate(() => {
  const plane = document.querySelector('.collection-departure'), style = getComputedStyle(plane);
  const entrance = document.querySelector('.collection-entrance');
  return { opacity: +style.opacity, visibility: style.visibility, z: new DOMMatrix(style.transform).m43,
    top: entrance.getBoundingClientRect().top, height: entrance.offsetHeight,
    arrival: document.querySelector('.collection-stage').style.getPropertyValue('--arrival-z'),
    environment: +getComputedStyle(document.querySelector('.collection-environment')).opacity };
});
const hidden = state => { assert.equal(state.opacity, 0, JSON.stringify(state)); assert.equal(state.visibility, 'hidden'); };
async function at(page, top, wait = 450) {
  await page.locator('.collection-entrance').evaluate((e, top) => scrollTo(0, scrollY + e.getBoundingClientRect().top - top), top);
  await page.waitForTimeout(wait);
}
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', e => report.errors.push(e.message));
  await page.goto(origin, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__og?.modelReady);
  await page.waitForTimeout(800);
  await page.evaluate(async () => {
    const url = performance.getEntriesByType('resource').find(e => e.name.includes('/gsap_ScrollTrigger.js?'))?.name;
    if (url) window.transitionQA = (await import(url)).ScrollTrigger;
  });
  for (const [width, height] of [[1440, 1000], [1000, 700]]) {
    await page.setViewportSize({ width, height }); await page.waitForTimeout(500);
    const poses = [];
    for (const p of [0, .25, .5, .9, 1, 1.2, 1, .9, .5, .25, 0]) {
      await at(page, height * (1 - p));
      const state = await read(page); poses.push({ p, ...state });
      if (p <= 0 || p >= .9) hidden(state);
      else { assert.equal(state.visibility, 'visible'); assert.ok(state.opacity > .9); }
    }
    assert.ok(Math.abs(poses[2].z - poses[8].z) < .1);
    pass(`${width}: image retains reversible 3D handoff during approach and clears before gallery arrival`);
    for (const p of [0, .1, .25, .5, .75, 1, 1.2, 1, .75, .5, .25, 0]) {
      const travel = await page.locator('.collection-entrance').evaluate(e => e.offsetHeight - innerHeight);
      await at(page, -travel * p); hidden(await read(page));
      const state = await read(page), ramp = (a, b) => { const t = Math.max(0, Math.min(1, (p-a)/(b-a))); return t*t*(3-2*t); };
      assert.ok(Math.abs(state.environment - (1-ramp(.08,.6))) < .006, JSON.stringify({p,...state}));
      assert.ok(Math.abs(parseFloat(state.arrival) - (-140*(1-ramp(.35,.96)))) < .6, JSON.stringify({p,...state}));
      if (width === 1440 && [.25,.5,1].includes(p)) await page.screenshot({path:`${out}/after-${p}.png`});
    }
    pass(`${width}: gallery remains clear forward/reverse; existing environment and card arrival poses unchanged`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 }); await page.waitForTimeout(500);
  for (const step of [80, 12]) {
    await at(page, 1100);
    await page.evaluate(() => {
      window.overlapSamples = []; window.samplingOverlap = true;
      const sample = () => { if (!window.samplingOverlap) return;
        const top=document.querySelector('.collection-entrance').getBoundingClientRect().top;
        const s=getComputedStyle(document.querySelector('.collection-departure'));
        window.overlapSamples.push({top,opacity:+s.opacity,visibility:s.visibility}); requestAnimationFrame(sample);
      }; sample();
    });
    for (const direction of [1, -1]) {
      let count=0;
      while (count++ < 240) {
        const {top}=await read(page);
        if (direction===1 ? top < -650 : top > 1050) break;
        await page.mouse.wheel(0,step*direction); await page.waitForTimeout(65);
      }
      assert.ok(count < 240, 'Wheel scroll reached transition boundary');
    }
    const samples = await page.evaluate(() => {window.samplingOverlap=false;return window.overlapSamples});
    assert.ok(samples.some(s=>s.opacity>.5), 'Cinematic image remains present during approach');
    for (const s of samples.filter(s=>s.top<=0 || s.top>=1000)) hidden(s);
    fs.writeFileSync(`${out}/wheel-${step}.json`,JSON.stringify(samples));
    pass(`${step===80?'Normal':'Slow'} real wheel scrolling forward/reverse: no image outside approach on any sampled frame`);
  }
  await at(page,-300); await page.getByRole('button',{name:'Show Aroma / Noctis',exact:true}).click();
  await page.waitForTimeout(800); hidden(await read(page));
  assert.match(await page.locator('.collection-status').innerText(), /Aroma/);
  assert.equal(await page.locator('.collection-slot').count(),4);
  if (await page.evaluate(()=>!!window.transitionQA)) {
    await page.evaluate(()=>window.transitionQA.refresh()); await page.waitForTimeout(400); hidden(await read(page));
  }
  pass('Gallery selection, four cards and refresh retain a clear image lifecycle');
  await page.emulateMedia({reducedMotion:'reduce'}); await page.waitForTimeout(400);
  assert.equal(await page.locator('.collection-departure-camera').isVisible(),false);
  await page.emulateMedia({reducedMotion:'no-preference'}); await page.setViewportSize({width:390,height:844}); await page.waitForTimeout(400);
  assert.equal(await page.locator('.collection-departure-camera').isVisible(),false);
  pass('Existing reduced-motion and mobile fallback keep the decorative image absent');
  assert.deepEqual(report.errors,[]);
} catch(e) { report.failure=e.stack; console.error(e);process.exitCode=1; }
finally { fs.writeFileSync(`${out}/results.json`,JSON.stringify(report,null,2)); await browser.close(); }
