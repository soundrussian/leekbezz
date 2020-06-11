import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'
import routes from 'routes'
import RegistrationPage from '../RegistrationPage.vue'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)

const store = mockStore()

describe('RegistrationPage.vue', () => {
  it('dispatches login action on submit', () => {
    const wrapper = subject()
    store.dispatch = jest.fn(() => Promise.resolve())
    submit(wrapper)

    expect(store.dispatch).toHaveBeenCalledWith('register', validParams())
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

    expect(wrapper.vm.$route.fullPath).toEqual('/register')
  })

  it('redirects to Home if registration is successful', async () => {
    const wrapper = subject()
    store.dispatch = jest.fn(() => {
      store.getters = { isAuthenticated: () => true }
      return Promise.resolve()
    })
    submit(wrapper)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$route.fullPath).toEqual('/')
  })
})

function mockStore () {
  return new Vuex.Store({
    getters: {
      isAuthenticated: jest.fn()
    }
  })
}

function validParams () {
  return {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password',
    passwordConfirmation: 'password'
  }
}

function subject () {
  const router = new Router({ routes })
  router.push('/register')

  const wrapper = mount(RegistrationPage, {
    localVue,
    store,
    router
  })

  fillFields(wrapper, validParams())

  return wrapper
}

function fillFields (wrapper, params) {
  wrapper.find('input[name="name"]').setValue(params.name)
  wrapper.find('input[name="email"]').setValue(params.email)
  wrapper.find('input[name="password"]').setValue(params.password)
  wrapper.find('input[name="password_confirmation"]').setValue(params.passwordConfirmation)
}

function submit (wrapper) {
  wrapper.find('button').trigger('submit')
}
