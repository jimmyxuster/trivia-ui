<template>
  <el-dialog title="问题" :visible="visible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <el-form :model="form">
      <span v-text="questionDisplay.description"></span>
      <el-menu @select="selectAnswer" class="options">
        <el-menu-item index="A">
          <span slot="title" :class="{'correct': correctAnswer === 'A' && correctAnswer !== form.answer, 'chosen': answer === 'A'}" v-text="'A：' + questionDisplay.optionA"></span>
        </el-menu-item>
        <el-menu-item index="B">
          <span slot="title" :class="{'correct': correctAnswer === 'B' && correctAnswer !== form.answer, 'chosen': answer === 'B'}" v-text="'B：' + questionDisplay.optionB"></span>
        </el-menu-item>
        <el-menu-item index="C">
          <span slot="title" :class="{'correct': correctAnswer === 'C' && correctAnswer !== form.answer, 'chosen': answer === 'C'}" v-text="'C：' + questionDisplay.optionC"></span>
        </el-menu-item>
        <el-menu-item index="D">
          <span slot="title" :class="{'correct': correctAnswer === 'D' && correctAnswer !== form.answer, 'chosen': answer === 'D'}" v-text="'D：' + questionDisplay.optionD"></span>
        </el-menu-item>
      </el-menu>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit" :disabled="form.answer.length <= 0 || !answerable">确 定</el-button>
    </div>
    <div class="mask" v-if="!answerable"></div>
  </el-dialog>
</template>
<script>
  import { Dialog, Menu, MenuItem } from 'element-ui'
  export default {
    name: 'question',
    data () {
      return {
        form: {
          answer: ''
        },
        questionDisplay: null,
        questionTimeout: -1
      }
    },
    props: {
      'question': { type: Object, default: {} },
      'visible': { type: Boolean, default: false },
      'answerable': { type: Boolean, default: false },
      'answer': { type: String, default: '' },
      'correctAnswer': { type: String, default: '' }
    },
    watch: {
      answer (val) {
        this.form.answer = val
      },
      question (q) {
        if (!this.questionDisplay) {
          this.questionDisplay = q
        } else {
          let vm = this
          if (vm.questionTimeout >= 0) {
            clearTimeout(vm.questionTimeout)
          }
          vm.questionTimeout = setTimeout(() => {
            vm.questionDisplay = q
            vm.questionTimeout = -1
          }, 2000)
        }
      }
    },
    destroyed () {
      if (this.questionTimeout >= 0) {
        clearTimeout(this.questionTimeout)
      }
    },
    methods: {
      selectAnswer (index) {
        this.form.answer = index
      },
      submit () {
        this.$emit('answer', this.form.answer)
      }
    },
    components: {
      'el-dialog': Dialog,
      'el-menu': Menu,
      'el-menu-item': MenuItem
    }
  }
</script>
<style scoped>
  .correct {
    color: #F56C6C;
  }
  .chosen {
    color: #3a8ee6;
  }
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  .options {
    color: #303133;
  }
</style>
