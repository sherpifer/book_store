import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    is_login: false,
    user_name: ''
  },
  mutations: {
    loginSuccess(state, params) {
      this.state.is_login = true
      console.log('loginSuccess', params)
      this.state.user_name = params.user_name
    },
    loginFaild(state) {
      this.state.is_login = false
    },
    logout(state) {
      this.state.is_login = false
      this.state.user_name = ''
    }
  },
  actions: {}
})
export default store