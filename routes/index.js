const Book = require('./book');
const User = require('./users');
const Default = require('./default');

function app(app) {
  app.use(Book.routes(), Book.allowedMethods())
  app.use(User.routes(), User.allowedMethods())
  app.use(Default.routes(), Default.allowedMethods())
  
}

module.exports = app
