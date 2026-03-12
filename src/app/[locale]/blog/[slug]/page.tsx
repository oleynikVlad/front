import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import Button from '@/components/ui/Button';
import BlogPostClient from '@/components/features/BlogPostClient';
import { getPostBySlug, getRelatedPosts } from '@/lib/api/posts';
import type { Post } from '@/types';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const t = await getTranslations('post');

  let post: Post | null = null;
  let relatedPosts: Post[] = [];

  try {
    post = await getPostBySlug(slug);
    if (post) {
      relatedPosts = await getRelatedPosts(post.id);
    }
  } catch {
    // API may not be available yet
  }

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

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
