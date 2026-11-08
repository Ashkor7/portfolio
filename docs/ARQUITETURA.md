# Arquitetura e decisões

## Estrutura

```text
api/
  contact.ts            # função serverless (Vercel) — envio via Resend
src/
  config/site.ts        # dados pessoais, links sociais, SEO, pendências de validação
  data/                 # conteúdo editável (sem JSX)
    projects.ts           projetos + filtros (também lido pelo vite.config para o sitemap)
    stack.ts              tecnologias (em uso × em estudo)
    journey.ts            timeline acadêmica
    profile.ts            módulos do Operator Profile, linhas do boot, seções da navbar
    status.ts             cores/rótulos dos status
    types.ts              tipos de domínio
  features/lab/         # simulação do Engineering Lab
    simulation.ts         lógica pura (testável, sem React)
    useSimulation.ts      ligação com React (timer, movimento reduzido, visibilidade)
  components/
    layout/               RootLayout, Footer, ScrollManager, RouteLoading, RouteError
    navigation/           Navbar
    ui/                   HudCard, Badge, Led, Button*, SectionHeader, Reveal, SocialLinks, ContactForm…
    terminal/             BootTerminal
    projects/             ProjectCard, ProjectImage, ProjectDetail
    engineering/          BlockDiagram, SignalChart
    icons/                ícones de marca (o lucide-react 1.x removeu os de marcas)
  sections/             # as 7 seções da home
  pages/                # HomePage, ProjectDetailPage, NotFoundPage
  hooks/                # useActiveSection, useInView, useReducedMotion, usePageMeta…
  styles/index.css      # design tokens (Tailwind v4 @theme) e utilitários HUD
  utils/                # cn, motion, validação e envio do contato
  test/                 # setup e testes de componentes
e2e/                    # Playwright (funcional, responsivo, acessibilidade)
scripts/                # comparação visual com o original, geração de OG image/ícones
```

## Decisões

**Vite + React 19 + TypeScript + Tailwind CSS 4 + React Router 8 (modo biblioteca).**
É a stack pedida e a mais próxima do original (que usava Tailwind 4 e TanStack Router).
Usei React Router no modo de dados (`createBrowserRouter`) por ser o padrão atual e
permitir `errorElement`, _code splitting_ e roteador em memória nos testes.

**TypeScript fixado em 6.0.x.** O 7.0 já existe, mas o `typescript-eslint` ainda declara
suporte só até `<6.1`.

**Sem Motion/Framer Motion.** Todas as animações do original são CSS (`dash`, `pulse`,
`spin`, `reveal`). Adicionar uma biblioteca não traria ganho. O `prefers-reduced-motion`
é tratado no CSS e, onde há JavaScript (terminal e simulação), pelo hook `useReducedMotion`.

**Fontes self-hosted (`@fontsource`).** Mesmas famílias do original, sem depender do
Google Fonts em tempo de execução (privacidade e desempenho).

**Dados separados da apresentação.** Todo texto editável está em `src/data` e
`src/config`. Os componentes só recebem dados. Adicionar um projeto é incluir um objeto
em `projects.ts`: a rota, o card, o filtro e o sitemap saem dele.

**Status honesto como regra de dados.** `ProjectStatus` tem `Completed`, `Development`,
`Planned` e `Concept`, e cada funcionalidade tem `done | planned`. Um teste garante
que projetos Planned/Concept não tenham funcionalidades marcadas como prontas.

**Imagens ilustrativas marcadas no dado.** `ProjectImage.illustrative` controla o selo
"Concept art" no card e a legenda na página. `screenshots[]` recebe capturas reais.

**Botões chanfrados sem perder o foco.** O `clip-path` corta `border` e `outline`, então
o botão ghost é uma moldura (camada externa colorida + interna com fundo `--ghost-bg`), e
o foco visível usa `box-shadow: inset` ou muda a cor da moldura.

**Filtro de projetos na URL.** `?filter=software` com `replace` e `preventScrollReset`:
o link pode ser compartilhado e o filtro não cria entradas de histórico nem rola a página.

**ScrollManager.** O React Router não rola até `#hash`. O componente rola até a seção
(inclusive vindo de outra rota), volta ao topo em mudança de página e preserva a posição
quando só a _query_ muda.

**Simulação isolada.** `simulation.ts` é puro: `step(state, dt)`, `readout(state)`,
`settle()`. O laço de 80 ms só roda com a seção visível, quando há algo mudando e sem
movimento reduzido. Para evoluir (PID, outros sensores, telemetria real), basta trocar ou
estender essas funções.

**Metadados por página sem duplicar tags.** `usePageMeta` atualiza as `<meta>` já
existentes no `index.html` (que servem crawlers sem JS) em vez de usar o _hoisting_ do
React 19, que duplicaria as tags.

**Formulário com envio real ou erro real.** `POST /api/contact` (Vercel Function) chama a
API HTTP do Resend com segredos só no servidor. Sem as variáveis, a função responde 503
e a interface mostra "envio indisponível". Proteções: validação compartilhada
cliente/servidor, honeypot, tempo mínimo de preenchimento, limite por IP (em memória,
melhor esforço) e limite de tamanho.

**SEO no build.** Um plugin no `vite.config.ts` gera `robots.txt` e, com `VITE_SITE_URL`,
`sitemap.xml` a partir dos projetos. Sem a URL, o sitemap não é gerado, para não
inventar um domínio.

## Evolução prevista

- **Novos projetos / certificações / experiências:** novos itens em `projects.ts` e
  `journey.ts` (a categoria já prevê `Certificação`, `Experiência`, `Hackathon`).
- **Demonstrações de engenharia:** novos módulos em `src/features/lab` reaproveitando
  `SignalChart` e `BlockDiagram`, ou um bloco específico em `ProjectDetailPage` (`extras`).
- **Software Mode × Engineering Mode:** os tons já são tokens CSS (`--neon`, `--industrial`…);
  um modo pode ser um atributo `data-mode` no `<html>` que reatribui os tokens, sem mexer
  nos componentes. Não implementado, para não descaracterizar o original.
