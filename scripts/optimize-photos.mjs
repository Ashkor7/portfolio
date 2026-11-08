/**
 * Converte fotos (JPEG/PNG) em WebP otimizado para a web, em dois tamanhos:
 * `<nome>.webp` (lado maior 1600 px) e `<nome>-thumb.webp` (lado maior 640 px).
 * Usa o Chromium do Playwright (canvas), sem dependências nativas.
 *
 * Uso: node scripts/optimize-photos.mjs <pasta-de-saída> <origem>=<nome> [...]
 * Ex.: node scripts/optimize-photos.mjs public/events/startup-weekend-pelotas-2026 \
 *        "C:/fotos/IMG_01.jpeg=premiacao"
 *
 * Imprime as dimensões finais de cada foto para preencher `src/data/events.ts`.
 */
import { chromium } from '@playwright/test'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'

const [outDir, ...pairs] = process.argv.slice(2)
if (!outDir || pairs.length === 0) {
  console.error('Uso: node scripts/optimize-photos.mjs <pasta-de-saída> <origem>=<nome> [...]')
  process.exit(1)
}

const sizes = [
  ['', 1600, 0.82],
  ['-thumb', 640, 0.78],
]

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  for (const pair of pairs) {
    const sep = pair.lastIndexOf('=')
    const [src, name] = [pair.slice(0, sep), pair.slice(sep + 1)]
    const mime = extname(src).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg'
    const dataUrl = `data:${mime};base64,${(await readFile(src)).toString('base64')}`
    for (const [suffix, max, quality] of sizes) {
      // createImageBitmap aplica a orientação EXIF por padrão.
      const result = await page.evaluate(
        async ({ dataUrl, max, quality }) => {
          const blob = await (await fetch(dataUrl)).blob()
          const bitmap = await createImageBitmap(blob)
          const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height))
          const width = Math.round(bitmap.width * scale)
          const height = Math.round(bitmap.height * scale)
          const canvas = new OffscreenCanvas(width, height)
          const ctx = canvas.getContext('2d')
          ctx.imageSmoothingQuality = 'high'
          ctx.drawImage(bitmap, 0, 0, width, height)
          const out = await canvas.convertToBlob({ type: 'image/webp', quality })
          const bytes = new Uint8Array(await out.arrayBuffer())
          let binary = ''
          for (let i = 0; i < bytes.length; i += 0x8000)
            binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
          return { width, height, base64: btoa(binary) }
        },
        { dataUrl, max, quality },
      )
      const file = join(outDir, `${name}${suffix}.webp`)
      await writeFile(file, Buffer.from(result.base64, 'base64'))
      console.log(`${file}  ${result.width}×${result.height}`)
    }
  }
} finally {
  await browser.close()
}
