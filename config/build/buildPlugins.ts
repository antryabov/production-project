import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/config';

export function buildPluling({
    paths,
    isDev,
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
        new webpack.DefinePlugin({
            // прокидывает с помощью него в приложение глобальные переменные
            // так лучше писать имя переменной для того, чтобы отделить переменные,
            // которые используются в приложении
            // нужно в файле декларации типов еще добавить declare const __IS_DEV__: boolean;
            __IS_DEV__: JSON.stringify(isDev),
            // чтобы приложение знало об этой переменной
        }),
    ];

    // плагины для дев режима
    if (isDev) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
        // анализатор бандла (вес бандла)
        plugins.push(
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
            }),
        );
    }

    return plugins;
}
