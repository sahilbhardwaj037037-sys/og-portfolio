import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const origin = process.env.OG_QA_URL || 'http://127.0.0.1:5174';
const out = 'qa/final-polish/after';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--disable-background-networking'] });
const report = { date: new Date().toISOString(), origin, browser: browser.version(), checks: [], states: {}, errors: [] };
const pass = (name, detail) => { report.checks.push({ name, detail }); console.log('PASS', name); };
async function make(options = {}, fragment = '') {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, ...options });
  page.on('pageerror', e => report.errors.push(e.message));
  await page.goto(origin + '/' + fragment, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__og?.modelReady);
  await page.waitForTimeout(700);
  return page;
}
async function at(page, selector, n, wait = 700) {
  await page.locator(selector).evaluate((el, n) => scrollTo(0, el.getBoundingClientRect().top + scrollY + (el.offsetHeight - innerHeight) * n), n);
  await page.waitForTimeout(wait);
}
const state = (page, selector) => page.locator(selector).evaluate(el => {
  const s = getComputedStyle(el), m = new DOMMatrix(s.transform), r = el.getBoundingClientRect();
  return { visibility: s.visibility, opacity: Number(s.opacity), z: m.m43, top: r.top, width: r.width };
});
const hidden = s => { assert.equal(s.visibility, 'hidden'); assert.equal(s.opacity, 0); };
try {
  const page = await make();
  await at(page, '.collection-entrance', 1);
  await page.getByRole('button', { name: 'Show Aroma / Noctis', exact: true }).click();
  await page.waitForTimeout(1100);
  for (const [name, entrance, plane] of [
    ['gallery', '.collection-entrance', '.collection-departure'],
    ['showreel', '.showreel-entrance', '.showreel-echo'],
  ]) {
    const samples = {};
    for (const [label, n] of [['before', -.5], ['0', 0], ['0.5', .5], ['1', 1], ['reverse-midpoint', .5], ['restored-previous', -.5]]) {
      const position = label === 'restored-previous' ? await page.locator(entrance).evaluate(e => -Math.ceil(innerHeight / (e.offsetHeight - innerHeight)) - .2) : n;
      await at(page, entrance, position);
      if (label === 'restored-previous') assert.ok(await page.locator(entrance).evaluate(e => e.getBoundingClientRect().top >= innerHeight));
      samples[label] = await state(page, plane);
      await page.screenshot({ path: `${out}/${name}-${label}.png` });
      if (n <= 0 || n >= 1) hidden(samples[label]);
      else { assert.equal(samples[label].visibility, 'visible'); assert.ok(samples[label].opacity > .1); }
    }
    assert.ok(Math.abs(samples['0.5'].z - samples['reverse-midpoint'].z) < .1);
    assert.ok(Math.abs(samples['0.5'].opacity - samples['reverse-midpoint'].opacity) < .001);
    report.states[name] = samples;
    pass(`${name}: before/start clear, genuine cinematic midpoint, settled clear, deterministic reverse, previous state restored`);
    for (const n of [.002, .02, .04]) {
      await at(page, entrance, n);
      const s = await state(page, plane);
      assert.ok(s.opacity < 1 && s.opacity > 0, JSON.stringify(s));
      if (n === .002) assert.ok(s.opacity < .01);
    }
    pass(`${name}: the entrance fades continuously from zero instead of popping at the start`);
    for (let i = 0; i < 3; i++) {
      await at(page, entrance, .3);
      await at(page, entrance, 1.1, 70); hidden(await state(page, plane));
      await at(page, entrance, .5);
      await at(page, entrance, -.2, 70); hidden(await state(page, plane));
    }
    pass(`${name}: fast forward/reverse exits hide the plane while scrub is still catching up`);
    await at(page, entrance, 1.2);
    await at(page, entrance, .9);
    hidden(await state(page, plane));
    pass(`${name}: reverse from beyond the section does not prematurely restore the outgoing plane`);
  }
  const ember = {};
  for (const [label, n] of [['before', -.2], ['midpoint', .5], ['settled', 1], ['reverse-midpoint', .5], ['restored-previous', -1]]) {
    await at(page, '.scout-passage', n);
    ember[label] = await state(page, '.scout-arriving');
    await page.screenshot({ path: `${out}/ember-clientscout-${label}.png` });
  }
  assert.ok(Math.abs(ember.midpoint.z - ember['reverse-midpoint'].z) < .1);
  assert.ok(Math.abs(ember.settled.z) < .01);
  const travel = await page.locator('.scout-passage').evaluate(e => (e.offsetHeight - innerHeight) / innerHeight);
  assert.ok(Math.abs(travel - 1.32) < .005);
  report.states.ember = ember;
  pass('Ember → ClientScout: same reversible 3D poses; travel increases modestly from 120vh to 132vh', { travel });
  for (const [width, height] of [[1000, 700], [1440, 1000], [1920, 700]]) {
    await page.setViewportSize({ width, height }); await page.waitForTimeout(700);
    for (const [entrance, plane] of [['.collection-entrance', '.collection-departure'], ['.showreel-entrance', '.showreel-echo']]) {
      for (const n of [0, 1]) { await at(page, entrance, n); hidden(await state(page, plane)); }
    }
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    pass(`${width}×${height}: both ready and settled compositions stay clear after resize`);
  }
  await page.close();
  for (const [fragment, plane] of [['#additional-projects', '.collection-departure'], ['#showreel', '.showreel-echo']]) {
    const deep = await make({}, fragment); hidden(await state(deep, plane));
    await deep.reload({ waitUntil: 'networkidle' }); await deep.waitForTimeout(900); hidden(await state(deep, plane));
    pass(`${fragment}: direct entry and reload cannot strand an outgoing plane`); await deep.close();
  }
  for (const options of [{ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }, { reducedMotion: 'reduce' }]) {
    const staticPage = await make(options);
    for (const selector of ['.collection-departure-camera', '.showreel-echo']) assert.equal(await staticPage.locator(selector).isVisible(), false);
    await staticPage.close();
  }
  pass('Mobile and reduced-motion modes retain static layouts without transition planes');
  assert.deepEqual(report.errors, []); pass('No uncaught runtime errors');
} catch (error) { report.failure = error.stack; console.error(error); process.exitCode = 1; }
finally { fs.writeFileSync(`${out}/results.json`, JSON.stringify(report, null, 2)); await browser.close(); }
