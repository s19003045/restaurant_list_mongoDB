// app.js
// import modules
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

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
  res.send('編輯餐廳頁面')
})

// 編輯餐廳動作：POST / restaurants /: id / edit
app.post('/restaurants/:id/edit', (req, res) => {
  res.send('編輯餐廳動作')
})

// 新增餐廳頁面：/restaurants/new
app.get('/restaurants/new', (req, res) => {
  res.send('新增餐廳頁面')
})

// 新增餐廳動作：POST / restaurants
app.post('/restaurants', (req, res) => {
  res.send('新增餐廳動作')
})


// 刪除餐廳動作：POST / restaurants /: id / delete
app.post('/restaurants/:id/delete', (req, res) => {
  res.send('刪除餐廳動作')
})

// 搜尋餐廳：GET
app.get('/restaurants/search', (req, res) => {
  res.send('搜尋餐廳')
})

// ----------------- Server start---------------
// create server
app.listen(port, () => {
  console.log(`server listen to http://localhost:${port}`)
})

