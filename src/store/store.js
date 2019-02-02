import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        is_login: true,
        user_name: 'sherpifer'
    },
    mutations: {
        loginSuccess(state) {
            this.state.is_login = true
            console.log('登录成功')
        },
        loginFaild(state) {
            this.state.is_login = false
        }
    },
    actions: {}
})
export default store