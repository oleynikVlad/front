'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useSearch } from '@/hooks/useSearch';
import BlogCard from '@/components/features/BlogCard';
import { CardSkeleton } from '@/components/ui/Skeleton';
import Pagination from '@/components/ui/Pagination';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { CATEGORIES } from '@/types';
import type { SortOption, Category } from '@/types';

function SearchPageContent() {
  const t = useTranslations('search');
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialSort = (searchParams.get('sort') as SortOption) || 'recent';

  const initialSearchQuery = initialQuery || (initialCategory ? ' ' : '');
  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [category, setCategory] = useState<string>(initialCategory);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [readingTimeMin, setReadingTimeMin] = useState('');
  const [readingTimeMax, setReadingTimeMax] = useState('');
  const [minLikes, setMinLikes] = useState('');

  const { data, isLoading } = useSearch({
    page,
    limit: 12,
    sort,
    filters: {
      query: searchQuery || undefined,
      category: (category || undefined) as Category | undefined,
      readingTimeMin: readingTimeMin ? parseInt(readingTimeMin) : undefined,
      readingTimeMax: readingTimeMax ? parseInt(readingTimeMax) : undefined,
      minLikes: minLikes ? parseInt(minLikes) : undefined,
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(query);
    setPage(1);
  };

  const clearFilters = () => {
    setCategory('');
    setReadingTimeMin('');
    setReadingTimeMax('');
    setMinLikes('');
    setPage(1);
  };

  const hasActiveFilters = category || readingTimeMin || readingTimeMax || minLikes;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{t('title')}</h1>
        <p className="text-gray-400">{t('subtitle')}</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('placeholder')}
            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
        <Button type="submit" variant="primary" className="px-6">
          {t('searchButton')}
        </Button>
        <Button
          type="button"
          variant={hasActiveFilters ? 'primary' : 'secondary'}
          onClick={() => setShowFilters(!showFilters)}
          className="gap-1.5"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {t('filters')}
        </Button>
      </form>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-300">{t('filters')}</h3>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300">
                    <X className="w-3 h-3" />
                    {t('clearAll')}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select
                  label={t('category')}
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                  options={[{ value: '', label: t('allCategories') }, ...CATEGORIES]}
                />
                <Input
                  label={t('minReadingTime')}
                  type="number"
                  placeholder="0"
                  value={readingTimeMin}
                  onChange={(e) => setReadingTimeMin(e.target.value)}
                />
                <Input
                  label={t('maxReadingTime')}
                  type="number"
                  placeholder="30"
                  value={readingTimeMax}
                  onChange={(e) => setReadingTimeMax(e.target.value)}
                />
                <Input
                  label={t('minLikes')}
                  type="number"
                  placeholder="0"
                  value={minLikes}
                  onChange={(e) => setMinLikes(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sort */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-500">
          {data ? t('resultsFound', { count: data.total }) : t('enterSearchTerm')}
        </div>
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          options={[
            { value: 'recent', label: t('sort.recent') },
            { value: 'popular', label: t('sort.popular') },
            { value: 'liked', label: t('sort.liked') },
          ]}
        />
      </div>

      {/* Results */}
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
      ) : searchQuery ? (
        <EmptyState
          title={t('noResults')}
          description={t('noResultsDescription')}
        />
      ) : null}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
