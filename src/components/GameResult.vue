<template>
  <el-dialog title="游戏结束" :visible="visible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <template v-for="result in results">
      <div>
        <img src="/static/certificate.png" v-if="result.win"><span v-text="result.username"></span><img src="/static/coin.png"><span v-text="result.coin"></span>
      </div>
    </template>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="quit">返 回</el-button>
    </div>
    <div class="mask" v-if="!answerable"></div>
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

</style>
