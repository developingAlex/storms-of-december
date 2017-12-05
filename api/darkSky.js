const axios = require('axios')
const locations = axios.create({
  baseURL: 'https://api.darksky.net/forecast/32d0988dc1e92701571405b0121b40ef'
})

function RainfallForLocation(lat, long, date) {
  return locations.get(`/${lat},${long},${date}T00:00:00+1100?exclude=currently,flags,hourly&units=si`)
}

module.exports = { RainfallForLocation }