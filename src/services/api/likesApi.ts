import type { Post, PaginatedResponse, PaginationParams } from '@/types';
import apiClient from '../client';

export const likesApi = {
  async getLikedPosts(params: PaginationParams): Promise<PaginatedResponse<Post>> {
    const { data } = await apiClient.get<PaginatedResponse<Post>>('/likes', { params });
    return data;
  },
};
