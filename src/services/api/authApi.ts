import type { AuthResponse, LoginCredentials, RegisterCredentials, User } from '@/types';
import apiClient from '../client';

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return data;
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', credentials);
    return data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async getProfile(): Promise<User> {
    const { data } = await apiClient.get<User>('/auth/profile');
    return data;
  },
};
