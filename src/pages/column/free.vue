

<template>
  <div class="list-card">
    <div class="item-card" v-for="(item,index) in book_list" :key="index"  @click="goDetail(item.id)">
      <img :src="item.cover_img" alt>
      <div class="info">
        <p class="title">《{{item.title}}》</p>
        <p class="name">{{item.author}}</p>
        <p class="intro">简介:{{item.intro}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Service from '@/service/service'
  export default {
    data() {
      return {
        book_list: []
      }
    },
    activated() {
      Service.getBooks().then(res => {
        if (res.data.retCode == 0) {
          this.book_list = res.data.data.books_list
        }
      })
    },
    methods:{
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
  .list-card {
    background: #fff;
    .item-card {
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: flex-start;
      padding: .2rem 0;
      border-bottom: 1px solid rgb(231, 230, 230);
      img {
        border-radius: .2rem;
        margin-left: .3rem;
        width: 1.4rem;
      }
      .info {
        flex: 1;
        height: 1.5rem;
        padding-left: .3rem;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: 0.28rem;
          color: black;
          font-weight: 600;
        }
        .name {
          color: rgb(7, 85, 121);
          span.iconfont {
            margin-right: .1rem;
          }
        }
        .intro {
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          white-space: nowrap;
        }
      }
    }
  }
</style>
