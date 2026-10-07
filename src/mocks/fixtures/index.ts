import { accounts } from './contas.ts'
import {
  benefits,
  classes,
  expenses,
  lessons,
  plans,
  teachers,
} from './academia.ts'
import { charges, guardians, students } from './alunos.ts'

export { REFERENCE_MONTH } from './academia.ts'

// Fresh copy on every call, so db.reset() restores the seed.
export const scenarioData = () => ({
  accounts: accounts(),
  teachers: teachers(),
  plans: plans(),
  benefits: benefits(),
  classes: classes(),
  lessons: lessons(),
  expenses: expenses(),
  guardians: guardians(),
  students: students(),
  charges: charges(),
})

export type ScenarioData = ReturnType<typeof scenarioData>
