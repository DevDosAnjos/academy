/** Keeps only digits (what goes to the server). */
export const onlyDigits = (v: string) => v.replace(/\D/g, '')

/** Brazilian phone mask from digits: (11) 98765-4321 or (11) 3333-4444. */
export function formatPhone(value: string): string {
  const d = onlyDigits(value).slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  const split = d.length > 10 ? 7 : 6
  const head = `(${d.slice(0, 2)}) ${d.slice(2, split)}`
  return d.length > split ? `${head}-${d.slice(split)}` : head
}
