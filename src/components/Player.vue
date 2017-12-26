<template>
  <div>
    <el-popover
      ref="chatbox"
      :placement="chatPlacement"
      width="200"
      trigger="manual"
      :value="chatContent.length > 0"
      :content="chatContent">
    </el-popover>
    <el-card class="player" :body-style="{ padding: '10px' }" v-popover:chatbox>
      <img :src="avatarUrl" v-if="avatarUrl" class="avatar">
      <img src="../assets/img/default_user_xmas.png" class="avatar" v-else>
      <span v-text="username" class="username"></span>
    </el-card>
  </div>
</template>
<script>
  import { Card, Popover } from 'element-ui'
  export default {
    data () {
      return {}
    },
    mounted () {
      console.log('chatbox', this.$refs.chatbox)
      let vm = this
      setTimeout(() => {
        vm.$refs.chatbox.updatePopper()
      }, 100)
    },
    props: {
      'avatarUrl': { type: String, default: '' },
      'username': { type: String, default: '' },
      'chatPlacement': { type: String, default: 'top' },
      'chatContent': { type: String, default: '' }
    },
    components: {
      'el-card': Card,
      'el-popover': Popover
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
  .player {
    box-shadow: none;
  }
</style>
