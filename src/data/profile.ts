import type { Tone } from './types'

export interface ProfileModule {
  code: string
  title: string
  icon: 'software' | 'automation'
  tone: Tone
  items: string[]
}

/** Competências da seção Operator Profile — edite aqui, sem tocar nos componentes. */
export const profileModules: ProfileModule[] = [
  {
    code: 'MODULE 01',
    title: 'Software Development',
    icon: 'software',
    tone: 'neon',
    items: [
      'Desenvolvimento Full-Stack',
      'Sistemas web',
      'Backend e APIs',
      'Bancos de dados',
      'Arquitetura de software',
      'Programação e resolução de problemas',
    ],
  },
  {
    code: 'MODULE 02',
    title: 'Control & Automation',
    icon: 'automation',
    tone: 'industrial',
    items: [
      'Sistemas de controle',
      'Automação industrial',
      'Eletrônica',
      'Sensores e atuadores',
      'Microcontroladores',
      'Robótica e integração hardware/software',
    ],
  },
]

export const bootLines = [
  'initializing portfolio...',
  'loading software modules...',
  'automation systems connected...',
  'system ready.',
]

export const navSections = [
  { id: 'about', label: 'Perfil' },
  { id: 'projects', label: 'Projetos' },
  { id: 'stack', label: 'Stack' },
  { id: 'lab', label: 'Lab' },
  { id: 'journey', label: 'Jornada' },
  { id: 'contact', label: 'Contato' },
] as const
