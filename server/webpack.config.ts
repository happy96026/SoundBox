import * as path from 'path'
import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const config: webpack.Configuration = {
  entry: ['webpack/hot/signal', './src/index'],
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/signal']
    })
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
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
