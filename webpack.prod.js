const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/client/index.js',
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin()],
      },
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        // loaders: [
        //     {
        //       test: /.s?css$/,
        //       use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        //     },
        //   ],
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ]
    },
   
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new WorkboxPlugin.GenerateSW()
    ],
}
