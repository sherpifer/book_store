<template>
  <div class="footer">
    <router-link tag="div" :to="{path:'/index'}" class="btn" active-class="active">
      <span class="iconfont icon-faxian"></span>
      <span>发现</span>
    </router-link>
    <router-link tag="div" :to="{path:'/shelf'}" class="btn" active-class="active">
      <span class="iconfont icon-fenlei"></span>
      <span>书架</span>
    </router-link>
    <router-link tag="div" :to="{path:'/user'}" class="btn" active-class="active">
      <mt-badge v-if="new_msg_count!=0&&is_login" class="badge" type="error" size="small">{{new_msg_count}}</mt-badge>
      <span class="iconfont icon-wode"></span>
      <span>我</span>
    </router-link>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Badge
  } from 'mint-ui';
  Vue.component(Badge.name, Badge);
  import store from '@/store/store'
  
  export default {
    computed: {
      new_msg_count() {
        return store.state.new_msg_count
      },
      is_login() {
        return store.state.is_login
      }
    }
  };
</script>

<style lang="less" scoped>
  .footer {
    z-index: 3000;
    background: #fff;
    color: #c4c3c3;
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    box-shadow: 0 0 .5rem .1rem #00000013;
    .btn {
      position: relative;
      font-size: .28rem;
      font-weight: bolder;
      height: 1rem;
      width: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      &.active {
        color: #0080f6;
      }
      .iconfont {
        margin-bottom: .05rem;
      }
      .badge {
        line-height: normal;
        position: absolute;
        top: -15%;
        left: 55%;
      }
    }
  }
</style>