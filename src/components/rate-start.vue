<template>
  <div class="rate-start">
    <span :style="startStyle" class="iconfont icon-pingfenxingxing" :class="rate_num>=1?'active':''" @click="clickStart(1)"></span>
    <span :style="startStyle" class="iconfont icon-pingfenxingxing" :class="rate_num>=2?'active':''" @click="clickStart(2)"></span>
    <span :style="startStyle" class="iconfont icon-pingfenxingxing" :class="rate_num>=3?'active':''" @click="clickStart(3)"></span>
    <span :style="startStyle" class="iconfont icon-pingfenxingxing" :class="rate_num>=4?'active':''" @click="clickStart(4)"></span>
    <span :style="startStyle" class="iconfont icon-pingfenxingxing" :class="rate_num>=5?'active':''" @click="clickStart(5)"></span>
  </div>
</template>

<script>
  export default {
    props: {
      startStyle: {
        tyle: Object,
        default: ''
      },
      rate: {
        type: Number,
        default: 0
      },
      canEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        rate_num: 0
      }
    },
    watch:{
      rate(curval){
        this.rate_num = curval
      }
    },
    methods: {
      clickStart(num) {
        if (!this.canEdit) return
        this.rate_num = num
      }
    },
    created() {
      this.rate_num = this.rate
    }
  }
</script>

<style lang="less" scoped>
  .rate-start {
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    span {
      float: left;
      color: #ccc;
      font-size: 0.38rem;
      margin-right: .03rem;
      &.active {
        color: #edba00;
      }
    }
  }
</style>
