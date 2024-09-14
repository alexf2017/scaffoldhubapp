import dictionary from 'src/translation/en/en';

export type Locale = 'en' | 'fr';
export const defaultLocale = (process.env.NEXT_PUBLIC_LOCALE as Locale) || 'en';
export const locales: Locale[] = ['en', 'fr'];
export type Dictionary = typeof dictionary;
