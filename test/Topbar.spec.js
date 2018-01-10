/* eslint-disable */
import { mount, createLocalVue } from 'vue-test-utils'
import TopBar from '@/components/TopBar.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

const router = new VueRouter()

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

    actions = {
      quitGame: jest.fn(),
      setSocket: jest.fn()
    }

    store = new Vuex.Store({
      state,
      actions,
      getters
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
})
