import Vue from 'vue'
import Router from 'vue-router'
import indexComponent from '@/pages/index'
import hotComponent from '@/pages/column/hot'
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
      meta: {
        keepAlive: true
      },
      component: indexComponent,
      redirect: '/index/hot',
      children: [{
        path: 'hot',
        name: 'hot',
        meta: {
          keepAlive: true
        },
        component: hotComponent
      }, {
        path: 'free',
        name: 'free',
        meta: {
          keepAlive: true
        },
        component: resolve => require(['@/pages/column/free'], resolve)
      }, {
        path: 'activity',
        name: 'activity',
        meta: {
          keepAlive: true
        },
        component: resolve => require(['@/pages/column/activity'], resolve)
      }]
    },
    {
      path: '/index/search',
      name: 'search',
      component: resolve => require(['@/pages/search'], resolve)
    },
    {
      path: '/book/detail/:book_id',
      name: 'detail',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/pages/book/book-detail'], resolve)
    },
    {
      path: '/book/detail/chapter/:book_id',
      name: 'chapter',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/pages/book/reading'], resolve)
    },
    {
      path: '/book/detail/:book_id/writecomment',
      name: 'writecomment',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/book/write-comment'], resolve)
    },
    {
      path: '/shelf',
      name: 'shelf',
      meta: {
        keepAlive: true,
        requireAuth: true
      },
      component: resolve => require(['@/pages/shelf'], resolve)
    },
    {
      path: '/user',
      name: 'user',
      meta: {
        requireAuth: true,
        keepAlive: true
      },
      component: resolve => require(['@/pages/user/user'], resolve)
    },
    {
      path: '/user/message',
      name: 'message',
      meta: {
        requireAuth: true,
        keepAlive: true
      },
      component: resolve => require(['@/pages/user/profile/message'], resolve)
    },
    {
      path: '/user/vip',
      name: 'vip',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/user/profile/vip'], resolve)
    },
    {
      path: '/user/rank',
      name: 'rank',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/user/profile/rank'], resolve)
    },
    {
      path: '/user/fans',
      name: 'fans',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/user/profile/fans'], resolve)
    },
    {
      path: '/setting',
      name: 'setting',
      meta: {
        requireAuth: true,
        keepAlive: true
      },
      component: resolve => require(['@/pages/user/setting'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/pages/user/login'], resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/pages/user/register'], resolve)
    }
  ]
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