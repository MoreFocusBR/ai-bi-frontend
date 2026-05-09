import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import type { Asset } from '../types/asset';

interface UseAssetsParams {
  skip?: number;
  limit?: number;
  source?: string;
  status?: string;
}

export function useAssets(params?: UseAssetsParams) {
  return useQuery<{ data: Asset[], total: number }>({
    queryKey: ['assets', params],
    queryFn: async () => {
      // Usamos a apiClient que já tem o interceptor do JWT
      const { data } = await apiClient.get('/api/v1/assets/', { params });
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

export function useAssetDetail(id: string | undefined) {
  return useQuery<Asset>({
    queryKey: ['assets', 'detail', id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/api/v1/assets/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
