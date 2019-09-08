// 建立一個 router 實例
const express = require('express')
const router = express.Router()

// import mongoose Schema, named Restaurant
const Restaurant = require('../models/restaurant')


// 搜尋餐廳：GET
router.get('/', (req, res) => {
  console.log(req.query)
  const searchKeyword = req.query.keyword

  const sortByKey = req.query.key
  const sortByOrder = req.query.order
  const sortObj = new Object()
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
      return res.render('index', { restaurants: restaurantsFilter, keyword: searchKeyword })
    })
})

// router.get('/', (req, res) => {
//   const target = req.query.target
//   const sort = req.query.sort

//   console.log(target)
//   console.log(sort)
//   console.log(Boolean(req.query))
//   // Restaurant.find()
//   //   .sort
//   //   .exec((err,restaurants)=>{



//   //   })
//   if (!target == undefined) {
//     switch (target) {
//       case 'name':
//         switch (sort) {
//           case 'asc':
//             Restaurant.find({})
//               .sort({ name: 'asc' })
//               .exec((err, restaurants) => {
//                 if (err) return console.error(err)
//                 res.render('index', { restaurants: restaurants })
//               })
//             break
//           case 'desc':
//             Restaurant.find({})
//               .sort({ name: 'desc' })
//               .exec((err, restaurants) => {
//                 if (err) return console.error(err)
//                 res.render('index', { restaurants: restaurants })
//               })
//             break
//         }
//       case 'category':
//         switch (sort) {
//           case 'asc':
//             Restaurant.find({})
//               .sort({ category: 'asc' })
//               .exec((err, restaurants) => {
//                 if (err) return console.error(err)
//                 res.render('index', { restaurants: restaurants })
//               })
//             break
//           case 'desc':
//             Restaurant.find({})
//               .sort({ category: 'desc' })
//               .exec((err, restaurants) => {
//                 if (err) return console.error(err)
//                 res.render('index', { restaurants: restaurants })
//               })
//             break
//         }
//       case 'rating':
//         switch (sort) {
//           case 'asc':
//             Restaurant.find({})
//               .sort({ rating: 'asc' })
//               .exec((err, restaurants) => {
//                 if (err) return console.error(err)
//                 res.render('index', { restaurants: restaurants })
//               })
//             break
//           case 'desc':
//             Restaurant.find({})
//               .sort({ rating: 'desc' })
//               .exec((err, restaurants) => {
//                 if (err) return console.error(err)
//                 res.render('index', { restaurants: restaurants })
//               })
//             break
//         }
//       default:

//     }
//   } else {
//     Restaurant.find({})
//       .sort({})
//       .exec((err, restaurants) => {
//         if (err) return console.error(err)
//         res.render('index', { restaurants: restaurants })
//       })
//   }

// })


module.exports = router
