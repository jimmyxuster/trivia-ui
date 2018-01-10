/* eslint-disable */
import { mount, createLocalVue } from 'vue-test-utils'
import ChatBox from '@/components/ChatBox.vue'

const localVue = createLocalVue()


describe('ChatBox.vue', () => {

  it('输入框为空时禁用发送功能', () => {
    const wrapper = mount(ChatBox, { localVue })
    const sendButton = wrapper.find('button')
    expect(sendButton.attributes().disabled).toBe('disabled')
    expect(sendButton.classes()).toContain('is-disabled')
    sendButton.trigger('click')
    expect(wrapper.emitted().uploadChatItem).toBe(undefined)
  })

  it('输入框有内容时点击发送触发发送事件', () => {
    const wrapper = mount(ChatBox, { localVue })
    const sendButton = wrapper.find('button')
    const input = wrapper.find('input')
    input.element.value = 'testInput'
    input.trigger('input')
    expect(sendButton.attributes().disabled).toBe(undefined)
    expect(sendButton.classes()).not.toContain('is-disabled')
    sendButton.trigger('click')
    expect(wrapper.emitted().uploadChatItem.length).toBe(1)
    expect(wrapper.emitted().uploadChatItem[0].length).toBe(1)
    expect(wrapper.emitted().uploadChatItem[0][0]).toBe('testInput')
  })

  it('前一次发送未完成时禁用发送功能', () => {
    const wrapper = mount(ChatBox, { localVue })
    const loading = wrapper.find('.el-icon-loading')
    const sendButton = wrapper.find('button')
    const input = wrapper.find('input')
    wrapper.setProps({ success: false })
    wrapper.update()
    expect(loading).toBeDefined()
    expect(input.attributes().disabled).toBe('disabled')
    sendButton.trigger('click')
    expect(wrapper.emitted().uploadChatItem).toBe(undefined)
  })

})
