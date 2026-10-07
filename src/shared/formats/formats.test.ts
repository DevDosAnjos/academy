import { expect, test } from 'vitest'
import { formatCurrency } from './currency'
import { brDateToIso, formatDate, formatTime } from './date'
import { formatPhone } from './phone'

test('formatPhone masks 11 digits', () => {
  expect(formatPhone('11987654321')).toBe('(11) 98765-4321')
})

test('formatDate and formatTime use Brasília time', () => {
  expect(formatDate('2026-10-06T01:30:00Z')).toBe('05/10/2026')
  expect(formatTime('2026-10-06T01:30:00Z')).toBe('22:30')
  expect(formatDate('2026-10-06T12:00:00Z')).toBe('06/10/2026')
})

test('formatCurrency uses pt-BR with a regular space', () => {
  expect(formatCurrency(1234.5)).toBe('R$ 1.234,50')
})

test('brDateToIso accepts real dates and rejects invalid ones', () => {
  expect(brDateToIso('06/10/2026')).toBe('2026-10-06T15:00:00.000Z')
  expect(brDateToIso('31/02/2026')).toBeNull()
})
