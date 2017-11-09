const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.resolve(__dirname, 'build')))

app.get('/api/offset/:city', (req, res) => {
  res.json({ city: 'TODO' })
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

module.exports = app
