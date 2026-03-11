import type { Post, PaginatedResponse, PaginationParams } from '@/types';
import { config } from '@/config';
import { simulateDelay } from '@/utils/helpers';
import { mockPosts } from '../mock/mockData';
import apiClient from '../client';

export const likesApi = {
  async getLikedPosts(params: PaginationParams): Promise<PaginatedResponse<Post>> {
    if (config.apiMode === 'mock') {
      await simulateDelay();
      const liked = mockPosts.filter((p) => p.liked);
      const page = params.page || 1;
      const limit = params.limit || 12;
      const start = (page - 1) * limit;
      return {
        data: liked.slice(start, start + limit),
        total: liked.length,
        page,
        limit,
        totalPages: Math.ceil(liked.length / limit),
      };
    }
    const { data } = await apiClient.get<PaginatedResponse<Post>>('/likes', { params });
    return data;
  },
};
