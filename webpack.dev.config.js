const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: {
        'bundle': path.join(__dirname, '/src/js/index'),
        'style': path.join(__dirname, '/src/less/style.less')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname , '/dist/')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'raw-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.jsx?$/,
                use: [
                    'react-hot-loader',
                    'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        extensions: ['.js'],
        alias: {
            'CHistory' : path.resolve(__dirname, 'src/js/history.js'),
        }
    },
    node: {
        net: 'empty',
        dns: 'empty'
    },
    devServer:{
        hot: true,
        inline: true,
        host: '0.0.0.0',
        port: 3000,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: {
            index: './index.html'
        }
    }
};