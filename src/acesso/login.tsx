import { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { EmptyPage } from '@/shared/components/empty-page'
import { Button } from '@/shared/components/ui/button'
import { safeReturnPath } from '@/shared/lib/access'
import {
  areaHome,
  areaOf,
  PROFILE_LABEL,
  useSession,
  type Profile,
} from '@/shared/lib/session'

export default function Login() {
  const { signIn, signOut } = useSession()
  const location = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()

  // "Sair" navigates here first and signs out after the area guard is gone.
  const signedOut = (location.state as { signOut?: boolean } | null)?.signOut
  useEffect(() => {
    if (signedOut) signOut()
  }, [signedOut, signOut])

  function enter(profile: Profile) {
    signIn(profile)
    const back = safeReturnPath(params.get('voltar'))
    navigate(back ?? areaHome(areaOf(profile)), { replace: true })
  }

  return (
    <>
      <EmptyPage title="Entrar" />
      {/* Simulated login: development only, replaced by the real one in item #17. */}
      {import.meta.env.DEV && (
        <div className="flex flex-col gap-2 p-6 pt-0">
          {(Object.keys(PROFILE_LABEL) as Profile[]).map((profile) => (
            <Button
              key={profile}
              variant="outline"
              onClick={() => enter(profile)}
            >
              Entrar como {PROFILE_LABEL[profile]}
            </Button>
          ))}
        </div>
      )}
    </>
  )
}
