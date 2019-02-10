<template>
  <div>
    <div class="top-nav" :class="{'black_theme':black_theme}">
      <span class="back-btn iconfont icon-fanhui" @click="back" v-if="showBack"></span> {{title}}
      <div class="right-box">
        <!-- 在top nav 放自定义内容 -->
        <slot></slot>
      </div>
    </div>
    <div class="fill-nav"></div>
  </div>
</template>

<script>
  export default {
    props: {
      title: [String, Number],
      black_theme: {
        type: Boolean,
        default: false
      },
      showBack: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {}
    },
    methods: {
      back() {
        this.$router.back(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .fill-nav {
    display: block;
    width: 100vw;
    height: .9rem;
  }
  
  .top-nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3000;
    width: 100vw;
    margin-bottom: .9rem;
    background: #fff;
    line-height: .9rem;
    text-align: center;
    font-weight: bolder;
    font-size: 0.32rem;
    height: .9rem;
    &.black_theme {
      background: #5d5d5d;
      color: #fff!important;
    }
    .back-btn {
      padding: 0.1rem;
      font-size: 0.32rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0.2rem;
    }
    .right-box {
      line-height: normal;
      display:flex;
      justify-content: center;
      align-items: center;
      font-size: 0.32rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0.3rem;
    }
  }
</style>