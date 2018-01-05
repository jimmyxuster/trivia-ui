<template>
  <el-dialog title="游戏结束" :visible="visible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <template v-for="result in results">
      <div>
        <img class="winner" src="/static/certificate.png" v-if="result.win"><span class="player" :class="{'loser-name': !result.win}" v-text="result.username"></span><img class="coin" src="/static/coin.png"><span class="result-coin" v-text="result.coin"></span>
      </div>
    </template>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="quit">返 回</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    name: 'game-result',
    data () {
      return {}
    },
    props: {
      'visible': { type: Boolean, default: false },
      'results': { type: Array, default: () => [] }
    },
    methods: {
      quit () {
        this.$emit('quit')
      }
    }
  }
</script>
<style scoped>
  .winner {
    width: 40px;
  }
  .player {
    margin: 0 10px;
  }
  .coin {
    width: 30px;
  }
  .result-coin {
    margin-left: 10px;
  }
  .loser-name {
    margin-left: 50px;
  }
</style>
