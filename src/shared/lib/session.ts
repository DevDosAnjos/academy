import { useSyncExternalStore } from 'react'

export type Profile = 'administrador' | 'professor' | 'aluno' | 'responsavel'
export type Area = 'gestao' | 'portal'

export const PROFILE_LABEL: Record<Profile, string> = {
  administrador: 'Administrador',
  professor: 'Professor',
  aluno: 'Aluno',
  responsavel: 'Responsável',
}

export const areaOf = (profile: Profile): Area =>
  profile === 'administrador' || profile === 'professor' ? 'gestao' : 'portal'

export const areaHome = (area: Area) =>
  area === 'gestao' ? '/gestao' : '/portal'

// Simulated session (item #4): sessionStorage only, replaced by the real
// session in item #17 keeping this same interface.
const KEY = 'academy.simulated-session'
const listeners = new Set<() => void>()

function read(): Profile | null {
  try {
    const value = sessionStorage.getItem(KEY)
    return value && value in PROFILE_LABEL ? (value as Profile) : null
  } catch {
    return null
  }
}

export function getSession(): Profile | null {
  return read()
}

function emit() {
  listeners.forEach((l) => l())
}

export function signIn(profile: Profile) {
  try {
    sessionStorage.setItem(KEY, profile)
  } catch {
    // storage blocked: session stays empty
  }
  emit()
}

export function signOut() {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    // nothing to clear
  }
  emit()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useSession() {
  const profile = useSyncExternalStore(subscribe, read, () => null)
  return { profile, signIn, signOut }
}
