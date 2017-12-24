<template>
  <el-card class="player">
    <img :src="avatarUrl" v-if="avatarUrl" class="avatar">
    <img src="../assets/img/default_user.png" class="avatar" v-else>
    <span v-text="username" class="username"></span>
  </el-card>
</template>
<script>
  import { Card } from 'element-ui'
  export default {
    data () {
      return {}
    },
    props: {
      'avatarUrl': { type: String, default: '' },
      'username': { type: String, default: '' }
    },
    components: {
      'el-card': Card
    }
  }
</script>
<style scoped>
  .avatar {
    display: block;
    margin: 0 auto;
    width: 50%;
  }
  .username {
    display: inline-block;
    width: 100%;
    box-sizing: content-box;
    margin: 5px 0;
    text-align: center;
    font-size: 16px;
  }
</style>
