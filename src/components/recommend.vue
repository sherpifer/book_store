<template>
  <div class="recommend-box">
    <p class="title">
      <span>{{recommendTitle}}</span>
      <span class="span-title" v-if="spanTitle">● {{spanTitle}}</span>
    </p>
    <div class="recommend-swiper">
      <div class="swiper-slide-block" v-for="(item,index) in bookList" :key="index" @click="goDetail(item.id)">
        <img :src="item.cover_img" alt>
        <p class="book-title">{{item.title}}</p>
        <p class="author">{{item.author}}</p>
      </div>
    </div>
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
      return {}
    },
    methods: {
      goDetail(book_id) {
        this.$router.push({
          name: 'detail',
          params: {
            book_id: book_id
          }
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
      overflow: scroll;
      white-space: nowrap;
      .swiper-slide-block {
        padding-right: .5rem;
        display: inline-block;
        width: auto;
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
