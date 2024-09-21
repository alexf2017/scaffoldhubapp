import dayjs from 'dayjs';
import { Locale } from 'src/translation/locales';

export function applyDayjsTranslation(locale: Locale) {
  if (locale === 'fr') {
    return;
  }

  if (locale === 'en') {
    dayjs.locale(require('dayjs/locale/en'));
  }
}
