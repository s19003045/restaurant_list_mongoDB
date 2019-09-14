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
  res.send('register page')
})

module.exports = router
