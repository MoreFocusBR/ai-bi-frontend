import { useWorkOrders } from '../../hooks/useWorkOrders';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { StatusBadge } from '../../components/data/StatusBadge';
import { Input } from '../../components/ui/input';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export function WorkOrdersPage() {
  const { data, isLoading } = useWorkOrders({ limit: 50 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ordens de Serviço</h1>
          <p className="text-muted-foreground">Monitoramento de manutenção e facilities.</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar OS..." className="pl-8" />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Fonte</TableHead>
              <TableHead>Abertura</TableHead>
              <TableHead className="text-right">Custo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-10 text-muted-foreground">Carregando ordens de serviço...</TableCell></TableRow>
            ) : data?.data.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-10 text-muted-foreground">Nenhuma OS encontrada.</TableCell></TableRow>
            ) : (
              data?.data.map((wo) => (
                <TableRow key={wo.id}>
                  <TableCell className="font-medium">
                    <Link to={`/work-orders/${wo.id}`} className="hover:underline">{wo.title}</Link>
                  </TableCell>
                  <TableCell><StatusBadge status={wo.status} /></TableCell>
                  <TableCell>
                    {wo.priority ? <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-brand-500/10 text-brand-700 bg-brand-50 dark:bg-brand-900/30 dark:text-brand-300">P{wo.priority}</span> : '-'}
                  </TableCell>
                  <TableCell className="capitalize">{wo.source}</TableCell>
                  <TableCell>{wo.opened_at ? new Date(wo.opened_at).toLocaleDateString() : '-'}</TableCell>
                  <TableCell className="text-right">{wo.cost ? `R$ ${parseFloat(wo.cost).toFixed(2)}` : '-'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
