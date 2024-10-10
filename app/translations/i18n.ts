import i18n, {use} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';
import en from './en.json';
import fr from './fr.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appConstant} from '../constants';

const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (language?: string | null) => void) => {
    const deviceLang = getLocales()[0].languageCode;
    const language = await AsyncStorage.getItem(appConstant.appLanguage);
    callback(language ?? deviceLang);
  },
  init: () => {},
  cacheUserLanguage: (language: string) => {
    AsyncStorage.setItem(appConstant.appLanguage, language);
  },
};

/**
 * Initializes the i18n library.
 * @param {object} - The key pair value to initialize the library. An object with the following properties:
 * - init: Function.prototype - proto type of function to initialize
 * - type: 'languageDetector' - A custom language detector
 * - async: true | false - lags below detect function to be async or not
 * - detect: async (callback: any) => void - A phone language detector
 * @returns None
 */
use<any>(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    resources: {
      en: en,
      fr: fr,
    },
  });
  export default i18n;
