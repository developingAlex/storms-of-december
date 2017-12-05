//example of how we tried to solve the validation problem but the issue with this approach is the .then is taking longer to finish than the block of code in the validator..

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
      validator: function(locationProvided){
        let retVal = true;
        const retLoc = Location.findById(locationProvided)
        .then((location) =>{
          if (location){
            retVal = true            
            console.log("location matched one in our db")
          }
          else{
            console.log(`couldn't find location for id ${locationProvided}`)
            retVal = false
          }
        })
        .catch((error) =>{
          console.log('error: ', error.message)
          retVal = false
        })
        console.log(retVal)
        return retVal
      }
    }
    }
  }
)

module.exports = Rainfall