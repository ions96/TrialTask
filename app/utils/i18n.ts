import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {useEffect, useState} from 'react';
import {getLocales} from 'react-native-localize';
import {storage} from './../mmkv';
import {LocalTextsEn} from '@utils/LocalTextsEn';
import {LocalTextsRo} from '@utils/LocalTextsRo';

const deviceLocale = getLocales()[0];
const devicelanguageCode = deviceLocale.languageCode === 'ro' ? 'ro' : 'en';
const storedLanguageCode = storage.getString('languageCode');
if (!storedLanguageCode) {
  storage.set('languageCode', devicelanguageCode);
}

const resources = {
  en: {translation: LocalTextsEn},
  ro: {translation: LocalTextsRo},
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: storedLanguageCode || devicelanguageCode,
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export const useI18nStatus = () => {
  const [isLoading, setIsLoading] = useState(!i18next.isInitialized);

  useEffect(() => {
    const listener = () => {
      setIsLoading(false);
    };
    i18next.on('initialized', listener);
    return () => {
      i18next.off('initialized', listener);
    };
  }, []);
  return isLoading;
};

export default i18next;
