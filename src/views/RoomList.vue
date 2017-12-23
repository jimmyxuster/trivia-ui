<template>
  <div>
    <div></div>
    <div class="room-list">
      <div class="room-list-slice" v-for="(room, index) in roomInfo">
        <room :class="index % 2 ? 'room-right' : 'room-left'" :roomNo="room.roomNo" :roomStatus="room.roomStatus" :players="room.players"></room>
      </div>
    </div>
  </div>
</template>
<script>
  import Room from '../components/Room'
  import api from '../service/api'
  export default {
    data () {
      return {
        roomInfo: []
      }
    },
    created () {
      api.getRooms().then(res => {
        if (res.code === 0) {
          console.log('room info success')
          this.roomInfo = res.body
        } else {
          this.$message({
            showClose: true,
            message: '获取房间失败：' + (res.message || '未知异常')
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          showClose: true,
          message: '获取房间失败：网络异常'
        })
      })
    },
    components: {
      Room
    }
  }
</script>
<style lang="scss" scoped>
  .room-list {
    margin: 0 30px;
  }
  .room-list-slice {
    display: inline-block;
    width: 50%;
    margin-bottom: 20px;
  }
  .room-left {
    width: 80%;
    float: right;
    margin-right: 30px;
  }
  .room-right {
    width: 80%;
    float: left;
    margin-left: 30px;
  }
</style>
