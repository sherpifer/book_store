<template>
  <div class="user-page">
    <top-nav :title="user_name" :showBack="false">
      <router-link class="iconfont icon-shezhi" to="/setting"></router-link>
    </top-nav>
    <div class="avatar-box">
      <img class="avatar" src="@/assets/imgs/user.png">
    </div>
    <div class="user-info">
      <router-link class="item" v-for="(item,index) in info_list" :key="index" :to="{'path':item.path}">
        <p class="item-title">
          <span :class="['iconfont',item.icon]" :style="item.icon_color"></span> <span class="title">{{item.name}}</span>
        </p>
        <div class="item-content">
          <span v-if="item.name=='无限阅读卡'">还剩<b>{{vip_day}}</b>天</span>
          <span v-if="item.name=='好友排名'">第<b>{{rank}}</b>名</span>
          <span v-if="item.name=='关注'"><b>{{fans_num}}</b>人关注我</span>
          <mt-badge v-if="item.name=='信息'&& new_msg_count!=0&&is_login" class="badge" type="error" size="small">{{ new_msg_count}}</mt-badge>
        </div>
      </router-link>
    </div>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Badge
  } from 'mint-ui';
  
  Vue.component(Badge.name, Badge);
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
        vip_day: 7,
        rank: 4,
        fans_num: 20,
        info_list: [{
          name: '信息',
          path: '/user/message',
          icon: 'icon-xiaoxi',
          icon_color: {
            color: '#33a6c3'
          }
        }, 
        // {
        //   name: '无限阅读卡',
        //   path: '/user/vip',
        //   icon: 'icon-huiyuan',
        //   icon_color: {
        //     color: '#e6bd24'
        //   }
        // },
         {
          name: '好友排名',
          path: '/user/rank',
          icon: 'icon-daxuepaimings',
          icon_color: {
            color: '#7cc37c'
          }
        }, {
          name: '关注',
          path: '/user/fans',
          icon: 'icon-31guanzhu1xuanzhong',
          icon_color: {
            color: '#d25f73'
          }
        }]
      }
    },
    computed: {
      new_msg_count() {
        return store.state.new_msg_count
      },
      is_login() {
        return store.state.is_login
      },
       user_name(){
         return store.state.user_name
       }
    }
  }
</script>

<style lang="less" scoped>
  .user-page {
    width: 100vw;
    height: 100vh;
    .icon-shezhi {
      font-size: .4rem;
      color: black;
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
        color: black;
        font-size: .3rem;
        line-height: 1.5rem;
        width: 100vw;
        padding: 0 .3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        &:not(:last-child) {
          border-bottom: 0.03rem solid #f1f1f1;
        }
        .item-content {
          b {
            padding: 0 .1rem;
            font-size: .4rem;
            font-weight: 600;
          }
          .badge {
            line-height: normal!important;
          }
        }
        .iconfont {
          font-size: 0.5rem;
          vertical-align: middle;
          margin-right: .25rem;
        }
        .title {
          vertical-align: middle;
        }
      }
    }
  }
</style>



