import { useSearchParams } from 'react-router'
import { z } from 'zod'
import { api } from '@/shared/api/client'
import { PasswordInput } from '@/shared/components/password-input'
import { PhoneInput } from '@/shared/components/phone-input'
import { Button } from '@/shared/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { formatCurrency } from '@/shared/formats/currency'
import { formatDate } from '@/shared/formats/date'
import { formatPhone } from '@/shared/formats/phone'
import {
  dateField,
  emailField,
  moneyField,
  nameField,
  passwordField,
  phoneField,
} from '@/shared/lib/schemas'
import { useSubmitForm } from '@/shared/lib/use-submit-form'

// DEV-only example (item #7, D4); answered by MSW. Remove with the first real form.
const schema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  birthDate: dateField,
  amount: moneyField,
  password: passwordField,
})
type In = z.input<typeof schema>
type Out = z.output<typeof schema>

export default function ExampleForm() {
  const [params] = useSearchParams()
  const mock = params.get('mock') ?? ''
  const { form, onSubmit, isPending, formError, data } = useSubmitForm<
    In,
    Out,
    Out
  >({
    schema,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      amount: '',
      password: '',
    },
    send: (values) => api.post<Out>(`/exemplo-formulario?mock=${mock}`, values),
  })

  if (data)
    return (
      <div className="flex flex-col gap-2 p-6" role="status">
        <h1 className="text-3xl font-semibold uppercase">Enviado</h1>
        <p>Nome: {data.name}</p>
        <p>E-mail: {data.email}</p>
        <p>Telefone: {formatPhone(data.phone)}</p>
        <p>Nascimento: {formatDate(data.birthDate)}</p>
        <p>Valor: {formatCurrency(data.amount)}</p>
      </div>
    )

  return (
    <div className="flex max-w-md flex-col gap-4 p-6">
      <h1 className="text-3xl font-semibold uppercase">Formulário (exemplo)</h1>
      <Form {...form}>
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
          {formError && (
            <p role="alert" className="text-sm text-destructive">
              {formError}
            </p>
          )}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <PhoneInput {...field} />
                </FormControl>
                <FormDescription>Com DDD.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de nascimento</FormLabel>
                <FormControl>
                  <Input
                    inputMode="numeric"
                    placeholder="dd/mm/aaaa"
                    autoComplete="bday"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor (R$)</FormLabel>
                <FormControl>
                  <Input inputMode="decimal" placeholder="150,00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormDescription>
                  Pelo menos 8 caracteres, com letras e números.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Enviando…' : 'Enviar'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
