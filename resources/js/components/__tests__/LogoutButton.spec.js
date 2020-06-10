import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'
import routes from 'routes'
import LogoutButton from '../LogoutButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)

describe('LogoutButton.vue', () => {
  it('renders logout link', () => {
    const wrapper = shallowMount(LogoutButton)
    expect(wrapper.text()).toContain('Log out')
  })

  it('dispatches logout action when clicked and redirects to home', async () => {
    const store = new Vuex.Store({})
    const router = new Router({ routes })
    router.push('/login')

    store.dispatch = jest.fn(() => {
      return Promise.resolve()
    })

    const wrapper = shallowMount(LogoutButton, {
      localVue,
      store,
      router
    })

    wrapper.find('a').trigger('click')

    expect(store.dispatch).toHaveBeenCalledWith('logout')
    await wrapper.vm.$nextTick()
    expect(router.currentRoute.fullPath).toEqual('/')
  })
})
