import { Link, useNavigate } from 'react-router'
import { Button } from '@/shared/components/ui/button'

export function NoAccess() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-start gap-3 p-6">
      <h1 className="text-3xl font-semibold uppercase">
        Esta área é da administração
      </h1>
      <p className="text-sm text-muted-foreground">
        Seu perfil não tem permissão para abrir esta tela.
      </p>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Voltar
        </Button>
        <Button asChild>
          <Link to="/gestao">Ir para o Início</Link>
        </Button>
      </div>
    </div>
  )
}
