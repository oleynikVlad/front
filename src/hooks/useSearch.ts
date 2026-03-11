'use client';

import { useQuery } from '@tanstack/react-query';
import { searchApi } from '@/services/api/searchApi';
import type { SearchFilters, SortOption, PaginationParams } from '@/types';

export function useSearch(params: PaginationParams & { sort?: SortOption; filters?: SearchFilters }) {
  return useQuery({
    queryKey: ['search', params],
    queryFn: () => searchApi.search(params),
    enabled: !!(params.filters?.query || params.filters?.category),
  });
}
