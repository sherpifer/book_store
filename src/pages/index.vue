<template>
  <div class="index-page">
    <top-nav title="轻松阅读" :showBack="false"></top-nav>
   <div class="wrapper">
      <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item,index) in bannerList" :key="index">
        <img :src="item.url" alt>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
   </div>
  <recommend recommendTitle="热门读物" :bookList="books"></recommend>
    <recommend recommendTitle="热门作家"  spanTitle="东野圭吾" :bookList="books"></recommend>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
import bottomNav from "../components/bottom-nav"
import topNav from "../components/top-nav"
import recommend from "../components/recommend"

export default {
  components: {
    bottomNav,
    topNav,
    recommend
  },
  data() {
    return {
      books:[{
        title:'解忧杂货铺',
        author:'东野圭吾',
        cover_img:'/static/imgs/jyzhp.png'
      },{
        title:'恶意',
        author:'东野圭吾',
        cover_img:'/static/imgs/ey.png'
      },{
        title:'秘密',
        author:'东野圭吾',
        cover_img:'/static/imgs/mm.png'
      },{
        title:'时生',
        author:'东野圭吾',
        cover_img:'/static/imgs/sf.png'
      }],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable:true
        },
        loop:true,
        speed: 500
      },
      bannerList: [
        {
          url: '/static/imgs/banner1.png'
        },
        {
          url: '/static/imgs/banner2.png'
        },
        {
          url: '/static/imgs/banner3.png'
        }
      ]
    };
  },
  created: function() {},
  methods: {}
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style  lang='less' scoped>
.index-page{
  padding-bottom:4rem;
}
.wrapper /deep/ .swiper-pagination-bullet-active{
  background: #fff;
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
.swiper-slide {
  width: 100vw;
  height: 40vw;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
