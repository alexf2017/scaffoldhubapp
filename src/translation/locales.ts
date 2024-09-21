import dictionary from 'src/translation/fr/fr';

export type Locale = 'fr' | 'en';
export const defaultLocale = 'fr';
// export const defaultLocale = (process.env.NEXT_PUBLIC_LOCALE as Locale) || 'fr';
export const locales: Locale[] = ['fr', 'en'];
export type Dictionary = typeof dictionary;
