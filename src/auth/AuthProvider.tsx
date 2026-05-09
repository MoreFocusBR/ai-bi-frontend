import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { apiClient } from '../api/client';
import { useAuthStore } from '../store/useAuthStore';

function AxiosInterceptor({ children }: { children: React.ReactNode }) {
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    if (isAuthenticated && user) {
      setUser({ name: user.name, email: user.email, picture: user.picture });
      // Here we could also decode the token or call an API to get user roles and setTenantId
    } else {
      setUser(null);
    }

    const interceptorId = apiClient.interceptors.request.use(async (config) => {
      try {
        const token = await getAccessTokenSilently();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error("Error getting token", error);
      }
      return config;
    });

    return () => {
      apiClient.interceptors.request.eject(interceptorId);
    };
  }, [getAccessTokenSilently, isAuthenticated, user, setUser]);

  return <>{children}</>;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN || 'your-tenant.auth0.com';
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || 'your-auth0-client-id';
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE || 'https://api.agentic-bi.com';

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
      }}
    >
      <AxiosInterceptor>{children}</AxiosInterceptor>
    </Auth0Provider>
  );
}
