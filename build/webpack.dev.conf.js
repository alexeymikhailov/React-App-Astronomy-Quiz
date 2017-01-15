const webpack=require('webpack');
const merge=require('webpack-merge');
const baseWebpackConfig=require('./webpack.base.conf');

const devConfig=merge(baseWebpackConfig, {
	entry: baseWebpackConfig.entry.bundle.concat([
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/dev-server'
	]),

	plugins: baseWebpackConfig.plugins.concat([
		new webpack.HotModuleReplacementPlugin()
	])
});

module.exports=devConfig;