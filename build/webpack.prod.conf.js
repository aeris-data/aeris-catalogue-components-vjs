'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const PACKAGE = require('../package.json')
const buildVersion = PACKAGE.version
const buildName = PACKAGE.name

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: './src/lib/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: buildName + '_' + buildVersion + '.js'
  },
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new CleanWebpackPlugin(['dist/*.*'], {
      root: path.resolve(__dirname, '../')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    })
  ]
})

module.exports = webpackConfig
