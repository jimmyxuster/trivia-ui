<template>
  <el-row :gutter="20">
    <el-col :span="10" class="login-icon-wrapper">
      <transition name="el-fade-in" mode="out-in">
        <svg v-if="avatarUrl === ''" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 489.4 489.4" style="enable-background:new 0 0 489.4 489.4;" xml:space="preserve">

    <g>
      <path d="M407,0H82.4C37,0,0,37,0,82.6v162.1c0,9.9,8.1,18,18,18h276.7L255,302.4c-7,7-7,18.4,0,25.5c3.5,3.5,8.1,5.3,12.7,5.3
        c4.6,0,9.2-1.8,12.7-5.3l70.4-70.4c7-7,7-18.4,0-25.5l-70.4-70.4c-7-7-18.4-7-25.5,0c-7,7-7,18.4,0,25.5l39.8,39.6H36V82.6
        C36,56.9,56.8,36,82.4,36H407c25.6,0,46.4,20.9,46.4,46.6v324.2c0,25.7-20.8,46.6-46.4,46.6H82.4c-25.6,0-46.4-20.9-46.4-46.6v-42
        c0-9.9-8.1-18-18-18c-9.9,0-18,8.1-18,18v42c0,45.5,37,82.6,82.4,82.6H407c45.4,0,82.4-37,82.4-82.6V82.6
        C489.4,37.1,452.4,0,407,0z"/>
    </g>
  </svg>
        <img :src="avatarUrl" v-else>
      </transition>
      <div></div>
    </el-col>
    <el-col :span="14">
      <el-form ref="form" class="login-form" :rules="rules" :model="loginForm" label-width="80px" size="medium">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="loginForm.name" @blur="checkAvatar"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :error="loginError">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="reset">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
  import { Form, FormItem, Input, Button, Row, Col } from 'element-ui'
  import { mapMutations } from 'vuex'
  import * as mutationTypes from '../store/mutation-types'
  export default {
    data () {
      return {
        loginForm: {
          name: '',
          password: ''
        },
        avatarUrl: '',
        loginError: '',
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '用户名长度为3-10个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      ...mapMutations({
        'setUserinfo': mutationTypes.SET_USERINFO
      }),
      checkAvatar () {
        if (this.loginForm.name === 'jimmy') {
          this.avatarUrl = 'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=ab40ad2d31c79f3d8fe1e336829aaa2c/6a63f6246b600c33e539361a104c510fd8f9a1a4.jpg'
        } else {
          this.avatarUrl = ''
        }
      },
      login () {
        console.log('login', this.loginForm)
        this.loginError = ''
        let loginInfo = this.loginForm
        if (loginInfo.name !== 'jimmy' || loginInfo.password !== '12345') {
          this.loginError = '用户名或密码错误'
        } else {
          // 假设登录成功
          this.setUserinfo({
            username: loginInfo.name,
            token: '12345'
          })
        }
      },
      reset () {
        this.$refs.form.resetFields()
      }
    },
    components: {
      'el-form': Form,
      'el-form-item': FormItem,
      'el-input': Input,
      'el-button': Button,
      'el-row': Row,
      'el-col': Col
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/common";
  .login-icon-wrapper * {
    width: 100px;
    margin: 30px auto 0 calc(100% - 120px);
  }
  .login-icon-wrapper svg {
    fill: $trivia-blue;
  }
  .login-form {
    width: 300px;
    margin-top: 30px;
  }
</style>
