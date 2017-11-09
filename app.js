const express = require('express')
const path = require('path')
const request = require('request-promise')

const app = express()

app.use(express.static(path.resolve(__dirname, 'build')))

app.get('/api/offset/:city', async (req, res) => {
  const inputCity = req.params.city

  const googleMapsResp = await (request.get(`http://maps.googleapis.com/maps/api/geocode/json?address=${inputCity}&sensor=false`)
    .then(resp => JSON.parse(resp)))

  const lat = googleMapsResp.results[0].geometry.location.lat
  const lng = googleMapsResp.results[0].geometry.location.lng

  const geoNamesResp = await (request.get(`http://ws.geonames.org/timezoneJSON?lat=${lat}&lng=${lng}&username=${process.env.GEO_NAMES_USERNAME}`)
    .then(resp => JSON.parse(resp)))

  const formattedCityName = googleMapsResp.results[0].address_components[0].long_name

  res.json({ city: formattedCityName })
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

module.exports = app
