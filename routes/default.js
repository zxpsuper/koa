const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello koa2'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
router.get('/specialSubject', async (ctx, next) => {
  ctx.body = {
    code: 204,
    msg: '空指针'
  }
})
router.get('/specialSubject/:type', async (ctx, next) => {
  if (ctx.params.type) {
    if (ctx.params.type === '1') {
      ctx.body = {
        code: 200,
        data: [
          {
            title: '故事'
          },
          {
            title: '旅行·在路上'
          },
          {
            title: '@IT·互联网'
          },
          {
            title: '手绘'
          },
          {
            title: '自然科普'
          },
          {
            title: '读书'
          },
          {
            title: '人文社科'
          }
        ],
        msg: '获取成功'
      }
    } else if (ctx.params.type === '2') {
      ctx.body = {
        code: 200,
        data: [
          {
            title: '摄影'
          },
          {
            title: '社会热点'
          },
          {
            title: '历史'
          },
          {
            title: '简书电影'
          },
          {
            title: '连载小说'
          },
          {
            title: '婚姻育儿'
          }
        ],
        msg: '获取成功'
      }
    } else if (ctx.params.type === '3') {
      ctx.body = {
        code: 200,
        data: [
          {
            title: '诗'
          },
          {
            title: '简书交友'
          },
          {
            title: '程序员'
          },
          {
            title: '国学与传统文化'
          },
          {
            title: '@产品'
          },
          {
            title: '漫画'
          },
          {
            title: '上班这点事'
          }
        ],
        msg: '获取成功'
      }
    } else {
      ctx.body = {
        code: 203,
        msg: '参数错误'
      }
    }
  }
})

module.exports = router