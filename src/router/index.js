import Vue from 'vue'
import Router from 'vue-router'
import indexComponent from '@/pages/index'
import userComponent from '@/pages/user'
import oneComponent from '@/pages/one'
import twoComponent from '@/pages/two'
import loginComponent from '@/pages/login'
import shelfCompoment from '@/pages/shelf'
import detailComponent from '@/pages/book-detail'
import readingComponent from '@/pages/reading'
import registerComponent from '@/pages/register'
import settingComponent from '@/pages/setting'
import writeCommentComponent from '@/pages/write-comment'

import store from '@/store/store'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '*',
    redirect: '/index'
  }, {
    path: '/index',
    name: 'index',
    component: indexComponent
      // redirect: '/index/one',
      // children: [{
      //   path: 'one',
      //   name: 'one',
      //   component: oneComponent
      // }, {
      //   path: 'two',
      //   name: 'two',
      //   component: twoComponent
      // }]
  }, {
    path: '/detail/:book_id',
    name: 'detail',
    meta: {
      keepAlive: true
    },
    component: detailComponent
  }, {
    path: '/chapter',
    name: 'chapter',
    meta: {
      keepAlive: true
    },
    component: readingComponent
  }, {
    path: '/writecomment',
    name: 'writecomment',
    meta: {
      requireAuth: true
    },
    component: writeCommentComponent
  }, {
    path: '/shelf',
    name: 'shelf',
    meta: {
      requireAuth: true
    },
    component: shelfCompoment
  }, {
    path: '/user',
    name: 'user',
    meta: {
      requireAuth: true
    },
    component: userComponent
  }, {
    path: '/setting',
    name: 'setting',
    meta: {
      requireAuth: true
    },
    component: settingComponent
  }, {
    path: '/login',
    name: 'login',
    component: loginComponent
  }, {
    path: '/register',
    name: 'register',
    component: registerComponent
  }]
})