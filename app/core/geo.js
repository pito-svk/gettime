const request = require('request-promise')
const winston = require('winston')
const { redisClient } = require('../utils/redis')

function getCachedSpellCheckedCity (redisInstance, cityName) {
  return redisInstance.getAsync(cityName)
}

function saveSpellCheckedCityToCache (redisInstance, inputCity, spellCheckedCityName) {
  return redisInstance.setAsync(inputCity, spellCheckedCityName)
}

function spellCheck (redisInstance, text) {
  const url = 'https://api.cognitive.microsoft.com/bing/v7.0/spellcheck'

  const requestOptions = {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY
    },
    json: true,
    qs: {
      text: decodeURIComponent(text),
      mode: 'proof'
    }
  }

  return request.post(url, requestOptions).then(async resp => {
    let spellCheckedCityName

    if (resp &&
        resp.flaggedTokens &&
        resp.flaggedTokens[0] &&
        resp.flaggedTokens[0].suggestions &&
        resp.flaggedTokens[0].suggestions[0] &&
        resp.flaggedTokens[0].suggestions[0].suggestion) {
      spellCheckedCityName = resp.flaggedTokens[0].suggestions[0].suggestion

      await saveSpellCheckedCityToCache(redisInstance, text, spellCheckedCityName)
    }

    return spellCheckedCityName
  })
  .catch(err => {
    winston.error(err)
    throw err
  })
}

function onlyCityOrTown (arr) {
  return arr.filter(item => {
    return item.type === 'city' || item.type === 'town'
  })
}

function parseCoordsAndFormattedCity (response) {
  // TODO: Handle resp[0] for undefined values
  const { lat, lon: lng, namedetails, address } = response[0]
  const alternativeNameOfCity = namedetails.alt_name
  const cityName = address.city || address.town
  let formattedCityName

  if (
    alternativeNameOfCity &&
    cityName &&
    alternativeNameOfCity.length > 6 &&
    alternativeNameOfCity.length < cityName.length
  ) {
    formattedCityName = alternativeNameOfCity
  } else {
    formattedCityName = cityName
  }

  return { lat, lng, formattedCityName }
}

function composeGetCityCoordinatesRequestOptions (cityName) {
  return {
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
}

exports.getCityCoordinates = cityName => {
  try {
    const url = 'http://nominatim.openstreetmap.org/search'

    const requestOptions = composeGetCityCoordinatesRequestOptions(cityName)

    return request
      .get(url, requestOptions)
      .then(resp => onlyCityOrTown(resp))
      .then(async resp => {
        try {
          return parseCoordsAndFormattedCity(resp)
        } catch (err) {
          try {
            const redisInstance = redisClient()

            const cachedSpellCheckedCity = await getCachedSpellCheckedCity(redisInstance, cityName)

            const spellCheckedCityName = cachedSpellCheckedCity || await spellCheck(redisInstance, cityName)

            const requestOptions = composeGetCityCoordinatesRequestOptions(
              spellCheckedCityName
            )

            return request
              .get(url, requestOptions)
              .then(resp => onlyCityOrTown(resp))
              .then(resp => {
                try {
                  return parseCoordsAndFormattedCity(resp)
                } catch (err) {
                  return Promise.reject(err)
                }
              })
          } catch (err) {
            return Promise.reject(err)
          }
        }
      })
  } catch (err) {
    winston.error(err)
    throw err
  }
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

  return request.get(url, requestOptions).then(resp => resp.timezoneId)
}
