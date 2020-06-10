import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'
import routes from 'routes'
import flushPromises from 'flush-promises'
import LoginPage from '../LoginPage'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)

const email = 'user@example.com'
const password = 'password'

describe('LoginPage.vue', () => {
  let storeOptions
  let store
  let router

  beforeEach(() => {
    storeOptions = {
      actions: {
        login: jest.fn()
      },
      getters: {
        isAuthenticated: jest.fn()
      }
    }

    store = new Vuex.Store(storeOptions)
  })

  function subject () {
    router = new Router({ routes })
    router.push('/login')

    const wrapper = shallowMount(LoginPage, {
      localVue,
      store,
      router
    })

    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')
    emailInput.setValue(email)
    passwordInput.setValue(password)

    return wrapper
  }

  it('dispatches login action on submit', () => {
    store.dispatch = jest.fn(() => Promise.resolve())
    const wrapper = subject()
    wrapper.find('button').trigger('submit')
    expect(store.dispatch).toHaveBeenCalledWith('login', { email, password })
  })

  it('redirects to Home if login is successful', async () => {
    store.dispatch = jest.fn(() => {
      store.getters = { isAuthenticated: () => true }
      return Promise.resolve()
    })
    const wrapper = subject()
    wrapper.find('button').trigger('submit')
    await wrapper.vm.$nextTick()
    expect(router.currentRoute.fullPath).toEqual('/')
  })

  it('shows spinner while action is dispatched', async () => {
    store.dispatch = jest.fn(async () => {
      await wrapper.vm.$nextTick()
      store.getters = { isAuthenticated: () => true }
      expect(wrapper.find('button > svg').exists()).toEqual(true)
      expect(wrapper.find('button').element.disabled).toEqual(true)
      return Promise.resolve()
    })

    const wrapper = subject()
    expect(wrapper.find('button > svg').exists()).toEqual(false)
    expect(wrapper.find('button').element.disabled).toEqual(false)
    wrapper.find('button').trigger('submit')

    await flushPromises()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('button > svg').exists()).toBe(false)
    expect(wrapper.find('button').element.disabled).toEqual(false)
  })

  it('does nothing if loading', () => {
    store.dispatch = jest.fn(() => Promise.resolve())
    const wrapper = subject()
    wrapper.setData({ isLoading: true })
    wrapper.find('button').trigger('submit')
    expect(store.dispatch).not.toHaveBeenCalledWith('login', { email, password })
  })

  it('renders errors if not authenticated, and stays on the page', async () => {
    const errorMessage = 'These credentials do not match our records.'
    store.dispatch = jest.fn(() => {
      store.getters = { isAuthenticated: () => false }
      const error = new Error('422 error')
      error.response = {
        data: {
          errors: {
            email: [errorMessage]
          }
        }
      }
      return Promise.reject(error)
    })
    const wrapper = subject()
    wrapper.find('button').trigger('submit')
    await wrapper.vm.$nextTick()
    expect(router.currentRoute.fullPath).toEqual('/login')
    expect(wrapper.text()).toContain(errorMessage)
  })

  it('shows red border and error message if email error', async () => {
    const errorMessage = 'These credentials do not match our records.'
    const wrapper = subject()
    wrapper.setData({ errors: { email: [errorMessage] } })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain(errorMessage)
    const emailField = wrapper.find('input[type=email]')
    expect(emailField.element.classList).toContain('border-red-500')
  })

  it('shows red border and error message if password error', async () => {
    const errorMessage = 'Password is required.'
    const wrapper = subject()
    wrapper.setData({ errors: { password: [errorMessage] } })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain(errorMessage)
    const emailField = wrapper.find('input[type=password]')
    expect(emailField.element.classList).toContain('border-red-500')
  })
})
