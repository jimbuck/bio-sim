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

const mainConfig = {
	target: 'electron-main',
	entry: paths.src('main.ts'),
	output: {
		filename: 'main.js',
		path: paths.dist()
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


module.exports = [appConfig, mainConfig].map(config => Object.assign({}, baseConfig, config));