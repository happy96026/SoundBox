import * as path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import webpack = require('webpack')
import nodeExternals = require('webpack-node-externals')
import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const config: webpack.Configuration = {
  entry: ['webpack/hot/poll?1000', './src/index'],
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ],
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
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ]
}

export default config
