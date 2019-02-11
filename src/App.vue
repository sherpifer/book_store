<template>
  <div id="app">
    <transition :name="transitionName" v-if="!$route.meta.keepAlive">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <transition :name="transitionName" v-if="$route.meta.keepAlive">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
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
        let no_transition = ['hot', 'activity', 'free', 'shelf', 'user', 'register', 'login']
        if (no_transition.includes(to.name) && no_transition.includes(from.name)) {
          this.transitionName = ''
          return
        }
        if (to.name == 'search' || from.name == 'search') {
          this.transitionName = 'fade'
          return
        }
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        if (toDepth == fromDepth) {
          this.transitionName = ''
        } else {
          this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms ease-in-out;
    position: absolute;
  }
  
  .slide-right-enter {
    transform: translate3d(-100%, 0, 0);
  }
  
  .slide-right-leave-active {
    transform: translate3d(100%, 0, 0);
  }
  
  .slide-left-enter {
    transform: translate3d(100%, 0, 0);
  }
  
  .slide-left-leave-active {
    transform: translate3d(-100%, 0, 0);
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 200ms;
    position: absolute;
  }
  
  .fade-enter,
  .fade-leave-to
  {
    opacity: 0;
  }
</style>
