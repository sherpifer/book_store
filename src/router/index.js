import Vue from 'vue'
import Router from 'vue-router'
import indexComponent from '@/pages/index'
import freeComponent from '@/pages/column/free'
import activityComponent from '@/pages/column/activity'
import hotComponent from '@/pages/column/hot'
import searchComponent from '@/pages/search'
import userComponent from '@/pages/user/user'
import messageComponent from '@/pages/user/profile/message'
import vipComponent from '@/pages/user/profile/vip'
import rankComponent from '@/pages/user/profile/rank'
import fansComponent from '@/pages/user/profile/fans'
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
      meta: {
        keepAlive: true
      },
      component: indexComponent,
      redirect: '/index/hot',
      children: [{
        path: 'free',
        name: 'free',
        component: freeComponent
      }, {
        path: 'activity',
        name: 'activity',
        component: activityComponent
      }, {
        path: 'hot',
        name: 'hot',
        component: hotComponent
      }]
    },
    {
      path: '/index/search',
      name: 'search',
      component: searchComponent
    },
    {
      path: '/book/detail/:book_id',
      name: 'detail',
      meta: {
        keepAlive: true
      },
      component: detailComponent
    },
    {
      path: '/book/detail/chapter/:book_id',
      name: 'chapter',
      meta: {
        keepAlive: true
      },
      component: readingComponent
    },
    {
      path: '/book/detail/:book_id/writecomment',
      name: 'writecomment',
      meta: {
        requireAuth: true
      },
      component: writeCommentComponent
    },
    {
      path: '/shelf',
      name: 'shelf',
      meta: {
        keepAlive: true,
        requireAuth: true
      },
      component: shelfCompoment
    },
    {
      path: '/user',
      name: 'user',
      meta: {
        requireAuth: true,
        keepAlive: true
      },
      component: userComponent
    },
    {
      path: '/user/message',
      name: 'message',
      meta: {
        requireAuth: true,
        keepAlive: true
      },
      component: messageComponent
    },
    {
      path: '/user/vip',
      name: 'vip',
      meta: {
        requireAuth: true
      },
      component: vipComponent
    },
    {
      path: '/user/rank',
      name: 'rank',
      meta: {
        requireAuth: true
      },
      component: rankComponent
    },
    {
      path: '/user/fans',
      name: 'fans',
      meta: {
        requireAuth: true
      },
      component: fansComponent
    },
    {
      path: '/setting',
      name: 'setting',
      meta: {
        requireAuth: true,
        keepAlive: true
      },
      component: settingComponent
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        keepAlive: true
      },
      component: loginComponent
    },
    {
      path: '/register',
      name: 'register',
      component: registerComponent
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