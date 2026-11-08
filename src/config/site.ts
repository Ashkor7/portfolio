/**
 * Configuração central de dados pessoais e links.
 *
 * Todo link externo do site sai daqui. Itens com `verified: false` foram
 * fornecidos pelo dono, mas não puderam ser confirmados automaticamente —
 * revise-os antes de publicar (a lista aparece em `pendingValidation`).
 */

export interface SocialLink {
  id: 'github' | 'linkedin' | 'instagram' | 'email'
  label: string
  href: string
  /** false = não confirmado automaticamente; validar manualmente antes do deploy. */
  verified: boolean
  /** Exibir no Hero (perfis profissionais). */
  showInHero: boolean
  /** Exibir na seção de contato. */
  showInContact: boolean
  note?: string
}

export const person = {
  name: 'Leonardo Ribeiro',
  handle: 'LR',
  role: 'Software Development × Control & Automation Engineering',
  bio: 'Estudante de Engenharia de Controle e Automação e de Análise e Desenvolvimento de Sistemas. Conecto o mundo físico ao digital com código, eletrônica e automação.',
  /**
   * E-mail público de contato. null até o dono definir um endereço validado —
   * nunca publicar um e-mail de exemplo.
   */
  email: null as string | null,
}

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/Ashkor7',
    verified: true,
    showInHero: true,
    showInContact: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/leonardo-ribeiro-401b023a9/',
    // Confirmado manualmente pelo dono do perfil em 08/11/2026 (o LinkedIn bloqueia
    // verificação automatizada).
    verified: true,
    showInHero: true,
    showInContact: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/leonardo_ribeiro78/',
    verified: true,
    showInHero: false,
    showInContact: true,
  },
]

export const site = {
  title: 'Leonardo Ribeiro — Software × Automação',
  description: 'Portfólio de desenvolvimento de sistemas e engenharia de controle e automação.',
  ogTitle: 'Leonardo Ribeiro — Building Intelligent Systems',
  ogDescription: 'Software Development × Control & Automation Engineering.',
  /** Definida por VITE_SITE_URL no build; vazia em desenvolvimento. */
  url: (import.meta.env.VITE_SITE_URL ?? '').replace(/\/+$/, ''),
  ogImage: '/og-image.png',
  locale: 'pt_BR',
}

export const contactConfig = {
  /** Endpoint do formulário; a função /api/contact usa Resend com segredos no servidor. */
  endpoint: import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact',
}

/** Itens que exigem validação humana antes da publicação. */
export const pendingValidation: string[] = [
  ...socialLinks.filter((l) => !l.verified).map((l) => `${l.label}: ${l.href}`),
  ...(person.email ? [] : ['E-mail de contato ainda não definido (person.email).']),
]
