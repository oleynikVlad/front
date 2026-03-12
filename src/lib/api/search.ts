import type { Post, PaginatedResponse, SearchFilters, SortOption, PaginationParams } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function search(
  params: PaginationParams & { sort?: SortOption; filters?: SearchFilters }
): Promise<PaginatedResponse<Post>> {
  const searchParams = new URLSearchParams();

  if (params.filters?.query) searchParams.set('query', params.filters.query);
  if (params.sort) searchParams.set('sort', params.sort);
  if (params.page) searchParams.set('page', String(params.page));
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.filters?.category) searchParams.set('category', params.filters.category);
  if (params.filters?.readingTimeMin) searchParams.set('readingTimeMin', String(params.filters.readingTimeMin));
  if (params.filters?.readingTimeMax) searchParams.set('readingTimeMax', String(params.filters.readingTimeMax));
  if (params.filters?.minLikes) searchParams.set('minLikes', String(params.filters.minLikes));
  if (params.filters?.author) searchParams.set('author', params.filters.author);
  if (params.filters?.dateFrom) searchParams.set('dateFrom', params.filters.dateFrom);
  if (params.filters?.dateTo) searchParams.set('dateTo', params.filters.dateTo);

  const res = await fetch(`${API_URL}/search?${searchParams.toString()}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to search posts');
  }

  return res.json();
}
