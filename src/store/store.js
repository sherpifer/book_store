import Vue from 'vue'
import Vuex from 'vuex'
import Service from '@/service/service'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    is_login: false,
    user_name: '',
    new_msg_count: 0,
    token: ''
  },
  mutations: {
    loginSuccess(state, params) {
      console.log(params)
      state.is_login = true
      sessionStorage['is_login'] = true
      sessionStorage['user_name'] = params.user_name
      state.user_name = params.user_name
      Service.getNewMsg().then(res => {
        if (res.data.retCode == 0) {
          state.new_msg_count = res.data.data.new_msg.length
          console.log('new_msg_count', res.data.data.new_msg.length)
        }
      })
    },
    loginFaild(state) {
      state.is_login = false
    },
    logout(state) {
      state.is_login = false
      sessionStorage['is_login'] = false
      state.user_name = ''
    },
    reduceUnreadMsgCount(state) {
      if (state.new_msg_count == 0) return
      state.new_msg_count--
    }
  },
  actions: {}
})

if (sessionStorage['is_login'] == "true") {

  store.commit('loginSuccess', { user_name: sessionStorage['user_name'] })
}
export default store