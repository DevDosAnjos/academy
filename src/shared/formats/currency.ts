const fmt = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

/** Reais as number -> "R$ 1.234,50" (regular space, not NBSP). */
export const formatCurrency = (reais: number) =>
  fmt.format(reais).replace(/\s/g, ' ')

/** "1.234,50" or "1234,5" -> 1234.5; NaN if not a valid amount. */
export function parseReais(text: string): number {
  const t = text.replace(/^R\$\s*/, '').trim()
  if (!/^-?\d{1,3}(\.\d{3})*(,\d{1,2})?$|^-?\d+(,\d{1,2})?$/.test(t)) return NaN
  return Number(t.replace(/\./g, '').replace(',', '.'))
}
