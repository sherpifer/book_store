<template>
  <div class="index-page">
    <top-nav title="轻松阅读" :showBack="false"></top-nav>
    <router-link to="/index/search" class="search-box">
      <div class="input"><span class="search-icon iconfont icon-sousuo1"></span> <span>大家都在搜索 “经典文学”</span></div>
    </router-link>
    <mt-swipe :auto="3000" class="wrapper">
      <mt-swipe-item v-for="(item,index) in bannerList" :key="index" class="swiper-slide">
        <img :src="item.url" alt>
      </mt-swipe-item>
    </mt-swipe>
    <recommend recommendTitle="热门读物" :bookList="books"></recommend>
    <recommend recommendTitle="热门作家" spanTitle="东野圭吾" :bookList="books"></recommend>
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
            url: "/static/imgs/banner02.png"
          },
          {
            url: "/static/imgs/banner03.png"
          }
        ]
      }
    },
    created: function() {
      Service.getBooks().then(res => {
        if (res.data.retCode == 0) {
          this.books = res.data.data.books_list
        }
      })
    },
    methods: {}
  }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .index-page {
    padding-bottom: 4rem;
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
