<template>
  <div id="app">
    <router-view name="header-top"></router-view>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
  #app {
    margin: 2em 3.5em 1em 3.5em;
  }

  .slide-enter {
    opacity: 0;
  }

  .slide-enter-active {
    animation: slide-in 0.5s ease-out forwards;
    transition: opacity 0.5s;
  }

  .slide-leave-active {
    animation: slide-out 0.5s ease-out forwards;
    transition: opacity 0.5s;
    opacity: 0;
  }

  .slide-move {
    transition: transform 1s;
  }

  @keyframes slide-in {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(20px);
    }
  }
</style>
