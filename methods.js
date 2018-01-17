// 查找某个变量
async function findOne (name, Schema) {
  return new Promise((ok, fail) => {
    Schema.findOne(name, function (err, result) {
      if(err) fail(err)
      // if (result == null) {
      //   fail(new Error("not have data"));
      // } 
      ok(result)
    })
  })
}
// 保存方法
async function save(silence) {
  return new Promise((ok, fail) => {
    silence.save(function (err, kittens) {
      if (err) fail(err)
      ok(kittens)
    })
  })
}

// 查询所有
async function findAlls(Schema) {
  return new Promise((ok, fail) => {
    Schema.find({},function (err, users) {
      if (err) fail(err)
      ok(users)
    })
  })
}
const methods = {
  findOne,
  findAlls,
  save
}
module.exports = methods