// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import mock from '@/mock/index'
import store from '@/store/store'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */ )

import './assets/style/reset.css'
import './assets/iconfont/iconfont.css'

Vue.use(VueAxios, axios);
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (store.state.is_login) {
            next()
        } else {
            console.log('登录成功后跳转参数', { redirect: to.fullPath })
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
})