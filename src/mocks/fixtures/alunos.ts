import { REFERENCE_MONTH } from './academia.ts'
import type { Charge, Guardian, Student } from './types.ts'

export const guardians = (): Guardian[] => [
  { id: 'r1', name: 'Regina Responsável', email: 'responsavel@exemplo.test' },
]

// a1 adult with account; a2+a3 minors of r1; a4 overdue; a5 all paid;
// a6 paused; a7 full scholarship (invited account, not accepted).
export const students = (): Student[] => [
  {
    id: 'a1',
    name: 'Alice Adulta',
    status: 'ativo',
    classId: 't-adulto-manha',
    planId: 'pl-basico',
  },
  {
    id: 'a2',
    name: 'Bento Filho',
    status: 'ativo',
    classId: 't-infantil-tarde',
    planId: 'pl-familia',
    guardianId: 'r1',
  },
  {
    id: 'a3',
    name: 'Bia Filha',
    status: 'ativo',
    classId: 't-juvenil-tarde',
    planId: 'pl-familia',
    guardianId: 'r1',
  },
  {
    id: 'a4',
    name: 'Diego Devedor',
    status: 'ativo',
    classId: 't-adulto-tarde',
    planId: 'pl-completo',
  },
  {
    id: 'a5',
    name: 'Paula Pontual',
    status: 'ativo',
    classId: 't-adulto-noite',
    planId: 'pl-completo',
  },
  {
    id: 'a6',
    name: 'Pedro Pausado',
    status: 'pausado',
    classId: 't-juvenil-manha',
    planId: 'pl-basico',
  },
  {
    id: 'a7',
    name: 'Caio Convidado',
    status: 'ativo',
    classId: 't-adulto-manha',
    planId: 'pl-basico',
    benefitId: 'b-integral',
  },
]

const charge = (
  id: string,
  studentId: string,
  month: string,
  amountCents: number,
  status: Charge['status'],
): Charge => ({ id, studentId, month, amountCents, status })

// No charge for a6 (paused) or a7 (full scholarship).
export const charges = (): Charge[] => [
  charge('m1', 'a1', '2026-08', 15000, 'paga'),
  charge('m2', 'a1', REFERENCE_MONTH, 15000, 'aberta'),
  charge('m3', 'a2', REFERENCE_MONTH, 18000, 'aberta'),
  charge('m4', 'a3', REFERENCE_MONTH, 18000, 'aberta'),
  charge('m5', 'a4', REFERENCE_MONTH, 22000, 'atrasada'),
  charge('m6', 'a5', '2026-08', 22000, 'paga'),
  charge('m7', 'a5', REFERENCE_MONTH, 22000, 'paga'),
]
