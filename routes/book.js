const router = require('koa-router')()
var mongoose = require('mongoose')
var xss = require('xss')
var Book = mongoose.model('book')

router.prefix('/books')

router.get('/', async function (ctx, next) {
	console.log('222')
	console.log(ctx)
  ctx.body = 'this is a users response!'
})
// post 提交 ——增
router.post('/submit', async function (ctx, next) {
	let { name, author, desc, review, publicTime } = ctx.request.body
	var books = new Book({ name, author, desc, review, publicTime })
	async function save() {
    return new Promise((ok, fail) => {
      books.save(function (err, kittens) {
        if (err) fail(err)
        ok(kittens)
      })
    })
  }
  try {
  	let t = await save()
  	ctx.body = t
  }
  catch(err) {
  	ctx.body = {'message':'用户名已经存在'}
  }
})
// 获取params ——查
router.get('/:name', async function (ctx, next) {
	let name = ctx.params.name;
	try{
		let res = await findOne({'name': name})
		ctx.body = res
	}
	catch(err){
		ctx.body = {'errmessage':"没有找到该数据"}
	}
})
// /haha会和上面的/:name形成混淆
// 查询评价大于0小于600的数据集合 ——查
router.get('/haha/ni', async function (ctx, next) {
  let res = await find({'review': {$gte : 0, $lte : 600}})
  ctx.body = res
})
// delete中获取的res值为一个对象res.result{"n": 1,"ok": 1} ——删
router.delete('/:name', async function (ctx, next) {
	let name = ctx.params.name;
  let res = await remove({'name': name})
  if(res.result.n === 0) ctx.body = {'message':"找不到该数据"}
  else ctx.body = {'message':"删除成功"}
})
// update返回的对象{n, nModified, ok} ——改
router.post('/update', async function (ctx, next) {
  let { name, author, desc, review, publicTime } = ctx.request.body
  try{
		let t = await update({name}, { $set: {author, desc, review, publicTime} })
		console.log(t)
		if(t.n === 0) ctx.body = {'message':"用户名没找到"}
		else{
			if(t.nModified === 0) ctx.body = {'message':"修改数据与初始数据一样，请重新修改"}
			else{ctx.body = {'message':"修改成功"}}
		}
	}
	catch(err){
		ctx.body = {'errmessage':"没有找到该数据"}
	}
})
// findOne查询一条
async function findOne(name) {
  return new Promise((ok, fail) => {
    Book.findOne(name, function (err, result) {
    	if(err) fail(err)
			if (result == null) {
			  fail(new Error("not have data"));
			} 
			ok(result)
    })
  })
}
// find查询多条
async function find(name) {
  return new Promise((ok, fail) => {
    Book.find(name, function (err, result) {
      if (err) fail(err)
      ok(result)
    })
  })
}
// remove移除
async function remove(name) {
  return new Promise((ok, fail) => {
    Book.remove(name, function (err, result) {
      if (err) fail(err)
      ok(result)
    })
  })
}
// update更新
async function update(name, obj) {
  return new Promise((ok, fail) => {
    Book.update(name, obj, {new: true}, function (err, result) {
      if (err) fail(err)
      ok(result)
    })
  })
}
module.exports = router