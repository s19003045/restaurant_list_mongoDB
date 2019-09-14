// 用於 routes/todos.js，當使用者驗證成功(req.isAuthenticated()為 true)，則執行下一個 middleware
// 當使用者驗證不成功(req.isAuthenticated()為 false)，則導向'/users/login'，而之後的 middleware 就不會執行！！
// req.isAuthenticated 是 passport 提供的方法
module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    // 在 app.js 已先設定 res.locals.failure_msg = req.flash('failure_msg')，所以下面設定的 value 就會傳值進去 failure_msg

    res.redirect('/users/login')
  }
}