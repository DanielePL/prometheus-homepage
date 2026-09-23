// Renders one social preview image per page in the site's own design.
// Run after a design change: node scripts/og-images.mjs  (needs Playwright
// from a sibling repo; see PW below). Output: public/images/og/<slug>.jpg
import { chromium } from '/Users/danielepauli/Desktop/Prometheus-Enterprise/node_modules/playwright/index.mjs'
import { readFileSync } from 'node:fs'
const PAGES = [
  ['home', 'Personal trainer software & app', 'Five tools, one client.', 'That was never the plan.', 'Programming, nutrition, video review, calls and payments in one account. From $19 a month.'],
  ['studios', 'Fitness studio management software', 'Coach on the floor.', 'Run the studio from the same account.', 'Check-in, classes, memberships, point of sale, shifts and books. $79 a month, all in.'],
  ['enterprise', 'Gym chain management software · pilot programme', 'Software for gym chains.', 'We are looking for pilot gyms.', 'HQ across every site, reception desk, check-in, memberships, shifts and books.'],
  ['pricing', 'Personal trainer software pricing', 'From $19 a month.', 'Every feature, every plan.', 'Ten sizes between 5 and 70 clients. Studio Light $79. 14-day trial, no card.'],
  ['switch', 'Switching', 'A Trainerize alternative', 'with everything included.', '$19 to $89 a month by client count. Nutrition, video, calls and payments in every plan.'],
]
const flame = 'data:image/png;base64,' + readFileSync('public/images/flame.png').toString('base64')
const font = 'data:font/woff2;base64,' + readFileSync('public/fonts/geist-latin.woff2').toString('base64')
const html = (chip, a, b, sub) => `<!doctype html><html><head><style>
@font-face{font-family:Geist;font-weight:100 900;src:url(${font}) format('woff2')}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;font-family:Geist,system-ui,sans-serif;color:#111114;background:#fff;position:relative;overflow:hidden}
.glow{position:absolute;inset:0;background:radial-gradient(55% 60% at 85% 0%,rgba(230,126,34,.28),rgba(230,126,34,0) 70%),radial-gradient(45% 50% at 10% 100%,rgba(243,156,18,.14),rgba(243,156,18,0) 70%)}
.wrap{position:absolute;inset:0;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
.brand{display:flex;align-items:center;gap:14px;font-weight:600;font-size:30px;letter-spacing:-.01em}
.brand img{width:44px;height:44px}
.chip{display:inline-flex;align-items:center;gap:10px;height:40px;padding:0 16px 0 14px;border-radius:999px;border:1.5px solid #E6E4DF;background:#fff;font-size:19px;font-weight:500;width:max-content}
.chip i{width:9px;height:9px;border-radius:999px;background:#E67E22;box-shadow:0 0 0 4px rgba(230,126,34,.18)}
h1{font-size:78px;line-height:1.02;letter-spacing:-.03em;font-weight:600;margin-top:26px;max-width:1040px}
h1 span{color:#5F6472;font-weight:500}
p{margin-top:24px;font-size:26px;line-height:1.35;color:#5F6472;max-width:900px}
.site{font-size:22px;color:#5F6472}
</style></head><body><div class="glow"></div><div class="wrap">
<div class="brand"><img src="${flame}">Prometheus</div>
<div><div class="chip"><i></i>${chip}</div><h1>${a} <span>${b}</span></h1><p>${sub}</p></div>
<div class="site">prometheus.coach</div></div></body></html>`
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
for (const [slug, chip, a, b, sub] of PAGES) {
  await page.setContent(html(chip, a, b, sub), { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: `public/images/og/${slug}.jpg`, type: 'jpeg', quality: 88 })
  console.log('wrote', slug)
}
await browser.close()
