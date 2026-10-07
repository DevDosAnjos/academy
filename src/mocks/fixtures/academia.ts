import type {
  AgeGroup,
  Benefit,
  ClassGroup,
  Expense,
  Lesson,
  Period,
  Plan,
  Teacher,
} from './types.ts'

// Reference month of the seed (nothing depends on the clock).
export const REFERENCE_MONTH = '2026-09'

export const teachers = (): Teacher[] => [
  { id: 'p1', name: 'Paulo Professor' },
  { id: 'p2', name: 'Inês Inativa' },
  { id: 'p3', name: 'Sérgio Substituto' },
]

export const plans = (): Plan[] => [
  { id: 'pl-basico', name: 'Básico', priceCents: 15000 },
  { id: 'pl-completo', name: 'Completo', priceCents: 22000 },
  { id: 'pl-familia', name: 'Família', priceCents: 18000 },
]

export const benefits = (): Benefit[] => [
  { id: 'b-integral', name: 'Bolsa integral', kind: 'bolsa-integral' },
]

const AGES: [AgeGroup, string][] = [
  ['infantil', 'Infantil'],
  ['juvenil', 'Juvenil'],
  ['adulto', 'Adulto'],
]
const PERIODS: [Period, string][] = [
  ['manha', 'manhã'],
  ['tarde', 'tarde'],
  ['noite', 'noite'],
]

// 3 age groups x 3 periods; only the adult night class has no group.
export const classes = (): ClassGroup[] =>
  AGES.flatMap(([ageGroup, a]) =>
    PERIODS.map(([period, p]) => ({
      id: `t-${ageGroup}-${period}`,
      name: `${a} ${p}`,
      ageGroup,
      period,
      teacherId: period === 'noite' ? 'p2' : 'p1',
      groupId:
        ageGroup === 'adulto' && period === 'noite' ? null : `g-${ageGroup}`,
    })),
  )

export const lessons = (): Lesson[] => [
  {
    id: 'l1',
    classId: 't-adulto-manha',
    date: '2026-09-14T09:00:00-03:00',
    teacherId: 'p1',
    trialStudentName: 'Davi Experimental',
  },
  {
    id: 'l2',
    classId: 't-infantil-tarde',
    date: '2026-09-15T16:00:00-03:00',
    teacherId: 'p1',
    substituteTeacherId: 'p3',
  },
]

export const expenses = (): Expense[] => [
  {
    id: 'd1',
    description: 'Aluguel do espaço',
    amountCents: 350000,
    date: '2026-09-05T00:00:00-03:00',
  },
  {
    id: 'd2',
    description: 'Material de limpeza',
    amountCents: 18000,
    date: '2026-09-10T00:00:00-03:00',
  },
]
