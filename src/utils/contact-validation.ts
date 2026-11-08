/**
 * Regras do formulário de contato, compartilhadas entre o navegador e a função
 * serverless (api/contact.ts). Sem imports com alias: este arquivo também é
 * empacotado pela Vercel.
 */

export interface ContactPayload {
  name: string
  email: string
  message: string
  /** Honeypot: humanos não veem este campo; precisa chegar vazio. */
  website?: string
  /** Milissegundos entre a abertura do formulário e o envio. */
  elapsedMs?: number
}

export type ContactField = 'name' | 'email' | 'message'
export type ContactErrors = Partial<Record<ContactField, string>>

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 2000 },
  /** Envios mais rápidos que isso são tratados como robô. */
  minElapsedMs: 3000,
} as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function normalizeContact(input: Partial<ContactPayload>): ContactPayload {
  return {
    // O nome vai para o assunto do e-mail: quebras de linha e controles viram espaço.
    // eslint-disable-next-line no-control-regex
    name: String(input.name ?? '').replace(/[\u0000-\u001f\u007f]+/g, ' ').trim(),
    email: String(input.email ?? '').trim(),
    message: String(input.message ?? '').trim(),
    website: String(input.website ?? ''),
    elapsedMs: Number(input.elapsedMs ?? 0),
  }
}

export function validateContact(data: ContactPayload): ContactErrors {
  const errors: ContactErrors = {}
  const { name, email, message } = data

  if (name.length < CONTACT_LIMITS.name.min) errors.name = 'Informe seu nome.'
  else if (name.length > CONTACT_LIMITS.name.max)
    errors.name = `Use no máximo ${CONTACT_LIMITS.name.max} caracteres.`

  if (!email) errors.email = 'Informe seu e-mail.'
  else if (email.length > CONTACT_LIMITS.email.max || !EMAIL_RE.test(email))
    errors.email = 'Informe um e-mail válido.'

  if (message.length < CONTACT_LIMITS.message.min)
    errors.message = `Escreva pelo menos ${CONTACT_LIMITS.message.min} caracteres.`
  else if (message.length > CONTACT_LIMITS.message.max)
    errors.message = `Use no máximo ${CONTACT_LIMITS.message.max} caracteres.`

  return errors
}

/** Honeypot preenchido: só robôs veem esse campo. */
export function isHoneypotFilled(data: ContactPayload): boolean {
  return Boolean(data.website)
}

/** Enviado rápido demais para ter sido digitado por uma pessoa. */
export function isTooFast(data: ContactPayload): boolean {
  return (data.elapsedMs ?? 0) < CONTACT_LIMITS.minElapsedMs
}
