'use client';

import { useEffect } from 'react';
import { recordActivity } from '@/lib/api/activity';

/**
 * DailyVisitChecker records a daily_visit activity via the backend API.
 * The backend handles XP calculation, streak tracking, and badge awarding.
 */
export default function DailyVisitChecker() {
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastVisit = localStorage.getItem('lastDailyVisit');

    if (lastVisit === today) return;

    const token = localStorage.getItem('accessToken');
    if (!token) return;

    recordActivity('daily_visit', `daily-${today}`, token)
      .then(() => {
        localStorage.setItem('lastDailyVisit', today);
      })
      .catch(() => {
        // Silently fail — backend may not be available yet
      });
  }, []);

  return null;
}
