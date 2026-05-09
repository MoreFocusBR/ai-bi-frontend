import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="animate-pulse text-brand-500">Autenticando...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) return null;
  return <>{children}</>;
}
