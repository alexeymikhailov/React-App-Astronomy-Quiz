const webpack=require('webpack');
const merge=require('webpack-merge');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const baseConfigWebpack=require('./webpack.base.conf');

const prodConfig=merge(baseConfigWebpack ,{
	plugins: baseConfigWebpack.plugins.concat([
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),

		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true
			},
			output: {
				comments: false
			},
			sourceMap: false
		}),

		new CleanWebpackPlugin(['./static'], {
			root: __dirname,
			verbose: true,
			dry: false
		})
	])
});

module.exports=prodConfig;