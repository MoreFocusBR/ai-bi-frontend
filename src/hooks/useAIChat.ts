import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import type { ChatResponse } from '../types/ai';

export function useAIChat() {
  return useMutation<ChatResponse, Error, { message: string; session_id?: string }>({
    mutationFn: async ({ message, session_id }) => {
      const { data } = await apiClient.post('/api/v1/ai/chat/', {
        message,
        session_id,
      });
      return data;
    },
  });
}
