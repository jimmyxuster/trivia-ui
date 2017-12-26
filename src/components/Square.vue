<template>
  <el-card :body-style="{ padding: '10px' }">
    <img :src="'/static/' + (index + 1) + '.png'" class="image">
    <div style="height: 30px; padding-top: 10px;" class="pin-wrapper">
      <template v-if="persons.length > 0">
        <img class="pin" :class="{'small': persons.length === 4}" v-for="person in persons" :src="pinUrl[person]">
      </template>
      <i class="el-icon-question question-mark" v-else></i>
    </div>
  </el-card>
</template>
<script>
  import { Card } from 'element-ui'
  export default {
    name: 'square',
    data () {
      return {
        'pinUrl': ['/static/pin1.png', '/static/pin2.png', ' /static/pin3.png', '/static/pin4.png']
      }
    },
    props: {
      'index': { type: Number, default: 0 },
      'persons': { type: Array, default: () => [] }
    },
    components: {
      'el-card': Card
    }
  }
</script>
<style scoped>
  .image {
    width: 80px;
    height: 80px;
    display: block;
    margin: 0 auto;
  }
  span {
    display: block;
    width: 100%;
    text-align: center;
  }
  .pin {
    width: 30px;
    height: 30px;
    display: block;
    margin: 0 auto;
  }
  .small {
    width: 25px;
    height: 25px;
  }
  .question-mark {
    color: #aaa;
    width: 100%;
    text-align: center;
    font-size: 18px;
    line-height: 30px;
  }
  .pin-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
