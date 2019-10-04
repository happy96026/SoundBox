import { app } from './app'

const HOST = '0.0.0.0'
const PORT = process.env.PORT === undefined ? 8000 : Number(process.env.PORT)

async function main (): Promise<any> {
  let currentApp = app

  if (process.env.NODE_ENV === 'development') {
    const { default: webpack } = await import('webpack')
    const { default: webpackConfig } = await import('../webpack.dev')

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
      server.removeListener('request', currentApp)
      server.on('request', app)
      currentApp = app
    })
  }
}

main().catch(e => console.error(e))
