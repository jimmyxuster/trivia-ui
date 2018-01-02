<template>
  <div class="game-view">
    <el-row :gutter="20">
      <el-col :offset="11" :span="2">
        <player class="player horizontal" v-if="players[0]" :avatarUrl="players[0].avatarUrl || ''" :username="players[0].username || ''"
          chat-placement="right" :chat-content="players[0].chatContent" :index="0" :active="players[0].active"></player>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2"  class="side">
        <player class="player" v-if="players[1]" :avatarUrl="players[1].avatarUrl || ''" :username="players[1].username || ''"
                chat-placement="right" :chat-content="players[1].chatContent" :index="1" :active="players[1].active"></player>
      </el-col>
      <el-col :span="20">
        <div class="game-area">
          <game-board :players="playerPositions" :diceNumber="diceNumber"></game-board>
        </div>
      </el-col>
      <el-col :span="2"  class="side">
        <player class="player" v-if="players[2]" :avatarUrl="players[2].avatarUrl || ''" :username="players[2].username || ''"
                chat-placement="left" :chat-content="players[2].chatContent" :index="2" :active="players[2].active"></player>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="11" :span="2">
        <player class="player" v-if="players[3]" :avatarUrl="players[3].avatarUrl || ''" :username="players[3].username || ''"
                chat-placement="right" :chat-content="players[3].chatContent" :index="3" :active="players[3].active"></player>
      </el-col>
    </el-row>
    <chat-box class="chat-box" @uploadChatItem="uploadChatItem" :success.sync="chatUploadSuccess"></chat-box>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import * as mutationTypes from '../store/mutation-types'
  import Player from '../components/Player'
  import { Row, Col } from 'element-ui'
  import GameBoard from '../components/GameBoard'
  import ChatBox from '../components/ChatBox'
  export default {
    data () {
      return {
        id: -1,
        players: [
          { avatarUrl: '', username: 'user1', chatContent: '', position: 0, active: true },
          { avatarUrl: '', username: 'user2', chatContent: '', position: 0, active: false },
          { avatarUrl: '', username: 'user3', chatContent: '', position: 0, active: false },
          { avatarUrl: '', username: 'user4', chatContent: '', position: 0, active: false }
        ],
        boardHeight: 0,
        diceNumber: 1,
        chatUploadSuccess: true,
        sock: null
      }
    },
    methods: {
      ...mapMutations({
        'enterGame': mutationTypes.ENTER_GAME,
        'quitGame': mutationTypes.QUIT_GAME
      }),
      movePlayer (index, nextPosition) {
        let vm = this
        let duration = 400 * ((nextPosition - vm.players[index].position + 22) % 22)
        /* eslint-disable */
        let animate = () => {
          if (TWEEN.update()) {
            requestAnimationFrame(animate)
          }
        }

        let tween = new TWEEN.Tween({ tweeningNumber: vm.players[index].position })
        .easing(TWEEN.Easing.Linear.None)
        .to({ tweeningNumber: nextPosition }, duration)
        .onUpdate(function () {
          vm.players[index].position = Number.parseInt(this.tweeningNumber.toFixed(0))
        })
        vm.diceNumber = nextPosition - vm.players[index].position
        setTimeout(() => {
          tween.start()
          animate()
        }, 2000)
      },
      uploadChatItem (chatItem) {
        let vm = this
        setTimeout(() => {
          vm.chatUploadSuccess = true
        }, 1000)
      },
      handleMessage (msg) {

      }
    },
    mounted () {
      let vm = this
      setTimeout(() => {
        vm.movePlayer(0, 5)
      }, 1000)
    },
    computed: {
      playerPositions () {
        let result = []
        this.players.forEach(player => result.push(player.position))
        return result
      }
    },
    destroyed () {
      this.quitGame()
    },
    created () {
      this.id = this.$route.params.id
      if (!this.id) {
        console.log('get room id fail')
        this.$router.replace('/room')
        return
      }
      this.enterGame()
      let webSocket = new WebSocket('ws://localhost:8080/websocket');

      webSocket.onerror = function(event) {
        console.log('err', event)
        this.$message({
          message: '网络连接异常！',
          type: 'error'
        })
      }

      webSocket.onopen = function(event) {
        console.log('open')
        webSocket.send(JSON.stringify({ type: 'answer', choice: 'A' }))
      }

      webSocket.onmessage = function(event) {
        console.log('message', event.data)
        this.handleMessage(event.data)
      }
    },
    components: {
      ChatBox,
      GameBoard,
      Player,
      'el-row': Row,
      'el-col': Col
    }
  }
</script>
<style>
  .game-view {
    margin: 0 15px;
    padding: 15px 0;
  }
  .player {
    margin: 0 auto;
  }
  .game-area {
    min-height: 150px;
  }
  .side {
    display: flex;
    height: 740px;
    align-items: center;
    margin-top: 15px;
  }
  .chat-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 300px;
  }
</style>
