import { shallowMount } from '@vue/test-utils'
import ValidatableInput from '../ValidatableInput.vue'

describe('ValidatableInput.vue', () => {
  it('builds an input of the given type', () => {
    const wrapper = shallowMount(ValidatableInput, {
      propsData: {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        value: ''
      }
    })
    const input = wrapper.findComponent({ ref: 'input' })
    expect(input.element.getAttribute('type')).toEqual('email')
  })

  it('shows an error if error is passed', () => {
    const errorText = 'Invalid email'
    const wrapper = shallowMount(ValidatableInput, {
      propsData: {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        value: '',
        errors: {
          email: [errorText]
        }
      }
    })
    const input = wrapper.findComponent({ ref: 'input' })
    const errorMessage = wrapper.findComponent({ ref: 'error' })
    expect(input.element.classList).toContain('border-red-vivid-500')
    expect(errorMessage.text()).toContain(errorText)
  })

  it('does not show error message if error is for another field', () => {
    const errorText = 'Invalid password'
    const wrapper = shallowMount(ValidatableInput, {
      propsData: {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        value: '',
        errors: {
          passowrd: [errorText]
        }
      }
    })
    const input = wrapper.findComponent({ ref: 'input' })
    const errorMessage = wrapper.findComponent({ ref: 'error' })
    expect(input.element.classList).not.toContain('border-red-vivid-500')
    expect(errorMessage.exists()).toBe(false)
  })

  it('works fine with empty errors object', () => {
    const wrapper = shallowMount(ValidatableInput, {
      propsData: {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        value: '',
        errors: {}
      }
    })
    const input = wrapper.findComponent({ ref: 'input' })
    const errorMessage = wrapper.findComponent({ ref: 'error' })
    expect(input.element.classList).not.toContain('border-red-vivid-500')
    expect(errorMessage.exists()).toBe(false)
  })
})
