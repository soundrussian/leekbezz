import { mount, createLocalVue } from '@vue/test-utils'
import App from 'App.vue'
import VueRouter from 'vue-router'
import LandingPage from 'views/LandingPage.vue'
import AppNabar from 'components/TheNavbar.vue'
import routes from 'routes.js'

const localVue = createLocalVue()
localVue.use(VueRouter)

jest.mock('views/LandingPage.vue', () => ({
  name: 'LandingPage',
  render: h => h('div')
}))

jest.mock('components/TheNavbar.vue', () => ({
  name: 'NavBar',
  render: h => h('div')
}))

describe('App.vue', () => {
  it('renders LangingPage at / route', () => {
    const router = new VueRouter({ routes })
    const wrapper = mount(App, { localVue, router })

    expect(wrapper.findComponent(LandingPage).exists()).toBe(true)
  })

  it('renders AppNavbar', () => {
    const router = new VueRouter({ routes })
    const wrapper = mount(App, { localVue, router })

    expect(wrapper.findComponent(AppNabar).exists()).toBe(true)
  })
})
