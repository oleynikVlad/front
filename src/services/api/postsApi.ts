import type { Post, PostCreate, PaginatedResponse, SearchFilters, SortOption, PaginationParams } from '@/types';
import apiClient from '../client';

export const postsApi = {
  async getPosts(
    params: PaginationParams & { sort?: SortOption; filters?: SearchFilters }
  ): Promise<PaginatedResponse<Post>> {
    const { data } = await apiClient.get<PaginatedResponse<Post>>('/posts', { params });
    return data;
  },

  async getTrendingPosts(): Promise<Post[]> {
    const { data } = await apiClient.get<Post[]>('/posts/trending');
    return data;
  },

  async getLatestPosts(): Promise<Post[]> {
    const { data } = await apiClient.get<Post[]>('/posts/latest');
    return data;
  },

  async getRecommendedPosts(): Promise<Post[]> {
    const { data } = await apiClient.get<Post[]>('/posts/recommended');
    return data;
  },

  async getPostBySlug(slug: string): Promise<Post | null> {
    const { data } = await apiClient.get<Post>(`/posts/${slug}`);
    return data;
  },

  async getRelatedPosts(postId: string): Promise<Post[]> {
    const { data } = await apiClient.get<Post[]>(`/posts/${postId}/related`);
    return data;
  },

  async likePost(postId: string): Promise<{ likes: number; liked: boolean }> {
    const { data } = await apiClient.post<{ likes: number; liked: boolean }>(`/posts/${postId}/like`);
    return data;
  },

  async viewPost(postId: string): Promise<{ views: number }> {
    const { data } = await apiClient.post<{ views: number }>(`/posts/${postId}/view`);
    return data;
  },

  async createPost(postData: PostCreate): Promise<Post> {
    const { data } = await apiClient.post<Post>('/posts', postData);
    return data;
  },
};
