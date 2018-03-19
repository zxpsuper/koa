const M = require('../methods')
const router = require('koa-router')()
var mongoose = require('mongoose')
var Article = mongoose.model('articles')

// 前缀
router.prefix('/articles')
// 创建文章
router.post('/create', async function (ctx, next) {
  let { title, author, authorImg, desc, subject } = ctx.request.body
  try {
    let t = await M.findOne({ title }, Article)
    if (t !== null) {
      ctx.response.body = {
        code: 202,
        message: '文章名字重复'
      }
      return
    }
    var silence = new Article({ title, author, authorImg, desc, subject })
    // 保存用户储存信息
    await M.save(silence)
    ctx.body = {
      code: 200,
      message: '创建成功'
    }
  } catch (err) {
    ctx.body = {
      code: 205,
      message: '未知错误'
    }
  }
})
// 获取所有文章
router.get('/getAll', async function (ctx, next) {
  try {
    let t = await M.findAlls(Article)
    ctx.body = {
      code: 200,
      data: t,
      message: '获取成功'
    }
  } catch (err) {
    ctx.body = {
      code: 205,
      message: '未知错误'
    }
  }
})
// 根据id获取文章
router.get('/getById/:id', async function (ctx, next) {
  let _id = ctx.params.id
  try {
    let t = await M.findOne({ _id }, Article)
    if (t === null) {
      ctx.body = {
        code: 202,
        message: 'id不存在'
      }
    } else {
      ctx.body = {
        code: 200,
        data: t,
        message: '获取成功'
      }
    }
  } catch (err) {
    ctx.body = {
      code: 205,
      message: '未知错误'
    }
  }
})
// 根据id更新文章
router.post('/update', async function (ctx, next) {
  let { id, title, author, authorImg, desc, subject } = ctx.request.body
  try {
    let t = await M.findOne({ _id: id }, Article)
    if (t === null) {
      ctx.body = {
        code: 202,
        message: 'id不存在'
      }
    } else {
      let msg = await M.update(Article, { _id: id }, { title, author, authorImg, desc, subject })
      if (msg.nModified === 0) ctx.body = { code: 203, msg: "修改数据与初始数据一样，请重新修改" }
      else {
        ctx.body = {
          code: 200,
          message: '修改成功'
        }
      }
    }
  } catch (err) {
    ctx.body = {
      code: 205,
      message: '未知错误'
    }
  }
})
// 根据id删除文章
router.delete('/delete/:id', async function (ctx, next) {
  let _id = ctx.params.id
  try {
    let res = await M.remove(Article, { _id: _id })
    if (res.result.n === 0) ctx.body = { code: 202, message: "找不到该数据" }
    else ctx.body = { code: 200, message: "删除成功" }
  } catch (err) {
    ctx.body = {
      code: 205,
      message: '未知错误'
    }
  }
})
module.exports = router
