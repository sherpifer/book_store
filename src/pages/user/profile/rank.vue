<template>
  <div class="page">
    <top-nav title="好友排名"></top-nav>
    <mt-cell :title="item.account" v-for="(item,index) in rank_list" :key="index" :class="{'user-cell':user_name==item.account}">
      <img slot="icon" :src="item.avatar" width="48" height="48">
      <span><i class="user iconfont icon-wode1" v-if="user_name==item.account"></i> 第<b class="rank-num" :class="{'no1':item.rank==1}">{{item.rank}}</b>名</span>
    </mt-cell>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Cell
  } from 'mint-ui';
  Vue.component(Cell.name, Cell);
  
  import topNav from '@/components/top-nav'
  import tipModule from '@/common/tip-module'
  import Service from '@/service/service'
  import store from '@/store/store'
  export default {
    components: {
      topNav
    },
    data() {
      return {
        rank_list: [],
        user_name: store.state.user_name
      }
    },
    methods: {},
    created() {
      this.common.showLoading()
      Service.getRank().then(res => {
        this.rank_list = res.data.data.rank
        // 模拟用户获得第4名的页面效果
        this.rank_list[3].account = store.state.user_name
        this.rank_list[3].avatar = require('@/assets/imgs/user.png')
        this.common.hideLoading()
      })
    }
  }
</script>

<style lang='less' scoped>
  .page {
    min-height: 100vh;
    width: 100vw;
    /deep/ .mint-cell {
      min-height: 1.5rem;
    }
    .rank-num {
      font-weight: 600;
      font-size: .5rem;
      padding: 0 .2rem;
    }
    .no1 {
      font-weight: 900;
      color: orange;
      font-size: .6rem;
    }
    .user-cell {
      background: #6ce3ed3b;
    }
    .user {
      font-weight: 900;
      color: #3b8c9a;
      font-size: .4rem;
    }
  }
</style>


