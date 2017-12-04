// Ensure we have an established connection to the database
const mongoose = require('./init')

// Define out model
const Location = mongoose.model('Location', { 
  name: {
  type: String,
  required: [true, 'name required']},
})

module.exports = Location