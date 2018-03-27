var mongoose = require('mongoose')

var BookSchema = new mongoose.Schema({
  name: {
    // unique: true,
    type: String
  },
  author: String,
  desc: String,
  review: Number,
  publicTime: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    },
  }
})
//存储前的毁掉函数
BookSchema.pre('save', function(next) {
  if (!this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

var BookModel = mongoose.model('book', BookSchema)

module.exports = BookModel 