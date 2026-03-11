'use client';

import { create } from 'zustand';
import type { Notification } from '@/types';
import { mockNotifications } from '@/services/mock/mockData';

interface UIState {
  isMobileMenuOpen: boolean;
  notifications: Notification[];
  showXpToast: { xp: number; description: string } | null;
  showBadgeToast: { name: string; icon: string } | null;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  markNotificationRead: (id: string) => void;
  setXpToast: (toast: { xp: number; description: string } | null) => void;
  setBadgeToast: (toast: { name: string; icon: string } | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  notifications: mockNotifications,
  showXpToast: null,
  showBadgeToast: null,
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  markNotificationRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  setXpToast: (toast) => set({ showXpToast: toast }),
  setBadgeToast: (toast) => set({ showBadgeToast: toast }),
}));
