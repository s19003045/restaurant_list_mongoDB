// 建立一個 router 實例
const express = require('express')
const router = express.Router()

// import mongoose Schema, named Restaurant
const Restaurant = require('../models/restaurant')

// import handlebars
const handlebars = require('handlebars')


handlebars.registerHelper("ifEquals", function (v1, v2, options) {
  return v1 === v2 ? options.fn(this) : options.inverse(this);
})

// 搜尋餐廳：GET
router.get('/', (req, res) => {
  // console.log(req.query)
  console.log(typeof (req.query.key))
  const searchKeyword = req.query.keyword

  const sortByKey = req.query.key || 'name' //預設 key 為 name
  const sortByOrder = req.query.order || 'desc'  //預設 order 為 desc
  const sortObj = {}
  sortObj[sortByKey] = sortByOrder
  console.log(sortObj)

  // 使用定義好的 Schema 去 mongoDB 篩選
  Restaurant.find({})
    .sort(sortObj)
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      // 使用正規表達式來篩選符合 keyword 的資料
      const regexp = new RegExp(req.query.keyword, 'gi')
      const restaurantsFilter = restaurants.filter(item => {
        if (item.name.match(regexp) || item.category.match(regexp) || item.location.match(regexp)) {
          return item
        }
      })
      return res.render('index', { restaurants: restaurantsFilter, keyword: searchKeyword, query: req.query })
    })
})

module.exports = router
