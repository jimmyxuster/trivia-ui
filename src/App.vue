<template>
  <div id="app">
    <top-bar></top-bar>
    <router-view></router-view>
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

<style>

</style>
