import { expect, test, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 768

/** Coleta erros de console e exceções não tratadas. */
function trackErrors(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  return errors
}

async function goToSection(page: Page, label: string) {
  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Abrir menu' }).click()
  }
  const nav = page.getByRole('banner')
  await nav.getByRole('link', { name: label, exact: true }).locator('visible=true').click()
}

test.describe('Home', () => {
  test('carrega sem erros de console e com metadados', async ({ page }) => {
    const errors = trackErrors(page)
    await page.goto('/')
    await expect(page).toHaveTitle('Leonardo Ribeiro — Software × Automação')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Building Intelligent Systems.',
    )
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Portfólio/)
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /og-image\.png$/,
    )
    for (const id of ['about', 'projects', 'stack', 'lab', 'journey', 'contact']) {
      await expect(page.locator(`section#${id}`)).toHaveCount(1)
    }
    await page.waitForLoadState('networkidle')
    expect(errors).toEqual([])
  })

  test('navbar leva a cada seção e marca a ativa', async ({ page }) => {
    await page.goto('/')
    for (const [label, id] of [
      ['Projetos', 'projects'],
      ['Lab', 'lab'],
      ['Eventos', 'events'],
      ['Contato', 'contact'],
    ] as const) {
      await goToSection(page, label)
      await expect(page).toHaveURL(new RegExp(`#${id}$`))
      await expect(page.locator(`#${id} h2`)).toBeInViewport()
    }
    if (!isMobile(page)) {
      await expect(
        page.getByRole('banner').getByRole('link', { name: 'Contato', exact: true }),
      ).toHaveAttribute('aria-current', 'location')
    }
  })

  test('botões do Hero navegam para Projetos e Contato', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Explore Projects/ }).click()
    await expect(page.locator('#projects h2')).toBeInViewport()
    await page.goto('/')
    await page.getByRole('link', { name: 'Contact Me' }).click()
    await expect(page.locator('#contact h2')).toBeInViewport()
  })

  test('links sociais apontam para os perfis corretos e abrem em nova aba', async ({ page }) => {
    await page.goto('/')
    const github = page.locator('a[href="https://github.com/Ashkor7"]')
    await expect(github.first()).toHaveAttribute('target', '_blank')
    await expect(github.first()).toHaveAttribute('rel', /noopener/)
    await expect(page.locator('a[href^="https://www.linkedin.com/in/"]').first()).toBeVisible()
    await expect(page.locator('a[href="https://github.com/"]')).toHaveCount(0)
    await expect(page.locator('a[href^="mailto:seu.email"]')).toHaveCount(0)
  })

  test('não há rolagem horizontal em larguras comuns', async ({ page }) => {
    for (const width of [360, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      for (const path of ['/', '/projects/game-library', '/events/startup-weekend-pelotas-2026']) {
        await page.goto(path)
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        )
        expect(overflow, `${path} @ ${width}px`).toBeLessThanOrEqual(0)
      }
    }
  })
})

test.describe('Project Database', () => {
  test('filtros funcionam e ficam na URL', async ({ page }) => {
    await page.goto('/#projects')
    const panel = page.getByRole('tabpanel')
    await expect(panel.getByRole('article')).toHaveCount(4)
    await page.getByRole('tab', { name: 'Automation' }).click()
    await expect(page).toHaveURL(/\?filter=automation/)
    await expect(panel.getByRole('article')).toHaveCount(1)
    await page.getByRole('tab', { name: 'Software' }).click()
    await expect(panel.getByRole('article')).toHaveCount(3)

    await page.goto('/?filter=experimental')
    await expect(page.getByRole('tab', { name: 'Experimental' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    await expect(panel.getByRole('article')).toHaveCount(2)
  })

  test('abre os detalhes e volta para a lista', async ({ page }) => {
    await page.goto('/#projects')
    await page.getByRole('link', { name: 'Detalhes do projeto RPG Isekai' }).click()
    await expect(page).toHaveURL('/projects/rpg-isekai')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('RPG Isekai')
    await expect(page).toHaveTitle(/RPG Isekai — Projeto/)
    await expect(page.getByText('GDScript').first()).toBeVisible()
    await page.getByRole('link', { name: 'Voltar aos projetos' }).click()
    await expect(page).toHaveURL('/#projects')
    await expect(page.locator('#projects h2')).toBeInViewport()
  })

  test('todas as rotas de detalhes respondem (inclusive em acesso direto)', async ({ page }) => {
    for (const slug of ['game-library', 'personal-agenda', 'rpg-isekai', 'engineering-lab']) {
      await page.goto(`/projects/${slug}`)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(page.getByText(/ERROR 404/)).toHaveCount(0)
    }
  })

  test('GitHub da Game Library aponta para o repositório', async ({ page }) => {
    await page.goto('/projects/game-library')
    await expect(page.getByRole('link', { name: /Ver no GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/Ashkor7/biblioteca-jogos',
    )
  })

  test('slug inexistente e rota desconhecida mostram 404', async ({ page }) => {
    await page.goto('/projects/nao-existe')
    await expect(page.getByText(/RECORD_NOT_FOUND/)).toBeVisible()
    await page.goto('/qualquer-coisa')
    await expect(page.getByText(/ROUTE_NOT_FOUND/)).toBeVisible()
  })
})

test.describe('Eventos', () => {
  test('card leva à página do evento, com posts e galeria ampliável', async ({ page }) => {
    await page.goto('/#events')
    const card = page.locator('#events article').first()
    await expect(card.getByText('1º lugar')).toBeVisible()
    await expect(card.getByRole('link', { name: /Post no LinkedIn/ })).toHaveAttribute(
      'href',
      /linkedin\.com\/feed\/update\//,
    )
    await card.getByRole('link', { name: /Fotos e detalhes/ }).click()
    await expect(page).toHaveURL('/events/startup-weekend-pelotas-2026')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Startup Weekend')

    const thumb = page.getByRole('button', { name: /Ampliar foto 2 de/ })
    await thumb.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toHaveAccessibleName(/Foto 2 de/)
    await page.keyboard.press('ArrowRight')
    await expect(dialog).toHaveAccessibleName(/Foto 3 de/)
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(page.getByRole('button', { name: /Ampliar foto 3 de/ })).toBeFocused()
  })

  test('acesso direto e slug inexistente', async ({ page }) => {
    await page.goto('/events/startup-weekend-pelotas-2026')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await page.goto('/events/nao-existe')
    await expect(page.getByText(/EVENT_NOT_FOUND/)).toBeVisible()
  })
})

test.describe('Engineering Lab', () => {
  test('sensor liga motor, PWM sobe e reinicia', async ({ page }) => {
    await page.goto('/#lab')
    const lab = page.locator('#lab')
    await expect(lab.getByText('AGUARDANDO', { exact: true })).toBeVisible()
    await lab.getByRole('button', { name: /SENSOR_01/ }).click()
    await expect(lab.getByText('[ ON ]')).toBeVisible()
    await expect(lab.getByText('ACTIVE', { exact: true })).toBeVisible()
    await expect(lab.getByText('OPERANDO', { exact: true })).toBeVisible()
    await expect(lab.getByRole('meter')).toHaveAttribute('aria-valuenow', '78', { timeout: 8000 })
    await lab.getByRole('button', { name: /Reiniciar simulação/ }).click()
    await expect(lab.getByText('IDLE', { exact: true })).toBeVisible()
    await expect(lab.getByRole('meter')).toHaveAttribute('aria-valuenow', '0')
  })
})

test.describe('Contato', () => {
  test('valida e informa honestamente quando o envio não está configurado', async ({ page }) => {
    await page.goto('/#contact')
    const form = page.locator('#contact form')
    await form.getByRole('button', { name: 'Initialize Contact' }).click()
    await expect(form.getByText('Informe seu nome.')).toBeVisible()
    await expect(form.getByLabel('Nome')).toBeFocused()

    // Contra um deploy real o envio mandaria um e-mail de verdade.
    if (process.env.E2E_BASE_URL) return

    await form.getByLabel('Nome').fill('Visitante')
    await form.getByLabel('E-mail').fill('visitante@empresa.com')
    await form.getByLabel('Mensagem').fill('Mensagem de teste do E2E.')
    await page.waitForTimeout(3100) // respeita a proteção anti-spam de tempo mínimo
    await form.getByRole('button', { name: 'Initialize Contact' }).click()
    // O preview local não tem a função /api/contact: deve exibir erro, nunca sucesso falso.
    await expect(form.getByText(/não está disponível/)).toBeVisible()
    await expect(form.getByText(/enviada com sucesso/)).toHaveCount(0)
  })
})

test.describe('Mobile', () => {
  test('menu abre, navega e fecha', async ({ page }) => {
    test.skip(!isMobile(page), 'somente mobile')
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Abrir menu' })
    await toggle.click()
    await expect(page.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    await page.getByRole('banner').getByRole('link', { name: 'Jornada', exact: true }).click()
    await expect(page.locator('#journey h2')).toBeInViewport()
    await expect(page.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })
})

test.describe('Acessibilidade', () => {
  test('respeita prefers-reduced-motion (terminal completo, sem botão skip)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await expect(page.getByText('> system ready.')).toBeVisible()
    await expect(page.getByRole('button', { name: /skip/i })).toHaveCount(0)
  })

  test('navegação por teclado alcança o link de pular conteúdo', async ({ page }) => {
    test.skip(isMobile(page), 'teclado físico: desktop')
    await page.goto('/')
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused()
  })

  for (const path of ['/', '/projects/game-library', '/events/startup-weekend-pelotas-2026']) {
    test(`sem violações graves de acessibilidade (axe) em ${path}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
      const serious = results.violations.filter((v) =>
        ['serious', 'critical'].includes(v.impact ?? ''),
      )
      expect(
        serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`),
      ).toEqual([])
    })
  }
})
