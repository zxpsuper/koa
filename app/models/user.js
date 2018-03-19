var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  phoneNumber: String,
  userName: {
    unique: true,
    type: String
  },
  password: String,
  age: String,
  email: String,
  score: Number,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

// 定义表单方法——字符串转化为大写
UserSchema.methods.capitalizeName = function () {
  this.userName = this.userName.toUpperCase();
  return this.userName;
}

var UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel 