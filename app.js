const express = require('express')
const path = require('path')
const request = require('request-promise')
const moment = require('moment-timezone')

const app = express()

app.use(express.static(path.resolve(__dirname, 'build')))

// TODO: check how can throw error when resp doesn't have status code 200, maybe put option: simple into request options?
function getCityCoordinates (cityName) {
  const url = `http://nominatim.openstreetmap.org/search?q=${cityName}&format=jsonv2&addressdetails=1&namedetails=1`

  const requestOptions = {
    headers: {
      'Accept-Language': 'en'
    }
  }

  return request.get(url, requestOptions)
    .then(resp => JSON.parse(resp))
    .then(resp => resp.filter(item => {
      return item.type === 'city' ||
        item.type === 'town'
    }))
    .then(resp => {
      const lat = resp[0].lat
      const lng = resp[0].lon
      const alternativeNameOfCity = resp[0].namedetails.alt_name
      const cityName = resp[0].address.city || resp[0].address.town
      let formattedCityName

      // Solve the case of New York City into New York as
      // alternative name
      if (alternativeNameOfCity &&
          cityName &&
          alternativeNameOfCity.length <
          cityName.length) {
        formattedCityName = alternativeNameOfCity
      } else {
        formattedCityName = cityName
      }

      return { lat, lng, formattedCityName }
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
    return res.json(err)
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

module.exports = app
