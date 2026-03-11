import type { Metadata } from 'next';
import { Providers } from '@/lib/providers';
import Navbar from '@/components/features/Navbar';
import Footer from '@/components/features/Footer';
import OnboardingModal from '@/components/features/OnboardingModal';
import XpToast from '@/components/features/XpToast';
import DailyVisitChecker from '@/components/features/DailyVisitChecker';
import ErrorBoundary from '@/components/features/ErrorBoundary';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'DevBlog - A Modern Blog Platform for Developers',
    template: '%s | DevBlog',
  },
  description: 'Discover, read, and share developer content. Earn XP, collect badges, and grow with the community.',
  keywords: ['blog', 'developer', 'programming', 'technology', 'tutorials', 'coding'],
  authors: [{ name: 'DevBlog' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'DevBlog',
    title: 'DevBlog - A Modern Blog Platform for Developers',
    description: 'Discover, read, and share developer content. Earn XP, collect badges, and grow with the community.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevBlog - A Modern Blog Platform for Developers',
    description: 'Discover, read, and share developer content.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-gray-950 text-gray-100 antialiased">
        <Providers>
          <ErrorBoundary>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <OnboardingModal />
            <XpToast />
            <DailyVisitChecker />
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
