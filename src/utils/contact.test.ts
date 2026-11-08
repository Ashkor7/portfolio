import { describe, expect, it, vi } from 'vitest'
import {
  isHoneypotFilled,
  isTooFast,
  normalizeContact,
  validateContact,
} from './contact-validation'
import { sendContact } from './send-contact'

const valid = {
  name: 'Ana',
  email: 'ana@empresa.com',
  message: 'Olá, vamos conversar?',
  elapsedMs: 5000,
}

describe('validação do contato', () => {
  it('aceita dados válidos', () => {
    expect(validateContact(normalizeContact(valid))).toEqual({})
  })

  it('aponta cada campo inválido', () => {
    const errors = validateContact(normalizeContact({ name: ' ', email: 'x@', message: 'curta' }))
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name'])
  })

  it('detecta honeypot e envio rápido demais', () => {
    expect(isHoneypotFilled(normalizeContact({ ...valid, website: 'spam.com' }))).toBe(true)
    expect(isTooFast(normalizeContact({ ...valid, elapsedMs: 500 }))).toBe(true)
    expect(isTooFast(normalizeContact(valid))).toBe(false)
  })
})

const res = (status: number, body?: unknown) =>
  Promise.resolve(new Response(body === undefined ? 'x' : JSON.stringify(body), { status }))

describe('sendContact', () => {
  it('só reporta sucesso quando o servidor confirma { ok: true }', async () => {
    expect(
      await sendContact(
        '/api',
        valid,
        vi.fn(() => res(200, { ok: true })),
      ),
    ).toEqual({
      ok: true,
    })
    expect(
      (
        await sendContact(
          '/api',
          valid,
          vi.fn(() => res(200, {})),
        )
      ).ok,
    ).toBe(false)
  })

  it('trata endpoint ausente/não configurado como indisponível', async () => {
    for (const status of [404, 503]) {
      const r = await sendContact(
        '/api',
        valid,
        vi.fn(() => res(status)),
      )
      expect(r).toMatchObject({ ok: false, message: expect.stringMatching(/não está disponível/) })
    }
  })

  it('trata falha de rede', async () => {
    const r = await sendContact(
      '/api',
      valid,
      vi.fn(() => Promise.reject(new Error('offline'))),
    )
    expect(r).toMatchObject({ ok: false, message: expect.stringMatching(/rede/) })
  })
})
