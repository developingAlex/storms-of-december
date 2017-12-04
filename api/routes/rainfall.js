const express = require('express')
const Rainfall = require('../models/rainfall')

const router = express.Router()

// create
router.post('/rainfall', (req, res) => {
  const attributes = req.body
  Rainfall.create(attributes)
    .then((rainfall) => {
        res.status(201).json(rainfall)
    })
    .catch((error) => {
      res.status(400).json({ error: error })
    })
})

module.exports = router