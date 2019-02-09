<template>
  <div class="back-drop">
    <div class="login-form">
      <span class="iconfont icon-guanbi1" @click="close"></span>
      <p>
        <label>用户名</label>
        <input type="text" v-model="user_name">
      </p>
      <p>
        <label>密码</label>
        <input type="password" v-model="password">
      </p>
      <div class="submit-btn" @click="login">登录</div>
      <span class="forget-pwd-btn">注册</span>
    </div>
  </div>
</template>

<script>
  import Service from '@/service/service'
  import store from '@/store/store'
  import {
    Toast
  } from 'mint-ui'
  export default {
    data() {
      return {
        user_name: "",
        password: "",
        go_back_home: false
      }
    },
    methods: {
      login() {
        if (!this.user_name || !this.password) return
        this.common.showLoading()
        Service.login({
          user_name: this.user_name,
          password: this.password
        }).then((res) => {
          this.common.hideLoading()
          console.log(res)
          if (res.data.retCode == 0) {
            store.commit('loginSuccess', res.data.user)
            //跳转到需要登录前提的目标的页面
            this.$emit('loginSuccess')
          } else if (res.data.retCode == 40401) {
            Toast({
              message: '用户名或密码有误',
              duration: 3000
            })
          } else {
            Toast({
              message: '出错啦，请稍后再试',
              duration: 3000
            })
          }
        })
      },
      close() {
        this.$emit('close')
      }
    }
  
  }
</script>

<style lang='less' scoped>
  .back-drop {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    z-index: 3000;
    .login-form {
      width: 90vw;
      background: #fff;
      padding-top: 1.5rem;
      padding-bottom: .5rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: .5rem;
      .icon-guanbi1 {
        position: absolute;
        top: .1rem;
        right: .1rem;
        font-weight: 900;
        font-size: .34rem;
        padding: .3rem;
      }
      p {
        width: 78%;
        margin: 0 auto;
        margin-bottom: .2rem;
        display: flex;
        line-height: .8rem;
        justify-content: space-between;
        label {
          width: 1.2rem;
        }
        input {
          border: 1px solid #ccc;
          border-radius: .3rem;
          width: 60vw;
          text-indent: 1.5em;
        }
      }
      .submit-btn {
        width: 85vw;
        line-height: .35rem;
        border-radius: .15rem;
        background: #89ccff;
        text-align: center;
        font-weight: bold;
        color: #fff;
        margin: 0 auto;
        line-height: .8rem;
        margin-top: .8rem;
      }
      span.forget-pwd-btn {
        line-height: .8rem;
        display: block;
        width: 100%;
        text-align: center;
        color: #328bcf;
      }
    }
  }
</style>


