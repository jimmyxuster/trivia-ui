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
    <el-card class="player" :class="{'highlight-player': active}" :body-style="{ padding: '10px' }" v-popover:chatbox>
      <div class="avatar">
        <img :src="avatarUrl" v-if="avatarUrl">
        <img src="../assets/img/default_user_xmas.png" v-else>
        <img :src="pinUrl[index]" class="pin">
      </div>
      <span v-text="username" class="username"></span>
    </el-card>
  </div>
</template>
<script>
  import { Card, Popover } from 'element-ui'
  export default {
    data () {
      return {
        'pinUrl': ['/static/pin1.png', '/static/pin2.png', ' /static/pin3.png', '/static/pin4.png']
      }
    },
    mounted () {
      let vm = this
      setTimeout(() => {
        vm.$refs.chatbox.updatePopper()
      }, 100)
    },
    props: {
      'avatarUrl': { type: String, default: '' },
      'username': { type: String, default: '' },
      'chatPlacement': { type: String, default: 'top' },
      'chatContent': { type: String, default: '' },
      'index': { type: Number, default: 0 },
      'active': { type: Boolean, default: false }
    },
    components: {
      'el-card': Card,
      'el-popover': Popover
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/common";
  .avatar {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .avatar img:first-child {
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
  .pin {
    display: block;
    width: 30px;
    height: 30px;
    margin: 0 auto;
  }
  .highlight-player {
    animation: highlight 2s linear 0s infinite;
  }
  @keyframes highlight {
    0% { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1) }
    50% { box-shadow: 0 4px 20px 0 $trivia-blue }
    100% { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1) }
  }
</style>
