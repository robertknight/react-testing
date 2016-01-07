var RewirePlugin = require('rewire-webpack');
var webpack = require('webpack');

module.exports = {
	entry: {
		app: ['./src/app', 'webpack/hot/dev-server'],
		tests: ['./tests/tests', 'webpack/hot/dev-server']
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},{
			test: /tests.*_test\.js$/,
			loader: 'mocha-loader!babel-loader'
		},{
			test: /node_modules\/(jsdom|node-fetch)/,
			loader: 'null-loader'
		}]
	},
	plugins: [
		new RewirePlugin(),
		new webpack.IgnorePlugin(/jsdom$/),
		new webpack.IgnorePlugin(/node-fetch$/)
	]
};
