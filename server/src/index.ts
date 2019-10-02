const HOST = '0.0.0.0'
const PORT = process.env.PORT === undefined ? 8003 : Number(process.env.PORT)

async function main (): Promise<any> {
  let { app } = await import('./app')

  if (process.env.NODE_ENV === 'development') {
    const webpack = await import('webpack')
    const { default: webpackConfig } = await import('../webpack.config')

    const compiler = webpack(webpackConfig)

    compiler.hooks.done.tap('ServerHMRPlugin', _ => {
      console.log('Sending signal SIGUSR2...')
      process.kill(process.pid, 'SIGUSR2')
    })

    compiler.watch({}, () => {})
  }

  const server = app.listen(PORT, HOST, () => {
    console.log(`Listening on ${HOST}:${PORT}...`)
  })

  if (module.hot != null) {
    module.hot.accept('./app', () => {
      async function accept (): Promise<void> {
        server.removeListener('request', app)
        ;({ app } = await import('./app'))
        server.on('request', app)
      }

      accept().catch(e => console.error(e))
    })
  }
}

main().catch(e => console.error(e))
