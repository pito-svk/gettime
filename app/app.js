const express = require('express')
const path = require('path')
const request = require('request-promise')
const moment = require('moment-timezone')
const { compileAndHotReload } = require('./devUtils')
const { getCityCoordinates } = require('./core/geo')

const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'build')))
} else {
  compileAndHotReload(app)
}

function getTimezoneId ({ lat, lng }) {
  const timezoneInfoUrl = `http://ws.geonames.org/timezoneJSON?lat=${lat}&lng=${lng}&username=${process.env.GEO_NAMES_USERNAME}`

  return request.get(timezoneInfoUrl)
    .then(resp => JSON.parse(resp))
    .then(resp => resp.timezoneId)
}

// Send different status when error happens, this also need to be handled on React side to check if fetch does not return status code 200
app.get('/api/offset/:city', async (req, res) => {
  try {
    // Solve issue with São Paulo for example
    const inputCity = encodeURIComponent(req.params.city)

    const { lat, lng, formattedCityName } = await getCityCoordinates(inputCity)

    const timezoneId = await getTimezoneId({ lat, lng })

    const cityTime = moment.utc()
      .tz(timezoneId)
      .format('hh:mm A')

    return res.json({
      city: formattedCityName,
      time: cityTime
    })
  } catch (err) {
    return res
      .status(400)
      .json(err)
  }
})

module.exports = app
