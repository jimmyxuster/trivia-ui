/* eslint-disable */
import { mount, createLocalVue } from 'vue-test-utils'
import Dice from '@/components/Dice.vue'

const localVue = createLocalVue()


describe('Dice.vue', () => {

  const wrapper = mount(Dice, { localVue })
  const cube = wrapper.vm.$refs['cube']

  it('骰子点数为1', () => {
    expect(wrapper.vm.number).toBe(1)
    wrapper.setProps({
      'number': 1,
      'clickable': true,
      'autogo': false
    })
    wrapper.update()
    wrapper.vm.randomCube()
    expect(cube.style.transform).toBeDefined()
    let transformRe = /rotatex\((\d+)deg\) rotatey\((\d+)deg\) rotatez\((\d+)deg\)scale3d\(1\,1\,1\)/
    let transforms = transformRe.exec(cube.style.transform)
    expect(transforms.length).toBe(4)
    expect(transforms[1] % 360).toBeLessThanOrEqual(5)
    expect(transforms[2] % 360).toBeLessThanOrEqual(5)
    expect(transforms[3] % 360).toBeLessThanOrEqual(5)
  })

  it('骰子点数为2', () => {
    wrapper.setProps({
      'number': 2,
      'clickable': true,
      'autogo': false
    })
    wrapper.update()
    wrapper.vm.randomCube()
    expect(cube.style.transform).toBeDefined()
    let transformRe = /rotatex\((\d+)deg\) rotatey\((\d+)deg\) rotatez\((\d+)deg\)scale3d\(1\,1\,1\)/
    let transforms = transformRe.exec(cube.style.transform)
    expect(transforms.length).toBe(4)
    expect(transforms[1] % 360).toBeLessThanOrEqual(5)
    expect(transforms[2] % 360).toBeLessThanOrEqual(95)
    expect(transforms[2] % 360).toBeGreaterThanOrEqual(90)
    expect(transforms[3] % 360).toBeLessThanOrEqual(5)
  })

  it('骰子点数为3', () => {
    wrapper.setProps({
      'number': 3,
      'clickable': true,
      'autogo': false
    })
    wrapper.update()
    wrapper.vm.randomCube()
    expect(cube.style.transform).toBeDefined()
    let transformRe = /rotatex\((\d+)deg\) rotatey\((\d+)deg\) rotatez\((\d+)deg\)scale3d\(1\,1\,1\)/
    let transforms = transformRe.exec(cube.style.transform)
    expect(transforms.length).toBe(4)
    expect(transforms[1] % 360).toBeLessThanOrEqual(5)
    expect(transforms[2] % 360).toBeLessThanOrEqual(275)
    expect(transforms[2] % 360).toBeGreaterThanOrEqual(270)
    expect(transforms[3] % 360).toBeLessThanOrEqual(5)
  })

  it('骰子点数为4', () => {
    wrapper.setProps({
      'number': 4,
      'clickable': true,
      'autogo': false
    })
    wrapper.update()
    wrapper.vm.randomCube()
    expect(cube.style.transform).toBeDefined()
    let transformRe = /rotatex\((\d+)deg\) rotatey\((\d+)deg\) rotatez\((\d+)deg\)scale3d\(1\,1\,1\)/
    let transforms = transformRe.exec(cube.style.transform)
    expect(transforms.length).toBe(4)
    expect(transforms[1] % 360).toBeLessThanOrEqual(275)
    expect(transforms[1] % 360).toBeGreaterThanOrEqual(270)
    expect(transforms[2] % 360).toBeLessThanOrEqual(5)
    expect(transforms[3] % 360).toBeLessThanOrEqual(5)
  })

  it('骰子点数为5', () => {
    wrapper.setProps({
      'number': 5,
      'clickable': true,
      'autogo': false
    })
    wrapper.update()
    wrapper.vm.randomCube()
    expect(cube.style.transform).toBeDefined()
    let transformRe = /rotatex\((\d+)deg\) rotatey\((\d+)deg\) rotatez\((\d+)deg\)scale3d\(1\,1\,1\)/
    let transforms = transformRe.exec(cube.style.transform)
    expect(transforms.length).toBe(4)
    expect(transforms[1] % 360).toBeLessThanOrEqual(95)
    expect(transforms[1] % 360).toBeGreaterThanOrEqual(90)
    expect(transforms[2] % 360).toBeLessThanOrEqual(5)
    expect(transforms[3] % 360).toBeLessThanOrEqual(5)
  })

  it('骰子点数为6', () => {
    wrapper.setProps({
      'number': 6,
      'clickable': true,
      'autogo': false
    })
    wrapper.update()
    wrapper.vm.randomCube()
    expect(cube.style.transform).toBeDefined()
    let transformRe = /rotatex\((\d+)deg\) rotatey\((\d+)deg\) rotatez\((\d+)deg\)scale3d\(1\,1\,1\)/
    let transforms = transformRe.exec(cube.style.transform)
    expect(transforms.length).toBe(4)
    expect(transforms[1] % 360).toBeLessThanOrEqual(185)
    expect(transforms[1] % 360).toBeGreaterThanOrEqual(180)
    expect(transforms[2] % 360).toBeLessThanOrEqual(5)
    expect(transforms[3] % 360).toBeLessThanOrEqual(5)
  })

  it('玩家行动时，点击骰子可以开启旋转动画并停止在5', () => {
    wrapper.setProps({
      'number': 5,
      'clickable': true,
      'autogo': false
    })
    wrapper.update()
    wrapper.find('.group').trigger('click')
    expect(cube.style.transform).toBeDefined()
    let transformRe = /rotatex\((\d+)deg\) rotatey\((\d+)deg\) rotatez\((\d+)deg\)scale3d\(1\,1\,1\)/
    let transforms = transformRe.exec(cube.style.transform)
    expect(transforms.length).toBe(4)
    expect(transforms[1] % 360).toBeLessThanOrEqual(95)
    expect(transforms[1] % 360).toBeGreaterThanOrEqual(90)
    expect(transforms[2] % 360).toBeLessThanOrEqual(5)
    expect(transforms[3] % 360).toBeLessThanOrEqual(5)
  })

  it('玩家行动时，点击骰子可以开启旋转动画并停止在6', () => {
    wrapper.setProps({
      'number': 6,
      'clickable': true,
      'autogo': false
    })
    wrapper.update()
    wrapper.find('.group').trigger('click')
    expect(cube.style.transform).toBeDefined()
    let transformRe = /rotatex\((\d+)deg\) rotatey\((\d+)deg\) rotatez\((\d+)deg\)scale3d\(1\,1\,1\)/
    let transforms = transformRe.exec(cube.style.transform)
    expect(transforms.length).toBe(4)
    expect(transforms[1] % 360).toBeLessThanOrEqual(185)
    expect(transforms[1] % 360).toBeGreaterThanOrEqual(180)
    expect(transforms[2] % 360).toBeLessThanOrEqual(5)
    expect(transforms[3] % 360).toBeLessThanOrEqual(5)
  })

  it('非玩家行动时，骰子可以自动开启旋转动画并停止在6', () => {
    wrapper.setProps({
      'number': 6,
      'clickable': false,
      'autogo': false
    })
    wrapper.update()
    wrapper.setProps({ autogo: true })
    // wrapper.find('.group').trigger('click')
    expect(cube.style.transform).toBeDefined()
    let transformRe = /rotatex\((\d+)deg\) rotatey\((\d+)deg\) rotatez\((\d+)deg\)scale3d\(1\,1\,1\)/
    let transforms = transformRe.exec(cube.style.transform)
    expect(transforms.length).toBe(4)
    expect(transforms[1] % 360).toBeLessThanOrEqual(185)
    expect(transforms[1] % 360).toBeGreaterThanOrEqual(180)
    expect(transforms[2] % 360).toBeLessThanOrEqual(5)
    expect(transforms[3] % 360).toBeLessThanOrEqual(5)
  })

  it('非玩家行动时，点击骰子不能触发旋转', () => {
    wrapper.setProps({
      'clickable': false,
      'autogo': false
    })
    wrapper.setMethods({
      getRandom: jest.fn()
    })
    wrapper.find('.group').trigger('click')
    expect(wrapper.vm.getRandom).not.toBeCalled()
  })

})
