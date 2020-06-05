import getters from '../getters'

describe('getters', () => {
  test('isAuthenticated returns true if there is current user', () => {
    const state = {
      currentUser: { email: 'jonh.doe@example.com' }
    }
    expect(getters.isAuthenticated(state)).toBe(true)
  })

  test('isAuthenticated returns true if there is no current user', () => {
    const state = {
      currentUser: {}
    }
    expect(getters.isAuthenticated(state)).toBe(false)
  })
})
