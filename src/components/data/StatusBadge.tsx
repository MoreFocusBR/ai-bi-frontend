import { Badge } from '../ui/badge';

export function StatusBadge({ status }: { status: string | null }) {
  if (!status) return <Badge variant="outline">Desconhecido</Badge>;

  const s = status.toLowerCase();
  
  if (s.includes('resolv') || s.includes('conclu') || s.includes('ativo') || s.includes('fechad')) {
    return <Badge className="bg-status-resolved text-white hover:bg-status-resolved/80">{status}</Badge>;
  }
  if (s.includes('andamento') || s.includes('execução') || s.includes('progresso')) {
    return <Badge className="bg-status-inProgress text-white hover:bg-status-inProgress/80">{status}</Badge>;
  }
  if (s.includes('abert') || s.includes('pendent')) {
    return <Badge className="bg-status-open text-white hover:bg-status-open/80">{status}</Badge>;
  }
  if (s.includes('crític') || s.includes('cancel') || s.includes('inativo')) {
    return <Badge className="bg-status-critical text-white hover:bg-status-critical/80">{status}</Badge>;
  }

  return <Badge variant="secondary">{status}</Badge>;
}
