import { mount, createLocalVue } from '@vue/test-utils'
import App from 'App.vue'
import VueRouter from 'vue-router'
import LandingPage from 'views/LandingPage.vue'
import LoginPage from 'views/LoginPage.vue'
import RegistrationPage from 'views/RegistrationPage.vue'
import TheNavbar from 'components/TheNavbar.vue'
import routes from 'routes.js'

const localVue = createLocalVue()
localVue.use(VueRouter)

jest.mock('views/LandingPage.vue', () => ({
  name: 'LandingPage',
  render: h => h('div')
}))

jest.mock('components/TheNavbar.vue', () => ({
  name: 'TheNavbar',
  render: h => h('div')
}))

jest.mock('views/LoginPage.vue', () => ({
  name: 'LoginPage',
  render: h => h('div')
}))

jest.mock('views/RegistrationPage.vue', () => ({
  name: 'RegistrationPage',
  render: h => h('div')
}))

describe('App.vue', () => {
  it('renders LangingPage at / route', () => {
    const router = new VueRouter({ routes })
    const wrapper = mount(App, { localVue, router })

    expect(wrapper.findComponent(LandingPage).exists()).toBe(true)
  })

  it('renders LoginPage at /login route', async () => {
    const router = new VueRouter({ routes })
    const wrapper = mount(App, { localVue, router })

    await router.push('/login')

    expect(wrapper.findComponent(LoginPage).exists()).toBe(true)
  })

  it('renders RegistrationPage at /register route', async () => {
    const router = new VueRouter({ routes })
    const wrapper = mount(App, { localVue, router })

    await router.push('/register')

    expect(wrapper.findComponent(RegistrationPage).exists()).toBe(true)
  })

  it('renders AppNavbar', () => {
    const router = new VueRouter({ routes })
    const wrapper = mount(App, { localVue, router })

    expect(wrapper.findComponent(TheNavbar).exists()).toBe(true)
  })
})
