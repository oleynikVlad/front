import { TrendingUp, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import BlogCard from '@/components/features/BlogCard';
import HomeHero from '@/components/features/HomeHero';
import { CATEGORIES } from '@/types';
import type { Post } from '@/types';
import { getTranslations } from 'next-intl/server';
import { getTrendingPosts, getLatestPosts, getRecommendedPosts } from '@/lib/api/posts';

function PostSection({
  title,
  icon,
  posts,
  href,
  viewAllLabel,
}: {
  title: string;
  icon: React.ReactNode;
  posts: Post[];
  href: string;
  viewAllLabel: string;
}) {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-white">
          {icon}
          {title}
        </h2>
        <Link href={href} className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
          {viewAllLabel} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post, i) => <BlogCard key={post.id} post={post} index={i} />)}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const t = await getTranslations('home');
  const tc = await getTranslations('categories');
  const tCommon = await getTranslations('common');

  let trending: Post[] = [];
  let latest: Post[] = [];
  let recommended: Post[] = [];

  try {
    [trending, latest, recommended] = await Promise.all([
      getTrendingPosts(),
      getLatestPosts(),
      getRecommendedPosts(),
    ]);
  } catch {
    // API may not be available yet — render with empty data
  }

  return (
    <div>
      {/* Hero */}
      <HomeHero
        titleLine1={t('hero.titleLine1')}
        titleAccent={t('hero.titleAccent')}
        subtitle={t('hero.subtitle')}
        ctaStartReading={t('hero.ctaStartReading')}
        ctaJoin={t('hero.ctaJoin')}
        statsArticles={t('stats.articles')}
        statsAuthors={t('stats.authors')}
        statsXp={t('stats.xpToEarn')}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-white mb-6">{t('categoriesTitle')}</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/search?category=${cat.value}`}
                className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 hover:border-indigo-600 hover:text-indigo-400 transition-all duration-200"
              >
                {tc(cat.value)}
              </Link>
            ))}
          </div>
        </section>

        <PostSection
          title={t('sections.trending')}
          icon={<TrendingUp className="w-5 h-5 text-red-400" />}
          posts={trending}
          href="/search?sort=popular"
          viewAllLabel={tCommon('viewAll')}
        />

        <PostSection
          title={t('sections.latest')}
          icon={<Clock className="w-5 h-5 text-blue-400" />}
          posts={latest}
          href="/search?sort=recent"
          viewAllLabel={tCommon('viewAll')}
        />

        <PostSection
          title={t('sections.recommended')}
          icon={<Sparkles className="w-5 h-5 text-amber-400" />}
          posts={recommended}
          href="/search?sort=liked"
          viewAllLabel={tCommon('viewAll')}
        />
      </div>
    </div>
  );
}
