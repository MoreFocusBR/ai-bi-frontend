import { KpiCard } from '../../components/data/KpiCard';
import { useWorkOrders } from '../../hooks/useWorkOrders';
import { useAssets } from '../../hooks/useAssets';
import { Wrench, AlertTriangle, Clock, Box } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { StatusBadge } from '../../components/data/StatusBadge';

export function DashboardPage() {
  const { data: woData, isLoading: woLoading } = useWorkOrders({ limit: 100 });
  const { data: assetData, isLoading: assetLoading } = useAssets({ limit: 1 });

  if (woLoading || assetLoading) {
    return <div className="animate-pulse space-y-4 p-4 text-brand-500">Carregando painel de controle...</div>;
  }

  const workOrders = woData?.data || [];
  const totalWO = workOrders.length;
  const criticalWO = workOrders.filter(wo => wo.priority === 1 || wo.priority === 2).length;
  const resolvedWO = workOrders.filter(wo => wo.status?.toLowerCase().includes('resolv') || wo.status?.toLowerCase().includes('conclu')).length;
  
  // Dados estáticos temporários (substituir por agrupamento da API no futuro)
  const chartData = [
    { name: '01/05', abertas: 12, resolvidas: 10 },
    { name: '02/05', abertas: 19, resolvidas: 15 },
    { name: '03/05', abertas: 15, resolvidas: 20 },
    { name: '04/05', abertas: 22, resolvidas: 18 },
    { name: '05/05', abertas: 10, resolvidas: 12 },
    { name: '06/05', abertas: 5, resolvidas: 19 },
    { name: '07/05', abertas: 8, resolvidas: 11 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Executivo</h1>
        <p className="text-muted-foreground">Visão geral da operação e saúde dos ativos.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total de OS (Abertas)"
          value={totalWO - resolvedWO}
          icon={<Wrench className="h-4 w-4" />}
          change={12}
          trend="up"
        />
        <KpiCard
          title="OS Críticas"
          value={criticalWO}
          icon={<AlertTriangle className="h-4 w-4 text-status-critical" />}
          change={5}
          trend="down"
        />
        <KpiCard
          title="Tempo Médio de Resolução"
          value="4.2"
          unit="dias"
          icon={<Clock className="h-4 w-4" />}
          change={1.1}
          trend="up"
        />
        <KpiCard
          title="Ativos Monitorados"
          value={assetData?.total || 0}
          icon={<Box className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">Evolução de Ordens de Serviço</h3>
            <p className="text-sm text-muted-foreground">Últimos 7 dias</p>
          </div>
          <div className="p-6 pt-0 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip />
                <Line type="monotone" dataKey="abertas" stroke="hsl(var(--status-open))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="resolvidas" stroke="hsl(var(--status-resolved))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">Últimas OSs</h3>
          </div>
          <div className="p-6 pt-0 flex-1 overflow-auto">
             <div className="space-y-4">
                {workOrders.slice(0, 5).map(wo => (
                  <div key={wo.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div className="space-y-1 truncate pr-4">
                      <p className="text-sm font-medium leading-none truncate">{wo.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">{wo.source}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <StatusBadge status={wo.status} />
                    </div>
                  </div>
                ))}
                {workOrders.length === 0 && <p className="text-sm text-muted-foreground">Nenhuma OS encontrada.</p>}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
