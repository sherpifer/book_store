//自动对焦
import Vue from 'vue'
Vue.directive('focus', {
  inserted: function(el) {
    el.focus()
  }
})