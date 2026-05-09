import { useParams } from 'react-router-dom';
import { useAssetDetail } from '../../hooks/useAssets';
import { StatusBadge } from '../../components/data/StatusBadge';

export function AssetDetailPage() {
  const { id } = useParams();
  const { data: asset, isLoading } = useAssetDetail(id);

  if (isLoading) return <div className="p-4 animate-pulse">Carregando detalhes do ativo...</div>;
  if (!asset) return <div className="p-4 text-red-500">Ativo não encontrado.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{asset.name}</h1>
          <p className="text-muted-foreground">ID Externo: {asset.external_id || 'N/A'}</p>
        </div>
        <StatusBadge status={asset.status} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Informações Gerais</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Categoria</dt><dd className="font-medium">{asset.category || '-'}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Fonte</dt><dd className="font-medium capitalize">{asset.source}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Criado em</dt><dd className="font-medium">{new Date(asset.created_at).toLocaleDateString()}</dd></div>
          </dl>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Metadados</h3>
          <pre className="text-xs bg-muted p-4 rounded-md overflow-auto max-h-48 text-muted-foreground">
            {JSON.stringify(asset.metadata_ || {}, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
