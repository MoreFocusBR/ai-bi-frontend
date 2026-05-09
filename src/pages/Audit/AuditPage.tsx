import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Shield, Search, Download } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export function AuditPage() {
  const logs = [
    { id: 1, timestamp: '2026-05-09T14:12:00Z', user: 'carlos@empresa.com', action: 'CREATE', entity: 'WorkOrder', ip: '192.168.1.5' },
    { id: 2, timestamp: '2026-05-09T13:45:00Z', user: 'maria@empresa.com', action: 'UPDATE', entity: 'Asset', ip: '192.168.1.12' },
    { id: 3, timestamp: '2026-05-08T09:30:00Z', user: 'admin@empresa.com', action: 'DELETE', entity: 'User', ip: '192.168.1.200' },
    { id: 4, timestamp: '2026-05-08T08:15:00Z', user: 'system_sync', action: 'SYNC', entity: 'SankhyaIntegration', ip: 'internal' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8 text-brand-600 dark:text-brand-400" />
            Auditoria de Sistema
          </h1>
          <p className="text-muted-foreground">Registro imutável de acessos e ações (Visão Admin).</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Filtrar por usuário, ação ou entidade..." className="pl-8" />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Ação</TableHead>
              <TableHead>Entidade</TableHead>
              <TableHead className="text-right">Endereço IP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map(log => (
              <TableRow key={log.id}>
                <TableCell className="font-medium whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>
                  <Badge variant={log.action === 'DELETE' ? 'destructive' : 'secondary'}>{log.action}</Badge>
                </TableCell>
                <TableCell>{log.entity}</TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">{log.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
