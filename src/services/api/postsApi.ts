import type { Post, PostCreate, PaginatedResponse, SearchFilters, SortOption, PaginationParams } from '@/types';
import { config } from '@/config';
import {
  mockGetPosts,
  mockGetTrendingPosts,
  mockGetLatestPosts,
  mockGetRecommendedPosts,
  mockGetPostBySlug,
  mockGetRelatedPosts,
  mockLikePost,
  mockViewPost,
  mockCreatePost,
} from '../mock/mockPosts';
import apiClient from '../client';

export const postsApi = {
  async getPosts(
    params: PaginationParams & { sort?: SortOption; filters?: SearchFilters }
  ): Promise<PaginatedResponse<Post>> {
    if (config.apiMode === 'mock') {
      return mockGetPosts(params);
    }
    const { data } = await apiClient.get<PaginatedResponse<Post>>('/posts', { params });
    return data;
  },

  async getTrendingPosts(): Promise<Post[]> {
    if (config.apiMode === 'mock') {
      return mockGetTrendingPosts();
    }
    const { data } = await apiClient.get<Post[]>('/posts/trending');
    return data;
  },

  async getLatestPosts(): Promise<Post[]> {
    if (config.apiMode === 'mock') {
      return mockGetLatestPosts();
    }
    const { data } = await apiClient.get<Post[]>('/posts/latest');
    return data;
  },

  async getRecommendedPosts(): Promise<Post[]> {
    if (config.apiMode === 'mock') {
      return mockGetRecommendedPosts();
    }
    const { data } = await apiClient.get<Post[]>('/posts/recommended');
    return data;
  },

  async getPostBySlug(slug: string): Promise<Post | null> {
    if (config.apiMode === 'mock') {
      return mockGetPostBySlug(slug);
    }
    const { data } = await apiClient.get<Post>(`/posts/${slug}`);
    return data;
  },

  async getRelatedPosts(postId: string): Promise<Post[]> {
    if (config.apiMode === 'mock') {
      return mockGetRelatedPosts(postId);
    }
    const { data } = await apiClient.get<Post[]>(`/posts/${postId}/related`);
    return data;
  },

  async likePost(postId: string): Promise<{ likes: number; liked: boolean }> {
    if (config.apiMode === 'mock') {
      return mockLikePost(postId);
    }
    const { data } = await apiClient.post<{ likes: number; liked: boolean }>(`/posts/${postId}/like`);
    return data;
  },

  async viewPost(postId: string): Promise<{ views: number }> {
    if (config.apiMode === 'mock') {
      return mockViewPost(postId);
    }
    const { data } = await apiClient.post<{ views: number }>(`/posts/${postId}/view`);
    return data;
  },

  async createPost(postData: PostCreate): Promise<Post> {
    if (config.apiMode === 'mock') {
      return mockCreatePost(postData);
    }
    const { data } = await apiClient.post<Post>('/posts', postData);
    return data;
  },
};
