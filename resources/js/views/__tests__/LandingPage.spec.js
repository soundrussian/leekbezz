import { shallowMount } from '@vue/test-utils'
import LandingPage from '../LandingPage.vue'

describe('LandingPage.vue', () => {
  it('displays app name', () => {
    const wrapper = shallowMount(LandingPage)
    expect(wrapper.text()).toContain('LeekBezz')
  })
})
