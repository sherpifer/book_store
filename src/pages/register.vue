<template>
  <div class="register-page">
    <top-nav title="注册" :showBack="true"></top-nav>
    <div class="register-form">
      <p class="form-item">
        <label>用户名</label>
        <input type="text" v-model="username" placeholder="3位以上字母组成" @blur="checkUserName">
      </p>
      <p class="err_tip" v-if="username_err">● 请输入3位字母以上组成的用户名</p>
      <p class="form-item">
        <label>密码</label>
        <input type="password" v-model="pwd" placeholder="6位以上字符组成" @blur="checkPwd">
      </p>
      <p class="err_tip" v-if="pwd_err">● 请输入6位以上字符组成的密码串</p>
      <p class="form-item">
        <label>确认密码</label>
        <input type="password" v-model="repeat_pwd" placeholder="再次输入密码" @blur="checkRepeatPwd">
      </p>
      <p class="err_tip" v-if="repeat_pwd_err">● 两个密码不一致</p>
      <div class="submit-btn" @click="register">注册</div>
      <span class="forget-pwd-btn" @click="goBack">已有账号</span>
    </div>
  </div>
</template>

<script scoped>
  import topNav from "@/components/top-nav"
  export default {
    components: {
      topNav
    },
    data() {
      return {
        username: '',
        pwd: '',
        repeat_pwd: '',
        username_err: false,
        pwd_err: false,
        repeat_pwd_err: false
      }
    },
    mounted(){
    },
    methods: {
      goBack() {
        this.$router.back(-1)
      },
      checkUserName() {
        if (/([a-z]|[A-Z]){3,}/.test(this.username)) {
          this.username_err = false
        } else {
          this.username_err = true
        }
      },
      checkPwd() {
        if (/\w{6,}/.test(this.pwd)) {
          this.pwd_err = false
        } else {
          this.pwd_err = true
        }
        this.repeat_pwd && this.checkRepeatPwd()
      },
      checkRepeatPwd() {
        if (this.pwd == this.repeat_pwd) {
          this.repeat_pwd_err = false
        } else {
          this.repeat_pwd_err = true
        }
      },
      register() {
        this.checkUserName()
        this.checkPwd() 
        this.checkRepeatPwd()
        if (this.pwd && this.repeat_pwd && this.username && !this.username_err && !this.pwd_err && !this.repeat_pwd_err) {
          alert('注册成功，请登录')
          this.$router.back(-1)
        } else {
          console.log('请根据要求注册')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .register-btn {
    font-size: 0.3rem;
  }
  
  .register-page {
    width: 100vw;
    height: 100vh;
    h3 {
      margin: 0;
      text-align: center;
      background: #0e5387;
      color: #fff;
      padding: 0.2rem 0;
      width: 100vw;
    }
    .register-form {
      margin-top: 1rem;
      p.form-item {
        width: 78%;
        margin: 0.4rem auto;
        display: flex;
        line-height: 0.8rem;
        justify-content: space-between;
        label {
          width: 1.2rem;
        }
        input {
          border: 1px solid #ccc;
          border-radius: 0.3rem;
          width: 60vw;
          text-indent: 0.3rem;
        }
      }
      .err_tip {
        width: 78%;
        margin: 0 auto;
        color: red;
      }
      .submit-btn {
        width: 85vw;
        line-height: 0.35rem;
        border-radius: 0.15rem;
        background: #89ccff;
        text-align: center;
        font-weight: bold;
        color: #fff;
        margin: 0 auto;
        line-height: 0.8rem;
        margin-top: 0.8rem;
      }
      span.forget-pwd-btn {
        line-height: 0.8rem;
        display: block;
        width: 100vw;
        text-align: center;
        color: #328bcf;
      }
    }
  }
</style>
