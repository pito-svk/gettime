const express = require('express')
const path = require('path')
const moment = require('moment-timezone')
const { compileAndHotReload } = require('./devUtils')
const { getCityCoordinates, getTimezoneId } = require('./core/geo')

const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'build')))
} else {
  compileAndHotReload(app)
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
