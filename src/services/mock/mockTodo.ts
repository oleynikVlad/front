import type { TodoIdea, PaginatedResponse, PaginationParams, SortOption, Category } from '@/types';
import { mockTodoIdeas } from './mockData';
import { simulateDelay } from '@/utils/helpers';

let ideas = [...mockTodoIdeas];

export async function mockGetTodoIdeas(
  params: PaginationParams & { sort?: SortOption; category?: Category }
): Promise<PaginatedResponse<TodoIdea>> {
  await simulateDelay();

  let result = [...ideas];

  if (params.category) {
    result = result.filter((i) => i.category === params.category);
  }

  const sort = params.sort || 'recent';
  switch (sort) {
    case 'recent':
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'popular':
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

export async function mockLikeTodoIdea(ideaId: string): Promise<{ likes: number; liked: boolean }> {
  await simulateDelay(100, 300);
  const idea = ideas.find((i) => i.id === ideaId);
  if (!idea) throw { message: 'Idea not found', statusCode: 404 };
  idea.liked = !idea.liked;
  idea.likes += idea.liked ? 1 : -1;
  return { likes: idea.likes, liked: idea.liked };
}
