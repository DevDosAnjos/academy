import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/shared/components/ui/input'

export function PasswordInput({
  autoComplete = 'new-password',
  ...props
}: Omit<React.ComponentProps<'input'>, 'type'>) {
  const [shown, setShown] = React.useState(false)
  return (
    <div className="relative">
      <Input
        type={shown ? 'text' : 'password'}
        autoComplete={autoComplete}
        className="pr-10"
        {...props}
      />
      <button
        type="button"
        aria-label={shown ? 'Ocultar senha' : 'Mostrar senha'}
        onClick={() => setShown((s) => !s)}
        className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {shown ? (
          <EyeOff aria-hidden className="size-4" />
        ) : (
          <Eye aria-hidden className="size-4" />
        )}
      </button>
    </div>
  )
}
