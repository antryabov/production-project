import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoaders } from '../build/loaders/buildCssLoaders';
import { BuildPaths } from '../build/types/config';
// перенастроенный вебпак конфиг для storybook
export default ({ config }: {config: webpack.Configuration}) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        // настройка абсолютных импортов
        src: path.resolve(__dirname, '..', '..', 'src'),
    };
    // ! - значит, что эти поля точно не undefined
    config!.resolve!.modules!.push(paths.src);
    config!.resolve!.extensions!.push('.ts', '.tsx');

    // в конфиг можно отключать разные правила, потому что сразу можем увидеть результат работает или нет
    // eslint-disable-next-line no-param-reassign
    // @ts-ignore
    config!.module!.rules = config!.module!.rules!.map((rule: RuleSetRule) => { // проходимся по всем дефолтным правилам
        // находим правило(регулярку, которая содержит svg), которое обрабатывает svg и отключаем обработку svg для этого правила
        if (/svg/.test(rule.test as string)) { // кастовать к строке можно, но в основном коде или бизнес коде и др. лучше этого не делать
            return {
                ...rule,
                exclude: /\.svg$/i,
            };
        }
        // иначе, возвращаем правило(если с svg никак правило не связано)
        return rule;
    });

    // svg loader
    config.module!.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });

    // css loader
    config.module!.rules.push(buildCssLoaders(true));

    // скорее всего он не нужен для storybook, но добавим
    config.plugins!.push(
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(true),
            __API__: JSON.stringify(''),
            __PROJECT__: JSON.stringify('storybook'),
        }),
    );

    return config;
};
