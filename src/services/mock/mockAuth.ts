import type { AuthResponse, LoginCredentials } from '@/types';
import { MOCK_USER } from './mockData';
import { simulateDelay } from '@/utils/helpers';

export async function mockLogin(credentials: LoginCredentials): Promise<AuthResponse> {
  await simulateDelay(400, 800);

  if (credentials.username === 'demo' && credentials.password === 'demo123') {
    return {
      user: MOCK_USER,
      tokens: {
        accessToken: 'mock-jwt-access-token-' + Date.now(),
        refreshToken: 'mock-jwt-refresh-token-' + Date.now(),
      },
    };
  }

  // Accept any credentials for demo purposes
  if (credentials.username && credentials.password) {
    return {
      user: {
        ...MOCK_USER,
        username: credentials.username,
        displayName: credentials.username.charAt(0).toUpperCase() + credentials.username.slice(1),
      },
      tokens: {
        accessToken: 'mock-jwt-access-token-' + Date.now(),
        refreshToken: 'mock-jwt-refresh-token-' + Date.now(),
      },
    };
  }

  throw { message: 'Invalid credentials', statusCode: 401 };
}

export async function mockLogout(): Promise<void> {
  await simulateDelay(200, 400);
}

export async function mockGetProfile(): Promise<AuthResponse['user']> {
  await simulateDelay(200, 400);
  return MOCK_USER;
}
