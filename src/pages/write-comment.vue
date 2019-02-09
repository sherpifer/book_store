<template>
  <div class="write-comment-page">
    <top-nav :showBack="true" title="写评论">
      <span class="iconfont icon-fasong" @click="sendComment"></span>
    </top-nav>
    <div class="start-box">
      <rate-start ref="rate_start" class="start" :canEdit="true" :startStyle="start_size"></rate-start>
    </div>
    <div class="write-area">
      <textarea v-model="comment_content" placeholder="写下你的评论"></textarea>
    </div>
  </div>
</template>

<script>
  import topNav from '@/components/top-nav'
  import rateStart from '@/components/rate-start'
  import tipModule from '@/common/tip-module'
  export default {
    components: {
      topNav,
      rateStart
    },
    data() {
      return {
        comment_content:'',
        start_size: {
          'font-size': '.8rem'
        }
      }
    },
    methods: {
      sendComment(){
        if(this.comment_content.length==0 || !this.$refs.rate_start.rate_num){
          tipModule.showToast('请输入你的评论并打分')
        }else{
          tipModule.showAlert('评论已提交～',()=>{
            this.$router.go(-1)
          })
        }
      }
    }
  
  }
</script>

<style lang='less' scoped>
  .write-comment-page {
    height:100vh;
    width:100vw;
    background: #fff;
    .icon-fasong{
      font-size:.45rem;
      padding-left:.7rem;
    }
    .start-box {
      margin: 0 auto;
      width: 90vw;
      padding: .6rem 0;
      text-align: center;
      border-bottom: 1px solid #ccc;
    }
    .write-area{
      padding-top:.5rem;
      font-size:.34rem;
      width:90vw;
      margin:0 auto;
      textarea{
        width:100%;
        min-height:3rem;
      }
    }
  }
</style>

