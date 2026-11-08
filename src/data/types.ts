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
  status: 'done' | 'planned'
}
