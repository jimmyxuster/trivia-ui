<template>
  <el-container class="container">
    <el-aside width="200px">
      <el-menu class="menu" @select="selectNav"
        default-active="1">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-setting"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <div v-if="nav === '1'">
        <div>
          <img :src="avatarUrl" v-if="avatarUrl" class="avatar">
          <img src="../assets/img/default_user_xmas.png" class="avatar" v-else>
        </div>
        <div class="info-wrapper">
          <div class="username">
            <span v-text="username"></span>
          </div>
          <div>
            <div class="statistic">
              <span class="title">总游戏次数：</span><span class="data" v-text="totalPlay"></span>
            </div>
          </div>
          <div class="statistic">
            <span class="title">获胜次数：</span><span class="data" v-text="winCount"></span>
          </div>
        </div>
      </div>
      <div v-else-if="nav === '2'" class="change-pwd">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px" size="medium">
          <el-form-item label="原密码" prop="oldPassword" :error="changePwdError">
            <el-input v-model="form.oldPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="form.newPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changePwd">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { Aside, Main, Container, Menu, MenuItem, Form, FormItem, Input, Button } from 'element-ui'
  import api from '../service/api'
  import * as mutationTypes from '../store/mutation-types'
  export default {
    name: 'person',
    data () {
      return {
        nav: '1',
        form: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        changePwdError: '',
        rules: {
          oldPassword: [
            { required: true, message: '请输入原密码', trigger: 'blur' },
            { min: 3, max: 10, message: '用户名长度为3-10个字符', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: this.validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters(['username', 'totalPlay', 'winCount', 'avatarUrl'])
    },
    methods: {
      ...mapMutations({
        'clearUserinfo': mutationTypes.CLEAR_USERINFO
      }),
      validatePass (rule, value, callback) {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      selectNav (index) {
        this.nav = index
      },
      changePwd () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.changePwdError = ''
            api.changePwd({
              oldPassword: this.form.oldPassword,
              newPassword: this.form.newPassword
            })
              .then(res => {
                if (res.body.code === 0) {
                  this.$message({
                    showClose: true,
                    message: '修改密码成功！请重新登录',
                    type: 'success'
                  })
                  this.logout()
                } else {
                  this.changePwdError = res.body.message || '未知原因'
                }
              })
          }
        })
      },
      logout () {
        api.logout().then(() => {
          this.clearUserinfo()
          this.$router.replace('/login')
        })
      }
    },
    components: {
      'el-aside': Aside,
      'el-main': Main,
      'el-container': Container,
      'el-menu': Menu,
      'el-menu-item': MenuItem,
      'el-form': Form,
      'el-form-item': FormItem,
      'el-input': Input,
      'el-button': Button
    }
  }
</script>
<style scoped>
  .container {
    height: 100%;
  }
  .menu {
    height: 100%;
  }
  .avatar {
    display: block;
    margin: 0 auto;
    width: 100px;
  }
  .username span {
    display: inline-block;
    width: 100%;
    text-align: start;
    margin: 20px 0 10px;
    font-size: 24px;
    border-bottom: 1px solid #909399;
  }
  .statistic {
    min-width: 50px;
    font-size: 16px;
    text-align: start;
  }
  .statistic .title {
    color: #909399;
  }
  .statistic .data {
    color: #3a8ee6;
    text-align: start;
  }
  .info-wrapper {
    width: 150px;
    margin: 0 auto;
    text-align: start;
  }
  .change-pwd {
    max-width: 500px;
    margin: 0 auto;
  }
</style>
