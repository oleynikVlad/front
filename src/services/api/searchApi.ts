import type { Post, PaginatedResponse, SearchFilters, SortOption, PaginationParams } from '@/types';
import { config } from '@/config';
import { mockSearch } from '../mock/mockSearch';
import apiClient from '../client';

export const searchApi = {
  async search(
    params: PaginationParams & { sort?: SortOption; filters?: SearchFilters }
  ): Promise<PaginatedResponse<Post>> {
    if (config.apiMode === 'mock') {
      return mockSearch(params);
    }
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
