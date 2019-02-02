<template>
  <div class="user-page">
    <top-nav :title="user_name">
      <router-link class="iconfont icon-shezhi" to="/setting"></router-link>
    </top-nav>
    <div class="avatar-box">
      <img class="avatar" src="/static/imgs/user.png">
    </div>
    <div class="user-info">
      <div class="item" v-for="(item,index) in info_list" :key="index">
        <p class="item-title">
          <span :class="['iconfont',item.icon]" :style="item.icon_color"></span> <span class="title">{{item.name}}</span>
        </p>
        <p class="item-content">{{item.content}}</p>
        <!-- <span class="iconfont icon-jiantouyou"></span> -->
      </div>
    </div>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
  import topNav from "@/components/top-nav"
  import bottomNav from "@/components/bottom-nav"
  import store from "@/store/store"
  
  export default {
    components: {
      topNav,
      bottomNav
    },
    data() {
      return {
        user_name: store.state.user_name,
        info_list: [{
            name: '无限阅读卡',
            icon:'icon-huiyuan',
            icon_color:{
              color:'#e6bd24'
            },
            content:'还剩7天'
          },
          {
            name: '好友排名',
             icon:'icon-daxuepaimings',
            icon_color:{
              color:'#7cc37c'
            },
             content:'第4名'
          },
          {
            name: '关注',
             icon:'icon-31guanzhu1xuanzhong',
            icon_color:{
              color:'#d25f73'
            } ,
            content:'24人关注我'
          }
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  .user-page {
    width: 100vw;
    height: 100vh;
    .icon-shezhi{
      font-size:.4rem;
      color:black;
    }
    .avatar-box {
      width: 100vw;
      background: #fff;
      padding: 0.5rem 0;
      .avatar {
        background: #fff;
        display: block;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        margin: 0 auto;
        background: #1b405c;
      }
    }
    .login-btn {
      font-size: 0.34rem;
      font-weight: 600;
      line-height: 1rem;
      text-align: center;
      color: #1173a8;
    }
    .user-info {
      padding-top: 0.4rem;
      background: #fff;
      .item {
        font-size:.3rem;
        line-height: 1.5rem;
        width: 100vw;
        padding:0 .3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        &:not(:last-child) {
          border-bottom: 0.03rem solid #f1f1f1;
        }
        .iconfont{
          font-size:0.5rem;
          vertical-align: middle;
          margin-right:.25rem;
        }
        .title{
          vertical-align: middle;
        }
      }
    }
  }
</style>



