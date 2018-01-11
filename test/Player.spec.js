/* eslint-disable */
import { mount, createLocalVue } from 'vue-test-utils'
import Player from '@/components/Player.vue'
import { Popover } from 'element-ui'

const localVue = createLocalVue()

describe('Player.vue', () => {

  const wrapper = mount(Player, { localVue })

  it('正确显示用户名', () => {
    wrapper.setProps({
      username: 'testUser'
    })
    const nameSpan = wrapper.find('span.username')
    expect(nameSpan.text()).toBe('testUser')
  })

  it('游戏未开始、未准备状态不显示金币和准备tag', () => {
    wrapper.setProps({
      username: 'testUser',
      ready: false,
      state: 'Avail',
      coinCount: 0
    })
    const readyTag = wrapper.findAll('.ready-right')
    expect(readyTag.length).toBe(0)
  })

  it('游戏未开始、准备状态，显示准备tag但不显示金币', () => {
    wrapper.setProps({
      username: 'testUser',
      ready: true,
      state: 'Avail',
      coinCount: 0
    })
    const readyTag = wrapper.find('.ready-right')
    expect(readyTag.text()).toBe('准备')
  })

  it('游戏开始，不显示准备tag，显示金币', () => {
    wrapper.setProps({
      username: 'testUser',
      ready: true,
      state: 'playing',
      coinCount: 5
    })
    const coinTag = wrapper.find('.coin-count')
    const readyTag = wrapper.find('.ready-right')
    expect(coinTag.text()).toBe('5')
    expect(readyTag.text()).not.toBe('准备')
  })

  it('chatContent变化', () => {
    jest.useFakeTimers()
    wrapper.setData({ chatTimeout: 1 })
    wrapper.setProps({ chatContent: '' })
    wrapper.setProps({ chatContent: 'first' })
    expect(wrapper.vm.chatVisible).toBe(true)
    expect(wrapper.find(Popover).vm.content).toBe('first')
    jest.runAllTimers()
    expect(wrapper.vm.chatTimeout).toBe(0)
  })
})
