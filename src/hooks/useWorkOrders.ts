import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import type { WorkOrder } from '../types/work_order';

interface UseWorkOrdersParams {
  skip?: number;
  limit?: number;
  source?: string;
  status?: string;
  asset_id?: string;
}

export function useWorkOrders(params?: UseWorkOrdersParams) {
  return useQuery<{ data: WorkOrder[], total: number }>({
    queryKey: ['work_orders', params],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/v1/work_orders/', { params });
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

export function useWorkOrderDetail(id: string | undefined) {
  return useQuery<WorkOrder>({
    queryKey: ['work_orders', 'detail', id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/api/v1/work_orders/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
