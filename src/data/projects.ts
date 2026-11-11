import type { Project, ProjectCategory } from './types.ts'

/**
 * Banco de dados dos projetos.
 *
 * Fontes verificadas em 08/11/2026:
 * - Game Library: README, package.json e docs/CONTEXTO_DO_PROJETO.md de
 *   https://github.com/Ashkor7/biblioteca-jogos
 * - RPG Isekai (verificado em 11/11/2026, marco M4.4): README, docs/ e
 *   work/portfolio-banners/2026-11-11/manifest.json do repositório (privado) Ashkor7/rpg-isekai.
 *   Capa e artes são ilustrações promocionais geradas com IA → `illustrative: true`.
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
      'RPG 2D de fantasia medieval em pixel art, feito na Godot 4: um nobre caído recomeça a vida explorando ruínas, cultivando, cozinhando e evoluindo em profissões.',
    description:
      'RPG isekai top-down em desenvolvimento na Godot Engine 4.7.2 com GDScript. O jogador controla o Nobre Caído, um jovem nobre que perdeu a posição e precisa recomeçar do zero em um mundo medieval de fantasia. O protótipo atual (M4.4) já é jogável da Clareira do Altar em Ruínas até a Vila do Riacho, com coleta, fabricação, profissões, horta, culinária, uma primeira missão, ciclo de dias e salvamento.',
    categories: ['Software', 'Experimental'],
    status: 'Development',
    statusNote: 'Protótipo M4.4 jogável',
    tech: ['Godot 4', 'GDScript', 'Pixel Art'],
    techDetails: [
      { group: 'Engine', items: ['Godot 4.7.2 Stable', 'Renderizador GL Compatibility'] },
      { group: 'Linguagem', items: ['GDScript'] },
      {
        group: 'Arte',
        items: [
          'Pixel art 640×360, grid 16×16',
          'Sprites em quatro direções (parado e caminhando)',
          'Terreno e casas da vila gerados por código',
        ],
      },
      {
        group: 'Dados',
        items: ['Resources com IDs estáveis', 'Save JSON versionado (v7) com backup'],
      },
      { group: 'Qualidade', items: ['Testes headless da Godot a cada marco', 'Capturas de QA'] },
    ],
    cover: {
      src: '/projects/rpg-isekai/capa.webp',
      alt: 'Arte promocional do RPG Isekai: o Nobre Caído, de cabelo ruivo e casaco nobre surrado, sobre ruínas diante de uma vila medieval com rio, ponte e um castelo ao fundo',
      illustrative: true,
    },
    screenshots: [],
    artwork: [
      {
        src: '/projects/rpg-isekai/um-nobre-caido.webp',
        thumb: '/projects/rpg-isekai/um-nobre-caido-thumb.webp',
        alt: '“Um nobre caído. Uma nova vida.” O protagonista, entre pilares em ruínas, olha para a vila ao amanhecer. Sobreviva, aprenda, reconstrua.',
        width: 1600,
        height: 900,
      },
      {
        src: '/projects/rpg-isekai/construa-seu-caminho.webp',
        thumb: '/projects/rpg-isekai/construa-seu-caminho-thumb.webp',
        alt: '“Construa seu próprio caminho”: exploração das ruínas, agricultura na horta da vila, culinária no fogareiro e profissões.',
        width: 1600,
        height: 900,
      },
      {
        src: '/projects/rpg-isekai/evolua-do-seu-jeito.webp',
        thumb: '/projects/rpg-isekai/evolua-do-seu-jeito-thumb.webp',
        alt: '“Evolua do seu jeito”: especializações independentes de Coleta, Ferraria, Alquimia, Agricultura, Culinária e Combate (esta última planejada).',
        width: 1600,
        height: 900,
      },
      {
        src: '/projects/rpg-isekai/um-mundo-para-chamar-de-seu.webp',
        thumb: '/projects/rpg-isekai/um-mundo-para-chamar-de-seu-thumb.webp',
        alt: 'Visão do projeto, “Um mundo para chamar de seu”: terra própria, pesca, relacionamentos e familiares, com uma cidade medieval ao fundo. Conteúdo planejado.',
        width: 1600,
        height: 900,
      },
      {
        src: '/projects/rpg-isekai/desafie-o-desconhecido.webp',
        thumb: '/projects/rpg-isekai/desafie-o-desconhecido-thumb.webp',
        alt: 'Visão do projeto, “Desafie o desconhecido”: o protagonista, de espada em punho, enfrenta goblins, um slime, um esqueleto e um guardião de pedra numa dungeon. Conteúdo planejado.',
        width: 1600,
        height: 900,
      },
    ],
    details: [
      {
        title: 'Engine',
        text: 'Godot 4.7.2 Stable com GDScript e renderizador GL Compatibility, para desktop Windows e Linux. Resolução interna fixa de 640×360 com grade de 16 px. Cada sistema (vida, mochila, fabricação, profissões, relógio) é um componente próprio ligado por sinais, sem autoloads globais.',
      },
      {
        title: 'Ideia e história',
        text: 'Um RPG isekai de recomeço. O protagonista, o Nobre Caído (cabelo ruivo, olhos azuis e um casaco nobre preto já rasgado), começa sem nada na Clareira do Altar em Ruínas e precisa sobreviver, aprender ofícios com quem encontra pelo caminho e reconstruir a própria vida. O lema do projeto resume a proposta: “Sobreviva. Aprenda. Reconstrua.”',
      },
      {
        title: 'Mecânicas pretendidas',
        text: 'Progressão pela prática, sem classes: cada especialização evolui com o que o jogador faz, e o instrutor viajante libera níveis mais altos com treinamento pago. A visão do projeto acrescenta combate como sexta especialização, dungeons com monstros, terra própria, pesca, relacionamentos com os moradores, familiares e uma cidade medieval maior.',
      },
      {
        title: 'Mundo e interações',
        text: 'Duas regiões do mesmo mundo: a clareira das ruínas, com rio, trilhas e o instrutor, e a Vila do Riacho, com seis casas, lavouras, ponte, cercados e animais. Seis moradores (fazendeiro, mãe, filha, professora, cuidador e guerreiro) circulam pela vila. O jogador coleta (E), examina inscrições (F), cuida da horta (G), fabrica e cozinha (C), corta lenha com o machado (Espaço), treina com o instrutor (T) e acompanha pedidos no diário (Q).',
      },
    ],
    github: null,
    githubNote: 'Repositório privado no momento.',
    demo: null,
    problem:
      'Aprender desenvolvimento de jogos na prática, com um projeto grande o bastante para exigir arquitetura: sistemas que conversam entre si, dados persistidos e conteúdo crescendo marco a marco sem quebrar o que já funcionava.',
    goal: 'Construir, em marcos pequenos e validados, um RPG 2D de vida e aventura em pixel art, em que o jogador escolhe o próprio caminho entre ofícios, exploração e, no futuro, combate.',
    features: [
      { label: 'Movimentação em quatro direções e corrida que consome fôlego', state: 'done' },
      { label: 'Vida, dano por espinhos e cura com cataplasma', state: 'done' },
      { label: 'Coleta de madeira, pedra e ervas; mochila com 8 espaços', state: 'done' },
      { label: 'Fabricação de machado de pedra e cataplasma', state: 'done' },
      {
        label:
          'Cinco especializações com XP e nível próprios: Coleta, Ferraria, Alquimia, Agricultura e Culinária',
        state: 'done',
      },
      {
        label: 'Instrutor viajante: treinamento pago amplia o limite de nível de 5 para 10',
        state: 'done',
      },
      { label: 'Machado equipável para extrair madeira de troncos', state: 'done' },
      { label: 'Primeira missão, “Preparativos para a travessia”, com diário', state: 'done' },
      { label: 'Horta: preparar, plantar e colher, com replantio por sementes', state: 'done' },
      { label: 'Culinária no fogareiro: Chá da Clareira e Caldo do Recomeço', state: 'done' },
      { label: 'Relógio do mundo com dias e iluminação gradual', state: 'done' },
      { label: 'Vila do Riacho com seis moradores animados e animais', state: 'done' },
      { label: 'Salvamento manual com backup e migração de saves antigos', state: 'done' },
      { label: 'Combate como sexta especialização', state: 'planned' },
      { label: 'Dungeons e monstros', state: 'planned' },
      { label: 'Terra própria e pesca', state: 'planned' },
      { label: 'Relacionamentos com os moradores e familiares', state: 'planned' },
      { label: 'Cidade medieval ampliada', state: 'planned' },
      { label: 'Estações do ano e rega na agricultura', state: 'planned' },
      { label: 'Builds exportadas e validadas para Windows e Linux', state: 'planned' },
    ],
    architecture:
      'Cena Main com as regiões do mundo e o jogador (CharacterBody2D com câmera limitada por região). Vida, mochila, fabricação, profissões e relógio são componentes desacoplados que se comunicam por sinais; itens, receitas e profissões são Resources com IDs estáveis. O save é um JSON versionado (v7) com backup e migração das versões 1 a 6.',
    challenges:
      'Fabricação atômica (nada é consumido se o resultado não couber na mochila), manter saves antigos compatíveis a cada sistema novo, pausar relógio e horta junto com os menus sem mudar o balanceamento e alinhar as colisões da arte nova à física já validada.',
    currentState:
      'Protótipo M4.4 jogável nas duas regiões, com testes automatizados a cada marco. Combate, dungeons e a expansão do mundo ainda não foram implementados, e as builds exportadas ainda não foram validadas.',
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
