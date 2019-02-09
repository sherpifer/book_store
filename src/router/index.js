import Vue from 'vue'
import Router from 'vue-router'
import indexComponent from '@/pages/index'
import userComponent from '@/pages/user/user'
import oneComponent from '@/pages/one'
import twoComponent from '@/pages/two'
import registerComponent from '@/pages/user/register'
import loginComponent from '@/pages/user/login'
import shelfCompoment from '@/pages/shelf'
import detailComponent from '@/pages/book/book-detail'
import readingComponent from '@/pages/book/reading'
import settingComponent from '@/pages/user/setting'
import writeCommentComponent from '@/pages/book/write-comment'
import commonFunModule from '@/common/common-fun-module'
import store from '@/store/store'
Vue.use(Router)

const router = new Router({
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
    path: '/detail/chapter/:book_id',
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
      requireAuth: true,
      keepAlive: true
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
    meta: {
      keepAlive: true
    },
    component: loginComponent
  }, {
    path: '/register',
    name: 'register',
    component: registerComponent
  }]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.is_login) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  commonFunModule.hideLoading()
})

export default router