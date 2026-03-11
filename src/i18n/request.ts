import {getRequestConfig} from 'next-intl/server';
import {defaultLocale, locales, type Locale} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  const locale = (await requestLocale) as Locale | undefined;
  const resolvedLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default
  };
});

