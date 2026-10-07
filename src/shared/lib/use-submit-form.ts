import * as React from 'react'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import type { z } from 'zod'
import { ApiError } from '@/shared/api/errors'

// Form + Zod + send (item #7). RHF already focuses the first invalid field on
// submit; server field errors are set with focus too (R3, R4).
export function useSubmitForm<
  TIn extends FieldValues,
  TOut extends FieldValues,
  R,
>({
  schema,
  defaultValues,
  send,
}: {
  schema: z.ZodType<TOut, TIn>
  defaultValues: DefaultValues<TIn>
  send: (values: TOut) => Promise<R>
}) {
  const form = useForm<TIn, unknown, TOut>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues,
  })
  const [formError, setFormError] = React.useState<string | null>(null)
  const mutation = useMutation({ mutationFn: send })

  const submit = form.handleSubmit(async (values) => {
    setFormError(null)
    try {
      await mutation.mutateAsync(values)
    } catch (e) {
      const fields = e instanceof ApiError ? e.fields : undefined
      if (fields && Object.keys(fields).length) {
        Object.entries(fields).forEach(([name, message], i) =>
          form.setError(
            name as Path<TIn>,
            { message },
            { shouldFocus: i === 0 },
          ),
        )
      } else {
        setFormError(
          e instanceof Error ? e.message : 'Não foi possível enviar.',
        )
      }
    }
  })

  // A second click or Enter while sending does nothing (R8).
  const onSubmit = (e?: React.BaseSyntheticEvent) => {
    if (mutation.isPending) {
      e?.preventDefault()
      return Promise.resolve()
    }
    return submit(e)
  }

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
    formError,
    data: mutation.data,
  }
}
