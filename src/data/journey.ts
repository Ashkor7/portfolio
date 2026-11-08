import type { JourneyEvent } from './types'

/**
 * Linha do tempo acadêmica.
 *
 * O site original exibia "2024" como início das duas graduações e "2025" para os
 * primeiros projetos; essas datas não puderam ser confirmadas e foram removidas.
 * Preencha `date` somente com datas reais. Com `date: null`, a timeline mostra
 * "EM CURSO" (realizado) ou "PRÓXIMO PASSO" (planejado).
 *
 * Datas confirmadas pelo histórico do Git: Game Library (out/2026) e
 * protótipo do RPG Isekai (out/2026).
 */
export const journey: JourneyEvent[] = [
  {
    date: null,
    title: 'Análise e Desenvolvimento de Sistemas',
    description: 'Graduação em ADS em andamento.',
    category: 'Graduação',
    status: 'done',
  },
  {
    date: null,
    title: 'Engenharia de Controle e Automação',
    description: 'Segunda graduação, cursada em paralelo.',
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
    date: null,
    title: 'Hackathons e competições',
    description: 'Participação planejada em eventos de tecnologia.',
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
