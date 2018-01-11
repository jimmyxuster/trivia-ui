/* eslint-disable */
import { mount, createLocalVue } from 'vue-test-utils'
import GameResult from '@/components/GameResult.vue'
const localVue = createLocalVue()


const wrapper = mount(GameResult, { localVue, propsData: {
    visible: true,
    results: [
      { win: false, username: 'test1', coin: 2 },
      { win: true, username: 'test2', coin: 6 },
      { win: false, username: 'test3', coin: 3 },
    ]
  } })

describe('GameResult.vue', () => {

  it('正确显示游戏结果', () => {
    const losers = wrapper.findAll('.player.loser-name')
    const certificate = wrapper.find('img.winner')
    const winner = wrapper.find('img.winner + span.player')
    expect(losers.length).toBe(2)
    expect(losers.at(0).text()).toBe('test1')
    expect(losers.at(1).text()).toBe('test3')
    expect(certificate.element).toBeDefined()
    expect(winner.element).toBeDefined()
    expect(winner.text()).toBe('test2')
  })

  it('点击返回键退出游戏室', () => {
    const backButton = wrapper.find('.dialog-footer button')
    expect(backButton.element).toBeDefined()
    backButton.trigger('click')
    expect(wrapper.emitted('quit').length).toBe(1)
  })

})
