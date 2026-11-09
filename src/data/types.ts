/** Tons de cor do design system (ver src/styles/index.css). */
export type Tone = 'neon' | 'cyber' | 'industrial' | 'terminal'

export type ProjectCategory = 'Software' | 'Automation' | 'Engineering' | 'Experimental'

/**
 * Estágio real do projeto.
 * - Completed: concluído e publicado.
 * - Development: existe código e está em evolução.
 * - Planned: ainda não começou; apenas planejado.
 * - Concept: ideia/espaço reservado, sem escopo fechado.
 */
export type ProjectStatus = 'Completed' | 'Development' | 'Planned' | 'Concept'

export interface ProjectFeature {
  label: string
  /** done = implementado e verificado; planned = ainda não existe. */
  state: 'done' | 'planned'
}

export interface ProjectImage {
  src: string
  alt: string
  /** true quando é uma ilustração conceitual e NÃO uma captura real do projeto. */
  illustrative: boolean
}

export interface Project {
  /** Identificador estável exibido no card (não muda com o filtro). */
  id: string
  slug: string
  name: string
  /** Nome alternativo/original em português, quando houver. */
  altName?: string
  summary: string
  description: string
  categories: ProjectCategory[]
  status: ProjectStatus
  /** Texto curto que contextualiza o status (ex.: "Protótipo M1"). */
  statusNote?: string
  /** Tecnologias exibidas no card (as principais). */
  tech: string[]
  /** Pilha completa exibida na página de detalhes. */
  techDetails?: { group: string; items: string[] }[]
  cover: ProjectImage
  /** Capturas reais. Vazio enquanto não houver imagens reais publicadas. */
  screenshots: ProjectImage[]
  /** Repositório público. null quando não existe ou é privado. */
  github: string | null
  /** Explica a ausência do repositório (ex.: privado). */
  githubNote?: string
  demo: string | null
  problem: string
  goal: string
  features: ProjectFeature[]
  architecture: string
  challenges: string
  currentState: string
}

export interface StackGroup {
  title: string
  tone: Tone
  items: { name: string; level: 'using' | 'learning' }[]
}

export type JourneyCategory =
  'Graduação' | 'Projeto' | 'Hackathon' | 'Certificação' | 'Experiência' | 'Meta'

export interface JourneyEvent {
  /** Texto exibido como data. null quando a data ainda não foi confirmada. */
  date: string | null
  title: string
  description: string
  category: JourneyCategory
  /** done = concluído; progress = em andamento; planned = ainda não começou. */
  status: 'done' | 'progress' | 'planned'
}

export interface EventPhoto {
  /** Versão grande (lado maior 1600 px), usada na galeria ampliada. */
  src: string
  /** Miniatura (lado maior 640 px), usada nos cards e na grade. */
  thumb: string
  alt: string
  width: number
  height: number
  /** `object-position` dos recortes (capa e miniaturas), p. ex. "50% 30%". Padrão: centro. */
  position?: string
}

export type EventCategory = 'Hackathon' | 'Competição' | 'Palestra' | 'Workshop' | 'Feira'

export interface EventProject {
  name: string
  tagline: string
  description: string
  /** Problema que o projeto resolve. */
  problem?: string
  /** Como a solução funciona, passo a passo. */
  features?: string[]
  /** Tecnologias do MVP. */
  tech?: string[]
  /** O que o MVP demonstrava. */
  mvp?: string
  /** Site público do projeto. */
  url?: string
}

export interface PortfolioEvent {
  /** Identificador estável exibido no card. */
  id: string
  slug: string
  name: string
  category: EventCategory
  /** Texto exibido como data. Use só o que foi confirmado (ex.: "2026" ou "NOV 2026"). */
  date: string
  /** Cidade/local. Omita enquanto não for confirmado. */
  location?: string
  organizer: string
  /** Papel exercido no evento. */
  role: string
  /** Resultado/premiação, quando houver. */
  result?: string
  summary: string
  description: string[]
  /** Resultados concretos (prêmio, números de validação etc.). */
  highlights: string[]
  /** O que o evento ensinou. */
  learnings?: string[]
  /** Projeto desenvolvido no evento, quando houver. */
  project?: EventProject
  /** Publicações oficiais sobre o evento (posts do LinkedIn/Instagram). */
  links: { kind: 'linkedin' | 'instagram' | 'site'; label: string; href: string }[]
  cover: EventPhoto
  photos: EventPhoto[]
}
