const test = require('tape')
const { getCityCoordinates } = require('./geo')

test('getCityCoordinates = New York', async t => {
  const { formattedCityName } = await getCityCoordinates('New York')

  t.equal(formattedCityName, 'New York')

  t.end()
})

test('getCityCoordinates = new york', async t => {
  const { formattedCityName } = await getCityCoordinates('new york')

  t.equal(formattedCityName, 'New York')

  t.end()
})

test('getCityCoordinates = newyork', async t => {
  const { formattedCityName } = await getCityCoordinates('newyork')

  t.equal(formattedCityName, 'New York')

  t.end()
})
