/**
 * POST /api/contact — função serverless (Vercel, runtime Node.js).
 *
 * Envia a mensagem do formulário por e-mail usando a API HTTP do Resend.
 * Os segredos ficam só no servidor (variáveis de ambiente da Vercel):
 *   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 * Sem eles, responde 503 — o site NUNCA simula um envio bem-sucedido.
 */
import {
  isHoneypotFilled,
  isTooFast,
  normalizeContact,
  validateContact,
  type ContactPayload,
} from '../src/utils/contact-validation.js'

const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000
const MAX_BODY_BYTES = 10_000

// Limite por IP em memória: melhor esforço (cada instância tem o seu mapa).
const hits = new Map<string, number[]>()

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}

function rateLimited(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_LIMIT
}

export interface ContactEnv {
  RESEND_API_KEY?: string
  CONTACT_TO_EMAIL?: string
  CONTACT_FROM_EMAIL?: string
}

/** Lógica testável, independente da plataforma. */
export async function handleContact(
  request: Request,
  env: ContactEnv,
  fetcher: typeof fetch = fetch,
): Promise<Response> {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'Método não permitido.' })

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = env
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return json(503, { ok: false, error: 'Canal de contato não configurado.' })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) return json(429, { ok: false, error: 'Muitas tentativas.' })

  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) return json(413, { ok: false, error: 'Mensagem muito grande.' })

  let payload: ContactPayload
  try {
    payload = normalizeContact(JSON.parse(raw) as Partial<ContactPayload>)
  } catch {
    return json(400, { ok: false, error: 'Requisição inválida.' })
  }

  const errors = validateContact(payload)
  if (Object.keys(errors).length)
    return json(422, { ok: false, error: 'Dados inválidos.', fields: errors })

  // Honeypot: robôs recebem "sucesso" silencioso para não aprenderem a contornar o filtro.
  // (Pessoas nunca veem esse campo, então ninguém real recebe um sucesso falso.)
  if (isHoneypotFilled(payload)) return json(200, { ok: true })
  if (isTooFast(payload)) {
    return json(400, {
      ok: false,
      error: 'Envio muito rápido. Aguarde alguns segundos e tente de novo.',
    })
  }

  const response = await fetcher('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: payload.email,
      subject: `[Portfólio] Mensagem de ${payload.name}`,
      text: `Nome: ${payload.name}\nE-mail: ${payload.email}\n\n${payload.message}`,
    }),
  }).catch(() => null)

  if (!response?.ok)
    return json(502, { ok: false, error: 'Falha ao enviar. Tente novamente mais tarde.' })
  return json(200, { ok: true })
}

export function POST(request: Request): Promise<Response> {
  return handleContact(request, process.env)
}

export function GET(): Response {
  return json(405, { ok: false, error: 'Método não permitido.' })
}
