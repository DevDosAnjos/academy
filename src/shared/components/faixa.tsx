// Provisional belt colors (RN-GRA-07, [A DEFINIR] until item #42).
const BELTS = {
  branca: { label: 'branca', color: '#ffffff' },
  azul: { label: 'azul', color: '#1d4ed8' },
  roxa: { label: 'roxa', color: '#7e22ce' },
  marrom: { label: 'marrom', color: '#78350f' },
  preta: { label: 'preta', color: '#1b1b1f' },
  cinza: { label: 'cinza', color: '#9ca3af' },
  amarela: { label: 'amarela', color: '#facc15' },
  laranja: { label: 'laranja', color: '#f97316' },
  verde: { label: 'verde', color: '#16a34a' },
} as const

export type Belt = keyof typeof BELTS

export function Faixa({ belt, degrees = 0 }: { belt: Belt; degrees?: number }) {
  const { label, color } = BELTS[belt]
  const n = Math.min(4, Math.max(0, Math.trunc(degrees) || 0))
  return (
    <span
      role="img"
      aria-label={`Faixa ${label}, ${n} ${n === 1 ? 'grau' : 'graus'}`}
      className="inline-flex h-4 w-20 items-stretch overflow-hidden rounded-sm border border-border"
      style={{ backgroundColor: color }}
    >
      <span className="ml-auto flex w-9 items-center justify-evenly bg-foreground">
        {Array.from({ length: n }, (_, i) => (
          <span key={i} className="h-3 w-1 bg-white" />
        ))}
      </span>
    </span>
  )
}
