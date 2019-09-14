// 建立一個 router 實例
const express = require('express')
const router = express.Router()

// import mongoose Schema, named Restaurant
const Restaurant = require('../models/restaurant')

const restaurantObj = require('../models/restaurantObj')

// import handlebars
const handlebars = require('handlebars')

// import autenticated ：確認使用者是否已登入
const { authenticated } = require('../config/auth')


// -----------route setting -----------
// review 所有餐廳：GET /
router.get('/', authenticated, (req, res) => {
  return res.redirect('/')
})

// 新增餐廳頁面：GET /new
router.get('/new', authenticated, (req, res) => {
  // res.send('新增 Todo 頁面')
  res.render('new', { restaurantObj })
})

// 新增餐廳動作：POST /
router.post('/', authenticated, (req, res) => {

  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    description: req.body.description
  })

  restaurant.save((err) => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// review 單一餐廳：GET /: id
router.get('/:id', authenticated, (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('show', { restaurant: restaurant })
  })
})

// 編輯餐廳頁面：GET /: id / edit
router.get('/:id/edit', authenticated, (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant })
  })
})

// 編輯餐廳動作：POST  /: id / edit
router.put('/:id/edit', authenticated, (req, res) => {

  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.google_map = req.body.google_map
    restaurant.description = req.body.description

    restaurant.save((err) => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

// 刪除餐廳動作：POST /: id / delete
router.delete('/:id/delete', authenticated, (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove((err) => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// exports router
module.exports = router