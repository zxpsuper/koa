const router = require('koa-router')()
var mongoose = require('mongoose')
var xss = require('xss')
var User = mongoose.model('User')
var Kitten = mongoose.model('Kitten')
// 前缀
router.prefix('/users')

router.get('/', async function (ctx, next) {
  ctx.body = 'this is a users response!'+ supe
})

router.get('/bar', async function (ctx, next) {
  var silence = new Kitten({ name: 'Silence' })
  console.log(silence.name) 
  var fluffy = new Kitten({ name: 'fluffy' });
  fluffy.speak() // "Meow name is fluffy"
  fluffy.save()
  // let phoneNumber = ctx.query.p
  // console.log('haha')
  // ctx.body = { super:'kakak', 'phone':`${phoneNumber}`}
})

module.exports = router
