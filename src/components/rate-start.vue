<template>
  <div class="rate-start">
    <span class="iconfont icon-pingfenxingxing" :class="rate>=1?'active':''" @click="clickStart(1)"></span>
    <span class="iconfont icon-pingfenxingxing" :class="rate>=2?'active':''" @click="clickStart(2)"></span>
    <span class="iconfont icon-pingfenxingxing" :class="rate>=3?'active':''" @click="clickStart(3)"></span>
    <span class="iconfont icon-pingfenxingxing" :class="rate>=4?'active':''" @click="clickStart(4)"></span>
    <span class="iconfont icon-pingfenxingxing" :class="rate>=5?'active':''" @click="clickStart(5)"></span>
  </div>
</template>

<script>
  export default {
    props: {
      rate: {
        type: Number,
        required: true,
        default: 0
      },
      canEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    methods: {
      clickStart(num) {
        if (!this.canEdit) return
        this.rate = num
      }
    }
  };
</script>

<style lang="less">
  .rate-start {
    display:inline-block;
    vertical-align: middle;
    overflow: hidden;
    span {
      float:left;
      color: #ccc;
      font-size: 0.38rem;
      margin-right:.03rem;
      &.active {
        color: #edba00;
      }
    }
  }
</style>
