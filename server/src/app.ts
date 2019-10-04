import express from 'express'

const app = express()

app.get('/', (_, res) => {
  res.send('heee\n')
})

export { app }
