import type { Profile } from '../../shared/lib/session.ts'

// First draft of the contract (decision #15; OpenAPI will describe it).
// Money in cents, dates ISO 8601.
export type AccountStatus = 'ativa' | 'inativa' | 'convite-pendente'

export type Account = {
  id: string
  name: string
  email: string
  profile: Profile
  status: AccountStatus
  teacherId?: string
  studentId?: string
  guardianId?: string
}

export type AgeGroup = 'infantil' | 'juvenil' | 'adulto'
export type Period = 'manha' | 'tarde' | 'noite'

export type Teacher = { id: string; name: string }
export type Plan = { id: string; name: string; priceCents: number }
export type Benefit = { id: string; name: string; kind: 'bolsa-integral' }
export type ClassGroup = {
  id: string
  name: string
  ageGroup: AgeGroup
  period: Period
  teacherId: string
  groupId: string | null
}
export type Lesson = {
  id: string
  classId: string
  date: string
  teacherId: string
  substituteTeacherId?: string
  trialStudentName?: string
}
export type Expense = {
  id: string
  description: string
  amountCents: number
  date: string
}

export type Guardian = { id: string; name: string; email: string }
export type StudentStatus = 'ativo' | 'pausado' | 'inativo'
export type Student = {
  id: string
  name: string
  status: StudentStatus
  classId: string
  planId: string
  guardianId?: string
  benefitId?: string
}
export type ChargeStatus = 'aberta' | 'paga' | 'atrasada'
export type Charge = {
  id: string
  studentId: string
  month: string
  amountCents: number
  status: ChargeStatus
}
