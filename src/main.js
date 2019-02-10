// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mock from '../mock/index'
import './assets/style/reset.css'
import './assets/style/index.css'
import './assets/iconfont/iconfont.css'
//swiper组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { options } */ )
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)
import commonFunModule from '@/common/common-fun-module'
Vue.prototype.common = commonFunModule

// Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})