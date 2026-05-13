import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  
  useEffect(() => {
    // If not authenticated, we don't automatically redirect to Auth0 here.
    // The <Navigate to="/login" /> below will handle it.
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="animate-pulse text-brand-500">Autenticando...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
