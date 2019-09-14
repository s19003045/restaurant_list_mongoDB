// 定義在網站 login , register 的路由(不包含第三方驗證)
const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

// login
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入檢查
router.post('/login', (req, res, next) => {
  // 使用 passport 認證使用者資料(或稱驗證請求)，使用的 strategy 是 以 passport-local(套件)建立的 LocalStrategy 
  // 如果 authentication 失敗，passport 會回傳 401 Unauthorized Status
  // 如果 authentication 成功，則後面的 handler 會執行 & req.user property 會被建立
  passport.authenticate('local', {
    successRedirect: '/', // 登入成功會回到根目錄
    failureRedirect: '/users/login', // 失敗會留在登入頁面
    badRequestMessage: '請填寫帳號密碼',    // 加入這行
    failureFlash: true            // 加入這行
  })(req, res, next)

  // passport.authenticate('local')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body

  // 加入錯誤訊息提示
  let errors = []

  if (!email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤' })
  }
  if (errors.length > 0) {
    res.render('register', { errors, name, email, password, password2 })
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        console.log('User already exists')
        errors.push({ message: '已有人註冊此 email' })
        res.render('register', {
          errors, name, email, password, password2
        })

      } else {
        const newUser = new User({ name: name, email: email, password: password })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save()
              .then(user => {
                req.flash('success_msg', '你已成功註冊')
                console.log(req.flash)
                res.redirect('/users/login')
              })
              .catch(err => console.log(err))
          })
        })
      }
    })
  }
})

// log out
router.get('/logout', (req, res) => {
  req.logout() //passport 提供的方法 req.logout() 會結束 login session，執行的動作有 remove the req.user property and clear the login session (if any).
  req.flash('success_msg', '你已成功登出')
  res.redirect('/users/login')
})

module.exports = router
