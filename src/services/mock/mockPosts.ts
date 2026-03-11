import type { Post, PostCreate, PaginatedResponse, SearchFilters, SortOption, PaginationParams } from '@/types';
import { mockPosts } from './mockData';
import { simulateDelay, slugify } from '@/utils/helpers';

let posts = [...mockPosts];

function applyFilters(items: Post[], filters: SearchFilters): Post[] {
  let result = [...items];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.preview.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
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
  if (filters.dateFrom) {
    result = result.filter((p) => new Date(p.publishedAt) >= new Date(filters.dateFrom!));
  }
  if (filters.dateTo) {
    result = result.filter((p) => new Date(p.publishedAt) <= new Date(filters.dateTo!));
  }

  return result;
}

function applySort(items: Post[], sort: SortOption): Post[] {
  const sorted = [...items];
  switch (sort) {
    case 'recent':
      return sorted.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    case 'popular':
      return sorted.sort((a, b) => b.views - a.views);
    case 'liked':
      return sorted.sort((a, b) => b.likes - a.likes);
    default:
      return sorted;
  }
}

function paginate<T>(items: T[], params: PaginationParams): PaginatedResponse<T> {
  const page = params.page || 1;
  const limit = params.limit || 12;
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    data: items.slice(start, end),
    total: items.length,
    page,
    limit,
    totalPages: Math.ceil(items.length / limit),
  };
}

export async function mockGetPosts(
  params: PaginationParams & { sort?: SortOption; filters?: SearchFilters }
): Promise<PaginatedResponse<Post>> {
  await simulateDelay();
  let result = applyFilters(posts, params.filters || {});
  result = applySort(result, params.sort || 'recent');
  return paginate(result, params);
}

export async function mockGetTrendingPosts(): Promise<Post[]> {
  await simulateDelay();
  return [...posts].sort((a, b) => b.views - a.views).slice(0, 6);
}

export async function mockGetLatestPosts(): Promise<Post[]> {
  await simulateDelay();
  return [...posts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 6);
}

export async function mockGetRecommendedPosts(): Promise<Post[]> {
  await simulateDelay();
  return [...posts].sort((a, b) => b.likes - a.likes).slice(0, 6);
}

export async function mockGetPostBySlug(slug: string): Promise<Post | null> {
  await simulateDelay();
  return posts.find((p) => p.slug === slug) || null;
}

export async function mockGetRelatedPosts(postId: string): Promise<Post[]> {
  await simulateDelay();
  const post = posts.find((p) => p.id === postId);
  if (!post) return [];
  return posts
    .filter((p) => p.id !== postId && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 3);
}

export async function mockLikePost(postId: string): Promise<{ likes: number; liked: boolean }> {
  await simulateDelay(100, 300);
  const post = posts.find((p) => p.id === postId);
  if (!post) throw { message: 'Post not found', statusCode: 404 };
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  return { likes: post.likes, liked: post.liked };
}

export async function mockViewPost(postId: string): Promise<{ views: number }> {
  await simulateDelay(100, 200);
  const post = posts.find((p) => p.id === postId);
  if (!post) throw { message: 'Post not found', statusCode: 404 };
  post.views += 1;
  return { views: post.views };
}

export async function mockCreatePost(data: PostCreate): Promise<Post> {
  await simulateDelay(500, 1000);
  const newPost: Post = {
    id: `post-${posts.length + 1}`,
    slug: slugify(data.title),
    title: data.title,
    preview: data.preview,
    content: data.content,
    coverImage: data.coverImage || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    author: {
      id: '1',
      username: 'alexchen',
      displayName: 'Alex Chen',
      avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alex',
    },
    category: data.category as Post['category'],
    tags: data.tags,
    readingTime: Math.max(1, Math.ceil(data.content.split(/\s+/).length / 200)),
    likes: 0,
    views: 0,
    liked: false,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  posts = [newPost, ...posts];
  return newPost;
}
