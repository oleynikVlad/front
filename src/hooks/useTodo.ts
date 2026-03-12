'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '@/services/api/todoApi';
import type { PaginationParams, SortOption, Category } from '@/types';

export function useTodoIdeas(params: PaginationParams & { sort?: SortOption; category?: Category }) {
  return useQuery({
    queryKey: ['todo', params],
    queryFn: () => todoApi.getTodoIdeas(params),
  });
}

export function useLikeTodoIdea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ideaId: string) => todoApi.likeTodoIdea(ideaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] });
    },
  });
}
