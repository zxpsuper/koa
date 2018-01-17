const M = require('../methods')
const router = require('koa-router')()
var mongoose = require('mongoose')
var findOne = require('../methods')
var xss = require('xss')
var User = mongoose.model('users')
// 前缀
router.prefix('/users')

router.get('/', async function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/register', async function (ctx, next) {
  // let userName = ctx.query.userName
  let { userName, password, phoneNumber, email } = ctx.request.body
  let t = await M.findOne({userName: userName.toUpperCase()}, User)
  if (t !== null) {
    ctx.response.body = {
      code: 202,
      message: '用户名已经存在'
    }
    return
  }

  var silence = new User({ userName, password, phoneNumber, email })
  silence.capitalizeName()

  // 保存用户储存信息
  await M.save(silence)
  ctx.response.body = {
    code: 200,
    message: '注册成功'
  }
})

module.exports = router
