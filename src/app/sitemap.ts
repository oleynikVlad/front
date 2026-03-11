import type { MetadataRoute } from 'next';
import { mockPosts } from '@/services/mock/mockData';
import { locales } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const staticPaths = ['', '/blog', '/search', '/todo', '/login'] as const;
  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path, index) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: index <= 1 ? ('daily' as const) : index <= 3 ? ('weekly' as const) : ('monthly' as const),
      priority: path === '' ? 1 : path === '/blog' ? 0.9 : path === '/search' ? 0.7 : path === '/todo' ? 0.6 : 0.3
    }))
  );

  const postRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    mockPosts.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }))
  );

  return [...staticRoutes, ...postRoutes];
}
