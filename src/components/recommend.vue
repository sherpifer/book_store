<template>
  <div class="recommend-box">
    <p class="title">
      <span>{{recommendTitle}}</span>
      <span class="span-title" v-if="spanTitle">● {{spanTitle}}</span>
    </p>
    <swiper class="recommend-swiper" :options="swiperOption">
      <swiper-slide v-for="(item,index) in bookList" :key="index">
        <div @click="goDetail(item.id)">
          <img :src="item.cover_img" alt>
          <p class="book-title">{{item.title}}</p>
          <p class="author">{{item.author}}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  export default {
    props: {
      bookList: {
        type: Array,
        required: true
      },
      recommendTitle: String,
      spanTitle: String
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          freeMode: true
        }
      };
    },
    methods: {
      goDetail(book_id) {
        this.$router.push({
          name: 'detail',
          params: {book_id}
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .recommend-box {
    width: 95vw;
    margin-left: 5vw;
    .title {
      font-weight: 500;
      line-height: 0.8rem;
      font-size: 0.3rem;
    }
    .recommend-swiper {
      .swiper-slide {
        overflow: hidden;
        img {
          width: 1.8rem;
          height: 2.3rem;
        }
        .book-title {
          font-size: 0.3rem;
          margin-top: 0.1rem;
        }
        .author {
          font-size: 0.25rem;
          color: #ccc;
          margin-top: 0.1rem;
        }
      }
    }
  }
</style>
