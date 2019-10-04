import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import common from './webpack.common'

const newPlugins = [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()]

const entry = Array.isArray(common.entry) ? ['webpack/hot/signal'].concat(common.entry) : common.entry
const plugins = common.plugins != null ? common.plugins.concat(newPlugins) : newPlugins

const config: webpack.Configuration = {
  ...common,
  ...{
    entry,
    mode: 'development',
    devtool: 'inline-source-map',
    externals: [nodeExternals({ whitelist: ['webpack/hot/signal'] })],
    plugins
  }
}

export default config
