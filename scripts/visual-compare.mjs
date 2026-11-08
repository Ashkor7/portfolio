/**
 * Comparação visual seção a seção: site original (Lovable) × reconstrução local.
 *
 * Uso: npm run build && npm run preview   (em outro terminal)
 *      npm run visual:compare
 *
 * Gera em docs/reference/compare/: capturas de cada seção dos dois sites, uma
 * imagem de diferença (pixelmatch) e report.md com o percentual de pixels
 * diferentes e a diferença de altura. Diferenças em conteúdo corrigido de
 * propósito (dados, links, status) são esperadas — o relatório serve para achar
 * desvios de layout, tipografia, espaçamento e cor.
 */
import { chromium } from '@playwright/test'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ORIGINAL = process.env.ORIGINAL_URL ?? 'https://screenshot-to-lovely-web-84.lovable.app'
const LOCAL = process.env.LOCAL_URL ?? 'http://localhost:4173'
const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'reference', 'compare')

const viewports = [
  ['desktop', 1440, 900],
  ['mobile', 390, 844],
]
// Hero não tem id no original: é a primeira <section> do <main>.
const sections = ['hero', 'about', 'projects', 'stack', 'lab', 'journey', 'contact']

async function prepare(page, url) {
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(3500) // terminal de boot termina de digitar
  await page.evaluate(async () => {
    document.getElementById('lovable-badge')?.remove()
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => (img.loading = 'eager'))
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'))
    await Promise.all(
      [...document.images].map((img) =>
        img.complete ? null : new Promise((r) => img.addEventListener('load', r, { once: true })),
      ),
    )
  })
  // Congela animações para capturas estáveis.
  await page.addStyleTag({
    content: '*,*::before,*::after{animation:none!important;transition:none!important}',
  })
  await page.waitForTimeout(500)
}

async function shoot(page, id) {
  const locator =
    id === 'hero' ? page.locator('main section').first() : page.locator(`section#${id}`)
  return PNG.sync.read(await locator.screenshot())
}

function diff(a, b) {
  const width = Math.min(a.width, b.width)
  const height = Math.min(a.height, b.height)
  const crop = (img) => {
    const png = new PNG({ width, height })
    PNG.bitblt(img, png, 0, 0, width, height, 0, 0)
    return png
  }
  const out = new PNG({ width, height })
  const pixels = pixelmatch(crop(a).data, crop(b).data, out.data, width, height, {
    threshold: 0.15,
  })
  return { out, ratio: pixels / (width * height) }
}

await mkdir(out, { recursive: true })
const browser = await chromium.launch()
const rows = []
try {
  for (const [name, width, height] of viewports) {
    const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 })
    const orig = await ctx.newPage()
    const local = await ctx.newPage()
    await prepare(orig, ORIGINAL)
    await prepare(local, LOCAL)
    for (const id of sections) {
      const a = await shoot(orig, id)
      const b = await shoot(local, id)
      const { out: img, ratio } = diff(a, b)
      const base = `${name}-${id}`
      await writeFile(join(out, `${base}-original.png`), PNG.sync.write(a))
      await writeFile(join(out, `${base}-local.png`), PNG.sync.write(b))
      await writeFile(join(out, `${base}-diff.png`), PNG.sync.write(img))
      rows.push({ viewport: name, section: id, diff: ratio, hOrig: a.height, hLocal: b.height })
      console.log(`${base}: ${(ratio * 100).toFixed(1)}% diff · altura ${a.height}→${b.height}px`)
    }
    await ctx.close()
  }
} finally {
  await browser.close()
}

const table = rows
  .map(
    (r) =>
      `| ${r.viewport} | ${r.section} | ${(r.diff * 100).toFixed(1)}% | ${r.hOrig}px | ${r.hLocal}px | ${r.hLocal - r.hOrig > 0 ? '+' : ''}${r.hLocal - r.hOrig}px |`,
  )
  .join('\n')
await writeFile(
  join(out, 'report.md'),
  `# Comparação visual — ${new Date().toISOString().slice(0, 10)}\n\nOriginal: ${ORIGINAL}\nLocal: ${LOCAL}\n\n| Viewport | Seção | Pixels diferentes | Altura original | Altura local | Δ |\n|---|---|---|---|---|---|\n${table}\n`,
)
console.log(`\nRelatório: ${join(out, 'report.md')}`)
