import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// конфиг, чтобы прокидывать в тесты(в нашел случае в функцию хелпер renderWithTranslation), подобный для корневого index.tsx
i18n
    .use(initReactI18next)
    .init({
        lng: 'ru',
        fallbackLng: 'ru',

        debug: false,

        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        resources: { ru: { translations: {} } },
    });

export default i18n;
