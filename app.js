const express = require('express')
const path = require('path')
const request = require('request-promise')

const app = express()

app.use(express.static(path.resolve(__dirname, 'build')))

function sleep (millis) {
  return new Promise(resolve => setTimeout(resolve, millis))
}

app.get('/api/offset/:city', async (req, res) => {
  const inputCity = req.params.city

  const resp = await (request.get(`http://maps.googleapis.com/maps/api/geocode/json?address=${inputCity}&sensor=false`)
    .then(resp => JSON.parse(resp)))

  await sleep(1000)

  const formattedCityName = resp.results[0].address_components[0].long_name

  res.json({ city: formattedCityName })
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

module.exports = app
