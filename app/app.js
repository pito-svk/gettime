const express = require('express')
const path = require('path')
const { compileAndHotReload } = require('./devUtils')
const { getOffset } = require('./features/offset')

const app = express()

app.get('/api/offset/:city', getOffset)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'build')))
} else {
  compileAndHotReload(app)
}

module.exports = app
