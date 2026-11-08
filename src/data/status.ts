import type { ProjectStatus, Tone } from './types'

/** Cor e rótulos de cada status de projeto. */
export const statusMeta: Record<ProjectStatus, { tone: Tone; label: string; pt: string }> = {
  Completed: { tone: 'terminal', label: 'Completed', pt: 'Concluído' },
  Development: { tone: 'neon', label: 'Development', pt: 'Em desenvolvimento' },
  Planned: { tone: 'cyber', label: 'Planned', pt: 'Planejado' },
  Concept: { tone: 'industrial', label: 'Concept', pt: 'Conceito' },
}
