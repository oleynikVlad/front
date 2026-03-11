'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Heart, Eye, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePost, useRelatedPosts, useLikePost, useViewPost } from '@/hooks/usePosts';
import { useTranslations } from 'next-intl';
import { PostPageSkeleton } from '@/components/ui/Skeleton';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import MarkdownRenderer from '@/components/features/MarkdownRenderer';
import ReadingProgressBar from '@/components/features/ReadingProgressBar';
import TableOfContents from '@/components/features/TableOfContents';
import ShareButtons from '@/components/features/ShareButtons';
import { BlogCardHorizontal } from '@/components/features/BlogCard';
import { formatDate, formatNumber } from '@/utils/helpers';

export default function BlogPostPage() {
  const t = useTranslations('post');
  const params = useParams();
  const slug = params.slug as string;
  const { data: post, isLoading } = usePost(slug);
  const { data: relatedPosts } = useRelatedPosts(post?.id || '');
  const likePost = useLikePost();
  const viewPost = useViewPost();

  useEffect(() => {
    if (post?.id) {
      viewPost.mutate(post.id);
    }
  }, [post?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) return <PostPageSkeleton />;
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">{t('notFound')}</h1>
        <p className="text-gray-400 mb-6">{t('notFoundDescription')}</p>
        <Link href="/blog">
          <Button variant="primary">{t('backToBlog')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <ReadingProgressBar />
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('backToBlog')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          {/* Main Content */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="primary">{post.category}</Badge>
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {post.author.displayName.charAt(0)}
                      </span>
                    </div>
                    <span>{post.author.displayName}</span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {t('minRead', { minutes: post.readingTime })}
                  </span>
                </div>
              </div>

              {/* Cover Image */}
              <div className="relative h-64 sm:h-96 rounded-xl overflow-hidden mb-8">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </div>

              {/* Content */}
              <div className="mb-8">
                <MarkdownRenderer content={post.content} />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between py-6 border-t border-b border-gray-800">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => likePost.mutate(post.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      post.liked
                        ? 'bg-pink-950/50 text-pink-400 border border-pink-800/30'
                        : 'bg-gray-800 text-gray-400 hover:text-pink-400 border border-gray-700'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{formatNumber(post.likes)}</span>
                  </button>
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <Eye className="w-4 h-4" />
                    {t('views', { count: formatNumber(post.views) })}
                  </div>
                </div>
                <ShareButtons url={`/blog/${post.slug}`} title={post.title} />
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <div className="sticky top-24">
              <TableOfContents content={post.content} />

              {/* Related Posts */}
              {relatedPosts && relatedPosts.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">{t('relatedArticles')}</h3>
                  <div className="space-y-3">
                    {relatedPosts.map((rp) => (
                      <BlogCardHorizontal key={rp.id} post={rp} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
