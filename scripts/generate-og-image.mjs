/**
 * Gera public/og-image.png (1200×630), public/apple-touch-icon.png (180×180)
 * e public/favicon-32.png renderizando HTML com o Chromium do Playwright.
 * Uso: npm run og:image  (requer `npx playwright install chromium`)
 */
import { chromium } from '@playwright/test'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')
const font = (pkg, file) => join(root, 'node_modules', '@fontsource', pkg, 'files', file)

async function fontFace(family, pkg, file, weight) {
  const data = (await readFile(font(pkg, file))).toString('base64')
  return `@font-face{font-family:'${family}';font-weight:${weight};src:url(data:font/woff2;base64,${data}) format('woff2')}`
}

const fonts = (
  await Promise.all([
    fontFace('Orbitron', 'orbitron', 'orbitron-latin-900-normal.woff2', 900),
    fontFace('Space Grotesk', 'space-grotesk', 'space-grotesk-latin-400-normal.woff2', 400),
    fontFace('JetBrains Mono', 'jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff2', 400),
  ])
).join('\n')

const ogHtml = `<!doctype html><html><head><style>${fonts}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#080b12;color:#eaf2ff;font-family:'Space Grotesk';
  background-image:linear-gradient(rgba(0,217,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,217,255,.06) 1px,transparent 1px);
  background-size:48px 48px;padding:72px 80px;position:relative;overflow:hidden}
.mono{font-family:'JetBrains Mono'}
.badges{display:flex;gap:12px}
.badge{border:1px solid rgba(0,255,178,.45);color:#00ffb2;padding:6px 12px;font-size:18px;letter-spacing:.2em}
.badge.c{border-color:rgba(157,78,221,.6);color:#b77cf0}
.logo{position:absolute;top:72px;right:80px;font-family:Orbitron;font-weight:900;font-size:28px;letter-spacing:.2em;color:#00d9ff}
.logo span{color:#eaf2ff}
h1{font-family:Orbitron;font-weight:900;font-size:84px;line-height:1.05;text-transform:uppercase;margin-top:56px}
h1 em{font-style:normal;color:#00d9ff;text-shadow:0 0 28px rgba(0,217,255,.6)}
.sub{color:#ff9f43;font-size:26px;margin-top:28px}
.name{color:#8892a6;font-size:24px;margin-top:40px}.name b{color:#00d9ff;font-weight:400}
.chip{position:absolute;right:90px;bottom:70px;width:150px;height:150px;border:3px solid #00d9ff;background:#101827;
  display:flex;align-items:center;justify-content:center;color:#00d9ff;font-size:26px;box-shadow:0 0 60px -10px #00d9ff}
</style></head><body>
<div class="logo">LR<span>://SYS</span></div>
<div class="badges mono"><span class="badge">● SYSTEM ONLINE</span><span class="badge c">● DEVELOPER MODE ACTIVE</span></div>
<h1>Building <em>Intelligent</em><br>Systems.</h1>
<p class="sub mono">Software Development × Control &amp; Automation Engineering</p>
<p class="name mono">operator_id: <b>Leonardo Ribeiro</b></p>
<div class="chip mono">MCU</div>
</body></html>`

const svg = await readFile(join(pub, 'favicon.svg'), 'utf8')
const iconHtml = (size) =>
  `<!doctype html><html><head><style>${fonts}*{margin:0}body{width:${size}px;height:${size}px}svg{width:${size}px;height:${size}px;display:block}</style></head><body>${svg}</body></html>`

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.setContent(ogHtml, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: join(pub, 'og-image.png') })

  for (const [size, name] of [
    [180, 'apple-touch-icon.png'],
    [32, 'favicon-32.png'],
  ]) {
    await page.setViewportSize({ width: size, height: size })
    await page.setContent(iconHtml(size), { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: join(pub, name) })
  }
  console.log('Gerados: og-image.png, apple-touch-icon.png, favicon-32.png')
} finally {
  await browser.close()
}
