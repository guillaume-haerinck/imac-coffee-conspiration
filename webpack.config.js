const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Assets path for ejs files, can be an external server
const envFile = require('./environment');

module.exports = {
    entry: {
        index: './src/pages/index/index.ts',
        forms: './src/pages/forms/forms.ts'
	},
	resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
		new ForkTsCheckerWebpackPlugin(),
        new StyleLintPlugin({
            syntax: 'scss',
            emitErrors: false,
            failOnError: false
        }),
        new ExtractTextPlugin('[name].bundle.css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/pages/index/index.ejs',
            chunks: ['index'],
            assetsUrl: envFile.environment.assetsUrl,
        }),
        new HtmlWebpackPlugin({
            filename: 'forms.html',
            template: './src/pages/forms/forms.ejs',
            chunks: ['forms'],
            assetsUrl: envFile.environment.assetsUrl,
        }),
        new CopyWebpackPlugin([{ from: './src/shared/assets/', to: envFile.environment.assetsAbsolutePath}]),
        new DashboardPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.ejs?$/,
                use: 'ejs-loader'
            },
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
                    transpileOnly: true // Checked in fork plugin
                }
            },
            {
                test:/\.scss$/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    devServer: {
        overlay: true,
        compress: true,
        hot: false
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
