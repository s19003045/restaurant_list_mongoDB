// app.js
// import modules
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const handlebars = require('handlebars')

// import body-parser and setting
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// import mongoose and connect to mongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })
const db = mongoose.connection

// import mongoose model
const Restaurant = require('./models/restaurant')
const restaurantObj = require('./models/restaurantObj')

// import method-override and use it
const methodOverride = require('method-override')
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// app.use('/',methodOverride('_method'))
// app.use()裡的第一個參數 path 被省略，因為 path 的預設是 '/'，所以，會針對收到的每一個 request 執行。 

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
app.use('/', require('./routes/home'))

app.use('/restaurants', require('./routes/restaurants'))

// ----------------- Server start---------------
// create server
app.listen(port, () => {
  console.log(`server listen to http://localhost:${port}`)
})

