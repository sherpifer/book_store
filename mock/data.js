var Mock = require('mockjs')
var Random = Mock.Random

// 用户信息
var user_list = [{
  "user_name": "sherpifer",
  "password": "123123"
}]

// 用户加入书架的书本
var user_shelf_books = [{ book_id: 0 }]

// 书信息
var books_list = [{
    "id": 0,
    "title": "解忧杂货铺",
    "author": "东野圭吾",
    "cover_img": require("@/assets/imgs/jyzhp.png"),
    "rate": 4,
    "population": 10,
    "recomment_num": 353,
    "intro": Random.cparagraph(3, 4)
  },
  {
    "id": 1,
    "title": "恶意",
    "author": "东野圭吾",
    "cover_img": require("@/assets/imgs/ey.png"),
    "rate": 5,
    "population": 9,
    "recomment_num": 123,
    "intro": Random.cparagraph(3, 4)
  },
  {
    "id": 2,
    "title": "秘密",
    "author": "东野圭吾",
    "cover_img": require("@/assets/imgs/mm.png"),
    "rate": 3,
    "population": 12,
    "recomment_num": 454,
    "intro": Random.cparagraph(3, 4)
  },
  {
    "id": 3,
    "title": "时生",
    "author": "东野圭吾",
    "cover_img": require("@/assets/imgs/sf.png"),
    "rate": 2,
    "population": 30,
    "recomment_num": 1490,
    "intro": Random.cparagraph(3, 4)
  }
]

// 作家
var writer_list = [{
  "id": 0,
  "writer": "东野圭吾",
  "label": "著名推理小说作家",
  "cover_img": require("@/assets/imgs/dygw.png"),
  "intro": 'sdfsd经典款风华绝代看来减肥抗衰老的肌肤上来看'
}, {
  "id": 0,
  "writer": "萨士比亚",
  "label": "剧作家,艺术家",
  "cover_img": require("@/assets/imgs/ssby.png"),
  "intro": 'sdfsd经典款风华绝代看来减肥抗衰老的肌肤上来看'
}, {
  "id": 0,
  "writer": "辛夷坞",
  "label": "现代文学作家",
  "cover_img": require("@/assets/imgs/xyw.png"),
  "intro": 'sdfsd经典款风华绝代看来减肥抗衰老的肌肤上来看'
}]

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
      require("@/assets/imgs/user01.png"),
      require("@/assets/imgs/user02.png"),
      require("@/assets/imgs/user03.png"),
      require("@/assets/imgs/user04.png"),
      require("@/assets/imgs/user05.png"),
      require("@/assets/imgs/user06.png"),
      require("@/assets/imgs/user07.png")
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

// 用户信息
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

// 粉丝
var fans = Mock.mock({
  "data|20": [{
    "account|1": [
      Mock.mock("@word(3,6)"),
      Mock.mock("@word(4,10)"),
      Mock.mock("@word(5,11)"),
      Mock.mock("@word(6,15)")
    ],
    "avatar|1": [
      require("@/assets/imgs/user01.png"),
      require("@/assets/imgs/user02.png"),
      require("@/assets/imgs/user03.png"),
      require("@/assets/imgs/user04.png"),
      require("@/assets/imgs/user05.png"),
      require("@/assets/imgs/user06.png"),
      require("@/assets/imgs/user07.png")
    ]
  }]
})

//排名
var rank =
  Mock.mock({
    "data|20": [{
      "account|1": [
        Mock.mock("@word(3,6)"),
        Mock.mock("@word(4,10)"),
        Mock.mock("@word(5,11)"),
        Mock.mock("@word(6,15)")
      ],
      "avatar|1": [
        require("@/assets/imgs/user01.png"),
        require("@/assets/imgs/user02.png"),
        require("@/assets/imgs/user03.png"),
        require("@/assets/imgs/user04.png"),
        require("@/assets/imgs/user05.png"),
        require("@/assets/imgs/user06.png"),
        require("@/assets/imgs/user07.png")
      ],
      "rank|+1": 1
    }]
  })

// 活动列表
var activity_list = [{
  "name": "世界读书日活动",
  "cover_img": require("@/assets/imgs/banner01.png"),
  "intro": "都是借口分手了就分开了圣诞节分开了世界的看法理解就是看到了就分开了圣诞节反馈"
}, {
  "name": "世界读书日活动",
  "cover_img": require("@/assets/imgs/banner01.png"),
  "intro": "都是借口分手了就分开了圣诞节分开了世界的看法理解就是看到了就分开了圣诞节反馈"
}]

export {
  user_list,
  user_shelf_books,
  books_list,
  comments,
  user_msg,
  fans,
  rank,
  writer_list,
  activity_list
}