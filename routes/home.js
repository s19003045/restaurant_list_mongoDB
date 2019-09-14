// 建立一個 router 實例
const express = require('express')
const router = express.Router()

// import mongoose Schema, named Restaurant
const Restaurant = require('../models/restaurant')


// review 所有餐廳：GET / 或 GET / restaurants
router.get('/', (req, res) => {
  const target = req.query.target
  const sort = req.query.sort

  console.log(target)
  console.log(sort)
  console.log(Boolean(req.query))

  if (!target == undefined) {
    switch (target) {
      case 'name':
        switch (sort) {
          case 'asc':
            Restaurant.find({})
              .sort({ name: 'asc' })
              .exec((err, restaurants) => {
                if (err) return console.error(err)
                res.render('index', { restaurants: restaurants })
              })
            break
          case 'desc':
            Restaurant.find({})
              .sort({ name: 'desc' })
              .exec((err, restaurants) => {
                if (err) return console.error(err)
                res.render('index', { restaurants: restaurants })
              })
            break
        }
      case 'category':
        switch (sort) {
          case 'asc':
            Restaurant.find({})
              .sort({ category: 'asc' })
              .exec((err, restaurants) => {
                if (err) return console.error(err)
                res.render('index', { restaurants: restaurants })
              })
            break
          case 'desc':
            Restaurant.find({})
              .sort({ category: 'desc' })
              .exec((err, restaurants) => {
                if (err) return console.error(err)
                res.render('index', { restaurants: restaurants })
              })
            break
        }
      case 'rating':
        switch (sort) {
          case 'asc':
            Restaurant.find({})
              .sort({ rating: 'asc' })
              .exec((err, restaurants) => {
                if (err) return console.error(err)
                res.render('index', { restaurants: restaurants })
              })
            break
          case 'desc':
            Restaurant.find({})
              .sort({ rating: 'desc' })
              .exec((err, restaurants) => {
                if (err) return console.error(err)
                res.render('index', { restaurants: restaurants })
              })
            break
        }
      default:

    }
  } else {
    Restaurant.find({})
      .sort({})
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        res.render('index', { restaurants: restaurants })
      })
  }

})


module.exports = router
