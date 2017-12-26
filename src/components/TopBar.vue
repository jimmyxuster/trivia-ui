<template>
  <div class="top-bar">
    <div class="top-bar-container">
      <div class="logo-brand">
        <img src="../assets/img/logo.png">
        <span class="brand">rivia</span>
      </div>
    <div>
      <transition name="el-zoom-in-top">
        <ul class="nav" v-if="$route.path !== '/gameview'">
          <router-link tag="li" v-for="tab in tabs" v-text="tab.title" :to="tab.path" :key="tab.index"
                       :class="{'active': currentTab===tab.index}" @click.native="tabChange(tab.index)"></router-link>
        </ul>
      </transition>
    </div>
    <el-dropdown @command="handleDropdownCommand" class="drop-down">
      <el-button :type="username === '' ? 'primary' : 'text'" @click="login" :class="{'username': username !== ''}">
        {{ username === '' ? '登录' : username }}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="r" v-if="username === ''">注册</el-dropdown-item>
        <el-dropdown-item command="l" v-else>登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
  </div>
</template>
<script>
  import { Row, Col, Menu, MenuItem, Dropdown, DropdownMenu, DropdownItem, Button } from 'element-ui'
  import ElMenuItem from 'element-ui/packages/menu/src/menu-item'
  import { mapGetters, mapMutations } from 'vuex'
  import * as mutationTypes from '../store/mutation-types'
  export default {
    name: 'TopBar',
    data () {
      return {
        currentTab: 1,
        tabs: [
          { title: '游戏', index: 1, path: '/game' },
          { title: '我', index: 2, path: '/me' }
        ]
      }
    },
    methods: {
      ...mapMutations({
        'clearUserinfo': mutationTypes.CLEAR_USERINFO
      }),
      tabChange (index) {
        this.currentTab = index
        if (index === 1) {
          this.$router.replace('/room')
        }
      },
      login () {
        if (this.$route.path !== '/login' && this.username === '') {
          this.$router.replace('/login')
        }
      },
      handleDropdownCommand (type) {
        if (type === 'r') {
          this.$router.replace('/register')
        } else if (type === 'l') {
          this.clearUserinfo()
          this.$router.replace('/login')
        }
      }
    },
    computed: {
      ...mapGetters(['username', 'gameState'])
    },
    components: {
      ElMenuItem,
      'el-row': Row,
      'el-col': Col,
      'el-button': Button,
      'el-menu': Menu,
      'el-menu-item': MenuItem,
      'el-dropdown-menu': DropdownMenu,
      'el-dropdown-item': DropdownItem,
      'el-dropdown': Dropdown
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/common";
  .top-bar {
    width: 100%;
    height: 80px;
    background-color: #fff;
    z-index: 100;
    line-height: 80px;
  }
  .logo-brand {
    height: 80px;
    vertical-align: middle;
  }
  .logo-brand img {
    width: 40px;
    float: left;
    margin-top: 18px;
    margin-right: 2px;
  }
  .brand {
    color: $trivia-blue;
    font-size: 30px;
    font-family: "lucida sans unicode", "lucida grande", sans-serif;
    letter-spacing: 0.8pt;
  }
  .username {
    font-size: 18px;
  }
  .top-bar-container {
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav {
    border-bottom-color: transparent;
  }
  .nav li {
    position: relative;
    display: inline-block;
    color: #888;
    float: left;
    text-decoration: none;
    padding: 0 10px;
    cursor: pointer;
    animation: ease-in;
  }
  .nav li:hover,
  .nav li.active {
    color: #333;
  }
  .nav li:after {
    content: "";
    display: inline-block;
    position: absolute;
    bottom: 15px;
    left: calc(50% - 7px);
    width: 14px;
    height: 4px;
    transition: all .3s;
  }
  .nav li.active:after {
    background: $trivia-blue;
  }
  .drop-down {
    line-height: 40px;
  }
</style>
