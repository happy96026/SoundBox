import express from 'express'

const app = express()

app.get('/', (_, res) => {
  res.send('hello\n')
})

export { app }
