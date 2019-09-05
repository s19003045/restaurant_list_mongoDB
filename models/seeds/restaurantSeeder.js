// import mongoose Schema
const Restaurant = require('../restaurant')

// import restaurant.json
const restaurantsList = require('./restaurant.json')

// import mongoose and connect to mongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })
const db = mongoose.connection

// actions if connect error
db.on('err', (err) => {
  if (err) return console.error(err)
})

// actions if connect success
db.once('open', (err) => {
  if (err) return console.error(err)
  console.log('connect to mongoDB successifully !')
})

// 迭代每一筆餐廳資料，以 Restaurant(mongoose Schema 之實例來儲存至 mongoDB)
restaurantsList.results.forEach(element => {
  Restaurant.create({
    name: element.name,
    name_en: element.name_en,
    category: element.category,
    image: element.image,
    location: element.location,
    phone: element.phone,
    google_map: element.google_map,
    rating: element.rating,
    description: element.description
  }, (err, restaurants) => {
    if (err) return console.error(err)

  })
});