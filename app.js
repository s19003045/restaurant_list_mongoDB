// app.js
// import modules
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

// import body-parser and setting
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// import mongoose and connect to mongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })
const db = mongoose.connection

// import mongoose model
const Restaurant = require('./models/restaurant')

// actions if connect error
db.on('err', (err) => {
  if (err) return console.error(err)
})

// actions if connect success
db.once('open', (err) => {
  if (err) return console.error(err)
  console.log('connect to mongoDB successifully !')
})

// setting template engine
app.engine('handlebars', exphbs('defaultLayout: main'))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))


// ----------------- Route Setting---------------

// review 所有餐廳：GET / 或 GET / restaurants
app.get('/', (req, res) => {
  // res.send('review 所有餐廳')
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    res.render('index', { restaurants: restaurants })
  })
})

app.get('/restaurants', (req, res) => {
  res.redirect('/')
})

// review 單一餐廳：GET / restaurants /: id
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('show', { restaurant: restaurant })
  })
})

// 編輯餐廳頁面：GET / restaurants /: id / edit
app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
})

// 編輯餐廳動作：POST / restaurants /: id / edit
app.post('/restaurants/:id/edit', (req, res) => {

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


// 新增餐廳頁面：/restaurants/new
app.get('/restaurant/new', (req, res) => {
  // res.send('新增 Todo 頁面')
  res.render('new')
})

// 新增餐廳動作：POST / restaurants
app.post('/restaurants', (req, res) => {

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


// 刪除餐廳動作：POST / restaurants /: id / delete
app.post('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove((err) => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// 搜尋餐廳：GET
app.get('/restaurants/search', (req, res) => {
  res.redirect('/')
})

// ----------------- Server start---------------
// create server
app.listen(port, () => {
  console.log(`server listen to http://localhost:${port}`)
})

