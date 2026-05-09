import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Settings, Database, Users, Building, RefreshCw } from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-8 w-8 text-brand-600 dark:text-brand-400" />
          Configurações
        </h1>
        <p className="text-muted-foreground">Gerencie integrações, usuários e as preferências da conta.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Integrações (ERPs)</CardTitle>
            </div>
            <CardDescription>Status de sincronização com as fontes de dados.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h4 className="font-medium">Infraspeak</h4>
                <p className="text-sm text-muted-foreground">Última sync: há 5 minutos</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Conectado</Badge>
                <Button variant="outline" size="icon" title="Forçar Sincronização">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div>
                <h4 className="font-medium">Sankhya</h4>
                <p className="text-sm text-muted-foreground">Última sync: há 1 hora</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Conectado</Badge>
                <Button variant="outline" size="icon" title="Forçar Sincronização">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Geral do Tenant</CardTitle>
            </div>
            <CardDescription>Informações principais da organização.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nome da Organização</label>
                <p className="font-medium">Empresa Demo S/A</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Fuso Horário Base</label>
                <p className="font-medium">America/Sao_Paulo (BRT)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Equipe</CardTitle>
              </div>
              <CardDescription>Usuários com acesso a este ambiente.</CardDescription>
            </div>
            <Button>Convidar Usuário</Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-4 p-4 font-medium border-b bg-muted/50 text-sm">
                <div className="col-span-2">Nome</div>
                <div>Função</div>
                <div className="text-right">Status</div>
              </div>
              <div className="grid grid-cols-4 p-4 items-center text-sm border-b last:border-0">
                <div className="col-span-2">
                  <p className="font-medium">Carlos Admin</p>
                  <p className="text-muted-foreground text-xs">carlos@empresa.com</p>
                </div>
                <div><Badge variant="secondary">Admin Tenant</Badge></div>
                <div className="text-right"><Badge variant="outline">Ativo</Badge></div>
              </div>
              <div className="grid grid-cols-4 p-4 items-center text-sm">
                <div className="col-span-2">
                  <p className="font-medium">Maria Analista</p>
                  <p className="text-muted-foreground text-xs">maria@empresa.com</p>
                </div>
                <div><Badge variant="secondary">Visualizador</Badge></div>
                <div className="text-right"><Badge variant="outline">Ativo</Badge></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
