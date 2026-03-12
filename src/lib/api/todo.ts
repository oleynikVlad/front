import type { TodoIdea, PaginatedResponse, PaginationParams, SortOption, Category } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function getTodoIdeas(
  params: PaginationParams & { sort?: SortOption; category?: Category } = {}
): Promise<PaginatedResponse<TodoIdea>> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set('page', String(params.page));
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.sort) searchParams.set('sort', params.sort);
  if (params.category) searchParams.set('category', params.category);

  const res = await fetch(`${API_URL}/todo?${searchParams.toString()}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch todo ideas');
  }

  return res.json();
}
