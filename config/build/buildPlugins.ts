import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BuildOptions, BuildPaths } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildPluling({
	paths
}: BuildOptions): webpack.WebpackPluginInstance[] {
	return [
		new HtmlWebpackPlugin({
			template: paths.html
		}),
		new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contentcash:8].css',
			chunkFilename: 'css/[name].[contentcash:8].css'
		})
	];
}
