import { mount } from '@vue/test-utils'
import Talquei from '../src/components/Talquei'
import TalqueiMessage from '../src/components/TalqueiMessage'

global.MutationObserver = class {
  observe (element, initObject) {
    return jest.fn()
  }
}

const provide = {
  next: jest.fn(),
  showInput: jest.fn(),
  avatarSlot: jest.fn(),
  submitSlot: jest.fn(),
  scrollToTerminal: jest.fn(),
}

describe('Talquei', () => {
  it('should be instatiated', () => {
    const wrapper = mount(Talquei)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})

describe('TalqueiMessage', () => {
  it('should be instatiated', () => {
    const wrapper = mount(TalqueiMessage, {
      propsData: { text: 'Hello' },
      provide,
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
