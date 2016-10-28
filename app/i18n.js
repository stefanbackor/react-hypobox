/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';

import skLocaleData from 'react-intl/locale-data/sk';
import enLocaleData from 'react-intl/locale-data/en';
import deLocaleData from 'react-intl/locale-data/de';

addLocaleData(skLocaleData);
addLocaleData(enLocaleData);
addLocaleData(deLocaleData);

export const appLocales = [
  'sk',
  // 'en',
  // 'de',
];

import skTranslationMessages from './translations/sk.json';
// import enTranslationMessages from './translations/en.json';
// import deTranslationMessages from './translations/de.json';

export const formatTranslationMessages = (messages) => {
  const formattedMessages = {};
  for (const message of messages) {
    formattedMessages[message.id] = message.message || message.defaultMessage;
  }

  return formattedMessages;
};

export const translationMessages = {
  sk: formatTranslationMessages(skTranslationMessages),
  // en: formatTranslationMessages(enTranslationMessages),
  // de: formatTranslationMessages(deTranslationMessages),
};
