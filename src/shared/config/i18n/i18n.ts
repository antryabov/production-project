import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// конфиг прокидывается в index.tsx корневой
i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'ru', // язык приложения по умолчанию
        // debug: __IS_DEV__, // глобальная переменная, которая указана в плагине DefinePlugin wp
        debug: false, // глобальная переменная, которая указана в плагине DefinePlugin wp

        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json', // ns - namespace
        },
    });

export default i18n;
