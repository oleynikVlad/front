import type {AuthResponse, LoginCredentials, RegisterCredentials, User} from '@/types';
import { config } from '@/config';
import { mockLogin, mockLogout, mockGetProfile } from '../mock/mockAuth';
import apiClient from '../client';

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (config.apiMode === 'mock') {
      return mockLogin(credentials);
    }
    const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return data;
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    if (config.apiMode === 'mock') {
      return mockLogin(credentials);
    }
    const { data } = await apiClient.post<AuthResponse>('/auth/register', credentials);

    return data;
  },

  async logout(): Promise<void> {
    if (config.apiMode === 'mock') {
      return mockLogout();
    }
    await apiClient.post('/auth/logout');
  },

  async getProfile(): Promise<User> {
    if (config.apiMode === 'mock') {
      return mockGetProfile();
    }
    const { data } = await apiClient.get<User>('/auth/profile');
    return data;
  },
};
