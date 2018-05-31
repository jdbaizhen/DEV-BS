let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');
let webpack = require('webpack');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let glob=require('glob');
let PurifyCSSPlugin = require("purifycss-webpack");
let ExtractTextWebpack=require("extract-text-webpack-plugin");

let isDev = process.env.NODE_ENV ==='develop';
let isTest = process.env.NODE_ENV ==='test';
let testIp='112.23.225.58:8080';
let port = 2345;
let serverPort = 1208;
let host = 'localhost';
let domain='/';

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, "./build"),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},{
				test: /\.(less|css)$/,
				loader:ExtractTextWebpack.extract({fallback:'style-loader',use:[
					'css-loader',"postcss-loader",'less-loader']})
			},{
				test: /\.(eot|svg|woff|woff2|ttf|jpg|jpeg|png|gif)$/,
				loader: "url-loader",
				options: {
					limit: 8192,
					outputPath:'images/'
				}
			},{
				test: /\.json$/,
				loader: 'json-loader',
				options: {outputPath:'json/'}
			}
		]
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname,"./src"),
		},
		extensions: ['.js', '.jsx']
	},
	context: __dirname,
	devtool: isDev||isTest ?'source-map' : '',
	devServer: {
		contentBase:path.resolve(__dirname, "./build"),
		stats: {colors: true},
		hot: true,
		inline:true,
		port: port,
		compress:true,
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		proxy: [
			{
				context:['/**'],
				target: isTest?`http://${testIp}`:`http://${host}:${serverPort}`,
				// pathRewrite: {"^/aio": ""}
			}
		]
	},
	plugins: [
		new PurifyCSSPlugin({
			paths: glob.sync(path.join(__dirname, 'src/*.html')),
		}),
		new ExtractTextWebpack('style.css'),
		new CleanWebpackPlugin(['build']),
		new OpenBrowserWebpackPlugin({url: `http://${host}:${port}`}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': isDev ? JSON.stringify('develop') : JSON.stringify('production')}
		}),
		new HtmlWebpackPlugin({
			title:'',
			template: './index.html'
		}),
	]
};