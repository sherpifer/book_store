import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

const Service = {
  register(params) {
    return axios.post('/api/user', { user_name: params.user_name, password: params.password })
  },
  login(params) {
    return axios.post('/api/login', params)
  },
  checkAccount(user_name) {
    return axios.get(`/api/user?user_name=${user_name}`)
  },
  getBooks() {
    return axios.get('/api/allbooks')
  },
  getBookDetail(book_id) {
    return axios.get(`/api/detail/${book_id}`)
  },
  addFav(params) {
    return axios.post('/api/shelf', params)
  },
  removeFav(params) {
    return axios.put('/api/shelf', params)
  },
  getShelfBooks() {
    return axios.get('/api/shelf')
  },
  getComments() {
    return axios.get('/api/comments')
  },
  getChapter() {
    return axios.get('/api/chapter')
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
  },
  getWriters() {
    return axios.get('/api/writers')
  },
  getActivity() {
    return axios.get('/api/activity')
  }
}

export default Service