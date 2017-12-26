<template>
  <div class="game-view">
    <el-row :gutter="20">
      <el-col :offset="11" :span="2">
        <player class="player horizontal" v-if="players[0]" :avatarUrl="players[0].avatarUrl || ''" :username="players[0].username || ''"
          chat-placement="right" :chat-content="players[0].chatContent"></player>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2"  class="side">
        <player class="player" v-if="players[1]" :avatarUrl="players[1].avatarUrl || ''" :username="players[1].username || ''"
                chat-placement="right" :chat-content="players[1].chatContent"></player>
      </el-col>
      <el-col :span="20">
        <div class="game-area">
          <game-board :players="playerPositions"></game-board>
        </div>
      </el-col>
      <el-col :span="2"  class="side">
        <player class="player" v-if="players[2]" :avatarUrl="players[2].avatarUrl || ''" :username="players[2].username || ''"
                chat-placement="left" :chat-content="players[2].chatContent"></player>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="11" :span="2">
        <player class="player" v-if="players[3]" :avatarUrl="players[3].avatarUrl || ''" :username="players[3].username || ''"
                chat-placement="right" :chat-content="players[3].chatContent"></player>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import * as mutationTypes from '../store/mutation-types'
  import Player from '../components/Player'
  import { Row, Col } from 'element-ui'
  import GameBoard from '../components/GameBoard'
  export default {
    data () {
      return {
        players: [
          { avatarUrl: '', username: 'user1', chatContent: 'hahaha', position: 0 },
          { avatarUrl: '', username: 'user2', chatContent: '', position: 0 },
          { avatarUrl: '', username: 'user3', chatContent: '', position: 0 },
          { avatarUrl: '', username: 'user4', chatContent: '', position: 0 }
        ],
        boardHeight: 0
      }
    },
    methods: {
      ...mapMutations({
        'enterGame': mutationTypes.ENTER_GAME,
        'quitGame': mutationTypes.QUIT_GAME
      })
    },
    computed: {
      playerPositions () {
        let result = []
        this.players.forEach(player => result.push(player.position))
        console.log('result', result)
        return result
      }
    },
    destroyed () {
      this.quitGame()
    },
    created () {
      this.enterGame()
    },
    components: {
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
</style>
