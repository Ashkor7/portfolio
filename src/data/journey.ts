import type { JourneyEvent } from './types'

/**
 * Linha do tempo acadêmica.
 *
 * O site original exibia "2024" como início das duas graduações e "2025" para os
 * primeiros projetos; essas datas estavam erradas e foram substituídas.
 * Preencha `date` somente com datas reais. Com `date: null`, a timeline mostra
 * "EM CURSO" (realizado/em andamento) ou "PRÓXIMO PASSO" (planejado).
 *
 * Datas confirmadas: graduações pelo dono (jan/2026 e mar/2026, conforme o LinkedIn);
 * Game Library e protótipo do RPG Isekai (out/2026) pelo histórico do Git.
 */
export const journey: JourneyEvent[] = [
  {
    date: 'JAN 2026',
    title: 'Engenharia de Controle e Automação',
    description: 'Graduação em Engenharia de Controle e Automação, iniciada em janeiro de 2026.',
    category: 'Graduação',
    status: 'progress',
  },
  {
    date: 'MAR 2026',
    title: 'Análise e Desenvolvimento de Sistemas',
    description: 'Graduação em ADS, iniciada em março de 2026 e cursada em paralelo.',
    category: 'Graduação',
    status: 'progress',
  },
  {
    date: 'OUT 2026',
    title: 'Game Library full-stack',
    description: 'Biblioteca de Jogos reconstruída com API Express, Prisma e PostgreSQL.',
    category: 'Projeto',
    status: 'done',
  },
  {
    date: 'OUT 2026',
    title: 'RPG Isekai em desenvolvimento',
    description:
      'Jogo em Godot 4; o primeiro marco jogável (movimentação, colisões e câmera) já está pronto.',
    category: 'Projeto',
    status: 'progress',
  },
  {
    date: 'OUT 2026',
    title: 'Startup Weekend Pelotas — 1º lugar',
    description:
      'Equipe campeã do Techstars Startup Weekend Pelotas com a Melhor Obra, marketplace de serviços com pagamento protegido; atuei no desenvolvimento do MVP.',
    category: 'Hackathon',
    status: 'done',
  },
  {
    date: null,
    title: 'Novos hackathons e competições',
    description: 'Participação planejada em outros eventos de tecnologia.',
    category: 'Hackathon',
    status: 'planned',
  },
  {
    date: null,
    title: 'Projetos com microcontroladores',
    description: 'Protótipos físicos no Engineering Lab.',
    category: 'Projeto',
    status: 'planned',
  },
]
