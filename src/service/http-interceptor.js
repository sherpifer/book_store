// http request 拦截器
// 本项目用的是mock模拟请求数据所以不适用，本模块在真正开发项目时进行使用
import axios from 'axios'
import router from '@/router'
import store from '@/store/store'

axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit('logout');
          router.push({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
      }
    }
    return Promise.reject(error.response.data)
      // 返回接口返回的错误信息
  })
export default axios