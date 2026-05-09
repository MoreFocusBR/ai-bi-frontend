import { create } from 'zustand';

interface User {
  name?: string;
  email?: string;
  picture?: string;
}

interface AuthState {
  user: User | null;
  tenantId: string | null;
  roles: string[];
  setUser: (user: User | null) => void;
  setTenantId: (id: string | null) => void;
  setRoles: (roles: string[]) => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  tenantId: null,
  roles: [],
  setUser: (user) => set({ user }),
  setTenantId: (tenantId) => set({ tenantId }),
  setRoles: (roles) => set({ roles }),
  isAdmin: () => get().roles.includes('admin_tenant') || get().roles.includes('superadmin'),
}));
