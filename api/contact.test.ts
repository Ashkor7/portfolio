import { describe, expect, it, vi } from 'vitest'
import { handleContact } from './contact'

const env = {
  RESEND_API_KEY: 're_test',
  CONTACT_TO_EMAIL: 'eu@x.com',
  CONTACT_FROM_EMAIL: 'site@x.com',
}
const valid = {
  name: 'Ana',
  email: 'ana@empresa.com',
  message: 'Olá, vamos conversar?',
  elapsedMs: 5000,
}

let ipCounter = 0
const req = (body: unknown, { method = 'POST', ip = `10.0.0.${++ipCounter}` } = {}) =>
  new Request('http://localhost/api/contact', {
    method,
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: method === 'POST' ? JSON.stringify(body) : undefined,
  })

const ok = () => vi.fn(() => Promise.resolve(new Response('{}', { status: 200 })))

describe('POST /api/contact', () => {
  it('responde 503 quando não há segredos configurados (sem sucesso simulado)', async () => {
    const r = await handleContact(req(valid), {})
    expect(r.status).toBe(503)
    expect(await r.json()).toMatchObject({ ok: false })
  })

  it('valida os campos no servidor', async () => {
    const r = await handleContact(req({ ...valid, email: 'invalido' }), env, vi.fn())
    expect(r.status).toBe(422)
  })

  it('envia via Resend e confirma somente após resposta OK', async () => {
    const fetcher = ok()
    const r = await handleContact(req(valid), env, fetcher)
    expect(r.status).toBe(200)
    expect(await r.json()).toEqual({ ok: true })
    const [url, init] = fetcher.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe('https://api.resend.com/emails')
    expect(JSON.parse(init.body as string)).toMatchObject({
      to: ['eu@x.com'],
      reply_to: 'ana@empresa.com',
    })
  })

  it('reporta falha quando o Resend falha', async () => {
    const fetcher = vi.fn(() => Promise.resolve(new Response('{}', { status: 500 })))
    expect((await handleContact(req(valid), env, fetcher)).status).toBe(502)
  })

  it('descarta honeypot sem enviar e recusa envio rápido demais', async () => {
    const fetcher = vi.fn()
    expect((await handleContact(req({ ...valid, website: 'x' }), env, fetcher)).status).toBe(200)
    expect((await handleContact(req({ ...valid, elapsedMs: 100 }), env, fetcher)).status).toBe(400)
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('limita tentativas por IP', async () => {
    const fetcher = ok()
    const statuses: number[] = []
    for (let i = 0; i < 6; i++) {
      statuses.push((await handleContact(req(valid, { ip: '192.168.1.1' }), env, fetcher)).status)
    }
    expect(statuses.slice(0, 5).every((s) => s === 200)).toBe(true)
    expect(statuses[5]).toBe(429)
  })

  it('recusa métodos diferentes de POST', async () => {
    expect((await handleContact(req(null, { method: 'GET' }), env)).status).toBe(405)
  })
})
