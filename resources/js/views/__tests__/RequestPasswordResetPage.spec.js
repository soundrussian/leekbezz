import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import RequestPasswordResetPage from '../RequestPasswordResetPage.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({})

describe('ResetPasswordRequestPage.vue', () => {
  it('dispatches forgot action on submit', () => {
    const wrapper = subject()
    store.dispatch = jest.fn(() => Promise.resolve({ message: '' }))
    submit(wrapper)

    expect(store.dispatch).toHaveBeenCalledWith('requestPasswordReset', validParams())
  })

  it('does nothing if already loading', () => {
    const wrapper = subject()
    wrapper.setData({ isLoading: true })
    store.dispatch = jest.fn(() => Promise.resolve({ message: '' }))
    submit(wrapper)

    expect(store.dispatch).not.toHaveBeenCalled()
  })

  it('correctly sets isLoading state', async () => {
    const wrapper = subject()
    expect(wrapper.vm.isLoading).toBe(false)
    store.dispatch = jest.fn(async () => {
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isLoading).toBe(true)
      return Promise.resolve({ message: '' })
    })
    submit(wrapper)
    await flushPromises()

    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('sets errors if dispatch resolved with error', async () => {
    const expected = { some: 'errors' }
    const wrapper = subject()
    store.dispatch = jest.fn(async () => {
      const error = new Error('422 error')
      error.response = { data: { errors: expected } }
      return Promise.reject(error)
    })
    submit(wrapper)
    await flushPromises()

    expect(wrapper.vm.errors).toEqual(expected)
  })

  it('show success message if request successful', async () => {
    const message = 'We have emailed your password reset link!'
    const wrapper = subject()
    store.dispatch = jest.fn(() => Promise.resolve({ message }))
    submit(wrapper)
    await flushPromises()

    expect(wrapper.text()).toContain(message)
  })
})

function subject () {
  const wrapper = mount(RequestPasswordResetPage, {
    localVue,
    store
  })

  fillFields(wrapper)

  return wrapper
}

function fillFields (wrapper) {
  wrapper.find('input[name="email"]').setValue(validParams().email)
}

function submit (wrapper) {
  wrapper.find('button').trigger('submit')
}

function validParams () {
  return {
    email: 'john.doe@example.com'
  }
}
