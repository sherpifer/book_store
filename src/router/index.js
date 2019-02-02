import Vue from 'vue'
import Router from 'vue-router'
import indexComponent from '@/pages/index'
import userComponent from '@/pages/user'
import oneComponent from '@/pages/one'
import twoComponent from '@/pages/two'
import loginComponent from '@/pages/login'
import shelfCompoment from '@/pages/shelf'
import detailComponent from '@/pages/book-detail'
import registerComponent from '@/pages/register'

import store from '@/store/store'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '*',
        redirect: '/index'
    }, {
        path: '/index',
        name: 'index',
        component: indexComponent,
        redirect: '/index/one',
        children: [{
            path: 'one',
            name: 'one',
            component: oneComponent
        }, {
            path: 'two',
            name: 'two',
            component: twoComponent
        }]
    }, {
        path: '/detail:id',
        name: 'detail',
        component: detailComponent
    }, {
        path: '/shelf',
        name: 'shelf',
        component: shelfCompoment,
        meta: {
            requireAuth: true
        }
    }, {
        path: '/user',
        name: 'user',
        component: userComponent,
        meta: {
            requireAuth: true
        }
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