<template>
  <el-dialog title="问题" :visible="visible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <el-form :model="form">
      <span v-text="questionDisplay.description"></span>
      <el-menu @select="selectAnswer" class="options">
        <el-menu-item index="A">
          <span slot="title" class="option" :class="{'correct': correctAnswer === 'A' && correctAnswer !== form.answer, 'chosen': form.answer === 'A'}" v-if="questionDisplay.optionA" v-text="'A：' + questionDisplay.optionA"></span>
        </el-menu-item>
        <el-menu-item index="B">
          <span slot="title" class="option" :class="{'correct': correctAnswer === 'B' && correctAnswer !== form.answer, 'chosen': form.answer === 'B'}" v-if="questionDisplay.optionB" v-text="'B：' + questionDisplay.optionB"></span>
        </el-menu-item>
        <el-menu-item index="C">
          <span slot="title" class="option" :class="{'correct': correctAnswer === 'C' && correctAnswer !== form.answer, 'chosen': form.answer === 'C'}"  v-if="questionDisplay.optionC" v-text="'C：' + questionDisplay.optionC"></span>
        </el-menu-item>
        <el-menu-item index="D">
          <span slot="title" class="option" :class="{'correct': correctAnswer === 'D' && correctAnswer !== form.answer, 'chosen': form.answer === 'D'}"  v-if="questionDisplay.optionD" v-text="'D：' + questionDisplay.optionD"></span>
        </el-menu-item>
      </el-menu>
    </el-form>
    <div class="answer-result">
      <template v-if="correctAnswer.length > 0 && correctAnswer === form.answer">
        <i class="el-icon-success"></i><span>回答正确！</span>
      </template>
      <template v-else-if="correctAnswer.length > 0 && correctAnswer !== form.answer">
        <i class="el-icon-error"></i><span>回答错误！</span>
      </template>
    </div>
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
        questionDisplay: {},
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
        if (!q) {
          q = {}
        }
        if (!this.questionDisplay || !this.questionDisplay.description) {
          this.questionDisplay = q
          this.form.answer = ''
        } else {
          let vm = this
          if (vm.questionTimeout >= 0) {
            clearTimeout(vm.questionTimeout)
          }
          vm.questionTimeout = setTimeout(() => {
            vm.questionDisplay = q
            vm.questionTimeout = -1
            this.form.answer = ''
          }, 2500)
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
  .options .correct {
    color: #F56C6C;
  }
  .options .chosen {
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
  .option {
    color: #303133;
  }
  .answer-result {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
</style>
