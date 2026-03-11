'use client';

import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/services/api/authApi';
import {LoginCredentials, NestErrorResponse, RegisterCredentials} from '@/types';
import toast from 'react-hot-toast';

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.tokens);
      toast.success('Welcome back!');
    },
    onError: (error:NestErrorResponse) => {
      if (Array.isArray(error.message)) {
        error.message.forEach((item) => {
          toast.error(item);
        });
      } else {
        toast.error(error.message);
      }
    },
  });
}

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => authApi.register(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.tokens);
      toast.success('Welcome!');
    },
    onError: (error:NestErrorResponse) => {
      if (Array.isArray(error.message)) {
        error.message.forEach((item) => {
          toast.error(item);
        });
      } else {
        toast.error(error.message);
      }
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
