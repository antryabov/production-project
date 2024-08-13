import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BuildOptions } from './types/config';

export function buildPluling({
    paths,
    isDev,
    apiUrl,
    project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contentcash].css',
            chunkFilename: 'css/[name].[contentcash].css',
        }),
        // для проброса глобальным переменных изменяем еще файлы отвечающие за конфигурация jest, storybook, eslint, global.d.ts(чтобы знал ts о переменных) и в самом конфигурационном файле webpack
        new webpack.DefinePlugin({
            // прокидывает с помощью него в приложение глобальные переменные
            // так лучше писать имя переменной для того, чтобы отделить переменные,
            // которые используются в приложении
            // нужно в файле декларации типов еще добавить declare const __IS_DEV__: boolean;
            __IS_DEV__: JSON.stringify(isDev),
            // чтобы приложение знало об этой переменной
            __API__: JSON.stringify(apiUrl),
            // для разделения проекта на среды, в которых будет выполняться код
            __PROJECT__: JSON.stringify(project),
        }),
    ];

    // плагины для дев режима
    if (isDev) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
        // анализатор бандла (вес бандла)
        // cсылка на аналайзер появляется в консоли
        plugins.push(
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
            }),
        );
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    return plugins;
}
