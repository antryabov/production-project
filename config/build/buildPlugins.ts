import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export function buildPluling({
    paths,
    isDev,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contentcash:8].css',
            chunkFilename: 'css/[name].[contentcash:8].css',
        }),
        new webpack.DefinePlugin({
            // прокидывает с помощью него в приложение глобальные переменные
            // так лучше писать имя переменной для того, чтобы отделить переменные,
            // которые используются в приложении
            // нужно в файле декларации еще добавить declare const __IS_DEV__: boolean;
            __IS_DEV__: JSON.stringify(isDev),
            // чтобы приложение знало об этой переменной
        }),
        new webpack.HotModuleReplacementPlugin(),
    ];
}
