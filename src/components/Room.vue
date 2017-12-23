<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span v-text="roomNo"></span>
      <el-button style="float: right; padding: 3px 0" type="text" v-text="roomStatus === 'avail' ? '进入房间' : '游戏中'"
        :disabled="roomStatus !== 'avail'"></el-button>
    </div>
    <div class="room-users">
      <div v-for="i in 4" class="user" :class="{'placeholder': !players[i-1]}">
        <el-tooltip v-if="players[i-1]" class="item" effect="dark" :key="i-1"
                    :content="players[i-1].username || '未知用户'" :placement="i-1 < 2 ? 'top' : 'bottom'">
          <img v-if="players[i-1].avatarUrl" :src="players[i-1].avatarUrl">
          <img src="../assets/img/default_user.png" v-else>
        </el-tooltip>
      </div>
    </div>
  </el-card>
</template>
<script>
  import { Card, Button, Tooltip } from 'element-ui'
  export default {
    name: 'room',
    data () {
      return {}
    },
    props: {
      roomNo: { type: String, default: '' },
      roomStatus: { type: String, default: 'avail' },
      players: { type: Array, default: [] }
    },
    components: {
      'el-card': Card,
      'el-button': Button,
      'el-tooltip': Tooltip
    }
  }
</script>
<style lang="scss" scoped>
  $img-width-ratio: 80%;
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .user {
    display: inline-block;
    width: 50%;
    margin-bottom: 9%;
  }
  .room-users {
    margin-bottom: -9%;
  }
  .room-users img {
    display: block;
    width: $img-width-ratio;
    margin: 0 auto;
  }
  .placeholder {
    padding-bottom: 0.5 * $img-width-ratio;
  }
</style>
