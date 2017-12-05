# Background
The task was to work in pairs to make a node api server to serve up weather rainfall data. 

# The challenges
- Work using pair programming, swapping roles between driver and navigator
- Create a weather tracking API: a user can enter the amount of rainfall for each day
- Mongoose Schema: Let each rainfall entry be classified by a city
- Create seeds.rb that populates Melbourne, Sydney, and Wellington from a weather API
- Create a function to return the rainfall in a month in a given city
- Create a function to work out the mean (average), median, and maximum rainfall in a month in a given city
- Create RESTful APIs for the above

or in summary:
- Create models to store weather data such as rainfall and a city
- Slurp data from an existing API to give you some data, and put it into your database
- Perform queries on *your* data to do averages etc

# Weather API's to choose from:
- https://www.apixu.com/
- https://superdevresources.com/weather-forecast-api-for-developing-apps/
- https://www.weatherbit.io/blog/post/top-3-free-weather-api-s-in-2017
- https://darksky.net/dev/docs
# Steps we took
1. Create new folder stormapp
1. create two new folders inside that called 'api' and 'react-web'
1. 'api' is going to be the backend folder.
1. create a file called server.js within the 'api' folder.
1. run `yarn init` when you're in the 'api' folder
1. run `yarn add express`
1. run `yarn add nodemon --dev`
1. Add to the resulting package.json file:
    ```
    "scripts": {
      "dev": "nodemon server.js"
    }
    ```
1. add boilerplate to server.js
    ```javascript
    const express = require('express')
    const bodyParser = require('body-parser')

    const server = express()

    //plugins
    server.use(bodyParser.json())

    server.listen(8001, (error) => {
      console.log('Server started at http://localhost:8001/')
    })
    ```
1. Add the gitignore file with vscode's CTRL + SHIFT + P: `add gitignore` and selecting the one for 'Node'
1. Copied the existing code from a past exercise (animals zoo express exercise) and then modified it where necessary for rainfall and locations.
1. When modifying the code to fit our app, we decided to try and have two different models. One for Rainfall data and one for locations. The rainfall data would then have a reference to a location, which we wanted to be validated against our database to check that a rainfall data object would only be saved if the location that it referenced already existed in the database as a location object.
1. start the mongodb server if it's not already running. On linux `sudo service mongodb start`
1. Create the seeds.js file in your models folder and then add it to the package.json file in the script section with the command `node models/seeds.js`
1. need to seed our database with data from an online weather API.
1. Going with [Dark Sky](https://darksky.net/dev/docs) (instructor provided api key in slack channel)
1. Example of a url accessing the api to retrieve data for a particular point in time:
    ```
    https://api.darksky.net/forecast/<insert API key here>/-37.8142,144.9632,2017-12-01T00:00:00+1100?exclude=currently,flags,hourly&units=si
    ```
1. The darksky api seems to provide rainfall data as a measurement not of daily mm but of 'intensity' for 'a given time' which means we can't discern the actual total rainfall per day so going with a different api: [Weatherbit](https://www.weatherbit.io/)
1. The weatherbit api is pretty unclear because it asks for a date range so not sure if it's going off midnight to midnight times, also there were discrepancies when comparing it to the data from BOM.gov.au for the same area and date.
1. Going back with darksky and just going to multiply their precipIntensity data value by 24 for the amount of hours in the day, assuming that it's value is average mm per hour for the day gets us values kind of close to those of bom.gov.au so figure that's good enough for an exercise that is actually on practicing our node programming.
1. It looks like when you require in a function from a different file you have to wrap it in curly braces

```javascript
const {rainfallForLocation } = require ('../darkSky')
```

as opposed to 

```javascript
const rainfallForLocation = require ('../darkSky')
```

however this is how you want it to be for models

```javascript
const Location = require ('../models/location')
```

1. NOTE: attempt to run the seeds resulted in unhandledPromiseRejection errors, we never truly figured that out, but found some other questionable code in our validation of a model so working on that.
1. See [this stack overflow advice on validators](https://stackoverflow.com/questions/16882938/how-to-check-if-that-data-already-exist-in-the-database-during-update-mongoose) which is relevant to our situation. This is the initial attempt by us to get a validator to work based on some code we had from a previous exercise but which was no good in the example of trying to use it within a validator.

```javascript
//example of how we tried to solve the validation problem but the issue with this approach is the .then is taking longer to finish than the block of code in the validator. As such it was finishing and returning true before the .then would complete and have a chance of setting the return value to false.

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
```
1. The stackoverflow mentioned in the previous post worked for us.
1. Moving onto attempting to get some frontend functionality as well.


## Tips and Tricks learned
### Example of deleting all models:

```
const DayRecord = require('./DayRecord')



DayRecord.deleteMany()

  .then(() => {

    console.log('Deleted day records')

    process.exit()

  })
```
### Allowing yarn drop and yarn reset:
```
"scripts": {

    "dev": "nodemon server.js",

    "seed": "node models/seeds.js",

    "drop": "node models/drop.js",

    "reset": "npm run drop && npm run seed"

  }
```

# Notes from the instructors walkthrough of his solution

* He added a default of 0 to his rainfall amount
* He only used one model as well, for him location was just a string in the 'DayRecord' model
* He specified that the combination of day and location should be unique via specifying them as unique.
* Demo'd the process.exit() command to prevent the app from stalling when he's doing seeding stuff
* Went with the darksky api highlighting it's time machine feature.
* Uses lodash for a _padstart function to ensure that his day value if less than 10 is padded with a 0 for a leading zero in prep for the api call which requires the leading zero for the day and month.
* He uses params functionality in the return statement to specify the params in the api call rather than hardcoding them into the url.
* He get's the returned data's forecast time and multiplies it by 1000 for the date value ??
* Lodash, inspired by ruby, gives you a function like this:
    ```
    //30.times do |n|

    //end 
    ```
    by doing this:
    ```javascript
    const _ = require('lodash')
    ⋮
    _.times(30, (n) =>{

    })
    ```
    He used the above to help seed his database.
* he uses map to return an array of promises from an array of forecasts, and then passes that to promise.all.
* uses some MONGODB operations to return a range.
     ```javascript
    fall.find({
      ty: query.city,
      te: {
        $gte : queryDateFrom,
        $lt : queryDateTo
      }
    })
    ```
* he avoids the problems of dealing with different date formats and just stored his dates as three separate attributes: year, month, day.
* (he didn't get up to implementing average rainfall)
