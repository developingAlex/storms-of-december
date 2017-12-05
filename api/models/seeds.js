const mongoose = require('./init')
const Location = require('./location')
const Rainfall = require('./rainfall')
const { RainfallForLocation } = require('../darkSky')

// Location.create({ name: "Melbourne"})
// Location.create({ name: "Sydney" })
// Location.create({ name: "Wellington" })

// RainfallForLocation(-37.8142, 144.9632, '2017-12-02')
//   .then((res) => {
//     Rainfall.create({ 
//       date: "December 1st 2017",
//       location: "5a2611ef30ca0cc5d37880e3",
//       amount: res.data.daily.data[0].precipIntensity * 24
//     })
//     .catch((error) => {
//       console.log(error.message)
//     })
//   })

// RainfallForLocation(-33.8688, 151.2093, '2017-12-02')
//   .then((res) => {
//     Rainfall.create({ 
//       date: "December 1st 2017",
//       location: "5a2611ef30ca0cc5d37880e4",
//       amount: res.data.daily.data[0].precipIntensity * 24
//     })
//     .catch((error) => {
//       console.log(error)
//     })
//   })

// RainfallForLocation(-41.2865, 174.7762, '2017-12-02')
//   .then((res) => {
//     Rainfall.create({ 
//       date: "December 1st 2017",
//       location: "5a2611ef30ca0cc5d37880e5",
//       amount: res.data.daily.data[0].precipIntensity * 24
//     })
//     .catch((error) => {
//       console.log(error)
//     })
//   })