import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import Navbar from '@/components/features/Navbar';
import Footer from '@/components/features/Footer';
import OnboardingModal from '@/components/features/OnboardingModal';
import XpToast from '@/components/features/XpToast';
import DailyVisitChecker from '@/components/features/DailyVisitChecker';
import { defaultLocale, locales, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const t = await getTranslations({ locale: resolvedLocale, namespace: 'meta' });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return {
    title: {
      default: t('title.default'),
      template: t('title.template')
    },
    description: t('description'),
    keywords: t.raw('keywords') as string[],
    authors: [{ name: t('authors.0.name') }],
    alternates: {
      canonical: `${baseUrl}/${resolvedLocale}`,
      languages: {
        en: `${baseUrl}/en`,
        uk: `${baseUrl}/uk`
      }
    },
    openGraph: {
      type: 'website',
      locale: resolvedLocale === 'uk' ? 'uk_UA' : 'en_US',
      siteName: t('openGraph.siteName'),
      title: t('openGraph.title'),
      description: t('openGraph.description')
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitter.title'),
      description: t('twitter.description')
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <OnboardingModal />
      <XpToast />
      <DailyVisitChecker />
    </NextIntlClientProvider>
  );
}

