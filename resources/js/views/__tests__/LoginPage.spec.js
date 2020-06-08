import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'
import routes from 'routes'
import LoginPage from '../LoginPage'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)

const email = 'user@example.com'
const password = 'password'

describe('LoginPage.vue', () => {
  let storeOptions
  let store

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

  it('dispatches login action on submit', () => {
    const wrapper = shallowMount(LoginPage, {
      localVue,
      store
    })

    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')
    emailInput.setValue(email)
    passwordInput.setValue(password)

    store.dispatch = jest.fn(() => Promise.resolve())
    wrapper.find('button').trigger('submit')
    expect(store.dispatch).toHaveBeenCalledWith('login', { email, password })
  })

  it('redirects to Home if login is successful', async () => {
    const router = new Router({ routes })
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

    store.dispatch = jest.fn(() => {
      store.getters = { isAuthenticated: () => true }
      return Promise.resolve()
    })
    wrapper.find('button').trigger('submit')
    await wrapper.vm.$nextTick()
    expect(router.currentRoute.fullPath).toEqual('/')
  })

  it('renders errors if not authenticated, and stays on the page', async () => {
    const router = new Router({ routes })
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

    store.dispatch = jest.fn(() => {
      store.getters = { isAuthenticated: () => false }
      const error = new Error('422 error')
      error.response = {
        data: {
          errors: {
            email: ['These credentials do not match our records.']
          }
        }
      }
      return Promise.reject(error)
    })
    wrapper.find('button').trigger('submit')
    await wrapper.vm.$nextTick()
    expect(router.currentRoute.fullPath).toEqual('/login')
    expect(wrapper.text()).toContain('These credentials do not match our records.')
  })
})
