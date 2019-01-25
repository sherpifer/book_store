<template>
  <div>
    <div class="top_nav">
        <span class="iconfont icon-fanhui" @click="back" v-if="showBack"></span>
      {{title}}
    </div>
    <div class="fill-nav"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    showBack: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.back(-1);
    }
  },
  mouted() {
    console.log(this.showBack);
  }
};
</script>

<style lang="less" scoped>
.fill-nav {
  display: block;
  width: 100vw;
  height: 0.8rem;
}
.top-nav {
  position: fixed;
  z-index: 9999;
  width: 100vw;
  margin-bottom: 0.8rem;
  background: #f6f6f6;
  line-height: 0.8rem;
  text-align: center;
  font-weight: bolder;
  font-size: 0.32rem;

  span {
    padding: 0.1rem;
    font-size: 0.32rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0.2rem;
  }
}
</style>