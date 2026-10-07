import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '../db.ts'
import { REFERENCE_MONTH } from './index.ts'

beforeEach(() => db.reset())

const d = () => db.data
const ids = (list: { id: string }[]) => new Set(list.map((x) => x.id))

describe('fixtures', () => {
  it('CA1: one active account per profile, plus inactive and pending', () => {
    const { accounts } = d()
    const active = accounts.filter((a) => a.status === 'ativa')
    expect(active.map((a) => a.profile).sort()).toEqual([
      'administrador',
      'aluno',
      'professor',
      'responsavel',
    ])
    expect(accounts.filter((a) => a.status === 'inativa')).toHaveLength(1)
    expect(
      accounts.filter((a) => a.status === 'convite-pendente'),
    ).toHaveLength(1)
  })

  it('CA2: 9 classes, 3 plans, teacher with 2+ classes', () => {
    const { classes, plans } = d()
    expect(new Set(classes.map((c) => `${c.ageGroup}/${c.period}`)).size).toBe(
      9,
    )
    expect(classes).toHaveLength(9)
    expect(plans).toHaveLength(3)
    expect(
      classes.filter((c) => c.teacherId === 'p1').length,
    ).toBeGreaterThanOrEqual(2)
  })

  it('CA3: every reference exists', () => {
    const x = d()
    expect(x.students.length).toBeGreaterThan(0)
    expect(x.charges.length).toBeGreaterThan(0)
    expect(x.expenses.length).toBeGreaterThan(0)
    const t = ids(x.teachers)
    const c = ids(x.classes)
    const p = ids(x.plans)
    const g = ids(x.guardians)
    const s = ids(x.students)
    const b = ids(x.benefits)
    x.classes.forEach((k) => expect(t.has(k.teacherId)).toBe(true))
    x.lessons.forEach((l) => {
      expect(c.has(l.classId)).toBe(true)
      expect(t.has(l.teacherId)).toBe(true)
      if (l.substituteTeacherId) expect(t.has(l.substituteTeacherId)).toBe(true)
    })
    x.students.forEach((a) => {
      expect(c.has(a.classId)).toBe(true)
      expect(p.has(a.planId)).toBe(true)
      if (a.guardianId) expect(g.has(a.guardianId)).toBe(true)
      if (a.benefitId) expect(b.has(a.benefitId)).toBe(true)
    })
    x.charges.forEach((m) => expect(s.has(m.studentId)).toBe(true))
    x.accounts.forEach((a) => {
      if (a.teacherId) expect(t.has(a.teacherId)).toBe(true)
      if (a.studentId) expect(s.has(a.studentId)).toBe(true)
      if (a.guardianId) expect(g.has(a.guardianId)).toBe(true)
    })
  })

  it('CA4: portal cases', () => {
    const x = d()
    const adult = x.accounts.find(
      (a) => a.profile === 'aluno' && a.status === 'ativa',
    )!
    const student = x.students.find((s) => s.id === adult.studentId)!
    expect(x.classes.find((k) => k.id === student.classId)!.ageGroup).toBe(
      'adulto',
    )
    const resp = x.accounts.find((a) => a.profile === 'responsavel')!
    expect(
      x.students.filter((s) => s.guardianId === resp.guardianId),
    ).toHaveLength(2)
    expect(
      x.charges.some(
        (m) => m.month === REFERENCE_MONTH && m.status === 'atrasada',
      ),
    ).toBe(true)
    expect(
      x.students.some((s) => {
        const own = x.charges.filter((m) => m.studentId === s.id)
        return own.length > 0 && own.every((m) => m.status === 'paga')
      }),
    ).toBe(true)
  })

  it('CA5 and CA6: edge cases, no open charge for paused or scholarship', () => {
    const x = d()
    expect(x.classes.some((k) => k.groupId === null)).toBe(true)
    expect(x.lessons.some((l) => l.trialStudentName)).toBe(true)
    expect(x.lessons.some((l) => l.substituteTeacherId)).toBe(true)
    expect(x.students.some((s) => s.status === 'pausado')).toBe(true)
    expect(x.students.some((s) => s.benefitId)).toBe(true)
    x.students
      .filter((s) => s.status === 'pausado' || s.benefitId)
      .forEach((s) =>
        expect(
          x.charges.filter((m) => m.studentId === s.id && m.status !== 'paga'),
        ).toEqual([]),
      )
  })

  it('CA7: reset restores the seed', () => {
    db.examples.push({ id: 'x', name: 'x' })
    db.data.students.pop()
    db.data.accounts[0].status = 'inativa'
    db.reset()
    expect(db.examples).toHaveLength(2)
    expect(db.data.students).toHaveLength(7)
    expect(db.data.accounts[0].status).toBe('ativa')
  })

  it('CA11: fictional data only', () => {
    const x = d()
    ;[...x.accounts, ...x.guardians].forEach((a) =>
      expect(a.email.endsWith('@exemplo.test')).toBe(true),
    )
    expect(JSON.stringify(x).toLowerCase()).not.toContain('cpf')
  })
})
