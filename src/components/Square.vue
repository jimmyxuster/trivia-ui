<template>
  <el-card :body-style="{ padding: '10px' }">
    <img :src="'/static/' + (index + 1) + '.png'" class="image">
    <div style="padding: 14px;">
      <span>问题</span>
    </div>
  </el-card>
</template>
<script>
  import { Card } from 'element-ui'
  export default {
    name: 'square',
    data () {
      return {}
    },
    props: {
      'index': { type: Number, default: 0 }
    },
    components: {
      'el-card': Card
    }
  }
</script>
<style scoped>
  .image {
    width: 100%;
    display: block;
  }
  span {
    display: block;
    width: 100%;
    text-align: center;
  }
</style>
