'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '@/services/api/todoApi';
import type { PaginationParams, SortOption, Category } from '@/types';
import { useGamificationStore } from '@/store/gamificationStore';
import { useUIStore } from '@/store/uiStore';

export function useTodoIdeas(params: PaginationParams & { sort?: SortOption; category?: Category }) {
  return useQuery({
    queryKey: ['todo', params],
    queryFn: () => todoApi.getTodoIdeas(params),
  });
}

export function useLikeTodoIdea() {
  const queryClient = useQueryClient();
  const addXp = useGamificationStore((s) => s.addXp);
  const checkBadges = useGamificationStore((s) => s.checkBadges);
  const setXpToast = useUIStore((s) => s.setXpToast);
  const setBadgeToast = useUIStore((s) => s.setBadgeToast);

  return useMutation({
    mutationFn: (ideaId: string) => todoApi.likeTodoIdea(ideaId),
    onSuccess: (data, ideaId) => {
      queryClient.invalidateQueries({ queryKey: ['todo'] });
      if (data.liked) {
        const event = addXp('like_idea', ideaId);
        if (event) setXpToast({ xp: event.xp, description: event.description });
        const badge = checkBadges();
        if (badge) setBadgeToast({ name: badge.name, icon: badge.icon });
      }
    },
  });
}
