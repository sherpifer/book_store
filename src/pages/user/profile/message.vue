<template>
  <div class="page">
    <top-nav title="信息"><span> <mt-badge v-if="new_msg_count!=0" class="badge" type="error" size="small">{{new_msg_count}}</mt-badge></span></top-nav>
    <div class="card-list">
      <div class="card-item" v-for="(item,index) in user_msg_list " :key="index" @click="getMsgDetail(item,index)">
        <span class="red-dot" v-if="item.new_msg"></span>
        <span class="enter-icon iconfont icon-jiantouyou"></span>
        <p class="date">
          <span>{{item.created_at}}</span>
        </p>
        <p class="content">
          {{item.content}}
        </p>
      </div>
    </div>
    <div class="msg-detail-drop" v-if="show_msg_detail" @click="closeDrop">
      <div class="content-card">
        <p class="date">{{msg_detail.created_at}}</p>
        <p>{{msg_detail.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Badge
  } from 'mint-ui';
  Vue.component(Badge.name, Badge);
  import topNav from '@/components/top-nav'
  import tipModule from '@/common/tip-module'
  import store from '@/store/store'
  import Service from '@/service/service'
  export default {
    components: {
      topNav
    },
    data() {
      return {
        user_msg_list: [],
        msg_detail: {},
        show_msg_detail: false
      }
    },
    computed: {
      new_msg_count: function() {
        return store.state.new_msg_count
      }
    },
    methods: {
      closeDrop(e) {
        let el = e.target;
        if (el.className == 'msg-detail-drop') {
          this.show_msg_detail = false
        }
      },
      getMsgDetail(item, index) {
        this.show_msg_detail = true
        this.msg_detail = item
        if (this.user_msg_list[index].new_msg == true) {
          this.user_msg_list[index].new_msg = false
          Service.readMsg({
            msg_id: item.id
          })
          store.commit('reduceUnreadMsgCount')
        }
      }
    },
    activated() {
      this.common.showLoading()
      Service.getUserMsg().then(res => {
        if (res.data.retCode == 0) {
          this.user_msg_list = res.data.data.user_msg
        }
        this.common.hideLoading()
      })
    },
    deactivated() {
      this.show_msg_detail = false
    }
  }
</script>

<style lang='less' scoped>
  .page {
    .badge {
      line-height: normal;
    }
    .card-list {
      width: 100vw;
      .card-item {
        position: relative;
        margin: 0 auto;
        width: 92vw;
        margin-bottom: .5rem;
        background: #fff;
        border-radius: .2rem;
        min-height: 1rem;
        line-height: .36rem;
        padding: .3rem .6rem;
        box-shadow: 0 0 0.5rem 0.01rem rgba(0, 0, 0, 0.05);
        margin-top: .3rem;
        .red-dot {
          width: .25rem;
          height: .25rem;
          background: rgb(226, 2, 2);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(.15rem, -50%);
        }
        .enter-icon {
          font-size: .2rem;
          color: #ccc;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translate(-.15rem, -50%);
        }
        .date {
          font-weight: 900;
          margin-bottom: .3rem;
        }
        .content {
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          white-space: nowrap;
        }
      }
    }
    .msg-detail-drop {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      // background:rgba(228, 179, 179, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      .content-card {
        margin: 0 auto;
        width: 92vw;
        margin-bottom: .5rem;
        background: #fff;
        border-radius: .2rem;
        min-height: 1rem;
        padding: .3rem .6rem;
        box-shadow: 0 0 10rem 5rem rgba(0, 0, 0, 0.5);
        font-size: .34rem;
        line-height: .5rem;
        .date {
          font-weight: 900;
          margin-bottom: .2rem;
        }
      }
    }
  }
</style>


