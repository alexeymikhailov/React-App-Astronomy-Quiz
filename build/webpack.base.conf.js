const webpack=require('webpack');
const path=require('path');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const cssOutputName=process.env.NODE_ENV === 'production' ? 'styles.[hash].css' : 'styles.css';
const vendorsOutputName=process.env.NODE_ENV === 'production' ? 'vendors.[hash].js' : 'vendors.js';
const nodeEnv=process.env.NODE_ENV || 'development';
const isProduction=nodeEnv === 'production';

const config={
	devtool: isProduction ? 'hidden-source-map' : 'cheap-module-source-map',

	entry: {
		bundle: [
			'babel-polyfill',
			'./src/js/index.js'
		],
		vendor: [
			'react',
			'react-dom'
		]
	},

	output: {
		path: path.resolve(__dirname, 'static'),
		filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
		chunkFilename: isProduction ? '[name].[chunkhash].js' : '[name].js',
		publicPath: '/'
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},

			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: 'css-loader'
				}),
				exclude: /node_modules/
			},

			{
				test: /\.(jpe?g|png|svg)$/i,
				loader: 'url-loader?name=[name].[hash].[ext]&limit=10000',
				exclude: /node_modules/
			},

			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?mimetype=application/font-woff&limit=10000',
				exclude: /node_modules/
			},

			{
				test: /\.(eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?mimetype=application/vnd.ms-fontobject&limit=10000',
				exclude: /node_modules/
			},

			{
				test: /\.(ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?mimetype=application/octet-stream&limit=10000',
				exclude: /node_modules/
			}
		]
	},

	resolve: {
		modules: [
			path.resolve(__dirname, 'src'),
			'node_modules'
		],
		extensions: ['.js', '.jsx', '.css']
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(nodeEnv)
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: vendorsOutputName
		}),

		new ExtractTextPlugin({
			filename: cssOutputName,
			disable: false,
			allChunks: true
		}),

		new HtmlWebpackPlugin({
			filename: 'index.html',
			favicon: './src/img/icons/icon.svg',
			template: './src/index.html',
			minify: {
				collapseInlineTagWhitespace: true,
				collapseWhitespace: true,
				removeEmptyAttributes: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true
			}
		})
	],

	performance: {
		hints: process.env.NODE_ENV === 'production' ? true : false
	}
};

module.exports=config;
