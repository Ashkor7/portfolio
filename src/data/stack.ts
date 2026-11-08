import type { StackGroup } from './types'

/**
 * Tecnologias exibidas na seção Technology Stack.
 * level: 'using' = já usada em projeto; 'learning' = em estudo (sem projeto publicado).
 * Sem porcentagens de proficiência, por decisão de projeto.
 */
export const stackGroups: StackGroup[] = [
  {
    title: 'Programming Languages',
    tone: 'neon',
    items: [
      { name: 'JavaScript', level: 'using' },
      { name: 'TypeScript', level: 'using' },
      { name: 'Python', level: 'using' },
      { name: 'C', level: 'using' },
      { name: 'GDScript', level: 'using' },
    ],
  },
  {
    title: 'Frontend',
    tone: 'neon',
    items: [
      { name: 'React', level: 'using' },
      { name: 'HTML', level: 'using' },
      { name: 'CSS', level: 'using' },
      { name: 'Tailwind CSS', level: 'using' },
    ],
  },
  {
    title: 'Backend',
    tone: 'cyber',
    items: [
      { name: 'Node.js', level: 'using' },
      { name: 'Express', level: 'using' },
      { name: 'APIs REST', level: 'using' },
      { name: 'Prisma', level: 'using' },
    ],
  },
  {
    title: 'Databases',
    tone: 'cyber',
    items: [
      { name: 'PostgreSQL', level: 'using' },
      { name: 'MySQL', level: 'using' },
      { name: 'SQL', level: 'using' },
    ],
  },
  {
    title: 'Engineering & Automation',
    tone: 'industrial',
    items: [
      { name: 'Microcontroladores', level: 'learning' },
      { name: 'Sensores', level: 'learning' },
      { name: 'Sistemas de Controle', level: 'learning' },
      { name: 'Eletrônica', level: 'learning' },
    ],
  },
  {
    title: 'Development Tools',
    tone: 'terminal',
    items: [
      { name: 'Git', level: 'using' },
      { name: 'GitHub', level: 'using' },
      { name: 'VS Code', level: 'using' },
      { name: 'Godot Engine', level: 'using' },
    ],
  },
]
