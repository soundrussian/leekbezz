import { shallowMount } from '@vue/test-utils'
import SubmitButton from '../SubmitButton.vue'

describe('SubmitButton.vue', () => {
  it('renders a button with type=submit and passed title', () => {
    const buttonText = 'Button text'
    const wrapper = shallowMount(SubmitButton, {
      propsData: {
        text: buttonText
      }
    })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.element.getAttribute('type')).toEqual('submit')
    expect(wrapper.text()).toContain(buttonText)
  })

  it('enables button and hides spinner if loading is false', () => {
    const buttonText = 'Button text'
    const wrapper = shallowMount(SubmitButton, {
      propsData: {
        loading: false,
        text: buttonText
      }
    })
    const button = wrapper.find('button')
    expect(button.element.getAttribute('disabled')).toEqual(null)
    const spinner = wrapper.find('svg')
    expect(spinner.exists()).toBe(false)
  })

  it('makes button disabled and show spinner if loading prop is passed', () => {
    const buttonText = 'Button text'
    const wrapper = shallowMount(SubmitButton, {
      propsData: {
        loading: true,
        text: buttonText
      }
    })
    const button = wrapper.find('button')
    expect(button.element.getAttribute('disabled')).toEqual('disabled')
    const spinner = wrapper.find('svg')
    expect(spinner.exists()).toBe(true)
  })
})
