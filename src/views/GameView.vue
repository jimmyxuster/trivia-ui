<template>
  <div class="game-view">
    <div>
        <player class="player horizontal" v-if="players[1]" :avatarUrl="players[1].avatarUrl || ''" :username="players[1].username || ''" :state="status"
          chat-placement="right" :ready="players[1].isReady" :chat-content="players[1].chatContent"
                :coinCount="players[1].coinCount" :index="1" :active="players[1].active"></player>
    </div>
    <el-row :gutter="20">
      <el-col :span="2"  class="side">
        <player class="player" v-if="players[2]" :avatarUrl="players[2].avatarUrl || ''" :username="players[2].username || ''" :state="status"
                chat-placement="right" :ready="players[2].isReady" :chat-content="players[2].chatContent"
                :coinCount="players[2].coinCount" :index="2" :active="players[2].active"></player>
      </el-col>
      <el-col :span="20">
        <div class="game-area">
          <game-board :players="playerPositions" :diceNumber="diceNumber" :ready="ready" :clickable="diceClickable" :diceAutoGo="diceAutoGo"
                      :activePlayer="activePlayerIndex" :isOwner="ownerName === username" :canStart="canStart" :status="status" @setReady="setReady" @diceStop="diceStop" @diceStart="diceStart"></game-board>
        </div>
      </el-col>
      <el-col :span="2"  class="side">
        <player class="player" v-if="players[3]" :avatarUrl="players[3].avatarUrl || ''" :username="players[3].username || ''" :state="status"
                chat-placement="left" :ready="players[3].isReady" :chat-content="players[3].chatContent"
                :coinCount="players[3].coinCount" :index="3" :active="players[3].active"></player>
      </el-col>
    </el-row>
    <div>
        <player class="player" v-if="players[0]" :avatarUrl="players[0].avatarUrl || ''" :username="players[0].username || ''" :state="status"
                chat-placement="right" :ready="players[0].isReady" :chat-content="players[0].chatContent || ''"
                :coinCount="players[0].coinCount" :index="0" :active="players[0].active"></player>
    </div>
    <chat-box class="chat-box" @uploadChatItem="uploadChatItem" :success.sync="chatUploadSuccess"></chat-box>
    <question :question="question" :visible="questionVisible" :answerable="answerable" :answer="madeAnswer" :correct-answer="correctAnswer" @answer="makeAnswer"></question>
    <game-result :results="gameResults" :visible="gameOver" @quit="quitRoom"></game-result>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapMutations, mapGetters, mapActions } from 'vuex'
  import * as mutationTypes from '../store/mutation-types'
  import Player from '../components/Player'
  import { Row, Col } from 'element-ui'
  import GameBoard from '../components/GameBoard'
  import ChatBox from '../components/ChatBox'
  import Question from '../components/Question'
  import GameResult from '../components/GameResult'
  export default {
    data () {
      return {
        id: -1,
        ownerName: '',
        players: [
          // { avatarUrl: '', username: 'user1', chatContent: '', position: 0, active: true },
          // { avatarUrl: '', username: 'user2', chatContent: '', position: 0, active: false },
          // { avatarUrl: '', username: 'user3', chatContent: '', position: 0, active: false },
          // { avatarUrl: '', username: 'user4', chatContent: '', position: 0, active: false }
        ],
        boardHeight: 0,
        diceNumber: 1,
        chatUploadSuccess: true,
        ready: false,
        status: 'Avail',
        question: {
          description: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: ''
        },
        questionVisible: false,
        madeAnswer: '',
        correctAnswer: '',
        diceClickable: false,
        diceAutoGo: false,
        gameResults: [],
        gameOver: false,
        diceRunning: false,
        pendingMsg: {}
      }
    },
    methods: {
      ...mapMutations({
        'enterGame': mutationTypes.ENTER_GAME,
        'setGameType': mutationTypes.SET_GAME_TYPE
      }),
      ...mapActions([
        'quitGame', 'setSocket'
      ]),
      showMessage (msg, type = 'error') {
        this.$message({
          showClose: true,
          message: msg,
          type: type
        })
      },
      quitRoom () {
        this.quitGame()
        this.$router.replace('/room')
      },
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
          vm.players[index].position = Number.parseInt(this.tweeningNumber.toFixed(0)) % 22
        })
        .onComplete(function() {
          vm.questionVisible = true
        })
        vm.diceNumber = nextPosition - vm.players[index].position
        setTimeout(() => {
          tween.start()
          animate()
        }, 2000)
      },
      uploadChatItem (chatItem) {
        this.socketSend({ type: 'chat', username: this.username, content: chatItem })
      },
      makeAnswer (answer) {
        if (this.socket && this.socket.readyState < WebSocket.CLOSING) {
          this.socket.send(JSON.stringify({ type: 'answer', username: this.username, roomName: this.id, choice: answer }))
        } else {
          this.showMessage('网络连接状态异常')
        }
      },
      setReady () {
        this.ready = true
        this.socketSend({ type: this.canStart ? 'startGame' : 'ready', username: this.username, roomName: this.id })
      },
      diceStart () {
        this.diceClickable = false
        this.diceRunning = true
        if (this.activePlayer && this.activePlayer.username === this.username) {
          this.socketSend({type: 'diceGo'})
        }
      },
      diceStop () {
        this.diceClickable = false
        this.diceAutoGo = false
        let goPlayer = this.players.find(p => p.active)
        if (!goPlayer) return
        if (this.question) {
          this.movePlayer(this.players.indexOf(goPlayer), goPlayer.position + this.diceNumber)
        } else {
          this.showMessage('玩家 ' + this.activePlayer.username + ' 被关禁闭', 'warning')
          if (this.activePlayer.username === this.username) {
            this.socketSend({type: 'takeTurn'})
          }
        }
        this.diceRunning = false
        if (this.pendingMsg.type) {
          this.handleTakeTurn(this.pendingMsg)
          this.pendingMsg = {}
        }
      },
      socketSend (msg) {
        if (this.socket && this.socket.readyState < WebSocket.CLOSING) {
          this.socket.send(typeof msg === 'object' ? JSON.stringify(msg) : msg)
        } else {
          this.showMessage('网络连接状态异常')
        }
      },
      setActive (username) {
        for (let i = 0; i < this.players.length; i++) {
          this.players[i].active = this.players[i].username === username;
        }
      },
      getActiveUserIndex () {
        return this.players.indexOf(this.players.find(p => p.active))
      },
      handleTakeTurn (msg) {
        let vm = this
        vm.diceNumber = msg.body.rollNum
        vm.setActive(msg.body.next)
        vm.question = msg.body.question
        vm.diceAutoGo = false
        vm.diceClickable = msg.body.next === vm.username
      },
      handleMessage (msg) {
        let vm = this
        msg = JSON.parse(msg)
        if (!msg || msg.code < 0) {
          vm.showMessage(`网络错误！${msg.message || ''}`)
          if (msg.type === 'joinRoom') {
            this.quitGame()
            this.$router.replace('/room')
          }
          return
        }
        if (msg.type === 'joinRoom' || msg.type === 'exitRoom') {
          this.players = msg.body.players
          this.setGameType(msg.body.questionType)
          this.ownerName = msg.body.ownerName
          this.status = msg.body.status
          if (this.players && this.players.length > 0) {
            let me = this.players.find(p => p.username === vm.username)
            this.players[this.players.indexOf(me)] = this.players[0]
            this.players[0] = me
          }
          this.players.forEach(p => {
            Vue.set(p, 'active', false)
            if (p.chatContent === undefined) {
              Vue.set(p, 'chatContent', '')
            }
            Vue.set(p, 'coinCount', 0)
          })
        } else if (msg.type === 'ready') {
          this.players.forEach(p => p.isReady = msg.body.indexOf(p.username) >= 0)
        } else if (msg.type === 'startGame') {
          this.status = 'playing'
          for (let i = 0; i < msg.body.players.length; i++) {
            Vue.set(vm.players.find(p => p.username === msg.body.players[i].user.username), 'position', msg.body.players[i].position)
          }
        } else if (msg.type === 'takeTurn') {
          if (vm.diceRunning) {
            vm.pendingMsg = msg
          } else {
            vm.handleTakeTurn(msg)
          }
        } else if (msg.type === 'answer') {
          vm.correctAnswer = msg.body.key
          vm.madeAnswer = msg.body.chosen
          if (vm.madeAnswer === vm.correctAnswer) {
            vm.activePlayer.coinCount = vm.activePlayer.coinCount + 1
          }
          setTimeout(() => {
            vm.questionVisible = false
            vm.correctAnswer = ''
            vm.madeAnswer = ''
          }, 2000)
        } else if (msg.type === 'diceGo') {
          let goPlayer = vm.players.find(p => p.active)
          if (!goPlayer) return
          if (goPlayer.username !== vm.username) {
            vm.diceRunning = true
            vm.diceAutoGo = true
          }
        } else if (msg.type === 'gameOver') {
          setTimeout(() => {
            vm.gameResults = []
            msg.body.players.forEach(p => {
              vm.gameResults.push({ username: p.user.username, coin: p.coinCount, win: false })
            })
            vm.gameResults.find(r => r.username === msg.body.winner.user.username).win = true
            vm.gameOver = true
          }, 2000)
        } else if (msg.type === 'chat') {
          let chattingUser = vm.players.find(p => p.username === msg.body.username)
          if (chattingUser) {
            if (chattingUser.username === vm.username) {
              vm.chatUploadSuccess = true
            }
            chattingUser.chatContent = msg.body.content || ''
          }
        }
      }
    },
    computed: {
      ...mapGetters(['username', 'socket']),
      playerPositions () {
        let result = []
        this.players.forEach(player => {
          if (player.position !== undefined) {
            result.push(player.position)
          }
        })
        return result
      },
      canStart () {
        return this.ownerName === this.username && this.players.length > 1 &&
          this.players.filter(p => p.isReady).length === this.players.length - 1
      },
      answerable () {
        let activePlayer = this.players.find(p => p.active)
        return this.questionVisible && activePlayer && activePlayer.username === this.username
      },
      activePlayerIndex () {
        return this.players.indexOf(this.players.find(p => p.active))
      },
      activePlayer () {
        return this.players.find(p => p.active)
      }
    },
    destroyed () {
      this.quitGame()
    },
    created () {
      this.id = this.$route.query.id
      if (!this.id || !this.username) {
        this.showMessage('进入房间失败！')
        this.$router.replace('/room')
        return
      }
      this.enterGame(this.id)
      let webSocket = new WebSocket('ws://106.15.229.43:8080/websocket')
      this.setSocket(webSocket)
      let vm = this

      webSocket.onerror = function(event) {
        console.log('err', event)
        vm.showMessage('网络连接异常！')
      }

      webSocket.onopen = function(event) {
        console.log('open')
        console.log('send', JSON.stringify({ type: 'joinRoom', username: vm.username, roomName: vm.id }))
        webSocket.send(JSON.stringify({ type: 'joinRoom', username: vm.username, roomName: vm.id }))
      }

      webSocket.onmessage = function(event) {
        console.log('message', event.data)
        vm.handleMessage(event.data)
      }
    },
    components: {
      GameResult,
      Question,
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
