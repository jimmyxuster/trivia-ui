<template>
  <el-row :gutter="20">
    <el-col :span="10">
      <el-upload
        class="avatar-uploader"
        action=""
        :auto-upload="false"
        :show-file-list="false"
        :on-change="onAvatarChange">
        <transition name="el-fade-in" mode="out-in">
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </transition>
      </el-upload>
    </el-col>
    <el-col :span="14">
      <el-form ref="form" class="register-form" :rules="rules" :model="registerForm" label-width="80px" size="medium">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :error="registerError">
          <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
          <el-button @click="reset">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
  import { Form, FormItem, Input, Button, Row, Col, Upload } from 'element-ui'
  import api from '../../service/api'
  export default {
    name: 'register',
    data () {
      return {
        registerForm: {
          username: '',
          password: '',
          avatarBase64: ''
        },
        avatarUrl: '',
        registerError: '',
        rules: {
          username: [
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
      onAvatarChange (file) {
        const isJPGorPNG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPGorPNG) {
          this.$message.error('上传头像图片只能是JPG或PNG格式!')
        } else if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        } else {
          this.avatarUrl = file.url
          let reader = new FileReader()
          reader.readAsDataURL(file.raw)
          reader.onload = () => {
            this.registerForm.avatarBase64 = reader.result
          }
        }
        return isJPGorPNG && isLt2M
      },
      register () {
        this.registerError = ''
        let registerInfo = this.registerForm
        api.register(registerInfo).then(res => {
          if (res.body.code === 0) {
            console.log('register success!!!!!')
          } else {
            this.registerError = '注册失败：' + (res.body.message || '未知原因')
          }
          console.log(res)
        }).catch(err => {
          this.loginError = '注册失败：网络异常'
          console.log('err', err)
        })
      },
      reset () {
        this.$refs.form.resetFields()
        this.$router.push('/login')
      }
    },
    components: {
      'el-form': Form,
      'el-form-item': FormItem,
      'el-input': Input,
      'el-button': Button,
      'el-row': Row,
      'el-col': Col,
      'el-upload': Upload
    }
  }
</script>
<style lang="scss">
  @import "../../assets/scss/common";
  $avatar-width: 140px;
  .register-form {
    width: 300px;
    margin-top: 30px;
  }
  .avatar-uploader {
    width: $avatar-width;
    float: right;
    margin-top: 30px;
  }
  .avatar-uploader img {
    width: $avatar-width;
    height: $avatar-width;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: $avatar-width;
    height: $avatar-width;
    line-height: $avatar-width;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
