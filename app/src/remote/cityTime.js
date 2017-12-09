import fetch from 'isomorphic-fetch'

function getCityTime (city) {
  const url = `api/offset/${city}`

  return fetch(url)
    .then(resp => {
      if (!resp.ok) {
        return Promise.reject(resp.statusText)
      }

      return resp.json()
    })
}

export { getCityTime }
