import type { JourneyEvent } from './types'

/**
 * Linha do tempo acadêmica.
 *
 * O site original exibia "2024" como início das duas graduações e "2025" para os
 * primeiros projetos; essas datas estavam erradas e foram substituídas.
 * Preencha `date` somente com datas reais. Com `date: null`, a timeline mostra
 * "EM CURSO" (realizado) ou "PRÓXIMO PASSO" (planejado).
 *
 * Datas confirmadas: graduações pelo dono (jan/2026 e mar/2026, conforme o LinkedIn);
 * Game Library e protótipo do RPG Isekai (out/2026) pelo histórico do Git.
 */
export const journey: JourneyEvent[] = [
  {
    date: 'JAN 2026',
    title: 'Engenharia de Controle e Automação',
    description: 'Início da graduação em Engenharia de Controle e Automação.',
    category: 'Graduação',
    status: 'done',
  },
  {
    date: 'MAR 2026',
    title: 'Análise e Desenvolvimento de Sistemas',
    description: 'Início da graduação em ADS, cursada em paralelo.',
    category: 'Graduação',
    status: 'done',
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
    title: 'Protótipo do RPG Isekai',
    description: 'Primeiro marco jogável em Godot 4: movimentação, colisões e câmera.',
    category: 'Projeto',
    status: 'done',
  },
  {
    date: '2026',
    title: 'Startup Weekend Pelotas — 1º lugar',
    description:
      'Equipe campeã do Techstars Startup Weekend Pelotas com a Melhor Obra; atuei como desenvolvedor.',
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
