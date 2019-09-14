// app.js
// import modules
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

// 判別開發環境
// 如果不是 production 模式
if (process.env.NODE_ENV !== 'production') {
  // 使用 dotenv 讀取 .env 檔案
  require('dotenv').config()
}

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

// import passport
const passport = require('passport')
// import express-session
const session = require('express-session')
// import connect-flash
const flash = require('connect-flash')

// import method-override and use it
const methodOverride = require('method-override')
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// app.use('/',methodOverride('_method'))
// app.use()裡的第一個參數 path 被省略，因為 path 的預設是 '/'，所以，會針對收到的每一個 request 執行。 

// set session
// ※注意：app.use(session({})) 必須設定在 app.use(passport.session()) 之前
app.use(session({
  secret: 'hello world', //用來簽章 sessionID 的cookie, 可以是一secret字串或是多個secret組成的一個陣列
  resave: false,
  saveUninitialized: true,
}))

// passport initialize
app.use(passport.initialize())

// 如果應用程式使用 passport 來驗證使用者，並且會持續用到 login session，則必須使用 passport.session() 這個 middleware
app.use(passport.session())

// 載入 config 中的 passport.js
// 把上面宣告的 passport 實例當成下面的參數
require('./config/passport')(passport)

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

// handlebars helper
handlebars.registerHelper("ifEquals", function (v1, v2, options) {
  return v1 === v2 ? options.fn(this) : options.inverse(this);
})

// ----------------- Route Setting---------------
app.use('/', require('./routes/home'))

app.use('/restaurants', require('./routes/restaurants'))

app.use('/search', require('./routes/search'))

app.use('/users', require('./routes/users'))

// app.use('/auth', require('./routes/auths')
// )


// ----------------- Server start---------------
// create server
app.listen(port, () => {
  console.log(`server listen to http://localhost:${port}`)
})

