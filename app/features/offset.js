const winston = require('winston')
const moment = require('moment-timezone')
const { getCityCoordinates, getTimezoneId } = require('../core/geo')

// Send different status when error happens, this also need to be handled on React side to check if fetch does not return status code 200
exports.getOffset = async (req, res, next) => {
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
    winston.log('error', err)
    return res
      .status(400)
      .json(err)
  }
}
