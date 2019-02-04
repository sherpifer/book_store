<template>
  <div>
    <top-nav :showBack="true">
      <!-- 加入书架 -->
      <p v-if="book_detail.is_fav" class="fav-btn" @click="removeFav">移出书架 <span class="red-bg iconfont icon-shoucang2"></span></p>
      <p v-else class="fav-btn" @click="addFav">加入书架 <span class=" iconfont icon-shoucang1"></span></p>
    </top-nav>
    <img class="cover-img" :src="book_detail.cover_img" alt>
    <p class="book-title">{{book_detail.title}}</p>
    <p class="book-author">{{book_detail.author}}</p>
    <div class="book-detail">
      <div class="book-info">
        <div class="rate-box">
          <div>
            <span class="rate">{{book_detail.rate}}</span>
            <rate-start :rate="book_detail.rate"></rate-start>
          </div>
          <p class="recomment">
            {{book_detail.recomment_num}}人点评
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
  
    <login-form v-if="showLoginForm" @loginSuccess="loginCallback" @close="closeLoginForm"></login-form>
  </div>
</template>

<script>
  import Service from '@/service/service'
  import tipModule from '@/commonModules/tip-module'
  import store from '@/store/store'
  import topNav from '@/components/top-nav'
  import rateStart from '@/components/rate-start'
  import loginForm from '@/components/login-form'
  export default {
    components: {
      topNav,
      rateStart,
      loginForm
    },
    data() {
      return {
        showLoginForm: false,
        book_detail: {
          title: '',
          author: '',
          id: '',
          cover_img: '',
          rate: 0,
          population: 0,
          recomment_num: 0,
          is_fav: false
        },
        showMore: false
      }
    },
    mounted() {
      Service.getBookDetail(this.$route.params.book_id).then(res => {
        this.book_detail = res.data.book
        if (this.book_detail.desc.length > 45) {
          this.book_detail.complete_desc = this.book_detail.desc
          this.book_detail.desc = this.book_detail.desc.slice(0, 45)
          this.book_detail.desc += '...'
          this.showMore = true
        } else {
          this.showMore = false
        }
      });
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
      }
    }
  };
</script>

<style lang='less' scoped>
  .fav-btn {
    .iconfont {
      font-size: .35rem;
      &.red-bg {
        color: #ea7287;
      }
    }
  }
  
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
  
  .book-detail {
    box-sizing: border-box;
    width: 100%;
    margin: 1rem auto;
    margin-bottom: 0;
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
        .rate-start {
          display: inline-block;
          span {
            font-size: 0.35rem;
            color: #ccc;
            &.active {
              color: #a79141;
            }
          }
        }
        .recomment {
          margin-top: 0.15rem;
          font-size: 0.26rem;
          color: rgb(173, 173, 173);
          .iconfont {
            font-size: 0.15rem;
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
        font-size: 0.38rem;
        font-weight: 600;
        margin: 0.15rem 0;
      }
      .content {
        text-align: justify;
        text-indent: 0.5rem;
        font-size: 0.37rem;
        line-height: 0.55rem;
        .more {
          color: rgb(57, 127, 185);
          text-decoration: underline;
        }
      }
    }
  }
</style>
