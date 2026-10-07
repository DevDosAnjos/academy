import type { Profile } from '../shared/lib/session.ts'
import { scenarioData } from './fixtures/index.ts'

// In-memory fake data (item #6, D4; fixtures from item #9). Reloading the
// page or calling reset() restores the seed.
export type ExampleItem = { id: string; name: string }

const seed = (): ExampleItem[] => [
  { id: '1', name: 'Exemplo A' },
  { id: '2', name: 'Exemplo B' },
]

export const db = {
  profile: null as Profile | null,
  accountId: null as string | null,
  examples: seed(),
  data: scenarioData(),
  reset() {
    this.profile = null
    this.accountId = null
    this.examples = seed()
    this.data = scenarioData()
  },
}
