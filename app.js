const express = require('express')
const path = require('path')
const request = require('request-promise')
const moment = require('moment-timezone')

const app = express()

app.use(express.static(path.resolve(__dirname, 'build')))

// TODO: check how can throw error when resp doesn't have status code 200, maybe put option: simple into request options?
function getCityCoordinates (cityName) {
  const geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&sensor=false`

  return request.get(geocodeUrl)
    .then(resp => JSON.parse(resp))
    .then(resp => {
      const lat = resp.results[0].geometry.location.lat
      const lng = resp.results[0].geometry.location.lng

      return { lat, lng }
    })
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
    const inputCity = req.params.city
    const { lat, lng } = await getCityCoordinates(inputCity)
    const timezoneId await getTimezoneId({ lat, lng })

    const cityTime = moment.utc()
      .tz(timezoneId)
      .format('hh:mm A')

    const formattedCityName = googleMapsResp.results[0].address_components[0].long_name

    return res.json({
      city: formattedCityName,
      time: cityTime
    })
  } catch (err) {
    return res.json(err)
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

module.exports = app
