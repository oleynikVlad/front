'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Heart, Eye, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Post } from '@/types';
import { formatRelativeDate, formatNumber } from '@/utils/helpers';
import Badge from '@/components/ui/Badge';

interface BlogCardProps {
  post: Post;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/10 dark:hover:shadow-sky-950/20 h-full flex flex-col">
          {/* Cover Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 dark:from-gray-900/60 to-transparent" />
            <div className="absolute top-3 left-3">
              <Badge variant="primary">{post.category}</Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-1">
              {post.preview}
            </p>

            {/* Author & Meta */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800/50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">
                    {post.author.displayName.charAt(0)}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{post.author.displayName}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readingTime}m
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {formatNumber(post.likes)}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {formatNumber(post.views)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function BlogCardHorizontal({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="flex gap-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 p-4">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2 mb-1">
            {post.title}
          </h4>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatRelativeDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime}m
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
