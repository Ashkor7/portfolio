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

const devfest = (name: string, width: number, height: number, alt: string, position?: string) =>
  photo('devfest-pelotas-2026', name, width, height, alt, position)

const devfestPhotos: EventPhoto[] = [
  devfest(
    'grupo-morphyk',
    1600,
    1068,
    'Leonardo, à esquerda, com três colegas e os crachás do DevFest em frente a um painel de LED',
  ),
  devfest(
    'palestra',
    1600,
    1204,
    'Plateia lotada assistindo a uma palestra no Parque Tecnológico de Pelotas, com o slide projetado ao fundo',
  ),
  devfest(
    'selfie-grupo',
    960,
    1280,
    'Selfie de Leonardo com três colegas, todos com os crachás e cordões do DevFest',
    '50% 45%',
  ),
  devfest(
    'plateia',
    1504,
    1000,
    'Leonardo, de suéter bordô, e colegas assistindo em pé a uma palestra',
  ),
  devfest(
    'selfie-colegas',
    1200,
    1599,
    'Selfie de dois participantes com os cordões do Google Developer Group durante o evento',
    '50% 45%',
  ),
  devfest(
    'convivencia',
    1504,
    1000,
    'Participantes conversando no espaço de convivência do evento',
  ),
]

const talentcamp = (name: string, width: number, height: number, alt: string, position?: string) =>
  photo('talentcamp-2026', name, width, height, alt, position)

const talentcampPhotos: EventPhoto[] = [
  talentcamp(
    'apresentacao',
    960,
    1280,
    'Leonardo apresentando a Bússola em pé, com a plataforma projetada ao fundo e o banner do TalentCamp ao lado',
    '50% 5%',
  ),
  talentcamp(
    'selfie-colegas',
    1600,
    900,
    'Selfie com colegas no espaço do evento; Leonardo, ao fundo, sentado em um pufe azul',
  ),
  talentcamp(
    'apresentacao-gesto',
    422,
    757,
    'Leonardo gesticulando durante a apresentação, com um participante sentado à esquerda',
    '50% 40%',
  ),
  talentcamp(
    'apresentacao-bracos-cruzados',
    425,
    755,
    'Leonardo de braços cruzados ao lado da tela com a Bússola projetada',
    '50% 40%',
  ),
]

const bussolaPhotos: EventPhoto[] = [
  talentcamp('bussola-01-capa', 1600, 900, 'Capa da Bússola: “Seu primeiro mês com direção”'),
  talentcamp(
    'bussola-02-minha-jornada',
    1600,
    900,
    'Minha jornada: os próximos passos, o progresso e a primeira entrega',
  ),
  talentcamp(
    'bussola-03-trilha',
    1600,
    900,
    'Trilha por etapas: cada item com dono, e o conteúdo vencido sinalizado',
  ),
  talentcamp(
    'bussola-04-resposta-com-fonte',
    1600,
    900,
    'Resposta com a fonte, a data de revisão e quem pode ajudar',
  ),
  talentcamp(
    'bussola-05-ferramentas',
    1600,
    900,
    'Ferramentas: o que já está liberado e o que precisa de pedido',
  ),
  talentcamp(
    'bussola-06-painel-gestor',
    1600,
    900,
    'Painel do gestor: progresso do time e onde oferecer apoio',
  ),
  talentcamp(
    'bussola-07-fila-de-lacunas',
    1600,
    900,
    'A dúvida respondida pelo RH volta para todos, com a fonte',
  ),
  talentcamp(
    'bussola-08-visao-rh',
    1600,
    900,
    'Visão do RH: todas as pessoas em integração, por time',
  ),
  talentcamp('bussola-09-celular', 1600, 900, 'Versão para celular da tela Minha jornada'),
]

// Do mais recente para o mais antigo.
export const events: PortfolioEvent[] = [
  {
    id: 'EVT_006',
    slug: 'talentcamp-2026',
    name: 'TalentCamp 2026',
    category: 'Hackathon',
    date: '14 NOV 2026',
    location: 'Parque Tecnológico de Pelotas, Pelotas, RS',
    organizer: 'TalentCamp',
    role: 'AI builder',
    summary:
      'Em 8 horas, construí com agentes de IA a Bússola, plataforma de integração de novos funcionários, para o desafio “O primeiro mês de quem chega”. Recebi o certificado de AI builder.',
    description: [
      'O TalentCamp é um evento em que os participantes escolhem um desafio real de negócio e constroem uma solução funcional em pouco tempo. Cada desafio tem um responsável que acompanha as equipes.',
      'Escolhi o desafio “O primeiro mês de quem chega”, trazido por uma empresa de tecnologia de médio porte (fictícia). A empresa cresce rápido e contrata toda semana, mas quem chega leva semanas para descobrir quem faz o quê, quais ferramentas pode usar e onde estão os documentos. A solução precisava servir à pessoa recém-contratada, ao gestor e ao RH, só com dados fictícios, sem criar acessos reais nem integrar com sistemas internos.',
      'Comecei estudando plataformas de onboarding do mercado, como Enboarder, BambooHR, Gupy e Glean. Elas já têm jornadas, checklists e chatbots, então concentrei a Bússola no que elas não colocam no centro: respostas sempre com fonte, conhecimento que cresce a partir das dúvidas e conteúdo com dono e validade.',
      'Depois escrevi a especificação do produto e desenvolvi a plataforma com um agente de IA no ambiente do evento. Entre as rodadas, testei cada funcionalidade no computador e no celular, corrigi bugs e ajustes de experiência, e produzi um vídeo de demonstração de 2 minutos para a apresentação.',
    ],
    highlights: [
      'Certificado de AI builder do TalentCamp',
      'Protótipo funcional em 8 horas, construído com agentes de IA',
      'Três perfis (pessoa nova, gestor e RH), demonstrável de ponta a ponta',
      'Vídeo de demonstração de 2 minutos para a apresentação',
    ],
    learnings: [
      'Começar pelo problema real (a mesma pergunta respondida várias vezes) tornou o produto mais fácil de explicar que uma lista de funcionalidades',
      'Testar como usuário, perfil por perfil, revelou problemas que não apareciam no código',
      'Próximo passo: uma busca que entenda perguntas escritas com outras palavras; hoje ela compara as palavras da pergunta',
    ],
    project: {
      name: 'Bússola',
      tagline: 'Seu primeiro mês com direção.',
      description:
        'Plataforma de integração de novos funcionários. Com ela, quem chega sabe a quem recorrer, o que pode usar e onde achar o que precisa, e cada dúvida respondida uma vez vira orientação para todos que chegarem depois.',
      problem:
        'Cada gestor recebe do seu jeito, o checklist oficial está desatualizado, e as mesmas perguntas são respondidas de novo a cada contratação, por quem estiver por perto. Como deixar quem chega produtivo e seguro nas primeiras semanas?',
      features: [
        'Minha jornada: em vez de uma lista enorme, três próximos passos, o progresso, o padrinho e a primeira entrega',
        'Trilha por etapas: base igual para todos, que o gestor complementa com o que é do time; cada item tem dono e data de revisão, e o conteúdo vencido aparece marcado',
        'Dúvidas com fonte: cada resposta mostra de onde veio, quando foi revisada e quem pode ajudar; sem resposta, a plataforma não inventa e encaminha a pergunta ao RH',
        'Fila de lacunas: o RH responde uma única vez, e a resposta passa a valer para todos que perguntarem depois',
        'Mapa da empresa: pessoas e times por assunto, e ferramentas liberadas, que precisam de pedido (simulado) ou proibidas, com a alternativa aprovada',
        'Check-in de segurança: notas de 1 a 5 nas semanas 1, 2 e 4; uma nota baixa gera alerta para o gestor',
        'Painéis do gestor e do RH, com indicadores ligados aos objetivos do desafio e uma tela de revisão das orientações vencidas',
      ],
      mvp: 'Protótipo funcional com três perfis (pessoa nova, gestor e RH), publicado e demonstrável de ponta a ponta, só com dados fictícios. Também funciona no celular e tem um modo de apresentação.',
    },
    links: [],
    certificate: {
      title: 'Certificado de AI builder',
      issuer: 'TalentCamp',
      date: '14/11/2026',
      file: '/events/talentcamp-2026/certificado.jpg',
    },
    cover: talentcampPhotos[0]!,
    photos: talentcampPhotos,
    projectGallery: {
      title: 'Fotos da Bússola',
      photos: bussolaPhotos,
      video: {
        src: '/events/talentcamp-2026/bussola-demo.mp4',
        poster: '/events/talentcamp-2026/bussola-01-capa.webp',
        width: 1920,
        height: 1080,
        caption: 'Vídeo de demonstração da Bússola, usado na apresentação (2 min, sem áudio)',
      },
    },
  },
  {
    id: 'EVT_005',
    slug: 'devfest-pelotas-2026',
    name: 'DevFest Pelotas 2026',
    category: 'Conferência',
    date: '07 NOV 2026',
    location: 'Parque Tecnológico de Pelotas, Pelotas, RS',
    organizer: 'Google Developer Group Pelotas',
    role: 'Participante',
    summary:
      'DevFest organizado pelo GDG Pelotas no Parque Tecnológico, com palestras sobre agentes com ADK no Gemini, cibersegurança, game dev, Firebase e sistemas multiagente na nuvem com Gemini.',
    description: [
      'Participei do DevFest Pelotas em 7 de novembro de 2026, no Parque Tecnológico de Pelotas, organizado pelo Google Developer Group Pelotas.',
      'Assistimos a diversas palestras, entre elas agentes com ADK no Gemini, cibersegurança, game dev, Firebase e sistemas multiagente na nuvem com Gemini.',
    ],
    highlights: [
      'Agentes com ADK no Gemini',
      'Cibersegurança',
      'Game dev',
      'Firebase',
      'Multi-agent cloud systems com Gemini',
    ],
    links: [],
    certificate: {
      code: 'GDG-PEL-1F4D3Z5W025Q',
      issuer: 'GDG Pelotas',
      date: '07/11/2026',
      hours: '8 horas',
      file: '/events/devfest-pelotas-2026/certificado.pdf',
      // Endereço impresso no certificado; a página responde, mas a consulta pelo código não foi testada.
      verify: { href: 'https://certificate.gdgpelotas.com.br/verify', verified: false },
    },
    cover: devfestPhotos[0]!,
    photos: devfestPhotos,
  },
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
      'Ainda durante o evento fechamos os 2 primeiros serviços reais, com R$ 1.340 em contratos assinados. O projeto não parou no domingo: a Melhor Obra segue como piloto aqui em Pelotas, em melhorobras.com.',
    ],
    highlights: [
      '1º lugar no Techstars Startup Weekend Pelotas 2026',
      '30 entrevistas com moradores de Pelotas; 26 já tinham tido problema com um prestador',
      '2 serviços reais fechados durante o evento: R$ 1.340 em contratos assinados',
      'Projeto segue como piloto em Pelotas, em melhorobras.com',
    ],
    learnings: [
      'Ouvir as dores dos usuários e validar o problema antes de pensar na solução e começar a desenvolver',
      'Trabalhar em equipe sob pressão, com prazo curto e decisões rápidas',
      'Cortar escopo: em 56 horas, o MVP precisa provar a ideia, não ter todas as funcionalidades',
      'Dev e negócios lado a lado desde o primeiro dia: entender o modelo de negócio me ajudou a decidir o que construir',
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
    role: 'Desenvolvedor',
    result: '4º lugar',
    summary:
      'Meu primeiro hackathon: 4º lugar com o GuIA, sistema de acompanhamento de pacientes de UTI criado para o desafio da Unimed. Atuei como desenvolvedor.',
    description: [
      'Meu primeiro hackathon aconteceu em 20 de junho de 2026, no UniSenac Pelotas. O desafio era criar um sistema para a Unimed, e nossa equipe ficou em 4º lugar.',
      'Fizemos o GuIA, um sistema de controle de UTI em que a IA acompanha os exames e indica se o estado de cada paciente é de melhora, estável ou piora. Ela não dá diagnóstico: a classificação serve de apoio, e a decisão continua sendo do médico.',
    ],
    highlights: [
      '4º lugar no meu primeiro hackathon',
      'Solução para o desafio proposto pela Unimed',
      'IA que classifica o estado do paciente (melhora, estável ou piora), sempre validada pelo médico',
    ],
    project: {
      name: 'GuIA',
      description:
        'Sistema de controle de UTI que acompanha a evolução dos pacientes a partir dos exames, com uma IA que indica o estado de cada paciente.',
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

/**
 * Eventos fixados no topo da seção, nesta ordem (escolha do dono). Os demais
 * seguem a ordem de `events`.
 */
export const pinnedEventSlugs = ['startup-weekend-pelotas-2026', 'hackathon-atlas-2026']

/** Quantos eventos aparecem antes do botão "More events". */
export const VISIBLE_EVENTS = 2

export function orderEvents(list: PortfolioEvent[]): PortfolioEvent[] {
  const rank = (e: PortfolioEvent) => {
    const i = pinnedEventSlugs.indexOf(e.slug)
    return i === -1 ? pinnedEventSlugs.length : i
  }
  return [...list].sort((a, b) => rank(a) - rank(b))
}

export function getEventBySlug(slug: string | undefined) {
  return events.find((e) => e.slug === slug)
}
