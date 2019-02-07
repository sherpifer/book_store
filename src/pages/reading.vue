<template>
  <div :class="{'black-theme':theme=='black-theme'}">
    <top-nav :showBack="true" :black_theme="theme=='black-theme'"></top-nav>
    <div :class="['content',theme]" :style="font_size_sytle">{{content}}</div>
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
      <p class="btn" @click="toggleBgEdit" :class="{'active':edit_bg}">
        <span class="iconfont icon-zhuti"></span>
        <span>背景</span>
      </p>
      <p class="btn" @click="toggleFontEdit" :class="{'active':edit_font_size}">
        <span class="iconfont icon-zitishezhi"></span>
        <span>字体</span></p>
    </div>
  </div>
</template>

<script>
  import topNav from '@/components/top-nav'
  import Service from '@/service/service'
  import tipModule from '@/commonModules/tip-module'
  export default {
    components: {
      topNav
    },
    data() {
      return {
        theme: 'white-theme',
        content: '',
        edit_bg: false,
        edit_font_size: false,
        font_size: 0.36 //17 18 19 20
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
        this.edit_bg = !this.edit_bg
      },
      toggleFontEdit() {
        this.edit_bg = false
        this.edit_font_size = !this.edit_font_size
      }
    },
    created() {
      console.log("this.theme=='black-theme'", this.theme == 'black-theme')
      Service.getChapter().then(res => {
        if (res.data.retCode == 0) {
          this.content = res.data.content
        }
      })
    },
    activated() {},
    deactivated() {
      this.edit_bg = false
      this.edit_font_size = false
    }
  }
</script>

<style lang="less" scoped>
  .content {
    padding: .25rem;
    line-height: 150%;
    padding-bottom: 2rem;
    color: black;
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
  }
  
  .setting-content {
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
    z-index: 99999;
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
  }
</style>


