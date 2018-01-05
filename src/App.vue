<template>
  <div id="app">
    <top-bar class="top-bar"></top-bar>
    <div class="content" v-fill>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import TopBar from './components/TopBar'
  export default {
    name: 'app',
    components: {
      TopBar
    },
    directives: {
      fill: {
        inserted (el) {
          el.style.height = window.innerHeight + 'px'
        }
      }
    }
  }
</script>

<style scoped>
  .top-bar {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
  }
  .content {
    box-sizing: border-box;
   padding-top: 80px;
  }
</style>
