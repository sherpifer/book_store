<template>
  <div class="register-page">
    <top-nav title="注册" ></top-nav>
    <div class="register-form">
      <p class="form-item">
        <label>用户名</label>
        <input type="text" v-model="user_name" placeholder="3位以上字母组成" maxlength="15" @blur="checkUserName" v-focus>
        <span class="user_name_only_icon iconfont icon-dui" v-if="user_name.length>=3&&user_name_only"></span>
      </p>
      <p class="err_tip" v-if="user_name_err">● 请输入3位字母以上组成的用户名</p>
      <p class="err_tip" v-if="user_name.length>3&&!user_name_err&&!user_name_only">● 用户名已存在</p>
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
  import Service from '@/service/service'
  import tipModule from '@/common/tip-module'
  import topNav from "@/components/top-nav"
  export default {
    components: {
      topNav
    },
    data() {
      return {
        user_name: '',
        pwd: '',
        repeat_pwd: '',
        user_name_err: false,
        user_name_only: false,
        pwd_err: false,
        repeat_pwd_err: false
      }
    },
    methods: {
      goBack() {
        this.$router.back(-1)
      },
      checkUserName() {
        if (!this.user_name) return
        if (this.user_name && /^([a-z]|[A-Z]){3,}$/.test(this.user_name)) {
          this.user_name_err = false
          // 检测用户名的唯一性
          Service.checkAccount(this.user_name).then((res) => {
            if (res.data.data.users.length == 0) {
              this.user_name_only = true
            } else {
              this.user_name_only = false
            }
          })
        } else {
          this.user_name_only = false
          this.user_name_err = true
        }
      },
      checkPwd() {
        if (!this.pwd) return
        if (/^\w{6,}$/.test(this.pwd)) {
          this.pwd_err = false
        } else {
          this.pwd_err = true
        }
        if (!this.repeat_pwd) return
        if (this.pwd == this.repeat_pwd.substring(0, this.pwd.length)) {
          this.repeat_pwd_err = false
        } else {
          this.repeat_pwd_err = true
        }
      },
      checkRepeatPwd() {
        if (this.repeat_pwd == this.pwd) {
          this.repeat_pwd_err = false
        } else {
          this.repeat_pwd_err = true
        }
      },
      register: function() {
        if (this.pwd && this.repeat_pwd && this.user_name && this.user_name_only && !this.user_name_err && !this.pwd_err && !this.repeat_pwd_err) {
          this.common.showLoading()
          Service.register({
            user_name: this.user_name,
            password: this.pwd
          }).then((res) => {
            if (res.data.retCode == 0) {
              this.common.hideLoading()
              let _this=this
              tipModule.showAlert('注册成功，请登录', function() {
                _this.$router.back(-1)
              })
            }
          })
        } else {
          console.log('请根据要求注册')
        }
      }
    },
    watch: {
      user_name: function(curVal, oldVal) {　
        if (curVal.length < 3) return
        this.checkUserName()
      },
      pwd: function(curVal, oldVal) {
        if (curVal && this.repeat_pwd) {
          this.checkPwd()
        }
      },
      repeat_pwd: function(curVal, oldVal) {
        if (curVal && this.pwd) {
          if (this.repeat_pwd == this.pwd.substring(0, this.repeat_pwd.length)) {
            this.repeat_pwd_err = false
          } else {
            this.repeat_pwd_err = true
          }
        }
      }
    },
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
      position: relative;
      p.form-item {
        position: relative;
        width: 78%;
        margin: 0.4rem auto;
        display: flex;
        line-height: 0.8rem;
        justify-content: space-between;
        .user_name_only_icon {
          position: absolute;
          color: #2d992d;
          right: 0.1rem;
          font-size: .5rem;
          font-weight: 600;
        }
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
