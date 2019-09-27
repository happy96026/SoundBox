const express = require('express')

const HOST = '0.0.0.0'
const PORT = process.env.PORT

const app = express()

app.get('/', (req, res) => {
  res.send('Hello world\n')
})

app.listen(PORT, HOST)
