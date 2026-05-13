import React from 'react';
import { useAuthStore } from '../store/useAuthStore';

export function RequireRole({ children, role }: { children: React.ReactNode; role: string }) {
  const roles = useAuthStore(state => state.roles);
  const isAdmin = useAuthStore(state => state.isAdmin());
  
  // Superadmin usually bypasses everything
  if (!roles.includes(role) && !isAdmin) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-red-500">
        Acesso negado. Você não tem a permissão necessária ({role}).
      </div>
    );
  }
  
  return <>{children}</>;
}
