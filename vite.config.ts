/// <reference types="vitest/config" />
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { projects } from './src/data/projects.ts'
import { events } from './src/data/events.ts'

/**
 * Gera robots.txt e sitemap.xml no build a partir dos dados de projetos e eventos.
 * Sem VITE_SITE_URL, o sitemap é omitido (URLs absolutas seriam inventadas).
 */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'portfolio-seo-files',
    apply: 'build',
    generateBundle() {
      const base = siteUrl.replace(/\/+$/, '')
      const robots = [
        'User-agent: *',
        'Allow: /',
        ...(base ? [`Sitemap: ${base}/sitemap.xml`] : []),
      ]
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' })

      if (!base) {
        this.warn('VITE_SITE_URL não definido: sitemap.xml não foi gerado.')
        return
      }
      const paths = [
        '/',
        ...projects.map((p) => `/projects/${p.slug}`),
        ...events.map((e) => `/events/${e.slug}`),
      ]
      const urls = paths.map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

// Garante substituição de %VITE_SITE_URL% no index.html mesmo sem a variável e remove a
// barra final (evita `https://site//og-image.png`).
process.env.VITE_SITE_URL = (process.env.VITE_SITE_URL ?? '').replace(/\/+$/, '')

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), tailwindcss(), seoFiles(env.VITE_SITE_URL ?? '')],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.test.{ts,tsx}', 'api/**/*.test.ts'],
      css: false,
    },
  }
})
