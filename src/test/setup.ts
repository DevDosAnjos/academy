import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from 'vitest-axe/matchers'
import { afterAll, afterEach, beforeAll, expect } from 'vitest'
import { server } from '@/mocks/node'

expect.extend(matchers)

beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))
afterEach(() => {
  cleanup()
  server.resetHandlers()
})
afterAll(() => server.close())
