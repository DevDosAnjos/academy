// Fixed Brazil (Brasília) time zone; only this file changes if that changes.
const TZ = 'America/Sao_Paulo'

const dateFmt = new Intl.DateTimeFormat('pt-BR', {
  timeZone: TZ,
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})
const timeFmt = new Intl.DateTimeFormat('pt-BR', {
  timeZone: TZ,
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

/** ISO 8601 -> dd/mm/aaaa in Brasília. */
export const formatDate = (iso: string) => dateFmt.format(new Date(iso))

/** ISO 8601 -> hh:mm in Brasília. */
export const formatTime = (iso: string) => timeFmt.format(new Date(iso))

/** dd/mm/aaaa -> ISO 8601 (noon in Brasília, so the day survives any zone). Null if not a real date. */
export function brDateToIso(text: string): string | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text)
  if (!m) return null
  const [, dd, mm, yyyy] = m
  const probe = new Date(Date.UTC(+yyyy, +mm - 1, +dd))
  if (
    probe.getUTCFullYear() !== +yyyy ||
    probe.getUTCMonth() !== +mm - 1 ||
    probe.getUTCDate() !== +dd
  )
    return null
  return new Date(`${yyyy}-${mm}-${dd}T12:00:00-03:00`).toISOString()
}

/** ISO 8601 -> dd/mm/aaaa (alias kept for symmetry with brDateToIso). */
export const isoToBrDate = formatDate
