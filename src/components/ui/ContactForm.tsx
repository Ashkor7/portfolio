import { useEffect, useRef, useState, type FormEvent } from 'react'
import { CircleCheck, LoaderCircle, TriangleAlert } from 'lucide-react'
import { contactConfig } from '@/config/site'
import {
  CONTACT_LIMITS,
  normalizeContact,
  validateContact,
  type ContactErrors,
  type ContactField,
} from '@/utils/contact-validation'
import { cn } from '@/utils/cn'
import { Button } from './Button'
import { sendContact } from '@/utils/send-contact'

type Status =
  { kind: 'idle' } | { kind: 'sending' } | { kind: 'success' } | { kind: 'error'; message: string }

const inputClass =
  'mt-1 w-full border bg-background/70 px-3 py-3 font-mono text-sm outline-none transition-shadow focus:border-neon focus:glow-neon aria-[invalid=true]:border-destructive'

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [errors, setErrors] = useState<ContactErrors>({})
  const openedAt = useRef(0)
  useEffect(() => {
    openedAt.current = Date.now()
  }, [])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = normalizeContact({
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      message: String(fd.get('message') ?? ''),
      website: String(fd.get('website') ?? ''),
      elapsedMs: Date.now() - openedAt.current,
    })

    const found = validateContact(payload)
    setErrors(found)
    const firstInvalid = (['name', 'email', 'message'] as ContactField[]).find((f) => found[f])
    if (firstInvalid) {
      setStatus({ kind: 'idle' })
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus({ kind: 'sending' })
    const result = await sendContact(contactConfig.endpoint, payload)
    if (result.ok) {
      setStatus({ kind: 'success' })
      form.reset()
      openedAt.current = Date.now()
    } else {
      setStatus({ kind: 'error', message: result.message })
    }
  }

  const field = (name: ContactField) => ({
    name,
    id: `contact-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
    className: cn(inputClass, errors[name] ? 'border-destructive' : 'border-input'),
    onChange: () => errors[name] && setErrors((prev) => ({ ...prev, [name]: undefined })),
  })

  const errorText = (name: ContactField) =>
    errors[name] && (
      <span id={`contact-${name}-error`} className="mt-1 block font-mono text-xs text-destructive">
        {errors[name]}
      </span>
    )

  const sending = status.kind === 'sending'

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate aria-busy={sending}>
      <div>
        <label htmlFor="contact-name" className="font-mono text-xs text-muted-foreground uppercase">
          Nome
        </label>
        <input
          {...field('name')}
          type="text"
          autoComplete="name"
          maxLength={CONTACT_LIMITS.name.max}
          required
        />
        {errorText('name')}
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="font-mono text-xs text-muted-foreground uppercase"
        >
          E-mail
        </label>
        <input
          {...field('email')}
          type="email"
          autoComplete="email"
          inputMode="email"
          maxLength={CONTACT_LIMITS.email.max}
          required
        />
        {errorText('email')}
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="font-mono text-xs text-muted-foreground uppercase"
        >
          Mensagem
        </label>
        <textarea {...field('message')} rows={5} maxLength={CONTACT_LIMITS.message.max} required />
        {errorText('message')}
      </div>

      {/* Honeypot anti-spam: invisível para pessoas e ignorado por leitores de tela. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" disabled={sending} className="w-full">
        {sending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            Transmitindo...
          </>
        ) : (
          'Initialize Contact'
        )}
      </Button>

      <div aria-live="polite" role="status">
        {status.kind === 'success' && (
          <p className="flex items-center gap-2 font-mono text-sm text-terminal">
            <CircleCheck className="size-4 shrink-0" aria-hidden="true" />
            Conexão estabelecida. Mensagem enviada com sucesso.
          </p>
        )}
        {status.kind === 'error' && (
          <p className="flex items-start gap-2 font-mono text-sm text-destructive">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {status.message}
          </p>
        )}
      </div>
    </form>
  )
}
