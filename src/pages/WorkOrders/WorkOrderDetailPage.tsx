import { useParams, Link } from 'react-router-dom';
import { useWorkOrderDetail } from '../../hooks/useWorkOrders';
import { StatusBadge } from '../../components/data/StatusBadge';

export function WorkOrderDetailPage() {
  const { id } = useParams();
  const { data: wo, isLoading } = useWorkOrderDetail(id);

  if (isLoading) return <div className="p-4 animate-pulse">Carregando detalhes da OS...</div>;
  if (!wo) return <div className="p-4 text-red-500">OS não encontrada.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{wo.title}</h1>
          <p className="text-muted-foreground">OS #{wo.external_id || wo.id.slice(0,8)}</p>
        </div>
        <StatusBadge status={wo.status} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Detalhes da Execução</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Prioridade</dt><dd className="font-medium">P{wo.priority || '-'}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Fonte</dt><dd className="font-medium capitalize">{wo.source}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Ativo ID</dt><dd className="font-medium">{wo.asset_id ? <Link to={`/assets/${wo.asset_id}`} className="text-brand-600 hover:underline">{wo.asset_id.slice(0,8)}...</Link> : '-'}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Custo Total</dt><dd className="font-medium text-emerald-600 dark:text-emerald-400">{wo.cost ? `R$ ${parseFloat(wo.cost).toFixed(2)}` : '-'}</dd></div>
          </dl>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Metadados</h3>
          <pre className="text-xs bg-muted p-4 rounded-md overflow-auto max-h-48 text-muted-foreground">
            {JSON.stringify(wo.metadata_ || {}, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
