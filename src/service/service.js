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
  }
}

export default Service