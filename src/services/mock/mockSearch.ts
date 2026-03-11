import type { Post, PaginatedResponse, SearchFilters, SortOption, PaginationParams } from '@/types';
import { mockPosts } from './mockData';
import { simulateDelay } from '@/utils/helpers';

export async function mockSearch(
  params: PaginationParams & { sort?: SortOption; filters?: SearchFilters }
): Promise<PaginatedResponse<Post>> {
  await simulateDelay(300, 700);

  let result = [...mockPosts];
  const filters = params.filters || {};

  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.preview.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.author.displayName.toLowerCase().includes(q)
    );
  }
  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }
  if (filters.readingTimeMin) {
    result = result.filter((p) => p.readingTime >= (filters.readingTimeMin ?? 0));
  }
  if (filters.readingTimeMax) {
    result = result.filter((p) => p.readingTime <= (filters.readingTimeMax ?? Infinity));
  }
  if (filters.minLikes) {
    result = result.filter((p) => p.likes >= (filters.minLikes ?? 0));
  }
  if (filters.author) {
    result = result.filter((p) => p.author.username === filters.author);
  }

  const sort = params.sort || 'recent';
  switch (sort) {
    case 'recent':
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      break;
    case 'popular':
      result.sort((a, b) => b.views - a.views);
      break;
    case 'liked':
      result.sort((a, b) => b.likes - a.likes);
      break;
  }

  const page = params.page || 1;
  const limit = params.limit || 12;
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: result.slice(start, end),
    total: result.length,
    page,
    limit,
    totalPages: Math.ceil(result.length / limit),
  };
}
