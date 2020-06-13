const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const src = path.resolve(__dirname, 'src')

const serverConfig = {
	target: 'node',
	entry: path.resolve(__dirname, 'src', 'server.ts'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'server.js',
	},
}

const appConfig = {
	entry: path.resolve(__dirname, 'src/index.tsx'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'src'),
				use: 'ts-loader',
			},
			{
				test: /\.css$/i,
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'src'),
				use: [
					'style-loader',
					{ loader: 'css-modules-typescript-loader' },
					{
						loader: 'css-loader',
						options: {
							modules: true,
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		port: 9000,
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.css', '.ts', '.tsx'],
		alias: {
			components: `${src}/components`,
			hooks: `${src}/hooks`,
			lib: `${src}/lib`,
			testlib: `${src}/testlib`,
			styles: `${src}/styles`,
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	],
}

module.exports = [appConfig, serverConfig]
