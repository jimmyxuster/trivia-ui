/* eslint-disable */
import { mount, createLocalVue } from 'vue-test-utils'
import TopBar from '@/components/TopBar.vue'
import mockApi from '../src/service/api'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { Dropdown } from 'element-ui'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

const router = new VueRouter()

jest.mock('../src/service/api')

describe('TopBar.vue', () => {
  let actions
  let state
  let store
  let getters
  let mutations

  beforeEach(() => {
    state = {
      module: {
        username: '',
        winCount: 0,
        totalPlay: 0,
        avatarUrl: '',
        gameState: 'none',
        gameType: '',
        socket: null,
        roomName: 0
      },
    }

    getters = {
      username: (state) => state.module.username,
      winCount: () => 0,
      totalPlay: () => 0,
      avatarUrl: () => '',
      gameState: () => 'none',
      gameType: () => '',
      socket: () => null,
      roomName: () => 0
    }

    mutations = {
      'CLEAR_USERINFO' () {
        state.module.username = ''
      }
    }

    actions = {
      quitGame: jest.fn(),
      setSocket: jest.fn()
    }

    store = new Vuex.Store({
      state,
      actions,
      getters,
      mutations
    })
  })

  it('在未登录时显示登录按钮', () => {
    const wrapper = mount(TopBar, { store, router, localVue, stubs: ['router-link', 'router-view']})
    const loginButton = wrapper.find('button')
    expect(loginButton.text()).toBe('登录')
    expect(loginButton.classes()).toContain('el-button--primary')
  })

  it('在登录时显示用户名', () => {
    const wrapper = mount(TopBar, { store, router, localVue, stubs: ['router-link', 'router-view']})
    wrapper.setComputed({
      username: 'testUser'
    })
    const loginButton = wrapper.find('button')
    expect(loginButton.classes()).toContain('el-button--text')
    expect(loginButton.classes()).not.toContain('el-button--primary')
    expect(loginButton.text()).toBe('testUser')
  })

  it('点击"游戏"tab时高亮', () => {
    const wrapper = mount(TopBar, { store, router, localVue })
    wrapper.vm.$router.replace('/room')
    wrapper.update()
    const gameTab = wrapper.findAll('li').at(0)
    const meTab = wrapper.findAll('li').at(1)
    gameTab.trigger('click')
    expect(gameTab.classes()).toContain('active')
    expect(meTab.classes()).not.toContain('active')
  })

  it('点击"我"tab时高亮', () => {
    const wrapper = mount(TopBar, { store, router, localVue })
    const gameTab = wrapper.findAll('li').at(0)
    const meTab = wrapper.findAll('li').at(1)
    meTab.trigger('click')
    expect(gameTab.classes()).not.toContain('active')
    expect(meTab.classes()).toContain('active')
  })

  it('点击登录按钮跳转登录', () => {
    const wrapper = mount(TopBar, { store, router, localVue })
    const loginButton = wrapper.find('button')
    loginButton.trigger('click')
    expect(wrapper.vm.$route.path).toBe('/login')
  })

  it('下拉菜单点击注册跳转注册', () => {
    const wrapper = mount(TopBar, { store, router, localVue })
    const trigger = wrapper.find(Dropdown)
    trigger.vm.$emit('command', 'r')
    expect(wrapper.vm.$route.path).toBe('/register')
  })

  it('下拉菜单点击登出调用登出接口', () => {
    const wrapper = mount(TopBar, { store, router, localVue })
    const trigger = wrapper.find(Dropdown)
    wrapper.setData({ username: 'test' })
    trigger.vm.$emit('command', 'l')
    expect(mockApi.logout).toBeCalled()
  })
})
