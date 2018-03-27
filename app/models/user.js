var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  phoneNumber: String,
  userName: {
    unique: true,
    type: String
  },
  password: {
    type: String,
    default: ''
  },
  age: {
    type: String,
    default: ''
  },
  signIn: {
    type: Number,
    default: 0
  },
  continueSignIn: {
    type: Number,
    default: 0
  },
  img: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  score: {
    type: Number,
    default: 0
  },
  signInTime: {
    type: Date,
    default: null
  },
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
//存储前的毁掉函数
UserSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})
// 定义表单方法——字符串转化为大写
UserSchema.methods.capitalizeName = function () {
  this.userName = this.userName.toUpperCase();
  return this.userName;
}

var UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel 