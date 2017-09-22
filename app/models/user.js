var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  // phoneNumber: {
  //   unique: true,
  //   type: Number
  // },
  name: {
    unique: true,
    type: Number
  },
  password: String,
  age: String,
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
// 存储前的毁掉函数
// UserSchema.pre('save', function(next) {
//   if(!this.isNew) {
//     this.meta.updateAt = Date.now()
//   }
// })

UserSchema.methods.capitalizeName = function () {
  this.name = this.name.toUpperCase();
  return this.name;
}

var UserModel = mongoose.model('haha', UserSchema)

module.exports = UserModel 