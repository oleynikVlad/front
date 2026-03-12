import type { Post, PaginatedResponse, SearchFilters, SortOption, PaginationParams } from '@/types';
import apiClient from '../client';

export const searchApi = {
  async search(
    params: PaginationParams & { sort?: SortOption; filters?: SearchFilters }
  ): Promise<PaginatedResponse<Post>> {
    const { data } = await apiClient.get<PaginatedResponse<Post>>('/search', {
      params: {
        ...params.filters,
        sort: params.sort,
        page: params.page,
        limit: params.limit,
      },
    });
    return data;
  },
};
