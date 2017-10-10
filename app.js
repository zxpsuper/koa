const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

var fs = require('fs')
var path = require('path')
var mongoose = require('mongoose')
var dbs = 'mongodb://localhost/super'

mongoose.Promise = require('bluebird')
mongoose.connect(dbs)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  // yay!
})
require('./app/models/user')
require('./app/models/kit')
require('./app/models/book')

// var models_path = path.join(__dirname, '/app/models')
// var walk = function(modelPath) {
//   fs
//     .readdirSync(modelPath)
//     .forEach(function(file) {
//       var filePath = path.join(modelPath, '/' + file)
//       var stat = fs.stat.Sync(filePath)
      
//       if(stat.isFile()) {
//         if (/(.*)\.(js|coffee)/.test(file)) {
//           require(filePath)
//         }
//       } else if (stat.isDirectory()){
//         walk(filePath)
//       }
//     })
// }


const index = require('./routes/index')
const users = require('./routes/users')
const book = require('./routes/book')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
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

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(book.routes(), book.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
