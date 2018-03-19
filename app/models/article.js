var mongoose = require('mongoose')

var ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  author: String,
  authorImg: String,
  desc: String,
  subject: String,
  review: {
    type: Array,
    default: 0
  },
  loveNum: {
    type: Number,
    default: 0
  },
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
/* ArticleSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.meta.updateAt = Date.now()
  }
}) */

var ArticleModel = mongoose.model('articles', ArticleSchema)

module.exports = ArticleModel 