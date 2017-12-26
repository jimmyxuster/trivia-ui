<template>
  <div class="gameboard">
    <el-row :gutter="20">
      <el-col v-for="i in 8" :span="3" :key="i">
        <square :index="i - 1"></square>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3">
        <square v-for="j in 3" :index="8 + (j - 1) * 2" :key="8 + (j - 1) * 2" :person="1" class="square-side"></square>
      </el-col>
      <el-col :span="18" class="center">
      </el-col>
      <el-col :span="3">
        <square v-for="j in 3" :index="9 + (j - 1) * 2" :key="9 + (j - 1) * 2" class="square-side"></square>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col v-for="i in 8" :span="3" :key="i">
        <square :index="13 + i" :key="13 + i"></square>
      </el-col>
    </el-row>
    <dice class="dice"></dice>
  </div>
</template>
<script>
  import { Row, Col } from 'element-ui'
  import Square from '../components/Square'
  import Dice from '../components/Dice'
  export default {
    name: 'game-board',
    data () {
      return {}
    },
    components: {
      Square,
      'el-row': Row,
      'el-col': Col,
      Dice
    }
  }
</script>
<style scoped>
  .gameboard {
    position: relative;
    margin: 10px;
  }
  .center {
    min-height: 1px;
  }
  .square-side {
    margin: 10px 0;
  }
  .dice {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -150px;
  }
</style>
