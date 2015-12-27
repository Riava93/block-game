'use strict';

let webpack = require('webpack'),
	path = require('path');

const PATHS = {
	app: path.join(__dirname, 'src')
};

module.exports = {
	context: PATHS.app,

	entry: {
		app: ['webpack/hot/dev-server', './app/app.js']
	},

	output: {
		path: PATHS.app,
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['react', 'es2015']
				}
			},

			{
				test: /\.scss$/,
				loader: 'style!css!sass'
			}
		]
	},

	resovle: {
		extensions: ['', '.js', '.scss', '.jade'],
		modulesDirectory: ['node_modules']
	},
};
