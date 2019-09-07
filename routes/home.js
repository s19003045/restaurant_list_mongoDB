// 建立一個 router 實例
const express = require('express')
const router = express.Router()

// import mongoose Schema, named Restaurant
const Restaurant = require('../models/restaurant')


// review 所有餐廳：GET / 或 GET / restaurants
router.get('/', (req, res) => {
  // res.send('review 所有餐廳')
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    res.render('index', { restaurants: restaurants })
  })
})

module.exports = router
