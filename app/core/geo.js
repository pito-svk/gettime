const request = require('request-promise')

// TODO: check how can throw error when resp doesn't have status code 200, maybe put option: simple into request options?
exports.getCityCoordinates = cityName => {
  const url = process.env.GET_CITY_COORDINATES_URL

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
        const lat = resp[0].lat
        const lng = resp[0].lon
        const alternativeNameOfCity = resp[0].namedetails.alt_name
        const cityName = resp[0].address.city || resp[0].address.town
        let formattedCityName

        // Solve the case of New York City into New York as
        // alternative name
        if (alternativeNameOfCity &&
            cityName &&
            // Solve Brazilia -> RA 1 as alternate name bug
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
