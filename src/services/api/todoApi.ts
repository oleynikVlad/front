import type { TodoIdea, PaginatedResponse, PaginationParams, SortOption, Category } from '@/types';
import apiClient from '../client';

export const todoApi = {
  async getTodoIdeas(
    params: PaginationParams & { sort?: SortOption; category?: Category }
  ): Promise<PaginatedResponse<TodoIdea>> {
    const { data } = await apiClient.get<PaginatedResponse<TodoIdea>>('/todo', { params });
    return data;
  },

  async likeTodoIdea(ideaId: string): Promise<{ likes: number; liked: boolean }> {
    const { data } = await apiClient.post<{ likes: number; liked: boolean }>(`/todo/${ideaId}/like`);
    return data;
  },
};
