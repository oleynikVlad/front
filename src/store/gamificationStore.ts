'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Badge } from '@/types';

interface GamificationState {
  xp: number;
  level: number;
  badges: Badge[];
  streak: number;
  lastVisit: string | null;
  hasSeenOnboarding: boolean;
  setGamificationData: (data: {
    xp?: number;
    level?: number;
    badges?: Badge[];
    streak?: number;
    lastVisit?: string;
  }) => void;
  setOnboardingSeen: () => void;
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set) => ({
      xp: 0,
      level: 1,
      badges: [],
      streak: 0,
      lastVisit: null,
      hasSeenOnboarding: false,

      setGamificationData: (data) => set((state) => ({ ...state, ...data })),
      setOnboardingSeen: () => set({ hasSeenOnboarding: true }),
    }),
    {
      name: 'gamification-storage',
    }
  )
);
