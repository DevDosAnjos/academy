import type { Account } from './types.ts'

// Fictional accounts: one active per profile, plus the two exception cases.
export const accounts = (): Account[] => [
  {
    id: 'c-admin',
    name: 'Ana Admin',
    email: 'admin@exemplo.test',
    profile: 'administrador',
    status: 'ativa',
  },
  {
    id: 'c-prof',
    name: 'Paulo Professor',
    email: 'professor@exemplo.test',
    profile: 'professor',
    status: 'ativa',
    teacherId: 'p1',
  },
  {
    id: 'c-aluno',
    name: 'Alice Adulta',
    email: 'aluno@exemplo.test',
    profile: 'aluno',
    status: 'ativa',
    studentId: 'a1',
  },
  {
    id: 'c-resp',
    name: 'Regina Responsável',
    email: 'responsavel@exemplo.test',
    profile: 'responsavel',
    status: 'ativa',
    guardianId: 'r1',
  },
  {
    id: 'c-inativa',
    name: 'Inês Inativa',
    email: 'inativa@exemplo.test',
    profile: 'professor',
    status: 'inativa',
    teacherId: 'p2',
  },
  {
    id: 'c-convite',
    name: 'Caio Convidado',
    email: 'convite@exemplo.test',
    profile: 'aluno',
    status: 'convite-pendente',
    studentId: 'a7',
  },
]
