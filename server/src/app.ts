import express from 'express'
import webpack from 'webpack'
import webpackConfig from '../webpack.config'

const HOST = '0.0.0.0'
const PORT = process.env.PORT === undefined ? 8003 : Number(process.env.PORT)

const app = express()

app.get('/', (_, res) => {
  res.send('hello\n')
})

app.listen(PORT, HOST, () => {
  console.log(`Listening on ${HOST}:${PORT}...`)
})
