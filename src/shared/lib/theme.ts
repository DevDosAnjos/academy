import { contrastRatio } from '@/shared/lib/contrast'

const HEX = /^#[0-9a-f]{6}$/i
const TEXT_ON_ACCENT = '#1b1b1f'

/** Sets the accent color at runtime. Anything that is not `#rrggbb` is ignored. */
export function applyAccentColor(hex: string) {
  if (!HEX.test(hex)) return
  const style = document.documentElement.style
  style.setProperty('--primary', hex)
  style.setProperty('--ring', hex)
  style.setProperty(
    '--primary-foreground',
    contrastRatio(hex, '#ffffff') >= contrastRatio(hex, TEXT_ON_ACCENT)
      ? '#ffffff'
      : TEXT_ON_ACCENT,
  )
}
