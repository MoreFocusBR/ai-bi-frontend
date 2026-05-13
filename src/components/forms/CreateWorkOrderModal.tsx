import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useCreateWorkOrder } from '../../hooks/useWorkOrders';
import { Plus } from 'lucide-react';

export function CreateWorkOrderModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('3');
  
  const { mutate, isPending } = useCreateWorkOrder();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    
    mutate({
      title,
      priority: parseInt(priority, 10),
      source: 'infraspeak',
      status: 'Aberta',
    }, {
      onSuccess: () => {
        setOpen(false);
        setTitle('');
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* @ts-expect-error asChild is valid for Radix but may have type issues here */}
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nova OS
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Criar Ordem de Serviço</DialogTitle>
            <DialogDescription>
              Adicione uma nova OS para acompanhamento imediato.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right text-sm font-medium">
                Título
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                placeholder="Ex: Troca de filtro do AC"
                disabled={isPending}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="priority" className="text-right text-sm font-medium">
                Prioridade
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="col-span-3 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isPending}
              >
                <option value="1">P1 - Crítica</option>
                <option value="2">P2 - Alta</option>
                <option value="3">P3 - Média</option>
                <option value="4">P4 - Baixa</option>
                <option value="5">P5 - Planejada</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Criando...' : 'Salvar OS'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
