const test = require('tape')
const { getCityCoordinates } = require('./geo')

function sleep (seconds) {
  return new Promise(resolve => setTimeout(resolve, 1000 * seconds))
}

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

test('getCityCoordinates = Bratislava', async t => {
  const { formattedCityName } = await getCityCoordinates('Bratislava')

  t.equal(formattedCityName, 'Bratislava')

  t.end()
})

test('getCityCoordinates = bratislava', async t => {
  const { formattedCityName } = await getCityCoordinates('bratislava')

  t.equal(formattedCityName, 'Bratislava')

  t.end()
})

test('getCityCoordinates = Brtislava', async t => {
  // Solve Bing rate limit
  await sleep(1)

  const { formattedCityName } = await getCityCoordinates('Brtislava')

  t.equal(formattedCityName, 'Bratislava')

  t.end()
})
