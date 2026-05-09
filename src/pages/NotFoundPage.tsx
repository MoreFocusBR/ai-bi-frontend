import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-8xl font-bold text-muted">404</h1>
      <h2 className="text-2xl font-semibold tracking-tight">Página não encontrada</h2>
      <p className="text-muted-foreground max-w-md">
        A página que você está tentando acessar não existe ou você não tem permissão para vê-la.
      </p>
      <Link to="/">
        <Button>Voltar para o Dashboard</Button>
      </Link>
    </div>
  );
}
