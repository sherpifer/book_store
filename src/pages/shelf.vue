<template>
  <div class="page">
    <top-nav title="书架">
      <span v-if="edit" @click="switchEdit" class="finish-btn">完成</span>
      <span v-else @click="switchEdit">编辑</span>
    </top-nav>
    <div class="shelf-content">
      <div class="book-item" @click="edit?select(index):goDetail(book.id)" v-for="(book,index) in books" :key="index">
        <div class="img-box">
          <span v-if="edit&&book.select" class="select-tick iconfont icon-dui1 c-blue"></span>
          <span v-if="edit&&!book.select" class="unselect-tick iconfont icon-dui1 c-grey"></span>
          <img :src="book.cover_img" alt>
        </div>
        <p class="book-title">{{book.title}}</p>
      </div>
    </div>
    <div class="rm-btn" v-if="edit" @click="remove">移除</div>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
  import Vue from 'vue'
  import tipModule from '@/common/tip-module'
  import Service from '@/service/service'
  import topNav from '@/components/top-nav'
  import bottomNav from '@/components/bottom-nav'
  import {
    Toast
  } from 'mint-ui'
  
  export default {
    components: {
      topNav,
      bottomNav
    },
    data() {
      return {
        edit: false,
        books: []
      }
    },
    methods: {
      getBooks() {
        Service.getShelfBooks().then(res => {
          this.books = res.data.data.books
          this.common.hideLoading()
        })
      },
      switchEdit() {
        this.edit = !this.edit
      },
      select(index) {
        let book = this.books[index]
        book.select = !this.books[index].select
        Vue.set(this.books, index, book)
      },
      remove() {
        let remove_list = []
        for (let book of this.books) {
          if (book.select == true) {
            remove_list.push(book.id)
          }
        }
        if (remove_list.length == 0) {
          Toast({
            message: '请选择你要移除的书籍',
            duration: 3000
          })
        } else {
          Service.removeFav({
            book_ids: remove_list
          }).then(res => {
            this.getBooks()
            tipModule.showToast('移除成功')
          })
        }
      },
      goDetail(book_id) {
        this.$router.push({
          name: 'detail',
          params: {
            book_id
          }
        })
      }
    },
    created() {
      this.common.showLoading()
    },
    activated() {
      this.getBooks()
    },
    deactivated() {
      this.edit = false
    }
  }
</script>

<style lang='less' scoped>
  .finish-btn {
    color: #ed1254;
  }
  
  .rm-btn {
    width: 3rem;
    background: #ed1254;
    border-radius: .5rem;
    line-height: .9rem;
    font-size: .34rem;
    color: #fff;
    text-align: center;
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translate(-50%, 0);
    box-shadow: 0 0 .35rem .05rem #ccc;
  }
  
  .shelf-content {
    .book-item {
      position: relative;
      display: inline-block;
      width: 33%;
      text-align: center;
      margin-top: .5rem;
      .img-box {
        display: inline-block;
        img {
          width: auto;
          height: 2.8rem;
        }
        .unselect-tick,
        .select-tick {
          border-radius: 50%;
          background: #fff;
          position: absolute;
          bottom: 0.48rem;
          right: 0.45rem;
          font-size: .4rem;
          &.c-grey {
            color: #a3a3a3;
          }
          &.c-blue {
            color: rgb(82, 174, 236);
          }
        }
      }
      .book-title {
        font-size: 0.3rem;
        margin-top: 0.1rem;
      }
    }
  }
</style>