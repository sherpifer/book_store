<template>
  <div class="page">
    <top-nav title="粉丝"></top-nav>
    <mt-cell :title="item.account" is-link v-for="(item,index) in fans_list" :key="index">
      <img slot="icon" :src="item.avatar" width="48" height="48">
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
  export default {
    components: {
      topNav
    },
    data() {
      return {
        fans_list: []
      }
    },
    methods: {},
    created() {
       this.common.showLoading()
      Service.getFans().then(res => {
        this.fans_list = res.data.data.fans
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
  }
</style>


