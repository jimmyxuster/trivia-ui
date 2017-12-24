<template>
  <div>
    <el-row :gutter="20">
      <el-col :offset="10" :span="4">
        <player class="player horizontal" v-if="players[0]" :avatarUrl="players[0].avatarUrl || ''" :username="players[0].username || ''"></player>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <player class="player" v-if="players[1]" :avatarUrl="players[1].avatarUrl || ''" :username="players[1].username || ''"></player>
      </el-col>
      <el-col :span="16">
        <div class="game-area"></div>
      </el-col>
      <el-col :span="4">
        <player class="player" v-if="players[2]" :avatarUrl="players[2].avatarUrl || ''" :username="players[2].username || ''"></player>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="10" :span="4">
        <player class="player horizontal" v-if="players[3]" :avatarUrl="players[3].avatarUrl || ''" :username="players[3].username || ''"></player>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Player from '../components/Player'
  import { Row, Col } from 'element-ui'
  export default {
    data () {
      return {
        players: [
          { avatarUrl: '', username: 'user1' },
          { avatarUrl: '', username: 'user2' },
          { avatarUrl: '', username: 'user3' },
          { avatarUrl: '', username: 'user4' }
        ]
      }
    },
    components: {
      Player,
      'el-row': Row,
      'el-col': Col
    }
  }
</script>
<style>
  .player {
    margin: 0 auto;
  }
  .game-area {
    min-height: 150px;
  }
</style>
