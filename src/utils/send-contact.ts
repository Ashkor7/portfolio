const UNAVAILABLE =
  'O envio de mensagens ainda não está disponível. Fale comigo pelo GitHub ou LinkedIn ao lado.'

/** Envia o formulário ao endpoint configurado. Sucesso só é exibido após confirmação do servidor. */
export async function sendContact(
  endpoint: string,
  body: unknown,
  fetcher: typeof fetch = fetch,
): Promise<{ ok: true } | { ok: false; message: string }> {
  let response: Response
  try {
    response = await fetcher(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    return { ok: false, message: 'Falha de rede. Verifique sua conexão e tente novamente.' }
  }

  let data: { ok?: boolean; error?: string } = {}
  try {
    data = await response.json()
  } catch {
    /* resposta sem JSON (ex.: 404 em ambiente sem a função serverless) */
  }

  if (response.ok && data.ok === true) return { ok: true }
  if (response.status === 404 || response.status === 503) return { ok: false, message: UNAVAILABLE }
  if (response.status === 429)
    return { ok: false, message: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' }
  return {
    ok: false,
    message: data.error || 'Não foi possível enviar agora. Tente novamente mais tarde.',
  }
}
