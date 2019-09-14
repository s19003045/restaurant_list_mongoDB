// import passport-local
// 其 Strategy constructor 存成 LocalStrategy
const LocalStrategy = require('passport-local').Strategy

// import passport-facebook 
// 其 Strategy constructor 存成 FacebookStrategy 
const FacebookStrategy = require('passport-facebook').Strategy

const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = passport => {
  passport.use(
    // LocalStrategy 的參數有二種，主要是在定義傳給 server 的 POST body 中的二個屬性名稱
    // usernameField - Optional, defaults to 'username'，若要更改， 要與 input name 一致。
    // passwordField - Optional, defaults to 'password'
    // 參數是選擇性的，但參數後的 verify callback 是必須的，verify callback 會接收使用者的 credential (即 email, password)，然後呼叫 done 以產出 user
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' })
        }
        // 用 bcrypt 來比較「使用者輸入的密碼」跟在使用者資料庫的密碼是否是同一組字串
        // password 是使用者輸入的 password；user.password 是從資料庫撈出的 user ，取其 password 的值。二者不可以巔倒。
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false, { message: 'Email or Password incorrect' })
          }
        })
      })
    })
  )


  // 使用 passport-facebook
  passport.use(
    // 建立一個 FacebookStategy 實例，同時需要 clientID, clientSecret, callbackURL 等參數，參數之後緊接是 verify callback，
    new FacebookStrategy({
      // client 指的是 todolist API，透過跟 facebook dev 事先申請而獲得 ID 及 secret
      clientID: process.env.FACEBOOK_ID, // app ID
      clientSecret: process.env.FACEBOOK_SECRET,  //app secret
      callbackURL: process.env.FACEBOOK_CALLBACK,  // facebook authorization server 獲得使用者(瀏灠器端使用者/資源擁有者)授權後，會給使用者 authorization code ，並且使用者會被導向 callbackURL
      profileFields: ['email', 'displayName'] //使用者提供的資料範圍： email 及 displayName
    }, (accessToken, refreshToken, profile, done) => {
      // 當客戶端(todoList server) 獲得 authorization code 後，todoList server 拿著 autho. code 跟 authorization server 交換 accessToken 及 refreshToken。
      // 接著使用者以 Token 透過 auth. server 向 resource server 領取使用者授權的資料，即待會兒會用到的 profile。

      // 可以透過下面程式碼得知 todoList server 拿到什麼資料： console.log(profile)
      console.log(profile)

      // 最後客戶端知道使用者的身份，並把使用者的身份渲染在使用者的瀏灠器上，完成 OAuth 流程。
      // profile 是 使用者授權給 facebook 提供給客戶端(todoList API)的資料。

      // todoList API server 向自己的 mongoDB 資料庫確認是否已有人已此 email 建立帳號 
      User.findOne({ email: profile._json.email }
      ).then(user => {
        // 如果 email 不存在就建立新的使用者
        if (!user) {
          // 先建立一個 User 實例，把已知的資料先放進去當參數。password 為空字串。等新增一個加密的密碼之後再放進來。
          // 產生密碼的方式：隨機產生一組密碼，然後用 bcrypt 處理，再儲存起來
          const newUser = new User({
            name: profile._json.name,
            email: profile._json.email,
            password: ''
          })
          let randomPassword = Math.random().toString().slice(-8)

          bcrypt.genSalt(10, (err, salt) => {
            // if (err) return console.error(err)
            bcrypt.hash(randomPassword, salt, (err, hash) => {
              if (err) throw err //throw err 執行後，會直接忽略緊接在後面的程式碼
              // 加密過程如果有問題，就不會在 mongoDB 裡面新增 newUser
              newUser.password = hash
              newUser.save()
                .then((err, user) => {
                  if (err) return console.error(err)
                  res.redirect('/')
                })
                .catch(err => console.log(err))
            })
          })
        }
        // 當 mongoDB 資料庫已有此 email，就不需在資料庫新增此 email 的資料。這代表使用者之前在 todoList server 就已透過第三方認證登入網站了！
        else {
          return done(null, user)
        }
      })
    }
    )
  )


  // passport 為了support login sessions，passport 必須把 user 實例 序列化存進 session(session 儲存區)，也必須從 session(session 儲存區) 中反序列化成 user 實例
  passport.serializeUser((user, done) => {
    done(null, user.id)  //只把 user ID 序列化存進 session(session 儲存區)，是為了縮小檔案大小
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}