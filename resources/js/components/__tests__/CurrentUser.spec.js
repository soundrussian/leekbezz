import { shallowMount, createLocalVue } from '@vue/test-utils'
import Router from 'vue-router'
import Vuex from 'vuex'
import CurrentUser from 'components/CurrentUser.vue'
import LogoutButton from 'components/LogoutButton.vue'

jest.mock('components/LogoutButton.vue', () => ({
  name: 'LogoutButton',
  render: h => h('div')
}))

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)

describe('CurrentUser.vue', () => {
  let storeOptions
  let store

  beforeEach(() => {
    storeOptions = {
      state: {
        currentUser: {
          name: 'John Doe'
        }
      },
      getters: {
        isAuthenticated: jest.fn()
      }
    }
    store = new Vuex.Store(storeOptions)
  })

  function subject () {
    return shallowMount(CurrentUser, {
      localVue,
      store
    })
  }

  describe('if not authenticated', () => {
    beforeEach(() => {
      storeOptions.getters.isAuthenticated.mockReturnValue(false)
    })

    it('shows register link', () => {
      expect(subject().text()).toContain('Register')
    })

    it('shows login link', () => {
      expect(subject().text()).toContain('Login')
    })

    it('hides logout link', () => {
      expect(subject().findComponent(LogoutButton).exists()).toBe(false)
    })
  })

  describe('if authenticated', () => {
    beforeEach(() => {
      storeOptions.getters.isAuthenticated.mockReturnValue(true)
    })

    it('shows logout link', () => {
      expect(subject().findComponent(LogoutButton).exists()).toBe(true)
    })

    it('shows current username', () => {
      expect(subject().text()).toContain('John Doe')
    })

    it('hides register link', () => {
      expect(subject().text()).not.toContain('Register')
    })

    it('hides login link', () => {
      expect(subject().text()).not.toContain('Login')
    })
  })
})
