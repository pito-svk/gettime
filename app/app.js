const express = require('express')
const path = require('path')
const moment = require('moment-timezone')
const { compileAndHotReload } = require('./devUtils')
const { getCityCoordinates, getTimezoneId } = require('./core/geo')
const { getOffset } = require('./features/offset')

const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'build')))
} else {
  compileAndHotReload(app)
}

// Send different status when error happens, this also need to be handled on React side to check if fetch does not return status code 200
app.get('/api/offset/:city', getOffset)

module.exports = app
