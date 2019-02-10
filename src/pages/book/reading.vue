<template>
  <div :class="{'black-theme':theme=='black-theme'}" class="page">
    <top-nav :black_theme="theme=='black-theme'"> </top-nav>
    <div :class="['content-box',theme]" :style="font_size_sytle">
      <p class="chapter-title" v-if="chapter_title">第{{chapters[chapter_index]}}章 ● {{chapter_title}}</p>
      <div class="content" @click="closeWindow">{{content}}</div>
      <div class="chapter-btns">
        <p class="btn" v-if="content" :class="{'hidden':chapter_index==0}" @click="prev()"><span class="iconfont icon-jiantouzuo"></span>上一章</p>
        <p class="btn" v-if="content" :class="{'hidden':chapter_index==chapters.length-1}" @click="next()">下一章<span class="iconfont icon-jiantouyou"></span></p>
      </div>
    </div>
    <!-- 设置背景字体 -->
    <div class="setting-content bg-setting" v-if="edit_bg">
      <div class="bg-select white" @click="changeTheme('white-theme')"></div>
      <div class="bg-select pink" @click="changeTheme('pingk-theme')"></div>
      <div class="bg-select yellow" @click="changeTheme('yellow-theme')"></div>
      <div class="bg-select black" @click="changeTheme('black-theme')"></div>
    </div>
    <div class="setting-content font-size-setting" v-if="edit_font_size">
      <span class="iconfont icon-yueduye_zitijianxiao" @click="reduceFontSize"></span>
      <span class="iconfont icon-yueduye_zitizengda" @click="increaseFontSize"></span>
    </div>
    <div class="setting-bar">
      <p class="btn" @click="showChapterList" :class="{'active':show_chapter_list}">
        <span class="iconfont icon-yuedu"></span>
        <span>章节</span>
      </p>
      <p class="btn" @click="toggleBgEdit" :class="{'active':edit_bg}">
        <span class="iconfont icon-zhuti"></span>
        <span>背景</span>
      </p>
      <p class="btn" @click="toggleFontEdit" :class="{'active':edit_font_size}">
        <span class="iconfont icon-zitishezhi"></span>
        <span>字体</span></p>
    </div>
    <!-- 章节选择 -->
    <div class="chapter-list" v-if="show_chapter_list">
      <div class="title" title="章节选择"></div>
      <div :class="['item',{'active': chapter_index==index}]" v-for="(item,index) in chapters" :key="index" @click="goChapter(index)">第{{item}}章</div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    CellSwipe
  } from 'mint-ui';
  
  Vue.component(CellSwipe.name, CellSwipe);
  import topNav from '@/components/top-nav'
  import Service from '@/service/service'
  import tipModule from '@/common/tip-module'
  export default {
    components: {
      topNav
    },
    data() {
      return {
        book_id: null,
        chapter_index: 0,
        theme: 'white-theme',
        content: '',
        chapter_title: '',
        show_chapter_list: false,
        edit_bg: false,
        edit_font_size: false,
        font_size: 0.36, //17 18 19 20
        chapters: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七']
      }
    },
    computed: {
      font_size_sytle: function() {
        return {
          'font-size': this.font_size + 'rem'
        }
      }
    },
    methods: {
      closeWindow() {
        this.edit_font_size = false
        this.edit_bg = false
        this.show_chapter_list = false
      },
      changeTheme(theme) {
        this.theme = theme
        console.log(this.theme)
      },
      reduceFontSize() {
        if (this.font_size <= 0.34) {
          tipModule.showToast('已经是最小的字体了', 1500)
          return
        }
  
        this.font_size -= 0.02
      },
      increaseFontSize() {
        if (this.font_size >= 0.4) {
          tipModule.showToast('已经是最大的字体了', 1500)
          return
        }
        this.font_size += 0.02
      },
      toggleBgEdit() {
        this.edit_font_size = false
        this.show_chapter_list = false
        this.edit_bg = !this.edit_bg
      },
      toggleFontEdit() {
        this.edit_bg = false
        this.show_chapter_list = false
        this.edit_font_size = !this.edit_font_size
      },
      showChapterList() {
        this.edit_bg = false
        this.edit_font_size = false
        this.show_chapter_list = !this.show_chapter_list
      },
      goChapter(index) {
        this.show_chapter_list = false
        if (this.chapter_index == index) return
        this.chapter_index = index
        this.getChapterDetail(index)
      },
      getChapterDetail(index) {
        if (!index) index = 0
        this.common.showLoading()
        Service.getChapter(index).then(res => {
          if (res.data.retCode == 0) {
            this.content = res.data.data.content
            this.chapter_title = res.data.data.chapter_title
          }
          window.scrollTo(0, 0)
          this.common.hideLoading()
        })
      },
      prev() {
        this.getChapterDetail(--this.chapter_index)
      },
      next() {
        this.getChapterDetail(++this.chapter_index)
      }
    },
    activated() {
      if (this.book_id == this.$route.params.book_id) {
        this.book_id = this.$route.params.book_id
        return
      }
      this.book_id = this.$route.params.book_id
      this.chapter_index = 0
      this.content = ''
      this.chapter_title = ''
      this.getChapterDetail()
  
    },
    deactivated() {
      this.edit_bg = false
      this.edit_font_size = false
      this.show_chapter_list = false
    }
  }
</script>

<style lang="less" scoped>
  .chapter-list {
    overflow: scroll;
    position: fixed;
    left: 0;
    top: 0.8rem;
    bottom: 1rem;
    width: 3rem;
    background: #f1f1f1;
    height: auto;
    text-align: center;
    border-right: 1px solid #c5c5c5;
    .title {
      font-weight: 500;
    }
    .item {
      line-height: 1.2rem;
      background: #f8f8f8;
      border-bottom: 1px solid #ccc;
      text-align: center;
      &.active {
        color: #913d12;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
  
  .content-box {
    min-height: 100vh;
    padding: .25rem;
    line-height: 150%;
    padding-bottom: 2rem;
    color: black;
    .chapter-title {
      font-size: .4rem;
      font-weight: 600;
      line-height: 200%;
    }
    &.white-theme {
      background: #fff;
    }
    &.pingk-theme {
      background: #fee;
    }
    &.yellow-theme {
      background: #fdfcef;
    }
    &.black-theme {
      background: #333;
      color: #fff;
    }
    .chapter-btns {
      width: 100vw;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .btn {
        width: 3rem;
        text-align: center;
        margin-right: .8rem;
        &.hidden {
          visibility: hidden;
        }
      }
    }
  }
  
  .setting-content {
    // z-index: 100;
    background: #fff;
    width: 100vw;
    height: 1.5rem;
    position: fixed;
    bottom: 1rem;
    &.bg-setting {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .bg-select {
        width: 1.5rem;
        height: .6rem;
        border: 1px solid #ccc;
        &.white {
          background: #fff;
        }
        &.pink {
          background: #fee;
        }
        &.yellow {
          background: #fdfcef;
        }
        &.black {
          background: #333;
        }
      }
    }
    &.font-size-setting {
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        padding: .3rem;
        font-size: .5rem;
      }
    }
  }
  
  .setting-bar {
    // z-index: 10;
    background: #fff;
    color: #c4c3c3;
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    p.btn {
      padding: .2rem .4rem;
      color: black;
      &.active {
        color: #913d12;
        font-weight: bolder;
      }
      span {
        vertical-align: middle;
        &.iconfont {
          font-size: .4rem;
        }
      }
    }
  }
  
  // 夜间主题
  .black-theme {
    color: #fff;
    .setting-content,
    .setting-bar {
      background: #5d5d5d;
      color: #fff;
      p.btn {
        color: #fff;
        &.active {
          color: #ffe182;
        }
      }
    }
    .chapter-list {
      background: #a5a5a5;
      border-right: 1px solid #c5c5c5;
      .item {
        background: #a5a5a5;
        border-bottom: 1px solid #ccc;
        &.active {
          color: #ffe182;
        }
      }
    }
  }
</style>


