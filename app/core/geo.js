const request = require('request-promise')

// TODO: check how can throw error when resp doesn't have status code 200, maybe put option: simple into request options?
exports.getCityCoordinates = cityName => {
  const url = 'http://nominatim.openstreetmap.org/search'

  const requestOptions = {
    headers: {
      'Accept-Language': 'en'
    },
    json: true,
    qs: {
      q: decodeURIComponent(cityName),
      format: 'jsonv2',
      addressdetails: 1,
      namedetails: 1
    }
  }

  return request.get(url, requestOptions)
    .then(resp => resp.filter(item => {
      return item.type === 'city' ||
        item.type === 'town'
    }))
    .then(resp => {
      try {
        // TODO: Handle resp[0] for undefined values
        const { lat, lon: lng, namedetails, address } = resp[0]
        const alternativeNameOfCity = namedetails.alt_name
        const cityName = address.city || address.town
        let formattedCityName

        // TODO: Fix Jerusalem -> Jerkku bug

        // TODO: Solve the case of New York City into New York as
        // alternative name
        if (alternativeNameOfCity &&
            cityName &&
            // TODO: Solve Brazilia -> RA 1 as alternate name bug
            alternativeNameOfCity.length > 4 &&
            alternativeNameOfCity.length <
            cityName.length) {
          formattedCityName = alternativeNameOfCity
        } else {
          formattedCityName = cityName
        }

        return { lat, lng, formattedCityName }
      } catch (err) {
        return Promise.reject(err)
      }
    })
}

exports.getTimezoneId = ({ lat, lng }) => {
  const url = 'http://ws.geonames.org/timezoneJSON'

  const requestOptions = {
    json: true,
    qs: {
      username: process.env.GEO_NAMES_USERNAME,
      lat,
      lng
    }
  }

  return request.get(url, requestOptions)
    .then(resp => resp.timezoneId)
}
