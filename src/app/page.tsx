'use client';

import { TrendingUp, Clock, Sparkles, ArrowRight, BookOpen, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTrendingPosts, useLatestPosts, useRecommendedPosts } from '@/hooks/usePosts';
import BlogCard from '@/components/features/BlogCard';
import { CardSkeleton } from '@/components/ui/Skeleton';
import Button from '@/components/ui/Button';
import { CATEGORIES } from '@/types';
import type { Post } from '@/types';

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
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-white">
          {icon}
          {title}
        </h2>
        <Link href={href} className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
          View all <ArrowRight className="w-4 h-4" />
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
  const trending = useTrendingPosts();
  const latest = useLatestPosts();
  const recommended = useRecommendedPosts();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-gray-950 to-gray-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Where Developers
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500"> Share &amp; Grow</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Discover insightful articles, share your knowledge, and level up your skills. Join the community of developers who learn together.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/blog">
                <Button variant="primary" size="lg" className="gap-2">
                  <BookOpen className="w-5 h-5" />
                  Start Reading
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="gap-2">
                  <Zap className="w-5 h-5" />
                  Join &amp; Earn XP
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
              { label: 'Articles', value: '24+', icon: <BookOpen className="w-4 h-4" /> },
              { label: 'Authors', value: '6+', icon: <Users className="w-4 h-4" /> },
              { label: 'XP to Earn', value: '10K+', icon: <Zap className="w-4 h-4" /> },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-indigo-400 mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
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
          <h2 className="text-xl font-bold text-white mb-6">Explore Categories</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/search?category=${cat.value}`}
                className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 hover:border-indigo-600 hover:text-indigo-400 transition-all duration-200"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </section>

        <PostSection
          title="Trending Now"
          icon={<TrendingUp className="w-5 h-5 text-red-400" />}
          posts={trending.data}
          isLoading={trending.isLoading}
          href="/search?sort=popular"
        />

        <PostSection
          title="Latest Articles"
          icon={<Clock className="w-5 h-5 text-blue-400" />}
          posts={latest.data}
          isLoading={latest.isLoading}
          href="/search?sort=recent"
        />

        <PostSection
          title="Recommended for You"
          icon={<Sparkles className="w-5 h-5 text-amber-400" />}
          posts={recommended.data}
          isLoading={recommended.isLoading}
          href="/search?sort=liked"
        />
      </div>
    </div>
  );
}
