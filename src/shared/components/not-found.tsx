import { Link } from 'react-router'

export function NotFound() {
  return (
    <div className="flex flex-col items-start gap-3 p-6">
      <h1 className="text-3xl font-semibold uppercase">
        Página não encontrada
      </h1>
      <p className="text-sm text-muted-foreground">
        O endereço não existe ou foi trocado.
      </p>
      <Link to="/" className="text-sm font-medium underline">
        Ir para o início do site
      </Link>
    </div>
  )
}
