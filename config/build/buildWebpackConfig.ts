import path from 'path';
import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildPluling } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(
	options: BuildOptions
): webpack.Configuration {
	const { mode, paths, isDev } = options;

	return {
		mode: mode,
		entry: paths.entry,
		plugins: buildPluling(options),
		module: {
			rules: buildLoaders(options)
		},
		resolve: buildResolvers(options),
		output: {
			filename: '[name].[contenthash].js',
			path: paths.build,
			clean: true
		},
		devtool: isDev ? 'inline-source-map' : undefined,
		devServer: isDev ? buildDevServer(options) : undefined
	};
}
