'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200/50 dark:border-gray-800/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">DevBlog</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{t('platform')}</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{t('blog')}</Link></li>
              <li><Link href="/search" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{t('search')}</Link></li>
              <li><Link href="/todo" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{t('ideas')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{t('categories')}</h3>
            <ul className="space-y-2">
              <li><Link href="/search?category=programming" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{t('category.programming')}</Link></li>
              <li><Link href="/search?category=design" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{t('category.design')}</Link></li>
              <li><Link href="/search?category=ai" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{t('category.ai')}</Link></li>
              <li><Link href="/search?category=devops" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{t('category.devops')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{t('more')}</h3>
            <ul className="space-y-2">
              <li><Link href="/login" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{t('signIn')}</Link></li>
              <li><Link href="/blog/new" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{t('writePost')}</Link></li>
              <li><Link href="/profile" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{t('profile')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200/50 dark:border-gray-800/50 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} DevBlog. {t('rights')}</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600">{t('builtWith')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
