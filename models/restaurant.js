// import mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create Schema instance
const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    // required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    // required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  google_map: {
    type: String,
    // required: true
  },
  rating: {
    type: Number,
    // required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  //關聯 users model
    index: true,
    required: true
  }
})

// exports RestaurantSchema as Restaurant
module.exports = mongoose.model('Restaurant', RestaurantSchema)

