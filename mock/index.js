var Mock = require('mockjs')
var Random = Mock.Random
import store from '@/store/store'
import {
  user_list,
  user_shelf_books,
  books_list,
  comments,
  user_msg,
  fans,
  rank,
  writer_list,
  activity_list
} from './data'

/*** 设置随机的接口响应时间，10-2500毫秒 ***/
Mock.setup({
  timeout: '10-600'
})


// 检查账号的唯一性
Mock.mock(/^\/api\/user\?user_name=/, 'get', (options) => {
  let user_name = options.url.match(/\?user_name=(\w+)/)[1]
  let users = user_list.filter(item => {
    return item.user_name == user_name
  })
  return {
    retCode: 0,
    data: {
      users: users
    }
  }
})

// 注册
Mock.mock('/api/user', 'post', (options) => {
  console.log('新增用户', JSON.parse(options.body))
  user_list.push(JSON.parse(options.body))
  return { retCode: 0 }
})

//登录
Mock.mock('/api/login', 'post', (options) => {
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
  // 获取图书信息
Mock.mock('/api/allbooks', 'get', () => {
  return {
    retCode: 0,
    data: {
      books_list: books_list
    }
  }
})

// 获取书本详情
Mock.mock(/^\/api\/detail\//, 'get', (options) => {
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
    data: {
      book: target_book
    }
  }
})

//添加图书进书架
Mock.mock('/api/shelf', 'post', (options) => {
  let book_id = JSON.parse(options.body).book_id
  let res = user_shelf_books.filter(item => {
    return item.book_id == book_id
  })
  if (res.length == 0) {
    user_shelf_books.push({ book_id: book_id })
  }
  return { retCode: 0 }
})

// 把图书从书架移除
Mock.mock('/api/shelf', 'put', (options) => {
  let book_ids = JSON.parse(options.body).book_ids
  book_ids.forEach(book_id => {
    user_shelf_books.splice(user_shelf_books.findIndex(item => { return item.book_id == book_id }), 1)
  })
  return { retCode: 0 }
})

// 获取书架图书
Mock.mock('/api/shelf', 'get', () => {
  let shelf_books = []
  user_shelf_books.forEach(book => {
    shelf_books.push(books_list.find(function(item) {
      return item.id == book.book_id
    }))
  })
  return {
    retCode: 0,
    data: {
      books: shelf_books
    }
  }
})

// 获取图书的评论
Mock.mock('/api/comments', 'get', () => {
  return {
    retCode: 0,
    data: comments
  }
})

// 获得文章详情
Mock.mock('/api/chapter', 'get', () => {
  return {
    retCode: 0,
    data: {
      content: Random.cparagraph(55, 80),
      chapter_title: Random.ctitle(5, 10)
    }
  }
})

// 获取用户所有信息
Mock.mock('/api/usermsg', 'get', () => {
  return {
    retCode: 0,
    data: {
      user_msg: user_msg.msg
    }
  }
})

// 获取用户新信息
Mock.mock('/api/newmsg', 'get', () => {
  let new_msg = user_msg.msg.filter((item) => {
    return item.new_msg == true
  })
  return {
    retCode: 0,
    data: {
      new_msg: new_msg
    }
  }
})

// 用户读取信息
Mock.mock('/api/usermsg', 'put', (options) => {
  let msg_id = JSON.parse(options.body).msg_id
  user_msg.msg.forEach((item) => {
    if (item.id == msg_id) {
      item.new_msg = false
    }
  })
  return {
    retCode: 0,
    data: {
      user_msg: user_msg.msg
    }
  }
})

// 获取用户粉丝
Mock.mock('/api/fans', 'get', () => {
  return {
    retCode: 0,
    data: {
      fans: fans.data
    }
  }
})

// 获取排名
Mock.mock('/api/rank', 'get', () => {
  return {
    retCode: 0,
    data: {
      rank: rank.data
    }
  }
})

// 获取模糊搜索书本关键词
Mock.mock(/^\/api\/book\?kw\=/, 'get', (options) => {
  let kw = options.url.match(/\?kw\=(.*)+/)[1]
  let kw_list = []
  for (let i = 0; i < 25; i++) {
    kw_list.push(kw + Mock.mock("@cword(1,5)"))
  }
  return {
    retCode: 0,
    data: {
      kw_list: kw_list
    }
  }
})

// 获取所有热门作家信息
Mock.mock('/api/writers', 'get', () => {
  return {
    retCode: 0,
    data: {
      writer_list: writer_list
    }
  }
})

// 获取活动列表
Mock.mock('/api/activity', 'get', () => {
  return {
    retCode: 0,
    data: {
      activity_list: activity_list
    }
  }
})