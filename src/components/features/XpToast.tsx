'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Award } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useUIStore } from '@/store/uiStore';

export default function XpToast() {
  const t = useTranslations();
  const { showXpToast, showBadgeToast, setXpToast, setBadgeToast } = useUIStore();

  useEffect(() => {
    if (showXpToast) {
      const timer = setTimeout(() => setXpToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [showXpToast, setXpToast]);

  useEffect(() => {
    if (showBadgeToast) {
      const timer = setTimeout(() => setBadgeToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [showBadgeToast, setBadgeToast]);

  return (
    <div className="fixed top-20 right-4 z-[90] flex flex-col gap-2">
      <AnimatePresence>
        {showXpToast && (
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.8 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-sky-50/90 border border-sky-200/40 dark:bg-sky-950/90 dark:border-sky-800/40 rounded-xl shadow-lg backdrop-blur-md"
          >
            <Zap className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span className="text-sm font-medium text-sky-700 dark:text-sky-200">+{showXpToast.xp} XP</span>
            <span className="text-xs text-sky-500/60 dark:text-sky-400/60">{t(showXpToast.description)}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBadgeToast && (
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.8 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-950/90 border border-amber-800/40 rounded-xl shadow-lg backdrop-blur-md"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-200">{t('xp.badgeEarned', { name: showBadgeToast.name })}</span>
            <span className="text-lg">{showBadgeToast.icon}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
