<template>
  <div class="detail-page page">
    <div class="top-part">
      <top-nav>
        <!-- 加入书架 -->
        <p v-if="book_detail.is_fav" class="fav-btn" @click="removeFav">移出书架 <span class="red-bg iconfont icon-shoucang2"></span></p>
        <p v-else class="fav-btn" @click="addFav">加入书架 <span class=" iconfont icon-shoucang1"></span></p>
      </top-nav>
      <img class="cover-img" :src="book_detail.cover_img" alt>
      <p class="book-title">{{book_detail.title}}</p>
      <p class="book-author">{{book_detail.author}}</p>
    </div>
    <div class="book-detail" v-if="!is_loading">
      <div class="book-info">
        <div class="rate-box" @click="showCommentList">
          <div>
            <span class="rate">{{book_detail.rate}}</span>
            <rate-start :rate="book_detail.rate"></rate-start>
          </div>
          <p class="recomment">
            <span class="iconfont icon-pingjia1 write-icon"></span>
            <span>{{book_detail.recomment_num}} 人点评</span>
            <span class="iconfont icon-jiantouyou"></span>
          </p>
        </div>
        <div class="population">
          {{book_detail.population}}
          <span>万人阅读</span>
        </div>
      </div>
      <div class="book-intro">
        <p class="title">简介</p>
        <p class="content">
          {{book_detail.desc}}
          <span class="more" v-if="showMore" @click="showMoreDetail">更多</span>
        </p>
      </div>
    </div>
    <router-link class="read-btn" :to="{name:'chapter',params:{'book_id':book_id}}"  v-if="!is_loading">
      <span class="iconfont icon-yuedu"></span>
      <span>开始阅读</span>
    </router-link>
    <comment-list v-if="showComments" @close="closeCommentList">
    </comment-list>
    <login-form v-if="showLoginForm" @loginSuccess="loginCallback" @close="closeLoginForm"></login-form>
  </div>
</template>

<script>
  import Service from '@/service/service'
  import tipModule from '@/common/tip-module'
  import store from '@/store/store'
  import topNav from '@/components/top-nav'
  import rateStart from '@/components/rate-start'
  import loginForm from '@/components/login-form'
  import commentList from '@/components/comment-list'
  export default {
    components: {
      topNav,
      rateStart,
      loginForm,
      commentList
    },
    data() {
      return {
        showLoginForm: false,
        showComments: false,
        book_detail: {},
        showMore: false,
        book_id: null,
        is_loading: true
      }
    },
    activated() {
      if (this.book_id == this.$route.params.book_id) {
        this.book_id = this.$route.params.book_id
        return
      }
      this.common.showLoading()
      this.is_loading = true
      this.book_id = this.$route.params.book_id
      this.book_detail = {}
      Service.getBookDetail(this.$route.params.book_id).then(res => {
        this.book_detail = res.data.data.book
        if (this.book_detail.desc.length > 45) {
          this.book_detail.complete_desc = this.book_detail.desc
          this.book_detail.desc = this.book_detail.desc.slice(0, 45)
          this.book_detail.desc += '...'
          this.showMore = true
        } else {
          this.showMore = false
        }
        this.is_loading = false
        this.common.hideLoading()
      })
    },
    deactivated() {
      // this.book_detail = {}
    },
    methods: {
      showMoreDetail() {
        this.showMore = false
        this.book_detail.desc = this.book_detail.complete_desc
      },
      closeLoginForm() {
        this.showLoginForm = false
      },
      addFav() {
        if (store.state.is_login) {
          this.postFav()
        } else {
          this.showLoginForm = true
        }
      },
      postFav() {
        Service.addFav({
          book_id: this.book_detail.id
        }).then(res => {
          if (res.data.retCode == 0) {
            this.book_detail.is_fav = true
            tipModule.showToast('添加成功')
          }
        })
      },
      removeFav() {
        Service.removeFav({
          book_ids: [this.book_detail.id]
        }).then(res => {
          if (res.data.retCode == 0) {
            this.book_detail.is_fav = false
          }
        })
      },
      loginCallback() {
        this.showLoginForm = false
        console.log('登录组件触发登录成功')
        this.postFav()
      },
      showCommentList() {
        this.showComments = true
      },
      closeCommentList() {
        this.showComments = false
      }
    }
  }
</script>

<style lang='less' scoped>
  .detail-page {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    .fav-btn {
      .iconfont {
        font-size: .35rem;
        &.red-bg {
          color: #ea7287;
        }
      }
    }
    .read-btn {
      padding-left: .6rem;
      padding-right: .3rem;
      background: #197fbe;
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
      line-height: 0.9rem;
      font-size: 0.34rem;
      color: #fff;
      position: fixed;
      bottom: .5rem;
      right: 0;
      box-shadow: 0 0 0.35rem 0.05rem #ccc;
      span {
        vertical-align: middle;
        &.iconfont {
          font-size: .4rem;
          font-weight: 700;
        }
      }
    }
    .top-part {
      .book-title {
        text-align: center;
        font-size: 0.38rem;
        font-weight: 600;
        margin: 0.3rem auto;
      }
      .book-author {
        text-align: center;
        color: #4c7a7d;
        margin: 0.3rem auto;
      }
      .cover-img {
        display: block;
        margin: 0.5rem auto;
        height: 3.5rem;
        width: auto;
        border-radius: 0.2rem;
        box-shadow: 0 0 20px 1px #ccc;
      }
    }
    .book-detail {
      flex: 1;
      box-sizing: border-box;
      width: 100%;
      margin: 1rem auto;
      padding: 0.4rem;
      background: #fff;
      border-radius: 0.1rem;
      .book-info {
        width: 100%;
        height: 1.5rem;
        >div {
          float: left;
          width: 50%;
          height: 100%;
        }
        .rate-box {
          .rate {
            font-size: 0.5rem;
            font-weight: 600;
            vertical-align: middle;
          }
          .recomment {
            margin-top: 0.25rem;
            font-size: 0.35rem;
            color: #397fb9;
            font-weight: bold;
            span {
              vertical-align: bottom;
            }
            .iconfont {
              font-size: 0.1rem;
            }
            .write-icon {
              font-size: 0.4rem;
              color: black;
            }
          }
        }
        .population {
          font-size: 0.5rem;
          font-weight: 600;
          span {
            font-size: 0.26rem;
            vertical-align: middle;
            color: rgb(173, 173, 173);
          }
        }
      }
      .book-intro {
        .title {
          font-size: 0.34rem;
          font-weight: 900;
          margin: 0.25rem 0;
        }
        .content {
          text-align: justify;
          text-indent: 0.5rem;
          font-size: 0.34rem;
          line-height: 0.55rem;
          .more {
            color: rgb(57, 127, 185);
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
