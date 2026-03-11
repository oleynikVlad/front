'use client';

import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/services/api/authApi';
import type { LoginCredentials } from '@/types';
import toast from 'react-hot-toast';

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.tokens);
      toast.success('Welcome back!');
    },
    onError: () => {
      toast.error('Invalid credentials. Try demo / demo123');
    },
  });
}

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      logout();
      toast.success('Logged out successfully');
    },
  });
}
