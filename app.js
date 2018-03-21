const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
app.use(cors())
var fs = require('fs')
var path = require('path')
var mongoose = require('mongoose')
var dbs = 'mongodb://localhost/super'

mongoose.Promise = require('bluebird')
mongoose.connect(dbs, {
  useMongoClient: true
  /* other options */
})

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  // yay!
})

require('./app/models/user')
require('./app/models/kit')
require('./app/models/book')
require('./app/models/article')

// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
const router = require('./routes/index')
router(app)
module.exports = app
