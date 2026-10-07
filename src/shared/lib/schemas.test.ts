import { expect, test } from 'vitest'
import type { z } from 'zod'
import {
  dateField,
  emailField,
  moneyField,
  nameField,
  passwordField,
  phoneField,
} from './schemas'

const message = (schema: z.ZodType, value: unknown) => {
  const r = schema.safeParse(value)
  return r.success ? null : r.error.issues[0].message
}

test('invalid inputs fail with the Portuguese message', () => {
  expect(message(emailField, 'abc')).toBe(
    'Informe um e-mail válido, como nome@exemplo.com.',
  )
  expect(message(phoneField, '123')).toBe(
    'Informe o telefone com DDD, como (11) 98765-4321.',
  )
  expect(message(dateField, '31/02/2026')).toBe(
    'Informe uma data válida, como 31/12/2026.',
  )
  expect(message(moneyField, '-5,00')).toBe(
    'Informe um valor válido, como 150,00.',
  )
  expect(message(passwordField, 'abc')).toBe(
    'A senha precisa ter pelo menos 8 caracteres.',
  )
  expect(message(passwordField, 'abcdefgh')).toBe(
    'A senha precisa ter letras e números.',
  )
  expect(message(nameField, '  ')).toBe('Preencha este campo.')
})

test('valid inputs pass and are normalized', () => {
  expect(emailField.parse('a@b.com')).toBe('a@b.com')
  expect(phoneField.parse('(11) 98765-4321')).toBe('11987654321')
  expect(dateField.parse('06/10/2026')).toBe('2026-10-06T15:00:00.000Z')
  expect(moneyField.parse('1.234,50')).toBe(1234.5)
  expect(passwordField.parse('abcdefg1')).toBe('abcdefg1')
})
