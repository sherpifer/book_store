<template>
  <div id="app">
    <transition :name="transitionName" v-if="$route.meta.keepAlive">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName" v-if="!$route.meta.keepAlive">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
  import store from '@/store/store'
  import Service from '@/service/service'
  export default {
    name: 'App',
    data() {
      return {
        transitionName: ''
      }
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        if (toDepth == fromDepth) {
          this.transitionName = ''
        } else {
          this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
      }
    },
    created() {
      // Service.getUserMsg()
      //     Service.readMsg({msg_id:2})
      //     Service.getNewMsg()
    }
  };
</script>

<style lang="less" scoped>
  .slide-right-enter-active,
  .slide-left-enter-active {
    transition: all .3s ease-in-out;
  }
  
  .slide-right-leave-active,
  .slide-left-leave-active {
    transition: all .5s ease-in-out;
  }
  
  .slide-right-enter {
    transform: translateX(-100vw);
  }
  
  .slide-right-leave-to {
    transform: translateX(100vw);
  }
  
  .slide-left-enter {
    transform: translateX(100vw);
  }
  
  .slide-left-leave-to {
    transform: translateX(-100vw);
  }
</style>
