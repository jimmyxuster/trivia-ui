<template>
  <el-card :body-style="{ padding: '10px' }">
    <el-input v-model="chatItem" placeholder="输入聊天内容" :disabled="!success">
      <el-button slot="append" icon="el-icon-d-arrow-right"
                 @click="uploadChatItem" :disabled="chatItem.length <= 0" v-if="success"></el-button>
      <el-button slot="append" icon="el-icon-loading" v-else></el-button>
    </el-input>
  </el-card>
</template>
<script>
  import { Card, Input, Button } from 'element-ui'
  export default {
    name: 'chat-box',
    data () {
      return {
        chatItem: ''
      }
    },
    props: {
      'success': { type: Boolean, default: true }
    },
    watch: {
      success (success) {
        if (success) {
          this.chatItem = ''
        }
      }
    },
    methods: {
      uploadChatItem () {
        if (this.chatItem.length > 0) {
          this.$emit('update:success', false)
          this.$emit('uploadChatItem', this.chatItem)
        }
      }
    },
    components: {
      'el-card': Card,
      'el-input': Input,
      'el-button': Button
    }
  }
</script>
<style>

</style>
