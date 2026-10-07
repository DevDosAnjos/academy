import { EmptyPage } from '@/shared/components/empty-page'
import { RequireAccess } from '@/shared/components/require-access'
import { NoAccess } from './no-access'

export default function Settings() {
  return (
    <RequireAccess requirement="admin" forbidden={<NoAccess />}>
      <EmptyPage title="Configurações" />
    </RequireAccess>
  )
}
