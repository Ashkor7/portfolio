import { describe, expect, it, vi } from 'vitest'
import { act, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectsSection } from '@/sections/ProjectsSection'
import { LabSection } from '@/sections/LabSection'
import { ContactForm } from '@/components/ui/ContactForm'
import { Navbar } from '@/components/navigation/Navbar'
import { BootTerminal } from '@/components/terminal/BootTerminal'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { routes } from '@/router'
import { mockReducedMotion } from './setup'
import { renderRoutes, renderWithRouter } from './render'

describe('Project Database', () => {
  it('lista os quatro projetos com IDs estáveis', () => {
    renderWithRouter(<ProjectsSection />)
    const panel = screen.getByRole('tabpanel')
    expect(within(panel).getAllByRole('article')).toHaveLength(4)
    expect(within(panel).getByText('ID_004')).toBeInTheDocument()
  })

  it('filtra, marca a aba ativa e reflete o filtro na URL', async () => {
    const user = userEvent.setup()
    const { router } = renderWithRouter(<ProjectsSection />)
    await user.click(screen.getByRole('tab', { name: 'Automation' }))

    expect(screen.getByRole('tab', { name: 'Automation' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(screen.getByRole('heading', { name: 'Engineering Lab' })).toBeInTheDocument()
    // O ID não muda quando a lista é filtrada (no original mudava).
    expect(screen.getByText('ID_004')).toBeInTheDocument()
    expect(router.state.location.search).toBe('?filter=automation')
  })

  it('lê o filtro inicial da URL e navega entre abas com as setas', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ProjectsSection />, '/?filter=experimental')
    const tab = screen.getByRole('tab', { name: 'Experimental' })
    expect(tab).toHaveAttribute('aria-selected', 'true')
    tab.focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'All Projects' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })

  it('mostra estado vazio quando nenhum projeto corresponde', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ProjectsSection list={[]} />)
    expect(screen.getByText(/query returned 0 records/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Ver todos os projetos' }))
  })

  it('o card da Game Library aponta para o repositório e para a rota de detalhes', () => {
    renderWithRouter(<ProjectsSection />)
    expect(screen.getByRole('link', { name: /Repositório do Game Library/ })).toHaveAttribute(
      'href',
      'https://github.com/Ashkor7/biblioteca-jogos',
    )
    expect(screen.getByRole('link', { name: 'Detalhes do projeto Game Library' })).toHaveAttribute(
      'href',
      '/projects/game-library',
    )
  })
})

describe('Engineering Lab', () => {
  it('reage ao sensor e pode ser reiniciado', async () => {
    mockReducedMotion(true) // valores finais imediatos, sem timers
    const user = userEvent.setup()
    renderWithRouter(<LabSection />)
    const sensor = screen.getByRole('button', { name: /SENSOR_01/ })
    expect(sensor).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText('IDLE')).toBeInTheDocument()
    expect(screen.getByText('AGUARDANDO')).toBeInTheDocument()

    await user.click(sensor)
    expect(sensor).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('[ ON ]')).toBeInTheDocument()
    expect(screen.getByText('ACTIVE')).toBeInTheDocument()
    expect(screen.getByText('OPERANDO')).toBeInTheDocument()
    expect(screen.getByRole('meter', { name: 'Saída PWM' })).toHaveAttribute('aria-valuenow', '78')

    await user.click(screen.getByRole('button', { name: /Reiniciar simulação/ }))
    expect(screen.getByText('[ OFF ]')).toBeInTheDocument()
    expect(screen.getByText('0%')).toBeInTheDocument()
    mockReducedMotion(false)
  })

  it('identifica a demonstração como ilustrativa', () => {
    renderWithRouter(<LabSection />)
    expect(screen.getByText(/Não representa um modelo físico validado/)).toBeInTheDocument()
  })
})

describe('Formulário de contato', () => {
  it('valida os campos sem enviar', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const user = userEvent.setup()
    renderWithRouter(<ContactForm />)
    await user.click(screen.getByRole('button', { name: 'Initialize Contact' }))
    expect(screen.getByLabelText('Nome')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText('Informe seu e-mail.')).toBeInTheDocument()
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })

  it('mostra erro (e não sucesso) quando o serviço não está configurado', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ ok: false }), { status: 503 }))
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderWithRouter(<ContactForm />)
    await user.type(screen.getByLabelText('Nome'), 'Ana')
    await user.type(screen.getByLabelText('E-mail'), 'ana@empresa.com')
    await user.type(screen.getByLabelText('Mensagem'), 'Mensagem de teste longa')
    act(() => vi.advanceTimersByTime(4000))
    await user.click(screen.getByRole('button', { name: 'Initialize Contact' }))

    expect(await screen.findByText(/não está disponível/)).toBeInTheDocument()
    expect(screen.queryByText(/enviada com sucesso/)).not.toBeInTheDocument()
    fetchSpy.mockRestore()
    vi.useRealTimers()
  })

  it('confirma sucesso quando o servidor responde ok', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }))
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderWithRouter(<ContactForm />)
    await user.type(screen.getByLabelText('Nome'), 'Ana')
    await user.type(screen.getByLabelText('E-mail'), 'ana@empresa.com')
    await user.type(screen.getByLabelText('Mensagem'), 'Mensagem de teste longa')
    act(() => vi.advanceTimersByTime(4000))
    await user.click(screen.getByRole('button', { name: 'Initialize Contact' }))

    expect(await screen.findByText(/enviada com sucesso/)).toBeInTheDocument()
    expect(fetchSpy).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({ method: 'POST' }),
    )
    fetchSpy.mockRestore()
    vi.useRealTimers()
  })
})

describe('Navegação', () => {
  it('menu mobile abre, expõe aria-expanded e fecha com Esc', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Navbar />)
    const toggle = screen.getByRole('button', { name: 'Abrir menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()
  })

  it('links apontam para as seções da home', () => {
    renderWithRouter(<Navbar />)
    const links = screen.getAllByRole('link', { name: 'Projetos' })
    expect(links[0]).toHaveAttribute('href', '/#projects')
  })
})

describe('Terminal de inicialização', () => {
  it('mostra o texto completo com movimento reduzido', () => {
    mockReducedMotion(true)
    renderWithRouter(<BootTerminal lines={['a', 'system ready.']} />)
    expect(screen.getAllByText(/system ready\./).length).toBeGreaterThan(0)
    expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument()
    mockReducedMotion(false)
  })

  it('pode ser pulado', async () => {
    const user = userEvent.setup()
    renderWithRouter(<BootTerminal lines={['initializing portfolio...', 'system ready.']} />)
    await user.click(screen.getByRole('button', { name: /skip/i }))
    expect(screen.getByText('> system ready.')).toBeInTheDocument()
  })
})

describe('Rotas', () => {
  it('renderiza a página de detalhes com título, repositório e aviso de ilustração', () => {
    renderRoutes(
      [{ path: '/projects/:slug', element: <ProjectDetailPage /> }],
      '/projects/game-library',
    )
    expect(screen.getByRole('heading', { level: 1, name: 'Game Library' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Ver no GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/Ashkor7/biblioteca-jogos',
    )
    expect(screen.getByText(/Ilustração conceitual/)).toBeInTheDocument()
    expect(document.title).toBe('Game Library — Projeto | Leonardo Ribeiro')
  })

  it('projeto inexistente mostra 404', () => {
    renderRoutes([{ path: '/projects/:slug', element: <ProjectDetailPage /> }], '/projects/xyz')
    expect(screen.getByText(/RECORD_NOT_FOUND/)).toBeInTheDocument()
  })

  it('rota desconhecida mostra 404', async () => {
    renderRoutes(routes, '/nada-aqui')
    expect(await screen.findByText(/ROUTE_NOT_FOUND/)).toBeInTheDocument()
  })
})
