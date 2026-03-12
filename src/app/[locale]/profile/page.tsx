'use client';

import { motion } from 'framer-motion';
import { Zap, Award, Flame, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/authStore';
import { useGamificationStore } from '@/store/gamificationStore';
import Button from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';

export default function ProfilePage() {
  const t = useTranslations('profile');
  const tCommon = useTranslations('common');
  const { user, isAuthenticated } = useAuthStore();
  const { xp, level, badges, streak } = useGamificationStore();

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-3">{t('signInToView')}</h1>
        <p className="text-gray-400 mb-6">{t('signInDescription')}</p>
        <Link href="/login">
          <Button variant="primary">{tCommon('signIn')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{user?.displayName?.charAt(0) || 'U'}</span>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-white">{user?.displayName}</h1>
            <p className="text-gray-400 text-sm">@{user?.username}</p>
            <p className="text-gray-500 text-sm mt-1">{user?.bio}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1.5 text-indigo-400 mb-1">
              <Zap className="w-5 h-5" />
              <span className="text-2xl font-bold">{xp}</span>
              <span className="text-sm text-indigo-500">XP</span>
            </div>
            <p className="text-sm text-gray-400">{t('level', { level })}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: t('dayStreak'), value: streak, icon: <Flame className="w-5 h-5 text-amber-400" /> },
          { label: t('badgesEarned'), value: badges.length, icon: <Award className="w-5 h-5 text-emerald-300" /> },
          { label: t('level', { level }), value: `Lv.${level}`, icon: <Zap className="w-5 h-5 text-indigo-400" /> },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center"
          >
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Badges */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          {t('badges')}
        </h2>
        {badges.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">{t('noActivity')}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="p-4 rounded-xl border text-center bg-indigo-950/30 border-indigo-800/30"
              >
                <div className="text-2xl mb-2">{badge.icon}</div>
                <h3 className="text-sm font-semibold text-gray-200">{badge.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{badge.description}</p>
                <span className="inline-block mt-2 text-[10px] text-indigo-400 font-medium">{t('earned')}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity placeholder */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-400" />
          {t('recentActivity')}
        </h2>
        <p className="text-sm text-gray-500 text-center py-8">{t('noActivity')}</p>
      </div>
    </div>
  );
}
