"use strict";
let path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CSSLoader = require("css-loader");
const urlLoader = require("url-loader");
const ExtractTextWebapckPlugin = require("extract-text-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },

      {
        test: /\.css$/,
        use: ExtractTextWebapckPlugin.extract({
          fallback: "vue-style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            css: ExtractTextWebapckPlugin.extract({ use: "css-loader" })
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{ loader: "url-loader", options: { limit: 8192 } }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ExtractTextWebapckPlugin("style.css"),
    new HtmlWebpackPlugin({
      title: "webpack-cli"
    })
  ],
  resolve: {
    extensions: [" ", ".js", ".json", ".vue", ".scss", ".css"]
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300, //防止重复保存频繁重新编译,300ms内重复保存不打包
    poll: 1000 //每秒询问的文件变更的次数
  },
  devServer: {
    contentBase: path.resolve(__dirname, "src"),
    host: "localhost",
    port: 8080,
    open: true,
    hot: true
  }
};
