const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

const baseConfig = {
	resolve: {
		alias: {
			//jquery: '',
			//bootstrap: ''
		}
	},
	module: {
		rules: [
			{ test: /\.(png|jpg|jpeg|gif|ico|bmp)$/, use: 'url-loader' },
			{ test: /\.less$/, use: 'less-loader' },
			{ test: /\.css$/, use: 'css-loader' },
			{ test: /\.ts$/, use: 'ts-loader' },
			{ test: /\.html$/, use: [{ loader: 'html-loader', options: { minimize: true } }] }
		]
	}
};

const appConfig = {
	target: 'electron-renderer',
	entry: paths.ui('index.ts'),
	output: {
		filename: 'app.js',
		path: paths.dist()
	},
	plugins: [new HtmlWebpackPlugin()]
};


module.exports = [appConfig].map(config => Object.assign({}, baseConfig, config));