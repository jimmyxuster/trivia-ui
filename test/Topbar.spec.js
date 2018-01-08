/* eslint-disable */
import { mount, shallow, createLocalVue } from 'vue-test-utils'
import TopBar from '@/components/TopBar.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

const $route = {
  path: '/room',
  hash: ''
}

describe('TopBar.vue', () => {
  let actions
  let state
  let store
  let getters

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
      username: () => '',
      winCount: () => 0,
      totalPlay: () => 0,
      avatarUrl: () => '',
      gameState: () => 'none',
      gameType: () => '',
      socket: () => null,
      roomName: () => 0
    }

    actions = {
      quitGame: () => {},
      setSocket: () => {}
    }

    store = new Vuex.Store({
      state,
      actions,
      getters
    })
  })

  it('在第一个 p 标签内渲染“state.inputValue”', () => {
    const wrapper = mount(TopBar, { store, localVue, stubs: ['router-link', 'router-view'] })
    console.log(wrapper.html())
    const loginButton = wrapper.find('button')
    expect(loginButton.text()).toBe('登录')
  })
})
