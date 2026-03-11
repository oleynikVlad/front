'use client';

import { TrendingUp, Clock, Sparkles, ArrowRight, BookOpen, Users, Zap } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { useTrendingPosts, useLatestPosts, useRecommendedPosts } from '@/hooks/usePosts';
import BlogCard from '@/components/features/BlogCard';
import { CardSkeleton } from '@/components/ui/Skeleton';
import Button from '@/components/ui/Button';
import { CATEGORIES } from '@/types';
import type { Post } from '@/types';
import { useTranslations } from 'next-intl';

function PostSection({
  title,
  icon,
  posts,
  isLoading,
  href,
}: {
  title: string;
  icon: React.ReactNode;
  posts: Post[] | undefined;
  isLoading: boolean;
  href: string;
}) {
  const t = useTranslations('common');

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
          {icon}
          {title}
        </h2>
        <Link href={href} className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 transition-colors">
          {t('viewAll')} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          : posts?.slice(0, 3).map((post, i) => <BlogCard key={post.id} post={post} index={i} />)}
      </div>
    </section>
  );
}

export default function HomePage() {
  const t = useTranslations('home');
  const tc = useTranslations('categories');
  const trending = useTrendingPosts();
  const latest = useLatestPosts();
  const recommended = useRecommendedPosts();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/50 via-gray-50 to-gray-50 dark:from-sky-950/20 dark:via-gray-950 dark:to-gray-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {t('hero.titleLine1')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700">
                {t('hero.titleAccent')}
              </span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/blog">
                <Button variant="primary" size="lg" className="gap-2">
                  <BookOpen className="w-5 h-5" />
                  {t('hero.ctaStartReading')}
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="gap-2">
                  <Zap className="w-5 h-5" />
                  {t('hero.ctaJoin')}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16"
          >
            {[
              { label: t('stats.articles'), value: '24+', icon: <BookOpen className="w-4 h-4" /> },
              { label: t('stats.authors'), value: '6+', icon: <Users className="w-4 h-4" /> },
              { label: t('stats.xpToEarn'), value: '10K+', icon: <Zap className="w-4 h-4" /> },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-sky-600 dark:text-sky-400 mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('categoriesTitle')}</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/search?category=${cat.value}`}
                className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:border-sky-500 hover:text-sky-600 dark:hover:border-sky-600 dark:hover:text-sky-400 transition-all duration-200"
              >
                {tc(cat.value)}
              </Link>
            ))}
          </div>
        </section>

        <PostSection
          title={t('sections.trending')}
          icon={<TrendingUp className="w-5 h-5 text-red-400" />}
          posts={trending.data}
          isLoading={trending.isLoading}
          href="/search?sort=popular"
        />

        <PostSection
          title={t('sections.latest')}
          icon={<Clock className="w-5 h-5 text-blue-400" />}
          posts={latest.data}
          isLoading={latest.isLoading}
          href="/search?sort=recent"
        />

        <PostSection
          title={t('sections.recommended')}
          icon={<Sparkles className="w-5 h-5 text-amber-400" />}
          posts={recommended.data}
          isLoading={recommended.isLoading}
          href="/search?sort=liked"
        />
      </div>
    </div>
  );
}
