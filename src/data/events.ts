import type { EventPhoto, PortfolioEvent } from './types'

/**
 * Eventos, hackathons e competições.
 *
 * Fotos: gere com `node scripts/optimize-photos.mjs public/events/<slug> <origem>=<nome>`
 * e copie as dimensões impressas. Todas as fotos são reais, do próprio evento.
 * Não descreva nada que não esteja nas fotos ou nos posts do dono.
 */
function photo(slug: string, name: string, width: number, height: number, alt: string): EventPhoto {
  const base = `/events/${slug}/${name}`
  return { src: `${base}.webp`, thumb: `${base}-thumb.webp`, alt, width, height }
}

const swp = (name: string, width: number, height: number, alt: string) =>
  photo('startup-weekend-pelotas-2026', name, width, height, alt)

const startupWeekendPhotos: EventPhoto[] = [
  swp(
    'premiacao-equipe',
    1080,
    636,
    'Equipe Melhor Obra no palco recebendo o troféu de 1º lugar do Startup Weekend Pelotas',
  ),
  swp(
    'equipe-medalhas',
    1080,
    716,
    'Equipe vencedora com medalhas e troféu em frente ao painel “From Zero to Hero”',
  ),
  swp(
    'leonardo-trofeu',
    1200,
    1600,
    'Leonardo segurando o troféu de 1º lugar, com a medalha no pescoço',
  ),
  swp(
    'pitch',
    1392,
    928,
    'Equipe apresentando o pitch da Melhor Obra: “Conectando mão de obra a clientes que buscam profissionais com segurança”',
  ),
  swp(
    'desenvolvimento',
    1600,
    1066,
    'Equipe trabalhando nos notebooks durante o evento, ao lado do painel “From Zero to Hero”',
  ),
  swp(
    'discussao',
    1392,
    928,
    'Integrantes da equipe discutindo a solução em volta da mesa de trabalho',
  ),
  swp('equipe', 1200, 1600, 'Integrantes da equipe reunidos nos bancos verdes do espaço do evento'),
  swp(
    'medalha-cracha',
    1204,
    1600,
    'Medalha do Techstars Startup Weekend Pelotas e crachá de Leonardo com a área “DEV”',
  ),
  swp(
    'participantes',
    1371,
    914,
    'Foto oficial com todos os participantes do Startup Weekend Pelotas 2026 acenando',
  ),
]

export const events: PortfolioEvent[] = [
  {
    id: 'EVT_001',
    slug: 'startup-weekend-pelotas-2026',
    name: 'Techstars Startup Weekend Pelotas 2026',
    category: 'Competição',
    date: '2026',
    location: 'Pelotas, RS',
    organizer: 'Techstars Startup Weekend',
    role: 'Desenvolvedor',
    result: '1º lugar',
    summary:
      'Equipe campeã com a Melhor Obra, proposta de plataforma que conecta mão de obra a clientes que buscam profissionais com segurança. Participei como desenvolvedor.',
    description: [
      'O Startup Weekend é um evento da Techstars em que pessoas de negócios, design e desenvolvimento formam equipes e, em um fim de semana, levam uma ideia até o pitch final para a banca.',
      'Nossa equipe criou a Melhor Obra — “Sua obra, nas mãos certas” — e conquistou o 1º lugar da edição de Pelotas.',
    ],
    highlights: [
      '1º lugar na edição de Pelotas',
      'Atuação na área de desenvolvimento',
      'Equipe multidisciplinar: negócios, design e desenvolvimento',
      'Pitch final apresentado para a banca',
    ],
    project: {
      name: 'Melhor Obra',
      tagline: 'Sua obra, nas mãos certas.',
      description:
        'Plataforma que conecta mão de obra a clientes que buscam profissionais com segurança.',
    },
    links: [
      {
        kind: 'linkedin',
        label: 'Post no LinkedIn',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7524456460802764800/',
      },
      {
        kind: 'instagram',
        label: 'Post no Instagram',
        href: 'https://www.instagram.com/p/DexZn2Bma1V/',
      },
    ],
    cover: startupWeekendPhotos[0]!,
    photos: startupWeekendPhotos,
  },
]

export function getEventBySlug(slug: string | undefined) {
  return events.find((e) => e.slug === slug)
}
