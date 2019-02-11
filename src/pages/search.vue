<template>
  <div class="page">
    <top-nav title="搜索"></top-nav>
    <div class="search-box">
      <div class="input-box">
        <input type="text" v-focus placeholder="东野圭吾" v-model="kw" @keyup="typing">
        <span class="del-btn iconfont icon-shanchu" @click="delKw"></span>
      </div>
      <div class="search-btn" :class="{'active':can_search}" @click="search(kw)">
        <span class="search-icon iconfont icon-sousuo1"></span>
      </div>
    </div>
    <!-- 关键字提示框 -->
    <div class="kw-box" v-if="show_history_kw_box">
      <div class="item-box">
        <p class="title">搜索历史 <span v-if="his_list.length>0" class=" del-btn iconfont icon-lajitong" @click="delHistory"></span></p>
        <p class="empty-tip" v-if="his_list.length==0">-去搜索你喜爱的图书吧-</p>
        <div>
          <span class="item" v-for="(item,index) in his_list" :key="index" @click="search(item)">{{item}}</span>
        </div>
      </div>
      <div class="item-box">
        <p class="title">搜索发现</p>
        <div>
          <span class="item" v-for="(item,index) in hot_list" :key="index" @click="search(item)">{{item}}</span>
        </div>
      </div>
    </div>
    <!-- 模糊匹配关键字提示框 -->
    <div class="fuzzy-search" v-if="!show_search_result_box&&show_fuzzy_kw_box">
      <div class="cell" v-for="(item,index) in fuzzy_kw_list" :key="index" @click="search(item)">{{item}}</div>
    </div>
    <!-- 搜索结果框 -->
    <div class="search-result-box" v-if="show_search_result_box">
      <div class="book-box" v-for="(item,index) in search_result" :key="index" @click="goBookDetail(item.id)">
        <img :src="item.cover_img" alt>
        <div class="info">
          <p class="title">《{{item.title}}》</p>
          <p class="author">{{item.author}}</p>
          <p class="intro">简介: {{item.intro}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Cell
  } from 'mint-ui';
  Vue.component(Cell.name, Cell);
  import topNav from '@/components/top-nav'
  import tipModule from '@/common/tip-module'
  import Service from '@/service/service'
  import storageModule from '@/common/storage-module'
  export default {
    components: {
      topNav
    },
    data() {
      return {
        his_list: [],
        hot_list: ['东野圭吾', '恶意', '解忧杂货铺', '你好时光', '红楼梦', '水浒传'],
        kw: '',
        fuzzy_kw_list: [],
        search_result: [],
        show_search_result_box: false,
        show_history_kw_box: true,
        show_fuzzy_kw_box: false
      }
    },
    methods: {
      showFuzzyList() {
        this.show_search_result_box = false
        this.show_history_kw_box = false
        this.show_fuzzy_kw_box = true
      },
      showHistoryList() {
        this.show_search_result_box = false
        this.show_history_kw_box = true
        this.show_fuzzy_kw_box = false
      },
      showResultList() {
        this.show_search_result_box = true
        this.show_history_kw_box = false
        this.show_fuzzy_kw_box = false
      },
      typing() {
        if (this.kw.length > 0) {
          this.showFuzzyList()
          Service.searchBook(this.kw).then(res => {
            if (res.data.retCode == 0) {
              this.fuzzy_kw_list = res.data.data.kw_list
            }
          })
        } else {
          this.fuzzy_kw_list = []
          this.search_result = []
          this.showHistoryList()
        }
      },
      search(str) {
        if (str.length < 1) return
        this.common.showLoading()
        this.handleSearchHistory(str)
        Service.getBooks().then(res => {
          this.common.hideLoading()
          if (res.data.retCode == 0) {
            this.search_result = res.data.data.books_list
          }
          this.showResultList()
        })
      },
      goBookDetail(book_id) {
        this.$router.push({
          name: 'detail',
          params: {
            book_id: book_id
          }
        })
      },
      delKw() {
        this.kw = ''
        this.showHistoryList()
      },
      delHistory() {
        this.his_list = []
        storageModule.removeItem('search_history')
      },
      handleSearchHistory(str) {
        let his_arr = []
        if (storageModule.getItem('search_history')) {
          his_arr = storageModule.getItem('search_history').split(',')
          let index = his_arr.findIndex(function(item) {
            return item == str
          })
          if (index > -1) {
            his_arr.splice(index, 1)
          }
        }
        his_arr.unshift(str)
        if (his_arr.length > 20) {
          his_arr.pop()
        }
        this.his_list = his_arr
        this.kw = str
        storageModule.setItem('search_history', his_arr.join(','))
      }
    },
    computed: {
      can_search() {
        return this.kw.length > 0
      }
    },
    created() {
      this.his_list = storageModule.getItem('search_history') ? storageModule.getItem('search_history').split(',') : []
    }
  }
</script>

<style lang='less' scoped>
  .page {
    display: flex;
    height: 100vh;
    flex-direction: column;
  }
  
  .search-box {
    width: 95vw;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    .input-box {
      position: relative;
      flex: 1;
      color: #b7b7b7;
      height: .75rem;
      background: #fff;
      border-radius: .3rem;
      .del-btn {
        position: absolute;
        top: 50%;
        right: 0;
        padding: 0 .3rem;
        transform: translateY(-50%);
      }
      input {
        line-height: .75rem;
        width: 100%;
        padding-left: .5rem;
        background: transparent;
      }
    }
    .search-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.2rem;
      height: .7rem;
      background: rgb(127, 150, 158);
      border-radius: .5rem;
      font-weight: 900;
      .search-icon {
        font-size: .34rem;
        color: #FFF;
      }
      &.active {
        background: rgb(53, 137, 170);
      }
    }
  }
  
  //模糊搜索框
  .fuzzy-search {
    overflow: scroll;
    flex: 1;
    width: 95vw;
    margin-top: 1.5rem;
    margin: 0 auto;
    transform: translateY(0rem);
    overflow: scroll;
    background: #fff;
    .cell {
      line-height: 0.8rem;
      padding-left: .2rem;
      border-bottom: 1px solid #e8e8e8;
    }
  }
  
  // 历史搜索关键字
  .kw-box {
    flex: 1;
    .item-box {
      width: 95vw;
      margin: 0 auto;
      margin-top: .5rem;
      height: auto;
      .empty-tip {
        line-height: 1rem;
        text-align: center;
      }
      .title {
        width: 100%;
        position: relative;
        font-weight: 600;
        font-size: .34rem;
        line-height: .8rem;
        .del-btn {
          position: absolute;
          right: .5rem;
          font-size: .4rem;
          color: rgb(99, 99, 99);
          padding-left: .5rem;
        }
      }
      .item {
        margin-bottom: .2rem;
        display: inline-block;
        background: #fff;
        border-radius: .5rem;
        padding: .2rem .3rem;
        margin-right: .3rem;
      }
    }
  }
  
  .search-result-box {
    overflow: scroll;
    flex: 1;
    width: 95vw;
    margin-top: 1.5rem;
    margin: 0 auto;
    transform: translateY(0rem);
    overflow: scroll;
    background: #fff;
    padding: .2rem;
    .book-box {
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      padding: .2rem 0;
      border-bottom: 1px solid rgb(231, 230, 230);
      img {
        width: 1.3rem;
        height: auto;
      }
      .info {
        flex: 1;
        padding-left: .3rem;
        overflow: hidden;
        .book-title {
          font-size: 0.3rem;
          margin-top: 0.1rem;
        }
        .author {
          line-height: .8rem;
          font-size: 0.25rem;
          color: rgb(7, 85, 121);
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


