import type { EventPhoto, PortfolioEvent } from './types.ts'

/**
 * Eventos, hackathons e competições.
 *
 * Fotos: gere com `node scripts/optimize-photos.mjs public/events/<slug> <origem>=<nome>`
 * e copie as dimensões impressas. Todas as fotos são reais, do próprio evento.
 * Não descreva nada que não esteja nas fotos ou nos posts do dono.
 */
function photo(
  slug: string,
  name: string,
  width: number,
  height: number,
  alt: string,
  position?: string,
): EventPhoto {
  const base = `/events/${slug}/${name}`
  return { src: `${base}.webp`, thumb: `${base}-thumb.webp`, alt, width, height, position }
}

const atlas = (name: string, width: number, height: number, alt: string, position?: string) =>
  photo('hackathon-atlas-2026', name, width, height, alt, position)

const atlasPhotos: EventPhoto[] = [
  atlas(
    'premiacao-cheque',
    1086,
    1448,
    'Leonardo, ao centro, com o cheque simbólico de 2º lugar do Hackathon Atlas 2026, datado de 29/10/2026',
    '50% 30%',
  ),
  atlas(
    'pitch',
    1448,
    1086,
    'Leonardo apresentando o pitch ao lado da tela com o logo da Atlas, com um colega de equipe à esquerda',
  ),
  atlas(
    'leonardo-pitch',
    1086,
    1448,
    'Leonardo, com as anotações na mão, apresentando o pitch em frente à tela com o logo da Atlas',
    '50% 30%',
  ),
  atlas(
    'equipe',
    960,
    1280,
    'Leonardo e colegas em frente à parede verde com o letreiro da Atlas',
    '50% 45%',
  ),
  atlas('leonardo-atlas', 876, 696, 'Leonardo em frente ao letreiro roxo da Atlas na parede verde'),
]

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

const tecnopuc = (name: string, width: number, height: number, alt: string, position?: string) =>
  photo('tecnopuc-experience-2026', name, width, height, alt, position)

const tecnopucPhotos: EventPhoto[] = [
  tecnopuc(
    'grupo-painel',
    988,
    619,
    'Foto em grupo dos participantes em frente ao painel “TecnoPUC Experience 2026”',
    '50% 100%',
  ),
  tecnopuc(
    'pebolim',
    900,
    1600,
    'Colegas de ADS jogando pebolim na sala de jogos do TecnoPUC, com um fliperama ao fundo',
    '50% 55%',
  ),
  tecnopuc(
    'sala-de-jogos',
    720,
    1280,
    'Selfie na sala de jogos durante o evento, com colegas jogando pebolim ao fundo',
    '50% 45%',
  ),
  tecnopuc(
    'colegas-ads',
    960,
    1280,
    'Selfie com os colegas de ADS sentados em um sofá, com os crachás do evento',
    '50% 45%',
  ),
]

const unisenac = (name: string, width: number, height: number, alt: string, position?: string) =>
  photo('hackathon-unisenac-2026', name, width, height, alt, position)

const unisenacPhotos: EventPhoto[] = [
  unisenac(
    'equipe',
    1074,
    1600,
    'Equipe com as camisetas do hackathon e os crachás, posando na escada do UniSenac Pelotas',
    '50% 30%',
  ),
  unisenac(
    'desenvolvimento',
    1080,
    715,
    'Integrante da equipe concentrado em frente ao computador durante o desenvolvimento',
  ),
  unisenac(
    'selfie-equipe',
    720,
    1280,
    'Selfie da equipe na sala de computadores do UniSenac, todos com as camisetas do hackathon',
    '50% 40%',
  ),
  unisenac(
    'conversa',
    1095,
    729,
    'Leonardo, de jaqueta de couro, conversando com outros participantes no evento',
  ),
]

// Do mais recente para o mais antigo.
export const events: PortfolioEvent[] = [
  {
    id: 'EVT_002',
    slug: 'hackathon-atlas-2026',
    name: 'Hackathon Atlas 2026',
    category: 'Hackathon',
    date: '29 OUT 2026',
    organizer: 'Atlas Technologies',
    role: 'Desenvolvedor e pitch',
    result: '2º lugar',
    summary:
      '2º lugar no hackathon promovido pela Atlas Technologies. Atuei como desenvolvedor da solução e apresentei o pitch.',
    description: [
      'Hackathon promovido pela Atlas Technologies em 29 de outubro de 2026. Nossa equipe ficou em 2º lugar na competição.',
      'Além de trabalhar no desenvolvimento da solução, fui eu quem apresentou o pitch da equipe.',
    ],
    highlights: [
      '2º lugar no Hackathon Atlas 2026',
      'Desenvolvimento da solução',
      'Apresentação do pitch da equipe',
    ],
    links: [],
    cover: atlasPhotos[0]!,
    photos: atlasPhotos,
  },
  {
    id: 'EVT_003',
    slug: 'tecnopuc-experience-2026',
    name: 'TecnoPUC Experience 2026',
    category: 'Conferência',
    date: '22 OUT 2026',
    location: 'PUCRS, Porto Alegre, RS',
    organizer: 'TecnoPUC',
    role: 'Participante',
    summary:
      'Evento de tecnologia no TecnoPUC, na PUCRS, com os colegas do curso de ADS: palestras, workshops, sala de jogos e visita a prédios do campus.',
    description: [
      'Fui ao TecnoPUC Experience 2026, em Porto Alegre, junto com meus colegas do curso de Análise e Desenvolvimento de Sistemas.',
      'Assistimos a palestras e workshops, jogamos na sala de jogos e conhecemos alguns dos prédios da PUCRS.',
    ],
    highlights: ['Palestras', 'Workshops', 'Sala de jogos', 'Visita a prédios da PUCRS'],
    links: [],
    cover: tecnopucPhotos[0]!,
    photos: tecnopucPhotos,
  },
  {
    id: 'EVT_001',
    slug: 'startup-weekend-pelotas-2026',
    name: 'Techstars Startup Weekend Pelotas 2026',
    category: 'Competição',
    date: '16–18 OUT 2026',
    location: 'Pelotas, RS',
    organizer: 'Techstars Startup Weekend',
    role: 'Desenvolvedor',
    result: '1º lugar',
    summary:
      '1º lugar com a Melhor Obra, plataforma de serviços residenciais com pagamento protegido. Em 56 horas validamos o problema com 30 entrevistas, construímos o MVP e fechamos os 2 primeiros serviços reais. Atuei como desenvolvedor.',
    description: [
      'Foram 56 horas, de sexta a domingo, para sair de uma ideia e chegar a um negócio validado na frente da banca. Nosso time tinha 6 pessoas, entre desenvolvedores, designers e pessoas de negócios.',
      'Antes de escrever uma linha de código, fomos para a rua: entrevistamos 30 pessoas em Pelotas, e 26 delas já tinham tido problema com um prestador de serviço ou conheciam alguém que teve. Uma delas tinha perdido R$ 8 mil e nos disse: “um contrato teria resolvido”.',
      'Ainda durante o evento fechamos os 2 primeiros serviços reais, com R$ 1.340 em contratos assinados. O projeto não parou no domingo: a Melhor Obra segue como piloto em Pelotas.',
    ],
    highlights: [
      '1º lugar no Techstars Startup Weekend Pelotas 2026',
      '30 entrevistas com moradores de Pelotas; 26 já tinham tido problema com um prestador',
      '2 serviços reais fechados durante o evento: R$ 1.340 em contratos assinados',
      'Projeto segue como piloto em Pelotas',
    ],
    learnings: [
      'Ouvir as dores dos usuários e validar o problema antes de pensar na solução e começar a desenvolver',
      'Trabalhar em equipe sob pressão, com prazo curto e decisões rápidas',
      'Cortar escopo: em 56 horas, o MVP precisa provar a ideia, não ter todas as funcionalidades',
      'Dev e negócios lado a lado desde o primeiro dia: entender o modelo de negócio ajudou a decidir o que construir',
      'Apresentar a ideia com clareza e defendê-la diante de uma banca, em poucos minutos',
    ],
    project: {
      name: 'Melhor Obra',
      tagline: 'Sua obra, nas mãos certas.',
      description:
        'Conecta quem precisa de um serviço residencial (elétrica, hidráulica, pintura, montagem de móveis etc.) a profissionais avaliados da região, com pagamento protegido.',
      problem:
        'Contratar alguém para um serviço em casa ainda é uma aposta para os dois lados: quem contrata tem medo de pagar adiantado e o profissional sumir ou fazer malfeito; quem presta o serviço tem medo de trabalhar e levar calote.',
      features: [
        'O cliente descreve o serviço em 1 minuto, com fotos e bairro',
        'Até 3 profissionais da região recebem o pedido e enviam orçamento',
        'Cliente, prestador e Melhor Obra combinam tudo num grupo no WhatsApp',
        'O cliente paga pela plataforma e o valor fica retido (a “Obra Segura”)',
        'O profissional só recebe depois que o cliente aprova o serviço',
        'Só avalia quem contratou e pagou pela plataforma, então as avaliações são reais',
      ],
      tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'Zustand'],
      mvp: 'A demo mostrava o ciclo completo (pedido → orçamento → pagamento protegido → aprovação → avaliação), com uma máquina de estados controlando cada etapa e as telas de cliente e prestador sincronizadas em celulares diferentes durante o pitch.',
      url: 'https://melhorobras.com',
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
  {
    id: 'EVT_004',
    slug: 'hackathon-unisenac-2026',
    name: 'Hackathon UniSenac Pelotas 2026',
    category: 'Hackathon',
    date: '20 JUN 2026',
    location: 'UniSenac, Pelotas, RS',
    organizer: 'UniSenac Pelotas',
    role: 'Membro da equipe',
    result: '4º lugar',
    summary:
      'Meu primeiro hackathon: 4º lugar com um sistema de acompanhamento de pacientes de UTI, criado para o desafio proposto pela Unimed.',
    description: [
      'Meu primeiro hackathon aconteceu em 20 de junho de 2026, no UniSenac Pelotas. O desafio era criar um sistema para a Unimed, e nossa equipe ficou em 4º lugar.',
      'Fizemos um sistema de controle de UTI em que a IA acompanha os exames e indica se o estado de cada paciente é de melhora, estável ou piora. Ela não dá diagnóstico: a classificação serve de apoio, e a decisão continua sendo do médico.',
    ],
    highlights: [
      '4º lugar no meu primeiro hackathon',
      'Solução para o desafio proposto pela Unimed',
      'IA que classifica o estado do paciente (melhora, estável ou piora), sempre validada pelo médico',
    ],
    project: {
      name: 'Sistema de controle de UTI',
      description:
        'Sistema para acompanhar a evolução de pacientes de UTI a partir dos exames, com uma IA que indica o estado de cada paciente.',
      problem:
        'Facilitar o trabalho do médico: perceber mais rápido quando um leito de UTI pode ser liberado ou quando um paciente precisa de mais atenção.',
      features: [
        'Depois do exame, a enfermeira registra os dados no sistema, digitando ou anexando o arquivo',
        'A IA lê os arquivos e as atualizações e atualiza o estado do paciente: melhora, estável ou piora',
        'O médico analisa o estado indicado e confirma se ele se sustenta ou se são necessários novos exames',
        'Com isso, a equipe pode liberar um leito mais rápido ou voltar a atenção para um paciente específico',
      ],
    },
    links: [],
    cover: unisenacPhotos[0]!,
    photos: unisenacPhotos,
  },
]

export function getEventBySlug(slug: string | undefined) {
  return events.find((e) => e.slug === slug)
}
