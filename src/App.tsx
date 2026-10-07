import { Faixa } from '@/shared/components/faixa'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'

function Field({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  )
}

function App() {
  return (
    <TooltipProvider>
      <main className="min-h-svh bg-surface p-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold uppercase">
                Configurações
              </h1>
              <p className="text-sm text-muted-foreground">
                Dados e aparência da academia.
              </p>
            </div>
            <Badge variant="success">Ativa</Badge>
          </header>

          <Tabs defaultValue="academia">
            <TabsList>
              <TabsTrigger value="academia">Academia</TabsTrigger>
              <TabsTrigger value="faixas">Faixas</TabsTrigger>
            </TabsList>

            <TabsContent value="academia" className="mt-4 flex flex-col gap-6">
              <section className="grid gap-4 rounded-xl border bg-card p-6 sm:grid-cols-2">
                <Field id="nome" label="Nome da academia">
                  <Input id="nome" defaultValue="Academia Exemplo" />
                </Field>
                <Field id="cidade" label="Cidade">
                  <Select defaultValue="sp">
                    <SelectTrigger id="cidade" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sp">São Paulo</SelectItem>
                      <SelectItem value="rj">Rio de Janeiro</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <div className="flex gap-2 sm:col-span-2">
                  <Button>Salvar</Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Descartar</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Descartar alterações?</DialogTitle>
                        <DialogDescription>
                          O que foi digitado será perdido.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="destructive">Descartar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost">Ajuda</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Ajuda</SheetTitle>
                        <SheetDescription>
                          Os dados da academia aparecem no portal e no site.
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="secondary">Dica</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Salve para aplicar as mudanças.
                    </TooltipContent>
                  </Tooltip>
                </div>
              </section>
            </TabsContent>

            <TabsContent value="faixas" className="mt-4">
              <section className="rounded-xl border bg-card p-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Faixa</TableHead>
                      <TableHead>Exemplo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Roxa</TableCell>
                      <TableCell>
                        <Faixa belt="roxa" degrees={2} />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Azul</TableCell>
                      <TableCell>
                        <Faixa belt="azul" degrees={5} />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Branca</TableCell>
                      <TableCell>
                        <Faixa belt="branca" degrees={-1} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </TooltipProvider>
  )
}

export default App
