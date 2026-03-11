'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Badge, XPEvent, UserAction } from '@/types';
import { config } from '@/config';
import { BADGE_DEFINITIONS } from '@/config';
import { getLevelFromXp } from '@/utils/helpers';

interface GamificationState {
  xp: number;
  level: number;
  badges: Badge[];
  streak: number;
  lastVisit: string | null;
  articlesRead: number;
  likesGiven: number;
  postsCreated: number;
  xpHistory: XPEvent[];
  trackedActions: UserAction[];
  hasSeenOnboarding: boolean;
  addXp: (type: XPEvent['type'], entityId?: string) => XPEvent | null;
  hasAction: (actionType: XPEvent['type'], entityId: string) => boolean;
  checkDailyVisit: () => XPEvent | null;
  checkBadges: () => Badge | null;
  setOnboardingSeen: () => void;
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      badges: [],
      streak: 0,
      lastVisit: null,
      articlesRead: 0,
      likesGiven: 0,
      postsCreated: 0,
      xpHistory: [],
      trackedActions: [],
      hasSeenOnboarding: false,

      hasAction: (actionType, entityId) => {
        const state = get();
        return state.trackedActions.some(
          (a) => a.actionType === actionType && a.entityId === entityId
        );
      },

      addXp: (type, entityId?) => {
        const state = get();

        // Deduplication: if entityId is provided, check if action already tracked
        if (entityId && state.trackedActions.some(
          (a) => a.actionType === type && a.entityId === entityId
        )) {
          return null;
        }

        let xpAmount = 0;
        let description = '';

        switch (type) {
          case 'read_post':
            xpAmount = config.xpConfig.readPost;
            description = 'xp.readPost';
            set({ articlesRead: state.articlesRead + 1 });
            break;
          case 'like_post':
            xpAmount = config.xpConfig.likePost;
            description = 'xp.likePost';
            set({ likesGiven: state.likesGiven + 1 });
            break;
          case 'like_idea':
            xpAmount = config.xpConfig.likeIdea;
            description = 'xp.likeIdea';
            set({ likesGiven: state.likesGiven + 1 });
            break;
          case 'daily_visit':
            xpAmount = config.xpConfig.dailyVisit;
            description = 'xp.dailyVisit';
            break;
        }

        if (xpAmount === 0) return null;

        const newXp = state.xp + xpAmount;
        const newLevel = getLevelFromXp(newXp);
        const event: XPEvent = { type, xp: xpAmount, description };

        // Track the action for deduplication
        const newTrackedActions = entityId
          ? [...state.trackedActions, { actionType: type, entityId, createdAt: new Date().toISOString() }]
          : state.trackedActions;

        set({
          xp: newXp,
          level: newLevel,
          xpHistory: [event, ...state.xpHistory].slice(0, 50),
          trackedActions: newTrackedActions,
        });

        return event;
      },

      checkDailyVisit: () => {
        const state = get();
        const now = new Date();
        const today = now.toISOString().split('T')[0];

        if (state.lastVisit) {
          const lastDate = new Date(state.lastVisit);
          const lastDay = lastDate.toISOString().split('T')[0];

          if (lastDay === today) return null;

          const diffDays = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            set({ streak: state.streak + 1, lastVisit: now.toISOString() });
          } else {
            set({ streak: 1, lastVisit: now.toISOString() });
          }
        } else {
          set({ streak: 1, lastVisit: now.toISOString() });
        }

        return get().addXp('daily_visit', `daily-${today}`);
      },

      checkBadges: () => {
        const state = get();
        const earnedIds = state.badges.map((b) => b.id);
        let newBadge: Badge | null = null;

        const checks: { id: string; condition: boolean }[] = [
          { id: 'first-read', condition: state.articlesRead >= 1 },
          { id: '5-articles', condition: state.articlesRead >= 5 },
          { id: '10-likes', condition: state.likesGiven >= 10 },
          { id: 'streak-3', condition: state.streak >= 3 },
          { id: 'streak-7', condition: state.streak >= 7 },
          { id: 'first-post', condition: state.postsCreated >= 1 },
        ];

        for (const check of checks) {
          if (check.condition && !earnedIds.includes(check.id)) {
            const def = BADGE_DEFINITIONS.find((b) => b.id === check.id);
            if (def) {
              newBadge = { ...def, earnedAt: new Date().toISOString() };
              set({ badges: [...state.badges, newBadge] });
              break;
            }
          }
        }

        return newBadge;
      },

      setOnboardingSeen: () => set({ hasSeenOnboarding: true }),
    }),
    {
      name: 'gamification-storage',
    }
  )
);
