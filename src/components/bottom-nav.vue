<template>
  <div class="footer">
    <router-link tag="div" to="/index" class="btn" active-class="active">
      <span class="iconfont icon-faxian"></span>
      <span>发现</span>
    </router-link>
    <router-link tag="div" to="/shelf" class="btn" active-class="active">
      <span class="iconfont icon-fenlei"></span>
      <span>书架</span>
    </router-link>
    <router-link tag="div" to="/user" class="btn" active-class="active">
      <span class="iconfont icon-wode"></span>
      <span>我</span>
    </router-link>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="less">
  .footer {
    z-index: 99999;
    background: #f1f1f1;
    color: #c4c3c3;
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    .btn {
      font-size: .28rem;
      font-weight: bolder;
      height: 1rem;
      width: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      &.active {
        color: #0080f6;
      }
      .iconfont {
        margin-bottom: .05rem;
      }
    }
  }
</style>