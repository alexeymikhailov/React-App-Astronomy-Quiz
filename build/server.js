const webpack=require('webpack');
const express=require('express');
const path=require('path');
const webpackDevServer=require('webpack-dev-server');
const webpackConfig=isProd ? require('./webpack.prod.conf') : require('./webpack.dev.conf');

const app=express();
const isProd=process.env.NODE_ENV === 'production';
const port=3000;

if (isProd) {
	app.use(express.static(path.join(__dirname, '../src/index.html')));
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, '../src/index.html'));
	});

	app.listen(port, function(err) {
		if (err) {
			console.log(err);
		}
		console.info(`Listening on port ${port}`);
	});
} else {
	const compiler=webpack(webpackConfig);
	const server=new webpackDevServer(compiler, {
		publicPath: webpackConfig.output.publicPath,
		contentBase: '../src',
		historyApiFallback: true,
		hot: true,
		noInfo: false,
		stats: {
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false
		},
		port: 3000
	});

	server.listen(port, function(err) {
		if (err) {
			console.log(err);
		}
		console.info(`Listening on port ${port}`);
	});
}