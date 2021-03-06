<template>
  <div>
    <div class="operation">
      <el-button class="refresh" icon="el-icon-refresh" :loading="isLoading" @click="refreshRoom"></el-button>
      <el-button type="success" class="create-room" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">
        新建房间
      </el-button>
    </div>
    <div class="room-list">
      <div class="room-list-slice" v-for="(room, index) in roomInfo">
        <room class="fadeIn" :class="index % 2 ? 'room-right' : 'room-left'" :roomNo="room.roomName"
              :roomStatus="room.status" :players="room.players" @enterRoom="enterRoom"></room>
      </div>
    </div>
    <el-dialog
      title="创建房间"
      :visible.sync="dialogVisible"
      width="300px">
      <el-form>
        <el-form-item label="题型：" label-width="80px" :error="roomError">
          <el-select v-model="newRoomType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" :disabled="newRoomType === ''" @click="createRoom">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import {Button, Dialog, Input, FormItem, Form} from 'element-ui'
  import Room from '../components/Room'
  import api from '../service/api'

  export default {
    data () {
      return {
        isLoading: false,
        roomInfo: [],
        dialogVisible: false,
        newRoomType: '',
        roomError: '',
        options: [
          { value: 'Literature', label: '文学' },
          { value: 'Movie', label: '影视' },
          { value: 'Military', label: '军事' },
          { value: 'Geography', label: '地理' }
        ]
      }
    },
    created () {
      this.refreshRoom()
    },
    methods: {
      refreshRoom () {
        let vm = this
        this.isLoading = true
        api.getRooms().then(res => {
          if (res.body.code === 0) {
            vm.roomInfo = res.body.result
          } else {
            vm.$message({
              showClose: true,
              message: '获取房间失败：' + (res.message || '未知异常'),
              type: 'error'
            })
          }
          vm.isLoading = false
        }).catch(err => {
          console.log(err)
          vm.$message({
            showClose: true,
            message: '获取房间失败：网络异常',
            type: 'error'
          })
          vm.isLoading = false
        })
      },
      createRoom () {
        if (this.newRoomType === '') {
          return
        }
        this.roomError = ''
        let data = {
          questionType: this.newRoomType
        }
        api.createRoom(data).then(res => {
          if (res.body.code === 0) {
            this.$message({
              showClose: true,
              message: '创建房间成功！',
              type: 'success'
            })
            this.newRoomType = ''
            this.dialogVisible = false
            this.enterRoom(res.body.result.roomName)
          } else {
            this.roomError = res.body.message
          }
        }).catch(err => {
          console.log('err', err)
          this.$message({
            showClose: true,
            message: '创建房间失败！请检查网络',
            type: 'error'
          })
        })
      },
      enterRoom (roomName) {
        if (!roomName) return
        this.$router.replace({
          name: 'GameView',
          query: {
            id: roomName
          }
        })
      }
    },
    components: {
      Room,
      'el-button': Button,
      'el-dialog': Dialog,
      'el-input': Input,
      'el-form-item': FormItem,
      'el-form': Form
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/common";

  .operation {
    margin-bottom: 20px;
  }

  .fadeIn {
    animation: fade-in 1s ease 0s;
  }

  .room-list {
    margin: 0 30px;
  }

  .room-list-slice {
    display: inline-block;
    width: 50%;
    margin-bottom: 20px;
  }

  .room-left {
    width: 60%;
    float: right;
    margin-right: 30px;
  }

  .room-right {
    width: 60%;
    float: left;
    margin-left: 30px;
  }

  .refresh {
    margin-left: calc(20% - 12px);
  }

  .create-room {
    float: right;
    margin-right: calc(20% - 12px);
  }
</style>
