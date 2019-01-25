<template>
  <div class="user-page">
    <top-nav title="我"></top-nav>
    <img class="img-box" src="../assets/imgs/default_user.png" alt>
    <router-link tag="p" class="login-btn" to="/login">注册/登陆</router-link>
    <div class="user-info">
      <div class="item" v-for="(item,index) in info_list" :key="index">
        <p>{{item.name}}</p>
        <span class="iconfont icon-jiantouyou"></span>
      </div>
    </div>
    <bottom-nav></bottom-nav>
  </div>
</template>
<script>
import Vue from "vue"
import topNav from "@/components/top-nav"
import bottomNav from "../components/bottom-nav"

export default {
  components: {
    topNav,
    bottomNav
  },
  data() {
    return {
      userName: "kuiki",
      info_list: [
        {
          name: "个人信息"
        },
        {
          name: "个人成就"
        },
        {
          name: "反馈意见"
        }
      ]
    }
  }
};
</script>

<style lang="less">
.user-page {
  width: 100vw;
  height: 100vh;
  .img-box {
    display: block;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 1px solid blue;
    margin: 0 auto;
    margin-top: 50px;
  }
  .login-btn {
    line-height:.8rem;
    text-align: center;
  }
  .user-info {
    padding-top:.4rem;
    .item {
      line-height: .85rem;
      border-bottom: 1px solid #ccc;
      width:90vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
    }
  }
}
</style>



