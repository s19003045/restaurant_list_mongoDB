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

// 建立 flash 實例並使用它
app.use(flash())

// passport initialize
app.use(passport.initialize())

// 如果應用程式使用 passport 來驗證使用者，並且會持續用到 login session，則必須使用 passport.session() 這個 middleware
app.use(passport.session())

// 載入 config 中的 passport.js
// 把上面宣告的 passport 實例當成下面的參數
require('./config/passport')(passport)

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  // req.user 及 res.isAuthenticated 是在以 passport 驗證使用者成功之後才會被建立的。
  // res.locals 常用來用在將被渲染的 view(s)，只用在該次的 request / response cycle (if any)
  // 目前 res.locals.isAuthenticated 用在 main.handlebars 中，顯示 login 或 logout button

  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()

  // 新增二個 res.locals 的 property for flash message
  // 當以 flash 為 middleware 時，任何傳進來的 req 都有 req.flash 這方法
  // req.flash('info', 'Flash is back!') 
  // req.flash 的二個參數：info 是 key， 'Flash is back!'是 value
  // 這邊的 success_msg 及 failure_msg 可以放進所有的 view 使用
  res.locals.success_msg = req.flash('success_msg')
  res.locals.failure_msg = req.flash('failure_msg')

  next()
})

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

// 第三方登入
app.use('/auth', require('./routes/auths')
)


// ----------------- Server start---------------
// create server
app.listen(port, () => {
  console.log(`server listen to http://localhost:${port}`)
})

