import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../../components/ui/button';
import { ArrowRight, Bot } from 'lucide-react';

export function LoginPage() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  if (isAuthenticated) {
    window.location.replace('/dashboard');
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border bg-card p-10 shadow-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-900/50 dark:text-brand-400">
          <Bot className="h-8 w-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI BI Portal</h2>
          <p className="mt-2 text-muted-foreground">Plataforma Agêntica Operacional</p>
        </div>
        <Button 
          size="lg" 
          className="w-full text-base font-semibold" 
          onClick={() => loginWithRedirect()}
        >
          Entrar com SSO
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
