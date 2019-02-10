<template>
  <div class="page">
    <top-nav title="设置"></top-nav>
    <div class="cell-box">
      <mt-cell title="阅读时不锁屏">
        <mt-switch v-model="reading_setting"></mt-switch>
      </mt-cell>
      <mt-cell title="首行缩进">
        <mt-switch v-model="indent_setting"></mt-switch>
      </mt-cell>
    </div>
    <div class="cell-box big-size-cell-box">
      <mt-cell title="接收新关注提醒" label="开启后，当其他用户关注你时,将会收到提醒">
        <mt-switch v-model="funs_msg"></mt-switch>
      </mt-cell>
      <mt-cell title="接收新书上架提醒" label="开启后，将会收到书城新书上架的更新提醒">
        <mt-switch v-model="new_msg"></mt-switch>
      </mt-cell>
      <mt-cell title="限时免费更新提醒" label="开启后，将会收到书城免费栏目的更新提醒">
        <mt-switch v-model="free_msg"></mt-switch>
      </mt-cell>
    </div>
    <div class="logout-btn" @click="logout">
      <mt-cell title="退出登录"></mt-cell>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import tipModule from '@/common/tip-module'
  import topNav from '@/components/top-nav'
  import store from '@/store/store'
  import {
    Switch,
    Cell
  } from 'mint-ui';
  Vue.component(Cell.name, Cell, Switch.name, Switch);
  
  export default {
    components: {
      topNav
    },
    data() {
      return {
        reading_setting: false,
        indent_setting: true,
        funs_msg: false,
        new_msg: false,
        free_msg: false
      }
    },
    methods: {
      logout() {
        tipModule.showConfirm('确定要退出该账号吗', () => {
          store.commit('logout')
          this.$router.push({
            path: '/login',
            query: {
              redirect: '/user'
            }
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .page {
    width: 100vw;
    height: 100vh;
  }
  
  .cell-box {
    margin-bottom: .3rem;
  }
  
  .logout-btn {
    text-align: center;
    color: red;
  }
  
  .big-size-cell-box {
    /deep/ .mint-cell-wrapper {
      padding-top: .35rem;
      padding-bottom: .3rem;
      background-image: none;
    }
  }
</style>


