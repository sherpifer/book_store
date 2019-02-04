var Mock = require('mockjs')
var Random = Mock.Random
import store from '@/store/store'

/*** 设置随机的接口响应时间，10-2500毫秒 ***/
// Mock.setup({
//     timeout: '10-2500'
// })

// 用户信息
var user_list = [{
  "user_name": "sherpifer",
  "password": "123123"
}]

// 用户加入书架的书本
var user_shelf_books = [{ book_id: 0 }, { book_id: 1 }, { book_id: 2 }]

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
  let book_id = options.url.match(/\/detail\/(\w+)/)[1]
  let target_book = (books_list.filter(function(item) {
    return item.id == book_id
  }))[0]
  target_book.desc = Random.cparagraph(10, 15)
    //如果用户是登录状态 返回图书收藏
  if (store.state.is_login) {
    if (user_shelf_books.find(item => { return item.book_id == book_id })) {
      target_book.is_fav = true
    } else {
      target_book.is_fav = false
    }
  } else {
    target_book.is_fav = false
  }
  return {
    retCode: 0,
    book: target_book
  }
})

//添加图书进书架
Mock.mock('/shelf', 'post', (options) => {
  let book_id = JSON.parse(options.body).book_id
  user_shelf_books.push({ book_id: book_id })
  return { retCode: 0 }
})

// 把图书从书架移除
Mock.mock('/shelf', 'put', (options) => {
  let book_ids = JSON.parse(options.body).book_ids
  book_ids.forEach(book_id => {
    user_shelf_books.splice(user_shelf_books.findIndex(item => { return item.book_id == book_id }), 1)
  })
  return { retCode: 0 }
})

// 获取书架图书
Mock.mock('/shelf', 'get', () => {
  let shelf_books = []
  user_shelf_books.forEach(book => {
    shelf_books.push(books_list.find(function(item) {
      return item.id == book.book_id
    }))
  })
  return {
    retCode: 0,
    books: shelf_books
  }
})

// 检查账号的唯一性
Mock.mock(/^\/user\?user_name=/, 'get', (options) => {
  let user_name = options.url.match(/\?user_name=(\w+)/)[1]
  let users = user_list.filter(item => {
    return item.user_name == user_name
  })
  return {
    retCode: 0,
    users: users
  }
})

// 注册
Mock.mock('/user', 'post', (options) => {
  console.log('新增用户', JSON.parse(options.body))
  user_list.push(JSON.parse(options.body))
  return { retCode: 0 }
})

//登录
Mock.mock('/login', 'post', (options) => {
  let user = JSON.parse(options.body)
  let target_user = user_list.filter((item) => {
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