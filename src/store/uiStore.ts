'use client';

import { create } from 'zustand';
import type { Notification } from '@/types';

interface UIState {
  isMobileMenuOpen: boolean;
  notifications: Notification[];
  showXpToast: { xp: number; description: string } | null;
  showBadgeToast: { name: string; icon: string } | null;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setNotifications: (notifications: Notification[]) => void;
  markNotificationRead: (id: string) => void;
  setXpToast: (toast: { xp: number; description: string } | null) => void;
  setBadgeToast: (toast: { name: string; icon: string } | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  notifications: [],
  showXpToast: null,
  showBadgeToast: null,
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  setNotifications: (notifications) => set({ notifications }),
  markNotificationRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  setXpToast: (toast) => set({ showXpToast: toast }),
  setBadgeToast: (toast) => set({ showBadgeToast: toast }),
}));
