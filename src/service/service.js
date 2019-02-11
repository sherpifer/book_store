import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

const Service = {
  register(params) {
    return axios.post('/user', { user_name: params.user_name, password: params.password })
  },
  login(params) {
    return axios.post('/login', params)
  },
  checkAccount(user_name) {
    return axios.get(`/user?user_name=${user_name}`)
  },
  getBooks() {
    return axios.get('/api/allbooks')
  },
  getBookDetail(book_id) {
    return axios.get(`/detail/${book_id}`)
  },
  addFav(params) {
    return axios.post('/shelf', params)
  },
  removeFav(params) {
    return axios.put('/shelf', params)
  },
  getShelfBooks() {
    return axios.get('/shelf')
  },
  getComments() {
    return axios.get('/comments')
  },
  getChapter() {
    return axios.get('/chapter')
  },
  getUserMsg() {
    return axios.get('/api/usermsg')
  },
  getNewMsg() {
    return axios.get('/api/newmsg')
  },
  readMsg(params) {
    return axios.put('/api/usermsg', params)
  },
  getFans() {
    return axios.get('/api/fans')
  },
  getRank() {
    return axios.get('/api/rank')
  },
  searchBook(kw) {
    return axios.get('/api/book?kw=' + kw)
  }
}

export default Service