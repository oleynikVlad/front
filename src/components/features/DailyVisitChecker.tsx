'use client';

import { useEffect } from 'react';
import { useGamificationStore } from '@/store/gamificationStore';
import { useUIStore } from '@/store/uiStore';

export default function DailyVisitChecker() {
  const checkDailyVisit = useGamificationStore((s) => s.checkDailyVisit);
  const checkBadges = useGamificationStore((s) => s.checkBadges);
  const setXpToast = useUIStore((s) => s.setXpToast);
  const setBadgeToast = useUIStore((s) => s.setBadgeToast);

  useEffect(() => {
    const event = checkDailyVisit();
    if (event) {
      setTimeout(() => {
        setXpToast({ xp: event.xp, description: event.description });
      }, 2000);
    }
    const badge = checkBadges();
    if (badge) {
      setTimeout(() => {
        setBadgeToast({ name: badge.name, icon: badge.icon });
      }, 3500);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
