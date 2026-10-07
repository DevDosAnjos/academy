import type { Profile } from '../shared/lib/session.ts'

// In-memory fake data (item #6, D4). Reloading the page restores the seed.
export type ExampleItem = { id: string; name: string }

const seed = (): ExampleItem[] => [
  { id: '1', name: 'Exemplo A' },
  { id: '2', name: 'Exemplo B' },
]

export const db = {
  profile: null as Profile | null,
  examples: seed(),
  reset() {
    this.profile = null
    this.examples = seed()
  },
}
