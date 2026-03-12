'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '@/services/api/postsApi';
import type { SearchFilters, SortOption, PaginationParams, PostCreate } from '@/types';
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

  return useMutation({
    mutationFn: (postId: string) => postsApi.likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
}

export function useViewPost() {
  return useMutation({
    mutationFn: (postId: string) => postsApi.viewPost(postId),
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
