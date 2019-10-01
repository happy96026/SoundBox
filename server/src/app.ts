import express = require('express')

const HOST = '0.0.0.0'
const PORT = process.env.PORT === undefined ? 8003 : Number(process.env.PORT)

async function main (): Promise<any> {
  const app = express()

  if (process.env.NODE_ENV === 'development') {
    const webpack = await import('webpack')
    const webpackConfig = await import('../webpack.config')
    const devMiddleware = await import('webpack-dev-middleware')
    const hotMiddleware = await import('webpack-hot-middleware')
    const compiler = webpack(webpackConfig.default)

    app.use(devMiddleware(compiler))
    app.use(hotMiddleware(compiler))
  }

  app.get('/', (_, res) => {
    res.send('hello\n')
  })

  app.listen(PORT, HOST, () => {
    console.log(`Listening on ${HOST}:${PORT}...`)
  })
}

main().catch(e => console.error(e))
