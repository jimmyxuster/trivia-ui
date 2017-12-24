<template>
  <div id="app">
    <top-bar class="top-bar"></top-bar>
    <div class="content">
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
    margin-top: 80px;
  }
</style>
