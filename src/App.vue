<template>
  <div id="app">
    <!-- <transition name="slide-fade">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition> -->
    <!-- <transition name="slide-fade">
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition> -->
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  
  </div>
</template>

<script>
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
        if(toDepth ==fromDepth){
          this.transitionName=''
        }else{
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .slide-right-enter-active ,.slide-left-enter-active{
    transition: all .3s ease-in-out;
  }
  
  .slide-right-leave-active,.slide-left-leave-active  {
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
