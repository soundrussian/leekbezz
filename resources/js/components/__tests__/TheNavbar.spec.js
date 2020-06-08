import { mount } from '@vue/test-utils'
import TheNavbar from 'components/TheNavbar'
import CurrentUser from 'components/CurrentUser'

jest.mock('components/CurrentUser.vue', () => ({
  name: 'NavBar',
  render: h => h('div')
}))

describe('TheNavbar.vue', () => {
  it('renders CurrentUser component', () => {
    const wrapper = mount(TheNavbar)
    expect(wrapper.findComponent(CurrentUser).exists()).toBe(true)
  })
})
