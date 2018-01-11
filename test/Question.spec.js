/* eslint-disable */
import { mount, createLocalVue } from 'vue-test-utils'
import { Menu } from 'element-ui'
import Question from '@/components/Question.vue'

const localVue = createLocalVue()

describe('Question.vue', () => {
  const question = {
    description: 'question content',
    optionA: 'A',
    optionB: 'B',
    optionC: 'C',
    optionD: 'D'
  }

  const wrapper = mount(Question, { localVue, propsData: {
      visible: true,
      question
    },
    attachToDocument: true
  })

  it('正确显示问题和选项', () => {
    expect(wrapper.vm.questionDisplay.description === question.description)
    expect(wrapper.vm.questionDisplay.optionA === question.optionA)
    expect(wrapper.vm.questionDisplay.optionB === question.optionB)
    expect(wrapper.vm.questionDisplay.optionC === question.optionC)
    expect(wrapper.vm.questionDisplay.optionD === question.optionD)
  })

  it('非当前玩家答题时选项不可点击', () => {
    wrapper.setProps({ answerable: false })
    expect(wrapper.find('.mask').element).toBeDefined()
  })

  it('未选择选项时不可提交', () => {
    wrapper.vm.submit()
    expect(wrapper.emitted('answer')).not.toBeDefined()
  })

  it('选项互斥', () => {
    let menu = wrapper.find(Menu)
    expect(menu.is(Menu)).toBe(true)
    menu.vm.$emit('select', 'A')
    expect(wrapper.vm.form.answer).toBe('A')
    menu.vm.$emit('select', 'B')
    expect(wrapper.vm.form.answer).toBe('B')
    menu.vm.$emit('select', 'C')
    expect(wrapper.vm.form.answer).toBe('C')
    menu.vm.$emit('select', 'D')
    expect(wrapper.vm.form.answer).toBe('D')
  })

  it('提交格式正确', () => {
    wrapper.setProps({ answerable: true })
    let menu = wrapper.find(Menu)
    expect(menu.is(Menu)).toBe(true)
    menu.vm.$emit('select', 'A')
    wrapper.vm.submit()
    expect(wrapper.emitted('answer').length === 1 && wrapper.emitted('answer')[0][0] === 'A').toBe(true)
  })
})
