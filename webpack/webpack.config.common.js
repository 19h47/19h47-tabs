/**
 *
 * @file webpack.config.common.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */

// Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ESLintPlugin = require('eslint-webpack-plugin');

const resolve = require('./webpack.utils');

module.exports = {
	entry: {
		dist: resolve('lib/Tabs.ts'),
		docs: resolve('lib/Tabs.ts'),
	},
	output: {
		path: resolve('/dist'),
		library: 'Tabs',
		libraryTarget: 'umd',
		filename: '../[name]/main.js',
	},
	devServer: {
		port: 3000,
		static: [resolve('/')],
		compress: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		alias: {
			'@': resolve('lib'),
			Utils: resolve('lib/utils'),
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [resolve('dist'), resolve('docs')],
		}),
		new HtmlWebpackPlugin({
			filename: resolve('docs/index.html'),
			template: resolve('index.html'),
			inject: false,
		}),
		new WebpackNotifierPlugin({
			title: 'Webpack',
			excludeWarnings: true,
			alwaysNotify: true,
		}),
		new ESLintPlugin()
	],
};
