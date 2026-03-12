import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/routing';
import { getPosts } from '@/lib/api/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const postsResponse = await getPosts({ limit: 100 });
    postRoutes = locales.flatMap((locale) =>
      postsResponse.data.map((post) => ({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8
      }))
    );
  } catch {
    // API may not be available — return only static routes
  }

  return [...staticRoutes, ...postRoutes];
}
