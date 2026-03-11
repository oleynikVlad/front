'use client';

import { Link } from '@/i18n/navigation';
import { Home } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-700 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-white mb-2">{t('title')}</h2>
        <p className="text-gray-400 mb-8">{t('description')}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          <Home className="w-4 h-4" />
          {t('goHome')}
        </Link>
      </div>
    </div>
  );
}
