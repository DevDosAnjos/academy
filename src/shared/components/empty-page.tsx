export function EmptyPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-2 p-6">
      <h1 className="text-3xl font-semibold uppercase">{title}</h1>
      <p className="text-sm text-muted-foreground">
        Esta tela ainda será construída.
      </p>
    </div>
  )
}
