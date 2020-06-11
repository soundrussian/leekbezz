import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import Router from 'vue-router'
import routes from 'routes'
import { createLocalVue, mount } from '@vue/test-utils'
import ResetPasswordPage from '../ResetPasswordPage.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)

const token = 'example-token'

const store = new Vuex.Store({
  getters: {
    isAuthenticated: jest.fn()
  }
})

describe('ResetPasswordPage.vue', () => {
  it('dispatches resetPassword action on submit', () => {
    const wrapper = subject()
    store.dispatch = jest.fn(() => Promise.resolve())
    submit(wrapper)

    expect(store.dispatch).toHaveBeenCalledWith('resetPassword', validParams())
  })

  it('does nothing if already loading', () => {
    const wrapper = subject()
    wrapper.setData({ isLoading: true })
    store.dispatch = jest.fn(() => Promise.resolve())
    submit(wrapper)

    expect(store.dispatch).not.toHaveBeenCalled()
  })

  it('correctly sets isLoading state', async () => {
    const wrapper = subject()
    expect(wrapper.vm.isLoading).toBe(false)
    store.dispatch = jest.fn(async () => {
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.isLoading).toBe(true)
      return Promise.resolve()
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

  it('stays on the same route if dispatch resolved with error', async () => {
    const wrapper = subject()
    store.dispatch = jest.fn(async () => {
      const error = new Error('422 error')
      error.response = { data: { errors: {} } }
      return Promise.reject(error)
    })
    submit(wrapper)
    await flushPromises()

    expect(wrapper.vm.$route.fullPath).toEqual(`/forgot/${token}`)
  })

  it('redirects to Home if password is reset', async () => {
    const wrapper = subject()
    store.dispatch = jest.fn(() => {
      store.getters = { isAuthenticated: () => true }
      return Promise.resolve()
    })
    submit(wrapper)
    await flushPromises()

    expect(wrapper.vm.$route.fullPath).toEqual('/')
  })
})

function subject () {
  const router = new Router({ routes })
  router.push(`/forgot/${token}`)

  const wrapper = mount(ResetPasswordPage, {
    localVue,
    store,
    router
  })

  fillFields(wrapper)

  return wrapper
}

function fillFields (wrapper) {
  wrapper.find('input[name="email"]').setValue(validParams().email)
  wrapper.find('input[name="password"]').setValue(validParams().password)
  wrapper.find('input[name="password_confirmation"]').setValue(validParams().passwordConfirmation)
}

function submit (wrapper) {
  wrapper.find('button').trigger('submit')
}

function validParams () {
  return {
    email: 'john.doe@example.com',
    password: 'newpassword',
    passwordConfirmation: 'newpassword',
    token
  }
}
