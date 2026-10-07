import { z } from 'zod'
import { brDateToIso } from '@/shared/formats/date'
import { parseReais } from '@/shared/formats/currency'
import { onlyDigits } from '@/shared/formats/phone'

// Format and required-ness only; business rules belong to the server (item #7, D3).
const required = 'Preencha este campo.'
const text = z.string({ error: required }).trim().min(1, required)

export const nameField = text
export const emailField = text.pipe(
  z.string().email('Informe um e-mail válido, como nome@exemplo.com.'),
)
/** Phone with DDD; output is digits only. */
export const phoneField = text
  .refine(
    (v) => [10, 11].includes(onlyDigits(v).length),
    'Informe o telefone com DDD, como (11) 98765-4321.',
  )
  .transform(onlyDigits)
/** dd/mm/aaaa; output is ISO 8601. */
export const dateField = text.transform((v, ctx) => {
  const iso = brDateToIso(v)
  if (!iso) {
    ctx.addIssue({
      code: 'custom',
      message: 'Informe uma data válida, como 31/12/2026.',
    })
    return z.NEVER
  }
  return iso
})
/** Amount in reais; output is a number >= 0. */
export const moneyField = text.transform((v, ctx) => {
  const n = parseReais(v)
  if (Number.isNaN(n) || n < 0) {
    ctx.addIssue({
      code: 'custom',
      message: 'Informe um valor válido, como 150,00.',
    })
    return z.NEVER
  }
  return n
})
// Provisional rule (P5): 8+ characters with a letter and a number.
export const passwordField = text.pipe(
  z
    .string()
    .min(8, 'A senha precisa ter pelo menos 8 caracteres.')
    .refine(
      (v) => /[A-Za-z]/.test(v) && /\d/.test(v),
      'A senha precisa ter letras e números.',
    ),
)
