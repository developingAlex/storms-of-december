// Ensure we have an established connection to the database
const mongoose = require('./init')
const Location = require('./location')
var Schema = mongoose.Schema

// Define our model
const Rainfall = mongoose.model('Rainfall', { 
  date: {
    type: String,
    required: [true, 'date required']},
  amount: {
    type: Number,
    required: [true, 'amount in mm is required']},
  location: {
    type: Schema.Types.ObjectId, 
    ref: 'Location',
    required: [true, 'location is required'],
    validate: {
      validator: function(locationProvided, cb){       
        Location.findById(locationProvided, function (err, docs) {
          cb(docs)
        })
      }
    }
    }
  }
)

module.exports = Rainfall