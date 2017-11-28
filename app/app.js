const express = require('express')
const path = require('path')
const { compileAndHotReload } = require('./devUtils')
const { getOffset } = require('./features/offset')

const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'build')))
} else {
  compileAndHotReload(app)
}

app.get('/api/offset/:city', getOffset)

module.exports = app
