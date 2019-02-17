<template>
  <div class="index-page page">
    <top-nav title="轻松阅读" :showBack="false"></top-nav>
    <router-link :to="{name:'search'}" class="search-box">
      <div class="input"><span class="search-icon iconfont icon-sousuo1"></span> <span>大家都在搜索 “经典文学”</span></div>
    </router-link>
    <mt-swipe :auto="3000" class="wrapper">
      <mt-swipe-item v-for="(item,index) in bannerList" :key="index" class="swiper-slide">
        <img :src="item.url" alt>
      </mt-swipe-item>
    </mt-swipe>
    <recommend recommendTitle="推荐" :bookList="books"></recommend>
    <!-- <recommend recommendTitle="热门作家" spanTitle="东野圭吾" :bookList="books"></recommend> -->
    <!-- 专栏 子路由页面 -->
    <div class="cloumn-box">
      <div class="cloumn-nav">
        <router-link class="link-btn" to="hot" active-class="active"><span class='iconfont icon-yuedu'></span>热门作家</router-link>
        <router-link class="link-btn" to="activity" active-class="active"><span class='iconfont icon-yuedu'></span>活动专栏</router-link>
        <router-link class="link-btn" to="free" active-class="active"><span class='iconfont icon-yuedu'></span>免费专栏</router-link>
      </div>
      <div class="column-content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
  import Vue from 'vue'
  import bottomNav from '@/components/bottom-nav'
  import topNav from '@/components/top-nav'
  import recommend from '@/components/recommend'
  import Service from '@/service/service'
  import {
    Swipe,
    SwipeItem
  } from 'mint-ui'
  
  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)
  
  export default {
    components: {
      bottomNav,
      topNav,
      recommend
    },
    data() {
      return {
        books: [],
        bannerList: [{
            url:require( "@/assets/imgs/banner02.png")
          },
          {
            url:require( "@/assets/imgs/banner03.png")
          }
        ]
      }
    },
    activated: function() {
      Service.getBooks().then(res => {
        if (res.data.retCode == 0) {
          this.books = res.data.data.books_list
        }
      })
    }
  }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .index-page {
    padding-bottom: 4rem;
    height: 100vh;
  }
  
  .cloumn-box {
    width: 100vw;
    .column-content {
      min-height: 5rem;
      width: 100vw;
    }
    .cloumn-nav {
      width: 90vw;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .link-btn {
        transition: all .2s ease-in-out;
        line-height: 1.3rem;
        font-size: 0.34rem;
        color: black;
        font-weight: 600;
        .icon-yuedu {
          font-size: 0.38rem;
          margin-right: .1rem;
          display: none;
        }
        &.active {
          font-size: 0.38rem;
          color: #801872;
          .icon-yuedu {
            display: inline-block
          }
        }
      }
    }
  }
  
  .search-box {
    width: 100%;
    height: 1.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .input {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #b7b7b7;
      width: 95vw;
      height: .75rem;
      background: #fff;
      border-radius: .3rem;
      .search-icon {
        font-weight: 900;
        color: #969696;
        position: absolute;
        top: 50%;
        left: .5rem;
        transform: translateY(-50%);
        font-size: .34rem;
      }
    }
  }
  
  .scroll-nav {
    width: 100vw;
    overflow-x: scroll;
    position: fixed;
    top: 48px;
    .nav-inner {
      height: 50px;
      line-height: 50px;
      border: 1px solid;
      overflow-x: scroll;
      display: flex;
      white-space: nowrap;
      padding: 0 20px;
      width: auto;
      background: #fff;
      p {
        margin: 0;
        padding: 0 40px;
        height: 30px;
        text-align: center;
        &.active {
          color: rgb(0, 110, 255);
        }
      }
    }
  }
  
  .wrapper {
    width: 100vw;
    height: 50vw;
    .swiper-slide {
      width: 100vw;
      height: 50vw;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
