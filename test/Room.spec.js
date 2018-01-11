/* eslint-disable */
import { mount, createLocalVue } from 'vue-test-utils'
import Room from '@/components/Room.vue'
import { Button } from 'element-ui'
const localVue = createLocalVue()

describe('Room.vue', () => {

  const baseProp = { roomNo: 123 }

  const wrapper = mount(Room, { localVue, propsData: baseProp })

  it('房间已开始游戏时不可进入', () => {
    wrapper.setProps({
      ...baseProp,
      roomStatus: 'Playing'
    })
    const enter = wrapper.find('button')
    expect(enter.attributes('disabled').disabled).toBeDefined()
    /// trigger 会强制触发点击，无视disabled属性，但实际浏览器中不会这样，需要手测
    // enter.trigger('click')
    // expect(wrapper.emitted('enterRoom')).not.toBeDefined()
  })

  it('房间未开始游戏时可以进入', () => {
    wrapper.setProps({
      ...baseProp,
      roomStatus: 'Avail'
    })
    const enter = wrapper.find(Button)
    expect(enter.attributes('disabled').disabled).not.toBeDefined()
    enter.trigger('click')
    expect(wrapper.emitted('enterRoom')[0][0]).toBe(123)
  })

})
