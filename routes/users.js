const M = require('../methods')
const router = require('koa-router')()
var mongoose = require('mongoose')
var xss = require('xss')
var User = mongoose.model('users')

// 前缀
router.prefix('/users')

// 注册用户
router.post('/register', async function (ctx, next) {
  // let userName = ctx.query.userName
  let { userName, password, phoneNumber, email } = ctx.request.body
  if (!userName || !password) {
    ctx.body = {
      code: 202,
      message: '缺少用户名或密码'
    }
    return
  }
  try {
    let t = await M.findOne({userName}, User)
    if (t !== null) {
      ctx.response.body = {
        code: 202,
        message: '用户名已经存在'
      }
      return
    }
    var silence = new User({ userName, password, phoneNumber, email })
    // 保存用户储存信息
    await M.save(silence)
    ctx.response.body = {
      code: 200,
      message: '注册成功'
    }
  } catch (err) {
    ctx.body = {
      code: 203,
      message: '未知错误'
    }
  }
})
// 获取所有用户
router.get('/getAllUsers', async function (ctx, next) {
  try {
    // let t = await M.findAlls(User)
    let t = await User.find({})
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
// 注册用户
router.post('/login', async function (ctx, next) {
  // let userName = ctx.query.userName
  let { userName, password } = ctx.request.body
  if (!userName || !password) {
    ctx.body = {
      code: 202,
      message: '缺少用户名或密码'
    }
    return
  }
  try {
    let t = await M.findOne({ userName }, User)
    if (t === null) {
      ctx.response.body = {
        code: 202,
        message: '用户名不存在'
      }
      return
    }
    if (password !== t.password) {
      ctx.response.body = {
        code: 203,
        message: '密码错误'
      }
      return
    } else {
      ctx.response.body = {
        code: 200,
        data: t,
        message: '登录成功'
      }
      return
    }
  } catch (err) {
    ctx.body = {
      code: 203,
      message: '未知错误'
    }
  }
})
// 根据id删除用户
router.delete('/delete/:id', async function (ctx, next) {
  let _id = ctx.params.id
  try {
    let res = await M.remove(User, { _id: _id })
    if (res.result.n === 0) ctx.body = { code: 202, message: "找不到该数据" }
    else ctx.body = { code: 200, message: "删除成功" }
  } catch (err) {
    ctx.body = {
      code: 205,
      message: '未知错误'
    }
  }
})
// 每日签到
router.get('/signIn/:id', async function (ctx, next) {
  let _id = ctx.params.id
  try {
    let t = await M.findOne({ _id }, User)
    if (t === null) {
      ctx.body = {
        code: 202,
        message: '用户不存在'
      }
    } else {
      let date = t.signInTime
      if (date === null) {
        t.meta.updateAt = new Date()
        t.signInTime = new Date()
        t.score += 1
        await M.update(User, { _id: _id }, t)
        ctx.body = {
          code: 200,
          data: {
            score: t.score
          },
          message: '签到成功'
        }
        return
      }
      if (date.getFullYear() === new Date().getFullYear() &&
      date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate()) {
        ctx.body = {
          code: 203,
          message: '用户今日已签到'
        }
      } else {
        t.meta.updateAt = new Date()
        t.signInTime = new Date()
        t.score += 1
        await M.update(User, { _id: _id }, t)
        ctx.body = {
          code: 200,
          data: {
            score: t.score
          },
          message: '签到成功'
        }
        return
      }
    }
  } catch (err) {
    console.log(err.message)
    ctx.body = {
      code: 205,
      message: '未知错误'
    }
  }
})

module.exports = router
