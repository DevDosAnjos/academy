import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http } from 'msw'
import { MemoryRouter } from 'react-router'
import { axe } from 'vitest-axe'
import { expect, test, vi } from 'vitest'
import { server } from '@/mocks/node'
import ExampleForm from './example-form'

function setup() {
  const sent = vi.fn()
  server.use(
    http.post('*/exemplo-formulario', () => {
      sent()
      return new Response(null, { status: 500 })
    }),
  )
  const view = render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter>
        <ExampleForm />
      </MemoryRouter>
    </QueryClientProvider>,
  )
  return { sent, ...view }
}

test('empty submit shows the required message on every field and sends nothing', async () => {
  const { sent } = setup()
  await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))
  expect(await screen.findAllByText('Preencha este campo.')).toHaveLength(6)
  expect(sent).not.toHaveBeenCalled()
})

test('phone field applies the mask', async () => {
  setup()
  const phone = screen.getByLabelText('Telefone')
  await userEvent.type(phone, '11987654321')
  expect(phone).toHaveValue('(11) 98765-4321')
})

test('form has no WCAG A/AA violations', async () => {
  const { container } = setup()
  expect(
    await axe(container, {
      runOnly: ['wcag2a', 'wcag2aa'],
      rules: { 'color-contrast': { enabled: false } }, // jsdom has no layout; e2e checks contrast
    }),
  ).toHaveNoViolations()
})
