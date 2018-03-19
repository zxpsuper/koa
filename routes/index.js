const Book = require('./book');
const User = require('./users');
const Default = require('./default');
const Article = require('./article');

function app(app) {
  app.use(Book.routes(), Book.allowedMethods())
  app.use(User.routes(), User.allowedMethods())
  app.use(Default.routes(), Default.allowedMethods())
  app.use(Article.routes(), Article.allowedMethods())
}

module.exports = app
