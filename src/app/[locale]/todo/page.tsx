'use client';

import { useState } from 'react';
import { Heart, Lightbulb, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useTodoIdeas, useLikeTodoIdea } from '@/hooks/useTodo';
import { CardSkeleton } from '@/components/ui/Skeleton';
import Pagination from '@/components/ui/Pagination';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { CATEGORIES } from '@/types';
import type { SortOption, Category, TodoIdea } from '@/types';
import { formatRelativeDate, formatNumber } from '@/utils/helpers';

function IdeaCard({ idea, index }: { idea: TodoIdea; index: number }) {
  const likeMutation = useLikeTodoIdea();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="primary">{idea.category}</Badge>
          </div>
          <h3 className="text-lg font-semibold text-gray-100 mb-2">{idea.title}</h3>
          <p className="text-sm text-gray-400 mb-4">{idea.description}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">{idea.author.displayName.charAt(0)}</span>
              </div>
              <span>{idea.author.displayName}</span>
            </div>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatRelativeDate(idea.createdAt)}
            </span>
          </div>
        </div>
        <button
          onClick={() => likeMutation.mutate(idea.id)}
          className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 shrink-0 ${
            idea.liked
              ? 'bg-pink-950/50 text-pink-400 border border-pink-800/30'
              : 'bg-gray-800 text-gray-400 hover:text-pink-400 border border-gray-700 hover:border-pink-800/30'
          }`}
        >
          <Heart className={`w-5 h-5 ${idea.liked ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium">{formatNumber(idea.likes)}</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function TodoPage() {
  const t = useTranslations('ideas');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOption>('liked');
  const [category, setCategory] = useState<string>('');

  const { data, isLoading } = useTodoIdeas({
    page,
    limit: 10,
    sort,
    category: (category || undefined) as Category | undefined,
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-8 h-8 text-amber-400" />
            {t('title')}
          </h1>
          <p className="text-gray-400 mt-1">{t('subtitle')}</p>
        </div>
        <div className="flex gap-3">
          <Select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            options={[{ value: '', label: t('allCategories') }, ...CATEGORIES]}
          />
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            options={[
              { value: 'liked', label: t('sort.popular') },
              { value: 'recent', label: t('sort.recent') },
            ]}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : data && data.data.length > 0 ? (
        <>
          <div className="space-y-4">
            {data.data.map((idea, i) => (
              <IdeaCard key={idea.id} idea={idea} index={i} />
            ))}
          </div>
          <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
        </>
      ) : (
        <EmptyState
          icon={<Lightbulb className="w-12 h-12" />}
          title={t('empty.title')}
          description={t('empty.description')}
        />
      )}
    </div>
  );
}
