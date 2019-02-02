var Mock = require('mockjs')
var Random = Mock.Random

/*** 设置随机的接口响应时间，10-2500毫秒 ***/
// Mock.setup({
//     timeout: '10-2500'
// })

// 用户信息
var user_list = [{
  "user_name": "sherpifer",
  "password": "123123"
}]

// 书信息
var books_list = [{
    "id": 0,
    "title": "解忧杂货铺",
    "author": "东野圭吾",
    "cover_img": "/static/imgs/jyzhp.png",
    "rate": 4,
    "population": 10,
    "recomment_num": 353
  },
  {
    "id": 1,
    "title": "恶意",
    "author": "东野圭吾",
    "cover_img": "/static/imgs/ey.png",
    "rate": 5,
    "population": 9,
    "recomment_num": 123
  },
  {
    "id": 2,
    "title": "秘密",
    "author": "东野圭吾",
    "cover_img": "/static/imgs/mm.png",
    "rate": 3,
    "population": 12,
    "recomment_num": 454
  },
  {
    "id": 3,
    "title": "时生",
    "author": "东野圭吾",
    "cover_img": "/static/imgs/sf.png",
    "rate": 2,
    "population": 30,
    "recomment_num": 1490
  }
]

// 获取书本详情
Mock.mock(/^\/detail\//, 'get', (options) => {
  var book_id = options.url.match(/\/detail\/(\w+)/)[1]
  let target_book = (books_list.filter(function(item) {
    return item.id == book_id
  }))[0]
  target_book.desc = Random.cparagraph(10, 15)
  return { book: target_book }
})

// 检查账号的唯一性
Mock.mock(/^\/user\?user_name=/, 'get', (options) => {
  let user_name = options.url.match(/\?user_name=(\w+)/)[1]
  let users = user_list.filter(item => {
    return item.user_name == user_name
  })
  return { users: users }
})

// 注册
Mock.mock('/user', 'post', (options) => {
  console.log('新增用户', JSON.parse(options.body))
  user_list.push(JSON.parse(options.body))
  console.log(user_list)
  return { retCode: 0 }
})

Mock.mock('/login', 'post', (options) => {
  let user = JSON.parse(options.body)
  let target_user = user_list.filter((item) => {
    console.log(item.user_name, user.user_name)
    if (item.user_name == user.user_name) {
      if (item.password == user.password) {
        return item.password == user.password
      }
    }
  })
  if (target_user.length == 1) {
    return {
      retCode: 0,
      user: target_user[0]
    }
  } else {
    return {
      retCode: 40401
    }
  }
})