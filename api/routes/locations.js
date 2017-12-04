const express = require('express')
const RainfallAtLocation = require('../models/location')

const router = express.Router()

// read all locations
router.get('/locations', (req, res) => {
  RainfallAtLocation.find()
    .then((locations) => {
      res.json(locations)
    })
})

//read single location
router.get('/locations/:id', (req, res) => {
  const id = req.params.id
  RainfallAtLocation.findById(id)
    .then((location) => {
      if (location) {
        res.json(location)
      }
      else {
        res.status(404).json({ error: 'RainfallAtLocation not found'})
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error.message })
    })
})

// create
router.post('/locations', (req, res) => {
  const attributes = req.body
  RainfallAtLocation.create(attributes)
    .then((location) => {
        res.status(201).json(location)
    })
    .catch((error) => {
      res.status(400).json({ error: error })
    })
})

// update
router.patch('/locations/:id', (req, res) => {
  const id = req.params.id
  const attributes = req.body
  RainfallAtLocation.findByIdAndUpdate({_id: id}, {$set: {name: attributes.name}}, {new: true, runValidators: true})
    .then((updatedRainfallAtLocation) => {
      res.status(201).json(updatedRainfallAtLocation)
    })
    .catch((error) => {
      res.status(400).json({ error: error })
    })
})

// destroy
router.delete('/locations/:id', (req, res) => {
  const id = req.params.id
  RainfallAtLocation.findByIdAndRemove(id)
    .then((location) => {
      if (location) {
        res.json(location)
      }
      else {
        res.status(404).json({ error: 'RainfallAtLocation not found'})
      }
    })
})

module.exports = router