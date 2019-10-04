import webpack from 'webpack'
import common from './webpack.common'

const config: webpack.Configuration = {
  ...common,
  ...{
    mode: 'production',
    devtool: 'source-map'
  }
}

export default config
