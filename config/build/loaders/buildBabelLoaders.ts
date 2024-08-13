export function buildBabelLoaders(isDev: boolean) {
    return {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        'i18next-extract',
                        {
                            locales: ['ru', 'en'],
                            keyAsDefaultValue: true,
                        },
                    ],
                    isDev && require.resolve('react-refresh/babel'),
                    // если isDev false (в плагинах будет false значение), то от этого значения избавляемся,
                    // потому что в массиве храним плагины
                ].filter(Boolean),
            },
        },
    };
}
