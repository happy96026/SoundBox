import express = require('express')

const app = express()

app.get('/', (_, res) => {
  res.send('hi\n')
})

export { app }
