const Location = require('./location')
const Rainfall = require('./rainfall')

Location.deleteMany()
  .then(() => {
    console.log('Deleted Location records')
    process.exit()
  })


Rainfall.deleteMany()
  .then(() => {
    console.log('Deleted Rainfall records')
    process.exit()
  })