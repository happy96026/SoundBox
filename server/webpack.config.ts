import * as path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import webpack = require('webpack')
import nodeExternals = require('webpack-node-externals')

const config: webpack.Configuration = {
  entry: ['webpack-hot-middleware/client', './src/app'],
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack-hot-middleware/client']
    })
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin()
  ]
}

export default config
