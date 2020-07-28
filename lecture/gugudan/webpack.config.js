const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'eval', // hidden-source-map

    resolve: {
        extensions:['.jsx', '.js']
    },

    entry: {
        app: './client.jsx',
    },
    module:{
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                ['@babel/preset-env', {
                    targets: {
                        browsers: ['> 5% in KR', 'last 2 chrome versions'],
                    },
                    debug: true,
                }],
                '@babel/preset-react',
            ],
                plugins: ['@babel/plugin-proposal-class-properties'],
            },
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({debug: true}),
        
    ], //확장 프로그램
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'), // 현재 폴더안에 들어있는 dist 
    },

}