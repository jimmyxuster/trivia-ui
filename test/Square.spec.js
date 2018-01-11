/* eslint-disable */
import { mount, createLocalVue } from 'vue-test-utils'
import Square from '@/components/Square.vue'
const localVue = createLocalVue()


const wrapper = mount(Square, { localVue, propsData: {
    persons: [0,2],
    index: 5
  } })

describe('Square.vue', () => {

  it('方块编号为5时显示背景图为"/static/6.png"', () => {
    const bg = wrapper.find('img.image')
    expect(bg.element).toBeDefined()
    expect(bg.attributes().src).toBe('/static/6.png')
  })

  it('方块内站2人时显示两个小头像', () => {
    const pins = wrapper.findAll('img.pin')
    expect(pins.length).toBe(2)
    expect(pins.at(0).attributes().src).toBe('/static/pin1.png')
    expect(pins.at(1).attributes().src).toBe('/static/pin3.png')
  })

  it('方块内站4人时显示四个小头像并减小头像尺寸', () => {
    wrapper.setProps({ persons: [0, 2, 1, 3] })
    const pins = wrapper.findAll('img.pin.small')
    expect(pins.length).toBe(4)
    expect(pins.at(0).attributes().src).toBe('/static/pin1.png')
    expect(pins.at(1).attributes().src).toBe('/static/pin3.png')
    expect(pins.at(2).attributes().src).toBe('/static/pin2.png')
    expect(pins.at(3).attributes().src).toBe('/static/pin4.png')
  })

  it('方块内无人时显示默认小问号图标', () => {
    wrapper.setProps({ persons: [] })
    const pins = wrapper.findAll('img.pin')
    const questionMark = wrapper.find('.el-icon-question')
    expect(pins.length).toBe(0)
    expect(questionMark.element).toBeDefined()
  })

  it('方块高亮时添加css动画类', () => {
    wrapper.setProps({ highlight: true })
    const cardHighlight = wrapper.find('div.highlight')
    expect(cardHighlight.element).toBeDefined()
  })

})
