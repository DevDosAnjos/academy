import * as React from 'react'
import { Input } from '@/shared/components/ui/input'
import { formatPhone } from '@/shared/formats/phone'

// Masks while typing, always from the digits, so deleting works.
export function PhoneInput({
  value = '',
  onChange,
  ...props
}: Omit<React.ComponentProps<'input'>, 'value' | 'onChange' | 'type'> & {
  value?: string
  onChange?: (value: string) => void
}) {
  return (
    <Input
      type="tel"
      inputMode="tel"
      autoComplete="tel-national"
      value={formatPhone(value)}
      onChange={(e) => onChange?.(formatPhone(e.target.value))}
      {...props}
    />
  )
}
