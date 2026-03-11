'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '@/services/api/postsApi';
import type { SearchFilters, SortOption, PaginationParams, PostCreate } from '@/types';
import { useGamificationStore } from '@/store/gamificationStore';
import { useUIStore } from '@/store/uiStore';
import toast from 'react-hot-toast';

export function useTrendingPosts() {
  return useQuery({
    queryKey: ['posts', 'trending'],
    queryFn: () => postsApi.getTrendingPosts(),
  });
}

export function useLatestPosts() {
  return useQuery({
    queryKey: ['posts', 'latest'],
    queryFn: () => postsApi.getLatestPosts(),
  });
}

export function useRecommendedPosts() {
  return useQuery({
    queryKey: ['posts', 'recommended'],
    queryFn: () => postsApi.getRecommendedPosts(),
  });
}

export function usePosts(params: PaginationParams & { sort?: SortOption; filters?: SearchFilters }) {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => postsApi.getPosts(params),
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => postsApi.getPostBySlug(slug),
    enabled: !!slug,
  });
}

export function useRelatedPosts(postId: string) {
  return useQuery({
    queryKey: ['posts', 'related', postId],
    queryFn: () => postsApi.getRelatedPosts(postId),
    enabled: !!postId,
  });
}

export function useLikePost() {
  const queryClient = useQueryClient();
  const addXp = useGamificationStore((s) => s.addXp);
  const checkBadges = useGamificationStore((s) => s.checkBadges);
  const setXpToast = useUIStore((s) => s.setXpToast);
  const setBadgeToast = useUIStore((s) => s.setBadgeToast);

  return useMutation({
    mutationFn: (postId: string) => postsApi.likePost(postId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
      if (data.liked) {
        const event = addXp('like_post');
        if (event) setXpToast({ xp: event.xp, description: event.description });
        const badge = checkBadges();
        if (badge) setBadgeToast({ name: badge.name, icon: badge.icon });
      }
    },
  });
}

export function useViewPost() {
  const addXp = useGamificationStore((s) => s.addXp);
  const checkBadges = useGamificationStore((s) => s.checkBadges);
  const setXpToast = useUIStore((s) => s.setXpToast);
  const setBadgeToast = useUIStore((s) => s.setBadgeToast);

  return useMutation({
    mutationFn: (postId: string) => postsApi.viewPost(postId),
    onSuccess: () => {
      const event = addXp('read_post');
      if (event) setXpToast({ xp: event.xp, description: event.description });
      const badge = checkBadges();
      if (badge) setBadgeToast({ name: badge.name, icon: badge.icon });
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostCreate) => postsApi.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post published successfully!');
    },
    onError: () => {
      toast.error('Failed to publish post');
    },
  });
}
