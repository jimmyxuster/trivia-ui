<template>
  <div>
    <div class="operation">
      <el-button class="refresh" icon="el-icon-refresh" :loading="isLoading" @click="refreshRoom"></el-button>
      <el-button type="success" class="create-room" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">新建房间</el-button>
    </div>
    <div class="room-list">
      <div class="room-list-slice" v-for="(room, index) in roomInfo">
        <room class="fadeIn" :class="index % 2 ? 'room-right' : 'room-left'" :roomNo="room.roomNo"
              :roomStatus="room.roomStatus" :players="room.players" @enterRoom="enterRoom"></room>
      </div>
    </div>
    <el-dialog
      title="创建房间"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form>
        <el-form-item label="房间名：" label-width="80px" :error="roomError">
          <el-input v-model="newRoomName" auto-complete="off" @input="roomError=''"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" :disabled="newRoomName === ''" @click="createRoom">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import { Button, Dialog, Input, FormItem, Form } from 'element-ui'
  import Room from '../components/Room'
  import api from '../service/api'
  export default {
    data () {
      return {
        isLoading: false,
        roomInfo: [],
        dialogVisible: false,
        newRoomName: '',
        roomError: ''
      }
    },
    created () {
      this.refreshRoom()
    },
    methods: {
      refreshRoom () {
        let vm = this
        this.isLoading = true
        setTimeout(() => {
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
        }, 1000)
      },
      createRoom () {
        if (this.newRoomName === '') {
          return
        }
        this.roomError = ''
        let data = {
          newRoomName: this.newRoomName
        }
        api.createRoom(data).then(res => {
          if (res.body.code === 0) {
            this.$message({
              showClose: true,
              message: '创建房间成功！',
              type: 'success'
            })
            this.newRoomName = ''
            this.refreshRoom()
            this.dialogVisible = false
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
      enterRoom (roomNo) {
        let data = { roomNo: roomNo }
        api.enterRoom(data).then(res => {
          if (res.body.code === 0) {
            this.$router.replace('/gameview')
          } else {
            this.$message({
              showClose: true,
              message: `进入房间失败！${res.body.message || '未知原因'}`,
              type: 'error'
            })
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
