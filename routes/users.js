const router = require('koa-router')()
var mongoose = require('mongoose')
var xss = require('xss')
var User = mongoose.model('haha')
var Kitten = mongoose.model('Kitten')
// 前缀
router.prefix('/users')

router.get('/', async function (ctx, next) {
  ctx.body = 'this is a users response!'+ supe
})

router.get('/bar', async function (ctx, next) {
  let pp = ctx.query.p
  var silence = new User({ name: `${pp}` , password:'123123123', kaka:'woaini'})
  console.log(silence.name) 
  // var fluffy = new Kitten({ name: `${pp}` })
  // fluffy.speak() 
  // silence.save(function (err, users) {
  //   if (err) return console.error(err)
  // })
   // const res = await findAll()
  async function save() {
    return new Promise((ok, fail) => {
      silence.save(function (err, kittens) {
        if (err) fail(err)
        ok(kittens)
      })
    })
  }
  await save()
  const res = await findAlls()

  ctx.response.body = res
  // {dfdasf:'sdfdaf'}
})

async function findAll() {
  return new Promise((ok, fail) => {
    Kitten.find({},function (err, kittens) {
      if (err) fail(err)
      ok(kittens)
    })
  })
}

async function findAlls() {
  return new Promise((ok, fail) => {
    User.find({},function (err, kittens) {
      if (err) fail(err)
      ok(kittens)
    })
  })
}


module.exports = router


