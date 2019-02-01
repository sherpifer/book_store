<template>
  <div class="login-page">
    <top-nav title="登陆" :showBack="true"></top-nav>
    <div class="login-form">
      <p>
        <label>用户名</label>
        <input type="text" v-model="username">
      </p>
      <p>
        <label>密码</label>
        <input type="password" v-model="password">
      </p>
      <div class="submit-btn">确定</div>
    </div>
  </div>
</template>

<script scoped>
import topNav from '@/components/top-nav'
export default {
  components: {
      topNav
  },
  data() {
    return {
      username: "",
      password: ""
    };
  }
};
</script>

<style lang="less"  scoped>
.login-page {
  width:100vw;
  height: 100vh;
  h3 {
    margin: 0;
    text-align: center;
    background: #0e5387;
    color: #fff;
    padding: 10px 0;
    width: 100vw;
  }
  .login-form {
    margin-top: 100px;
    p {
      width: 78%;
      margin: 0 auto;
      margin-bottom: 20px;
      display: flex;
      line-height: 40px;
      justify-content: space-between;
      label {
        width: 60px;
      }
      input {
        border: 1px solid #ccc;
        border-radius: 10px;
        width: 60vw;
        text-indent: 1.5em;
      }
    }
    .submit-btn {
      width: 50vw;
      line-height: 35px;
      border-radius: 15px;
      background: #89ccff;
      text-align: center;
      font-weight: bold;
      color: #fff;
      margin: 0 auto;
      line-height: 40px;
      margin-top: 40px;
    }
  }
}
</style>
