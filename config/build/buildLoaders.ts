import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
	const cssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					modules: {
						auto: (resPath: string) =>
							Boolean(resPath.includes('.module.')), // к каким файлам применять модуль
						localIdentName: isDev // если dev режим, то делать названия удобное для дебага
							? '[path][name]__[local]--[hash:base64:5]'
							: '[hash:base64:8]' // делает названия модуля просто
					}
				}
			},
			'sass-loader'
		]
	};

	// Если не используем typescript - нужен babel-loader
	const typescriptLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/
	};

	return [typescriptLoader, cssLoader];
}
