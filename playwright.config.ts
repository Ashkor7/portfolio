import { defineConfig, devices } from '@playwright/test'

const PORT = 4173
// E2E_BASE_URL=https://... roda os testes contra um deploy, sem subir o preview local.
const remote = process.env.E2E_BASE_URL

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.02, animations: 'disabled' },
  },
  use: {
    baseURL: remote ?? `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    { name: 'mobile', use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 } } },
  ],
  webServer: remote
    ? undefined
    : {
        // Testa o build de produção real.
        command: 'npm run build && npm run preview',
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
})
