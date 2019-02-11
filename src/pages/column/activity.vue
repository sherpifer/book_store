

<template>
  <div class="activity-list">
    <div class="item-card" v-for="(item,index) in activity_list" :key="index">
      <img class="cover-img" :src="item.cover_img" alt="">
      <p class="activity-name">{{item.name}}</p>
      <p class="intro">{{item.intro}}</p>
    </div>
  </div>
</template>

<script>
  import Service from '@/service/service'
  export default {
    data() {
      return {
        activity_list: []
      }
    },
    activated() {
      Service.getActivity().then(res => {
        if (res.data.retCode == 0) {
          this.activity_list = res.data.data.activity_list
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .activity-list {
    background: #f1f1f1;
    width: 100vw;
    .item-card {
      background: #fff;
      width: 95vw;
      margin: 0 auto;
      padding: .2rem;
      margin-bottom: .3rem;
      .cover-img {
        width: 100%;
        height: auto;
      }
      .activity-name {
        color: black;
        text-align: center;
        font-size: .38rem;
        font-weight: 600;
        margin-top: .3rem;
        margin-bottom: .2rem;
      }
      .intro {
        padding: 0 .5rem;
        color: #7c7c7c;
        line-height: .5rem;
      }
    }
  }
</style>
