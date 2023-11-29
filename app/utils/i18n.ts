import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import httpbackend from 'i18next-http-backend';
// import {fetchTranslations} from './../api';
import {useEffect, useState} from 'react';
import {getLocales} from 'react-native-localize';
import {storage} from './../mmkv';
// import {createStaleWhileRevalidateCache} from './swr';
// import {LocalTexts} from '@utils/LocalTexts';

const deviceLocale = getLocales()[0];
const devicelanguageCode = deviceLocale.languageCode === 'ro' ? 'ro' : 'en';
const storedLanguageCode = storage.getString('languageCode');
if (!storedLanguageCode) {
  storage.set('languageCode', devicelanguageCode);
}

// const swr = createStaleWhileRevalidateCache({
//   storage: MMKVStorageAdapter,
//   cacheTime: Infinity,
//   staleTime: 0,
// });
// const prefix = 'i18next_res_';

i18next
  .use(initReactI18next)
  .use(httpbackend)
  .init({
    lng: storedLanguageCode || devicelanguageCode,
    debug: true,
    resources: {
      en: {
        translation: {
          hhhhh: 'hello world',
        },
      },
    },
    fallbackLng: ['ro', 'en'],
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
    react: {
      useSuspense: false,
      bindI18nStore: 'added',
    },
  });

// .init<HttpBackendOptions>({
//   lng: storedLanguageCode || devicelanguageCode,
//   fallbackLng: ['ro', 'en'],
// interpolation: {
//   escapeValue: false,
// },
// returnNull: false,
//   backend: {
//     loadPath: '{{lng}}|{{ns}}',
//     request: (options, url, payload, callback) => {
//       const [lang_code, namespace] = url.split('|');

//       return swr<string>(
//         `${prefix}${lang_code}-${namespace}`,
//         () => {
//           return fetchTranslations({
//             params: {
//               language: lang_code,
//               version: '0',
//               // items_per_page: 1000,
//             },
//           }).then(r => {
//             // Normalize translations as key => value
//             const translations = r?.data?.values || {};
//             return JSON.stringify({...LocalTexts, ...translations});
//           });
//         },
//         val => {
//           // Updated cached resource bundle with fresh one
//           i18next.addResourceBundle(lang_code, namespace, JSON.parse(val));
//         },
//       )
//         .then(data => {
//           callback(null, {data, status: 200});
//         })
//         .catch(e => {
//           callback(e, {status: 500, data: '{}'});
//         });
//     },
//   },
// react: {
//   useSuspense: false,
//   bindI18nStore: 'added',
// },
// });

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
