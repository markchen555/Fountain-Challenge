const webpack = require('webpack');
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

const APP_DIR = path.resolve(__dirname, './src/index.js');
const BUILD_DIR = path.resolve(__dirname, './dist/');
const TEMPLATE_DIR = path.resolve(__dirname, './src/template.index.html');

module.exports = {
  entry: {
    app: APP_DIR,
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
            'react'
          ],
          plugins: [
            'transform-es2015-destructuring', 
            'transform-object-rest-spread'
          ]
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?url=false'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HTMLPlugin({
      template: TEMPLATE_DIR,
      inject: false,
    })
  ]
};
