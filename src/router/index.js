import Vue from 'vue'
import Router from 'vue-router'
import indexComponent from '../pages/index'
import userComponent from '../pages/user'
import oneComponent from '../pages/one'
import twoComponent from '../pages/two'
import loginComponent from '../pages/login'
import shelfCompoment from '../pages/shelf'
import detailComponent from '@/pages/book-detail'
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
        component: shelfCompoment
    }, {
        path: '/user',
        name: 'user',
        component: userComponent
    }, {
        path: '/login',
        name: 'login',
        component: loginComponent
    }]
})