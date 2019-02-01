var Mock = require('mockjs')
var Random = Mock.Random

/*** 设置随机的接口响应时间，10-2500毫秒 ***/
// Mock.setup({
//     timeout: '10-2500'
// })

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

Mock.mock(/\/detail\//, 'get', function(options) {
    var book_id = options.url.slice(options.url.lastIndexOf('/') + 1, )
    let target_book = books_list.filter(function(item) {
        return item.id == book_id
    })
    target_book = target_book[0]
    console.log('target_book', target_book)
    target_book.desc = Random.cparagraph(10, 15)
    return { book: target_book }
})