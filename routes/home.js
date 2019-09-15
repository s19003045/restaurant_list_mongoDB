// 建立一個 router 實例
const express = require('express')
const router = express.Router()

// import mongoose Schema, named Restaurant
const Restaurant = require('../models/restaurant')

// import autenticated ：確認使用者是否已登入
const { authenticated } = require('../config/auth')

// review 所有餐廳：GET / 或 GET / restaurants
router.get('/', authenticated, (req, res) => {
  const target = req.query.target
  const sort = req.query.sort
  console.log(req.user._id)

  console.log(target)
  console.log(sort)
  console.log(Boolean(req.query))

  if (!target == undefined) {
    switch (target) {
      case 'name':
        switch (sort) {
          case 'asc':
            Restaurant.find({ userId: req.user._id })
              .sort({ name: 'asc' })
              .exec((err, restaurants) => {
                if (err) return console.error(err)
                res.render('index', { restaurants: restaurants })
              })
            break
          case 'desc':
            Restaurant.find({ userId: req.user._id })
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
            Restaurant.find({ userId: req.user._id })
              .sort({ category: 'asc' })
              .exec((err, restaurants) => {
                if (err) return console.error(err)
                res.render('index', { restaurants: restaurants })
              })
            break
          case 'desc':
            Restaurant.find({ userId: req.user._id })
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
            Restaurant.find({ userId: req.user._id })
              .sort({ rating: 'asc' })
              .exec((err, restaurants) => {
                if (err) return console.error(err)
                res.render('index', { restaurants: restaurants })
              })
            break
          case 'desc':
            Restaurant.find({ userId: req.user._id })
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
    Restaurant.find({ userId: req.user._id })
      .sort({})
      .exec((err, restaurants) => {
        if (err) return console.error(err)
        res.render('index', { restaurants: restaurants })
      })
  }

})


module.exports = router
