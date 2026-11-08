/** Junta classes condicionais. Não faz merge de utilitários conflitantes. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
