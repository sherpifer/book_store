<template>
  <div>
    <div class="top-nav">
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
      showBack: {
        type: Boolean,
        default: false
      },
      goBackHome: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    methods: {
      back() {
        if (this.goBackHome) {
          console.log('用户拒绝登录，回到首页')
          this.$router.push({
            path: '/index'
          })
        } else {
          this.$router.back(-1)
        }
      }
    },
    mouted() {
      console.log(this.showBack)
    }
  }
</script>

<style lang="less" scoped>
  .fill-nav {
    display: block;
    width: 100vw;
    height: 0.8rem;
  }
  
  .top-nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100vw;
    margin-bottom: 0.8rem;
    background: #fff;
    line-height: 0.8rem;
    text-align: center;
    font-weight: bolder;
    font-size: 0.32rem;
    height: 0.8rem;
    .back-btn {
      padding: 0.1rem;
      font-size: 0.32rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0.2rem;
    }
    .right-box {
      font-size: 0.32rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0.3rem;
    }
  }
</style>