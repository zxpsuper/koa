// 查找某个变量
async function findOne (name, Schema) {
  return new Promise((ok, fail) => {
    Schema.findOne(name, function (err, result) {
      if(err) fail(err)
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
async function update(Collect, name, obj) {
  return new Promise((ok, fail) => {
    Collect.update(name, obj, { new: true }, function (err, result) {
      if (err) fail(err)
      ok(result)
    })
  })
}
async function remove(Collect, name) {
  return new Promise((ok, fail) => {
    Collect.remove(name, function (err, result) {
      if (err) fail(err)
      ok(result)
    })
  })
}
const methods = {
  findOne,
  findAlls,
  save,
  update,
  remove
}
module.exports = methods