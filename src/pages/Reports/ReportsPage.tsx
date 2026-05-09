import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { FileText, Download, Plus, Search } from 'lucide-react';
import { Input } from '../../components/ui/input';

export function ReportsPage() {
  const [reports] = useState([
    { id: 1, title: 'Consolidado de Manutenção Maio 2026', status: 'Pronto', date: '09/05/2026', format: 'PDF' },
    { id: 2, title: 'Análise de Custos vs Orçamento', status: 'Pronto', date: '08/05/2026', format: 'Excel' },
    { id: 3, title: 'Previsão de Falhas Críticas em Chillers', status: 'Pendente', date: '09/05/2026', format: 'PDF' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios Customizados</h1>
          <p className="text-muted-foreground">Solicite análises profundas geradas por Inteligência Artificial.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Relatório
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar relatórios gerados..." className="pl-8" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map(report => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-base font-medium leading-tight">{report.title}</CardTitle>
                <CardDescription>{report.date}</CardDescription>
              </div>
              <FileText className="h-5 w-5 text-muted-foreground shrink-0 ml-2" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Badge variant={report.status === 'Pronto' ? 'default' : 'secondary'} 
                         className={report.status === 'Pendente' ? 'animate-pulse bg-amber-500/10 text-amber-500 hover:bg-amber-500/20' : ''}>
                    {report.status}
                  </Badge>
                  <Badge variant="outline">{report.format}</Badge>
                </div>
                {report.status === 'Pronto' && (
                  <Button variant="ghost" size="icon" title="Baixar">
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
