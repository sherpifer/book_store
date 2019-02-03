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
  removeFav(book_id) {
    return axios.delete(`/shelf/${book_id}`)
  }

}

export default Service