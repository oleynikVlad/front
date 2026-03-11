'use client';

import { useState } from 'react';
import { usePosts } from '@/hooks/usePosts';
import BlogCard from '@/components/features/BlogCard';
import { CardSkeleton } from '@/components/ui/Skeleton';
import Pagination from '@/components/ui/Pagination';
import Select from '@/components/ui/Select';
import EmptyState from '@/components/ui/EmptyState';
import type { SortOption } from '@/types';
import { CATEGORIES } from '@/types';
import { BookOpen } from 'lucide-react';

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOption>('recent');
  const [category, setCategory] = useState('');

  const { data, isLoading } = usePosts({
    page,
    limit: 12,
    sort,
    filters: category ? { category: category as never } : {},
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Blog</h1>
          <p className="text-gray-400 mt-1">Explore articles from the community</p>
        </div>
        <div className="flex gap-3">
          <Select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            options={[{ value: '', label: 'All Categories' }, ...CATEGORIES]}
          />
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            options={[
              { value: 'recent', label: 'Most Recent' },
              { value: 'popular', label: 'Most Popular' },
              { value: 'liked', label: 'Most Liked' },
            ]}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : data && data.data.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.data.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
          <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
        </>
      ) : (
        <EmptyState
          icon={<BookOpen className="w-12 h-12" />}
          title="No posts found"
          description="Try changing your filters or check back later."
        />
      )}
    </div>
  );
}
