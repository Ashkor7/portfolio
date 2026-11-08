import type { Project, ProjectCategory } from './types.ts'

/**
 * Banco de dados dos projetos.
 *
 * Fontes verificadas em 08/11/2026:
 * - Game Library: README, package.json e docs/CONTEXTO_DO_PROJETO.md de
 *   https://github.com/Ashkor7/biblioteca-jogos
 * - RPG Isekai: README e docs/technical-decisions.md do repositório (privado) Ashkor7/rpg-isekai
 * - Personal Agenda: nenhum repositório ou código encontrado → Planned
 * - Engineering Lab: nenhum projeto publicado → Concept
 *
 * As capas vieram do site original (Lovable) e são ilustrações conceituais,
 * não capturas reais — por isso `illustrative: true`. Adicione capturas reais
 * em `screenshots` quando existirem.
 *
 * Este arquivo também é lido pelo vite.config.ts (sitemap), então não deve
 * importar assets nem usar import.meta.env.
 */

export const projectFilters = [
  'All',
  'Software',
  'Automation',
  'Engineering',
  'Experimental',
] as const
export type ProjectFilter = (typeof projectFilters)[number]

export const projects: Project[] = [
  {
    id: 'ID_001',
    slug: 'game-library',
    name: 'Game Library',
    altName: 'Biblioteca de Jogos',
    summary:
      'Biblioteca pessoal de jogos com API própria, banco PostgreSQL, plataformas dinâmicas, lista de desejos e estatísticas.',
    description:
      'Aplicação full-stack para gerenciar uma coleção pessoal de jogos com persistência real no servidor. Começou como trabalho do SENAC (React + localStorage) e foi reconstruída com API Express, Prisma e PostgreSQL.',
    categories: ['Software'],
    status: 'Development',
    statusNote: 'Funcional localmente · sem deploy público',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
    techDetails: [
      {
        group: 'Frontend',
        items: [
          'React 19',
          'Vite',
          'Tailwind CSS 4',
          'React Router',
          'TanStack Query',
          'React Hook Form',
          'Recharts',
        ],
      },
      {
        group: 'Backend',
        items: [
          'Node.js',
          'Express 5',
          'Zod',
          'Multer',
          'bcryptjs',
          'JWT em cookie HttpOnly',
          'Helmet',
        ],
      },
      { group: 'Banco de dados', items: ['PostgreSQL', 'Prisma 6 (migrações versionadas)'] },
      { group: 'Qualidade', items: ['Vitest', 'Supertest', 'Testing Library', 'ESLint'] },
    ],
    cover: {
      src: '/projects/game-library.jpg',
      alt: 'Ilustração conceitual de uma interface de biblioteca de jogos em estilo cyberpunk',
      illustrative: true,
    },
    screenshots: [],
    github: 'https://github.com/Ashkor7/biblioteca-jogos',
    demo: null,
    problem:
      'Jogos comprados em várias plataformas e lojas ficam espalhados, e é difícil saber quanto foi gasto, quanto foi economizado e quanto tempo foi jogado.',
    goal: 'Centralizar a coleção em um único lugar, com dados persistidos no servidor, estatísticas confiáveis e uma lista de desejos separada da biblioteca.',
    features: [
      { label: 'Biblioteca pessoal com persistência em PostgreSQL', state: 'done' },
      {
        label: 'Plataformas dinâmicas criadas a partir do cadastro (rota /plataformas/:slug)',
        state: 'done',
      },
      { label: 'Cadastro e edição de jogos com validação no cliente e no servidor', state: 'done' },
      { label: 'Imagens de capa e galeria (upload ou URL https)', state: 'done' },
      { label: 'Categorias livres, avaliação escrita e nota de 1 a 5 estrelas', state: 'done' },
      { label: 'Lista de desejos com ação "Marcar como comprado"', state: 'done' },
      { label: 'Estatísticas de gastos, economia, horas e lojas', state: 'done' },
      { label: 'Autenticação do proprietário (bcrypt + cookie HttpOnly)', state: 'done' },
      { label: 'Deploy público com banco gerenciado', state: 'planned' },
    ],
    architecture:
      'Monorepo com frontend React/Vite na raiz e API Express em server/. A pasta shared/ guarda os esquemas Zod usados pelos dois lados. Prisma gerencia o PostgreSQL com migrações versionadas, e as estatísticas são calculadas no banco.',
    challenges:
      'Valores monetários sem erro de arredondamento (DECIMAL e Prisma.Decimal), normalização de nomes de plataformas e lojas, renomear plataformas sem quebrar URLs antigas e proteger a escrita contra CSRF.',
    currentState:
      'Funcionalidades principais implementadas e cobertas por testes da API e da interface. Roda localmente; o deploy público ainda não foi feito.',
  },
  {
    id: 'ID_002',
    slug: 'personal-agenda',
    name: 'Personal Agenda',
    summary: 'Aplicação planejada para organizar tarefas, compromissos e atividades diárias.',
    description:
      'Agenda pessoal pensada para conciliar a rotina de duas graduações. O projeto ainda está em planejamento: não há código nem repositório publicados.',
    categories: ['Software'],
    status: 'Planned',
    statusNote: 'Em planejamento · sem código publicado',
    tech: ['JavaScript', 'React'],
    techDetails: [{ group: 'Tecnologias previstas', items: ['JavaScript', 'React', 'Git'] }],
    cover: {
      src: '/projects/personal-agenda.jpg',
      alt: 'Ilustração conceitual de uma interface de agenda em estilo cyberpunk',
      illustrative: true,
    },
    screenshots: [],
    github: null,
    githubNote: 'Repositório ainda não criado.',
    demo: null,
    problem:
      'Uma rotina dividida entre duas graduações exige planejamento preciso de aulas, prazos e tarefas.',
    goal: 'Visualizar a semana, priorizar tarefas e acompanhar compromissos em um único lugar.',
    features: [
      { label: 'Visão semanal de compromissos', state: 'planned' },
      { label: 'Cadastro e priorização de tarefas', state: 'planned' },
      { label: 'Detecção de conflitos de horário', state: 'planned' },
      { label: 'Lembretes', state: 'planned' },
    ],
    architecture:
      'A definir. A ideia inicial é uma SPA em React; a forma de persistência ainda não foi escolhida.',
    challenges: 'Previstos: recorrência de eventos, fusos horários e sobreposição de compromissos.',
    currentState: 'Planejado. Nenhuma funcionalidade implementada até o momento.',
  },
  {
    id: 'ID_003',
    slug: 'rpg-isekai',
    name: 'RPG Isekai',
    summary:
      'Protótipo de RPG 2D top-down em Godot 4 e GDScript: movimentação, colisões e câmera no primeiro mapa de teste.',
    description:
      'Jogo de RPG 2D de exploração em desenvolvimento na Godot Engine. O marco atual (M1) é um protótipo jogável com movimentação em quatro direções, colisões, câmera e o primeiro personagem animado.',
    categories: ['Software', 'Experimental'],
    status: 'Development',
    statusNote: 'Protótipo M1',
    tech: ['Godot 4', 'GDScript', 'Pixel Art'],
    techDetails: [
      { group: 'Engine', items: ['Godot 4.7.2 Stable'] },
      { group: 'Linguagem', items: ['GDScript'] },
      {
        group: 'Arte',
        items: ['Pixel art 640×360, grid 16×16', 'Spritesheet animada do personagem'],
      },
      { group: 'Qualidade', items: ['Smoke test headless da Godot'] },
    ],
    cover: {
      src: '/projects/rpg-isekai.jpg',
      alt: 'Ilustração conceitual de um portal de fantasia em pixel art',
      illustrative: true,
    },
    screenshots: [],
    github: null,
    githubNote: 'Repositório privado no momento.',
    demo: null,
    problem:
      'Aprender desenvolvimento de jogos na prática: organização de cenas, física 2D, colisões e animação de personagens.',
    goal: 'Construir, em marcos pequenos e validados, um RPG 2D de exploração com arte em pixel art.',
    features: [
      { label: 'Movimentação top-down em quatro direções (WASD e setas)', state: 'done' },
      { label: 'Colisões com casa, lago, cerca, rochas e limites do mapa', state: 'done' },
      { label: 'Câmera que segue o jogador limitada ao mapa', state: 'done' },
      { label: 'Resolução lógica fixa de 640×360', state: 'done' },
      { label: 'Spritesheet animada do personagem com fallback seguro', state: 'done' },
      { label: 'Mapa com TileMapLayer e arte definitiva', state: 'planned' },
      { label: 'Combate, inventário e NPCs', state: 'planned' },
      { label: 'Sistema de salvamento', state: 'planned' },
    ],
    architecture:
      'Cena Main (Node2D) com o mundo de teste e o jogador instanciados. O jogador é um CharacterBody2D com CollisionShape2D e Camera2D; as colisões do mundo são StaticBody2D criadas na inicialização. Scripts organizados por domínio (player/, world/).',
    challenges:
      'Manter a física top-down previsível sem diagonais, limitar a câmera ao mapa e introduzir animação sem alterar colisões já validadas.',
    currentState:
      'Protótipo M1 jogável. Arte do mapa ainda provisória; combate, inventário e salvamento ainda não foram implementados.',
  },
  {
    id: 'ID_004',
    slug: 'engineering-lab',
    name: 'Engineering Lab',
    summary: 'Espaço reservado para futuros projetos de automação, simulação e eletrônica.',
    description:
      'Área que vai reunir experimentos e projetos acadêmicos de Engenharia de Controle e Automação. Ainda não há projetos publicados.',
    categories: ['Automation', 'Engineering', 'Experimental'],
    status: 'Concept',
    statusNote: 'Nenhum projeto publicado ainda',
    tech: ['C', 'Python', 'Microcontroladores'],
    techDetails: [
      {
        group: 'Tecnologias previstas',
        items: ['C', 'Python', 'Microcontroladores', 'Sensores e atuadores'],
      },
    ],
    cover: {
      src: '/projects/engineering-lab.jpg',
      alt: 'Ilustração conceitual de uma bancada de eletrônica com osciloscópio',
      illustrative: true,
    },
    screenshots: [],
    github: null,
    githubNote: 'Sem repositório: ainda não há projetos publicados.',
    demo: null,
    problem:
      'Reunir em um só lugar, de forma documentada, os experimentos feitos ao longo da graduação.',
    goal: 'Publicar simulações de controle, protótipos com microcontroladores e relatórios técnicos.',
    features: [
      { label: 'Simulações de malhas de controle', state: 'planned' },
      { label: 'Protótipos com microcontroladores', state: 'planned' },
      { label: 'Telemetria de sensores visualizada no navegador', state: 'planned' },
    ],
    architecture:
      'Prevista: sensores → microcontrolador → atuadores, com telemetria enviada para software.',
    challenges: 'Ainda a definir — projeto em fase de concepção.',
    currentState: 'Conceito. Nenhum resultado publicado ainda.',
  },
]

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function filterProjects(list: Project[], filter: ProjectFilter): Project[] {
  if (filter === 'All') return list
  return list.filter((p) => p.categories.includes(filter as ProjectCategory))
}

/** Converte o valor da URL (?filter=software) em um filtro válido. */
export function parseProjectFilter(value: string | null): ProjectFilter {
  if (!value) return 'All'
  const match = projectFilters.find((f) => f.toLowerCase() === value.toLowerCase())
  return match ?? 'All'
}
