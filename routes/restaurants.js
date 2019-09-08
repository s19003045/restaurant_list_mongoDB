// 建立一個 router 實例
const express = require('express')
const router = express.Router()

// import mongoose Schema, named Restaurant
const Restaurant = require('../models/restaurant')

const restaurantObj = require('../models/restaurantObj')

// -----------route setting -----------
// review 所有餐廳：GET /
router.get('/', (req, res) => {
  return res.redirect('/')
})


// 新增餐廳頁面：GET /new
router.get('/new', (req, res) => {
  // res.send('新增 Todo 頁面')
  res.render('new', { restaurantObj })
})

// 新增餐廳動作：POST /
router.post('/', (req, res) => {

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
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('show', { restaurant: restaurant })
  })
})

// 編輯餐廳頁面：GET /: id / edit
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant })
  })
})

// 編輯餐廳動作：POST  /: id / edit
router.post('/:id/edit', (req, res) => {

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
router.post('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove((err) => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})


module.exports = router