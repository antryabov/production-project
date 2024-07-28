module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: ['plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'i18next'],
    rules: {
        'react/jsx-indent': [2, 4], // отступы в jsx
        indent: [2, 4], // обычные отступы
        'react/jsx-indent-props': [2, 4], // оступы для пропсов(атрибутов)
        'react/jsx-filename-extension': [2,
            { extensions: ['.js', '.jsx', '.tsx'] },
        ], // jsx код в tsx
        'import/no-unresolved': 'off', // ошибка из за того, что у нас абсолютные импорты и это отключим
        'import/prefer-default-export': 'off', // для того, чтобы использовать дефолтные экспорты, но для удобство мы используем именованные
        // не используемые переменные - предупреждение, а не ошибка, потому что если есть
        // элемента массива первый, а нам нужно его пропустить, чтобы использовать второй
        'no-unused-vars': 'warn',
        // для пропсов, которые должны использоваться по дефолту
        'react/require-default-props': 'off', // у нас необязательное свойство, поэтому мы отключим
        'react/react-in-jsx-scope': 'off', // с реакта 17 нет надобности использовать ипорт модуля реакт в jsx и мы отключим
        // спред для пропсов всегда     плохо использовать, но для ui компонентов это позволительно
        // и будем просто подсвечивать
        'react/jsx-props-no-spreading': 'warn',
        'no-shadow': 'off',
        // для расширений, в данном случае в конфиге вебпака
        'import/extensions': 'off',
        // импортируем из девдепенденси, а должно дипенденси. НО вебпак нужен для сборки
        // поэтому может отключить
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'no-tabs': ['error', { allowIndentationTabs: true }],
        // указывает на то, что нужен перевод в разметке для i18n
        'i18next/no-literal-string': ['warn', {
            markupOnly: true,
            ignoreAttribute: ['data-testid', 'to'],
        }],
        'max-len': ['error', {
            ignoreComments: true,
            code: 120,
        }],
    },
    globals: {
        // eslint ругался, что переменная нигде не использовалась
        // но эта переменная глобальная, которая указана в плагине вебпака
        // укажем ее, что он используется
        __IS_DEV__: true,
    },
    // переопределение eslint правил, чтобы на отдельные файлы были только свои правила
    overrides: [
        {
            // для тестов отключим перевод
            files: ['**/src/**/*.test.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
            },
        },
        {
            // для сторисов отключим ошибку, если не используем function declaration
            files: ['**/src/**/*.stories.tsx'],
            rules: {
                'react/function-component-definition': 'off',
            },
        },
    ],
};
