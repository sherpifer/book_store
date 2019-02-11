<template>
  <div class="back-drop">
    <div class="comment-list-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100">
      <div class="comment-card comment-entry" @click="goComment">
        <p> <span class="iconfont icon-pingjia1"></span> 去点评</p>
        <span class="iconfont icon-jiantouyou"></span>
      </div>
      <div class="comment-card" v-for="(item,index) in comments" :key="index">
        <div class="content">
          {{item.content}}
        </div>
        <div class="info">
          <div class="author">
            <img class="avatar" :src="item.avatar" alt="">
            <span>{{item.account}}</span>
          </div>
          <div class="publish-date">{{item.created_at}}</div>
        </div>
      </div>
    </div>
    <div class="close-btn" @click="close"><span class="iconfont icon-guanbi1"></span></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    InfiniteScroll
  } from 'mint-ui'
  
  Vue.use(InfiniteScroll)
  import Service from '@/service/service'
  export default {
    data() {
      return {
        comments: []
      }
    },
    methods: {
      loadMore() {
        this.getComments()
      },
      close() {
        this.$emit('close')
      },
      goComment() {
        this.$router.push({
          name: 'writecomment'
        })
      },
      getComments() {
        this.common.showLoading()
        Service.getComments().then(res => {
          if (res.data.retCode == 0) {
            this.comments = this.comments.concat(res.data.data.comments)
          }
          this.common.hideLoading()
        })
      }
    },
    created() {
      this.getComments()
    }
  }
</script>

<style lang='less' scoped>
  .back-drop {
    width: 100vw;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3001;
    .close-btn {
      position: fixed;
      bottom: .45rem;
      left: 50%;
      transform: translateX(-50%);
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      .iconfont {
        color: #fff;
        font-size: .6rem;
        font-weight: 900;
      }
    }
    .comment-list-box {
      height: 100vh;
      width: 100vw;
      overflow: scroll;
      .comment-card {
        &.comment-entry {
          margin-top: 1rem!important;
          display: flex;
          justify-content: space-between;
          .iconfont {
            vertical-align: middle;
            font-weight: 900;
            font-size: .4rem;
            &.icon-jiantouyou {
              color: #635b5b;
              font-size: .2rem;
            }
          }
        }
        width: 92vw;
        margin: 0 auto;
        margin-bottom: .3rem;
        background: #fff;
        border-radius: .2rem;
        min-height: 1rem;
        padding: .5rem;
        box-shadow: 0 0 0.5rem 0.01rem #999797;
        .content {
          padding-bottom: .3rem;
          text-indent: .4rem;
        }
        .info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .author {
            .avatar {
              display: inline-block;
              width: .5rem;
              height: .5rem;
              // background: blue;
              border-radius: 50%;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
</style>


