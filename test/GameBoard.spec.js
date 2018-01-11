/* eslint-disable */
import { mount, createLocalVue } from 'vue-test-utils'
import GameBoard from '@/components/GameBoard.vue'
import Square from '@/components/Square.vue'
import Dice from '@/components/Dice.vue'
import { Button } from 'element-ui'

const localVue = createLocalVue()
const initialPlayers = [
  {"username":"test1","avatarUrl":null,"winCount":19,"totalPlay":20,"exp":195,"isReady":false},
  {"username":"test2","avatarUrl":null,"winCount":15,"totalPlay":22,"exp":180,"isReady":false}
]

localVue.prototype.indexOfArray = (arr, obj) => {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === obj) {
      result.push(i)
    }
  }
  return result
}

describe('GameBoard.vue', () => {

  let basicProps

  beforeEach(() => {
    basicProps = { players: initialPlayers }
  })

  const wrapper = mount(GameBoard, { localVue })

  it('方块个数等于22', () => {
    const squares = wrapper.findAll(Square)
    expect(squares.length).toBe(22)
  })

  it('非房主且未准备状态可以点击准备', () => {
    wrapper.setProps({
      ...basicProps,
      isOwner: false,
      ready: false
    })
    const startBtn = wrapper.find(Button)
    expect(startBtn.is(Button)).toBe(true)
    expect(startBtn.text()).toBe('准备')
    expect(startBtn.attributes().disabled).not.toBeDefined()
  })

  it('点击准备后发射准备事件', () => {
    const startBtn = wrapper.find(Button)
    expect(startBtn.is(Button)).toBe(true)
    startBtn.trigger('click')
    expect(wrapper.emitted('setReady').length).toBe(1)
  })

  it('游戏过程中轮到当前玩家时点击骰子通知骰子旋转', () => {
    wrapper.setProps({
      ...basicProps,
      isOwner: false,
      ready: true,
      clickable: true,
      status: 'playing',
      diceAutoGo: false
    })
    const dice = wrapper.find(Dice)
    expect(dice.is(Dice)).toBe(true)
    dice.vm.$emit('start')
    expect(wrapper.emitted('diceStart').length).toBe(1)
    dice.vm.$emit('stop')
    expect(wrapper.emitted('diceStop').length).toBe(1)
  })

})
