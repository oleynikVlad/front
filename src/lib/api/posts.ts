import type { Post, PaginatedResponse, SearchFilters, SortOption, PaginationParams } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function getPosts(
  params: PaginationParams & { sort?: SortOption; filters?: SearchFilters } = {}
): Promise<PaginatedResponse<Post>> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set('page', String(params.page));
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.sort) searchParams.set('sort', params.sort);
  if (params.filters?.category) searchParams.set('filters[category]', params.filters.category);
  if (params.filters?.query) searchParams.set('filters[query]', params.filters.query);

  const res = await fetch(`${API_URL}/posts?${searchParams.toString()}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
}

export async function getTrendingPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts/trending`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch trending posts');
  }

  return res.json();
}

export async function getLatestPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts/latest`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch latest posts');
  }

  return res.json();
}

export async function getRecommendedPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts/recommended`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch recommended posts');
  }

  return res.json();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const res = await fetch(`${API_URL}/posts/${slug}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }

  return res.json();
}

export async function getRelatedPosts(postId: string): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts/${postId}/related`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch related posts');
  }

  return res.json();
}
