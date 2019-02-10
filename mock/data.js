var Mock = require('mockjs')
var Random = Mock.Random

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

// 评论
var comments = Mock.mock({
  "comments|8": [{
    "account|1": [
      Mock.mock("@word(3,6)"),
      Mock.mock("@word(4,10)"),
      Mock.mock("@word(5,11)"),
      Mock.mock("@word(6,15)")
    ],
    "avatar|1": [
      "/static/imgs/user01.png",
      "/static/imgs/user02.png",
      "/static/imgs/user03.png",
      "/static/imgs/user04.png",
      "/static/imgs/user05.png",
      "/static/imgs/user06.png",
      "/static/imgs/user07.png"
    ],
    "created_at|1": [
      Random.date("yyyy-MM-dd"),
      Random.date("yyyy-MM-dd"),
      Random.date("yyyy-MM-dd"),
      Random.date("yyyy-MM-dd")
    ],
    "content|1": [
      Random.cparagraph(3, 6),
      Random.cparagraph(3, 6),
      Random.cparagraph(3, 6),
      Random.cparagraph(3, 6)
    ]
  }]
})

// 新信息
var user_msg = Mock.mock({
  "msg|4-8": [{
    "id|+1": 0,
    "created_at|1": [
      Random.date("2018-MM-dd") + ' ' + Mock.mock('@time("HH:mm")'),
      Random.date("2018-MM-dd") + ' ' + Mock.mock('@time("HH:mm")'),
      Random.date("2018-MM-dd") + ' ' + Mock.mock('@time("HH:mm")'),
      Random.date("2018-MM-dd") + ' ' + Mock.mock('@time("HH:mm")')
    ],
    "content|1": [
      Random.cparagraph(3, 6),
      Random.cparagraph(3, 6),
      Random.cparagraph(3, 6),
      Random.cparagraph(3, 6)
    ],
    "new_msg": true
  }]
})
export {
  user_list,
  user_shelf_books,
  books_list,
  comments,
  user_msg
}